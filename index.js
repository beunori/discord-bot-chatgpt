const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const { TOKEN } = process.env;este comando

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Conectado como ${client.user.tag}`);
});

client.on('messageCreate', message => {
    // Aqui fica o código para lidar com as mensagens
});

client.login(TOKEN);

// Move o código de deploy-slash-commands.js aqui
require('./deploy-slash-commands');
