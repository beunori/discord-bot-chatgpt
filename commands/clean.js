const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("apagar")
        .setDescription("Apaga mensagens de um canal do servidor")
        .addIntegerOption(option =>
            option.setName("quantidade")
                .setDescription("O número de mensagens a serem apagadas (de 1 a 100)")
                .setRequired(true)
        ),

    async execute(interaction) {
        // Verifica se o usuário tem permissão para apagar mensagens
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            await interaction.reply("Você não tem permissão para apagar mensagens neste servidor.");
            return;
        }

        // Captura a quantidade de mensagens a serem apagadas do argumento da interação
        const quantidade = interaction.options.getInteger("quantidade");

        // Verifica se a quantidade está dentro do intervalo permitido (1 a 100)
        if (quantidade < 1 || quantidade > 100) {
            await interaction.reply("Por favor, insira um número de 1 a 100 para a quantidade de mensagens a serem apagadas.");
            return;
        }

        try {
            // Apaga as mensagens do canal
            const channel = interaction.channel;
            const fetchedMessages = await channel.messages.fetch({ limit: quantidade });
            channel.bulkDelete(fetchedMessages);

            await interaction.reply(`Foram apagadas ${quantidade} mensagens neste canal.`);
        } catch (error) {
            console.error("Erro ao apagar mensagens:", error);
            await interaction.reply("Ocorreu um erro ao tentar apagar as mensagens.");
        }
    },
};
