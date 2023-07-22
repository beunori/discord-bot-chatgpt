const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Interaction } = require('discord.js');
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

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Iniciando a atualização dos comandos de aplicação (/).');

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


// Evento interactionCreate para lidar com os comandos slash e com os componentes
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() && !interaction.isStringSelectMenu()) return;

    const { commandName } = interaction;

    // Aqui você pode adicionar novos comandos ao verificar o nome do comando

    if (commandName === 'chatgpt') {
        const command = require(path.join(commandsPath, 'chatgpt.js'));
        command.execute(interaction);

    } else if (commandName === 'docs') {
        const command = require(path.join(commandsPath, 'docs.js'));
        command.execute(interaction);

    } else if (commandName === 'git') {
        const command = require(path.join(commandsPath, 'git.js'));
        command.execute(interaction);

    } else if (commandName === 'ping') {
        const command = require(path.join(commandsPath, 'ping.js'));
        command.execute(interaction);

    } else if (commandName === 'playlist') {
        const command = require(path.join(commandsPath, 'playlist.js'));
        command.execute(interaction);
    } else if (commandName === 'playlist') {
        const command = require(path.join(commandsPath, 'apagar.js'));
        command.execute(interaction);
    }
});

client.login(TOKEN);
