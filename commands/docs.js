const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select_tech") // Aqui definimos o customId como "select_tech"
            .setPlaceholder("Nenhuma linguagem selecionada")
            .addOptions([
                {
                    label: "javascript",
                    description: "Veja a documentação Javascript",
                    value: "javascript"
                },
                {
                    label: "python",
                    description: "Veja a documentação de Python",
                    value: "python"
                },
                {
                    label: "C#",
                    description: "Veja a documentação de C#",
                    value: "csharp"
                },
                {
                    label: "discord.js",
                    description: "Veja a documentação de Discord.js",
                    value: "discordjs"
                }
            ])
    );

module.exports = {
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("Acesse a documentação da tecnologia"),

    async execute(interaction) {
        // Verifica se o customId é igual a "select_tech"
        if (interaction.isSelectMenu() && interaction.customId === 'select_tech') {
            // Captura o valor selecionado no menu suspenso pelo usuário
            const selectedOption = interaction.values[0];

            // Verifica se uma opção foi selecionada
            if (!selectedOption) {
                await interaction.reply("Nenhuma linguagem selecionada.");
                return;
            }

            // Faz a lógica para cada opção selecionada
            switch (selectedOption) {
                case "javascript":
                    await interaction.reply("Aqui está a documentação do JavaScript: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript");
                    break;
                case "python":
                    await interaction.reply("Aqui está a documentação do Python: https://docs.python.org/3/");
                    break;
                case "csharp":
                    await interaction.reply("Aqui está a documentação do C#: https://docs.microsoft.com/pt-br/dotnet/csharp/");
                    break;
                case "discordjs":
                    await interaction.reply("Aqui está a documentação do Discord.js: https://discord.js.org/#/docs/main/stable/general/welcome");
                    break;
                default:
                    await interaction.reply("Opção inválida. Por favor, selecione uma opção válida.");
                    break;
            }
        } else {
            // Se não for a interação do menu suspenso, responda com a mensagem e o menu
            await interaction.reply({
                content: "Este é o comando /docs. Use-o para acessar a documentação da tecnologia.",
                components: [row] // Adicionamos o menu suspenso à resposta
            });
        }
    }
};
