const fs = require('fs');
const path = require('path');

const { RateLimiterMemory } = require('rate-limiter-flexible');
const { Configuration, OpenAIApi } = require('openai');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { GUILD_ID, CLIENT_ID, OPENAI_API_KEY, TOKEN } = process.env;

const rateLimiter = new RateLimiterMemory({
    points: 3, // Número de solicitações permitidas por minuto (RPM)
    duration: 60, // Por minuto (RPM)
});

const openaiConfig = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

module.exports = async (client) => {
    // Popula a coleção client.commands com os comandos slash
    client.commands = new Map();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        client.commands.set(command.data.name, command);
    }

    // Evento interactionCreate
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (commandName === 'chatgpt') {
            await interaction.deferReply();

            const userMessage = interaction.options.getString('message');

            try {
                // Espera o rate limiter permitir a solicitação
                await rateLimiter.consume(1);

                // Faz a chamada à API da OpenAI
                const chatCompletion = await openai.createChatCompletion({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: userMessage }],
                });

                // Processa a resposta e envia como resposta ao usuário
                const generatedResponse = chatCompletion.data.choices[0].message.content;
                await interaction.editReply(generatedResponse);
            } catch (error) {
                console.error(error);

                // Se a solicitação falhou devido a limite de taxa, implementa uma tentativa de novo após um intervalo exponencial
                if (error instanceof RateLimiterMemory.Rejected) {
                    const retryAfterMs = error.msBeforeNext;
                    console.log(`Limite de taxa atingido. Tentando novamente em ${retryAfterMs}ms.`);
                    await new Promise(resolve => setTimeout(resolve, retryAfterMs));
                    // Tenta a solicitação novamente
                    return client.emit('interactionCreate', interaction);
                }

                // Lida com outros erros e fornece um feedback ao usuário
                if (error.response && error.response.status === 429) {
                    await interaction.editReply('Limite de taxa excedido. Por favor, tente novamente mais tarde.');
                } else {
                    await interaction.editReply('Houve um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
                }
            }
        }
    });

    // Implementa os comandos slash no Discord
    try {
        console.log('Iniciando a atualização dos comandos de aplicação (/).');

        const commands = client.commands.map(command => command.data.toJSON());

        const rest = new REST({ version: '9' }).setToken(TOKEN);

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Comandos de aplicação (/) atualizados com sucesso.');
    } catch (error) {
        console.error('Falha ao implementar os comandos:', error.message);
    }
};
