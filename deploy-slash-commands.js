const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Importa os comandos
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [];
for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.push(command.data.toJSON());
}

// Implementa os comandos slash no Discord
(async () => {
    try {
        console.log('Iniciando a atualização dos comandos de aplicação (/).');

        const rest = new REST({ version: '9' }).setToken(TOKEN);

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Comandos de aplicação (/) atualizados com sucesso.');
    } catch (error) {
        console.error('Falha ao implementar os comandos:', error.message);
    }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Evento interactionCreate para lidar com os comandos slash
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'chatgpt') {
        const command = require(path.join(commandsPath, 'chatgpt.js'));
        command.execute(interaction);
    }
});

client.login(TOKEN);
