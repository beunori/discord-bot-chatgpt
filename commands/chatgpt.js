const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chatgpt')
        .setDescription('Gera uma resposta usando o GPT-3.5-turbo.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('A mensagem do usuário para gerar uma resposta.')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();

        const userMessage = interaction.options.getString('message');

        try {
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

            await interaction.editReply('Houve um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
        }
    },
};
