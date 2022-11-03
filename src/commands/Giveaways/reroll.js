const { Client, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "reroll",
    description: "reroll a giveaway",
    userPerms: ['ManageGuild'],
    botPerms: ['ManageGuild'],
    owner: false,

    options: [
        {
            name: "giveaway",
            description: "The giveaway to reroll (message ID)",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        const giveaway = interaction.options.getString("giveaway");

        const giveawaysObj =

            client.giveawaysManager.giveaways.find(
                (g) => g.messageId === giveaway && g.guildId === interaction.guild.id
            );

        if (!giveawaysObj) {
            interaction.followUp("Giveaway not found.");
            return;
        }
        if (!giveawaysObj.ended) {
            interaction.followUp("Giveaway hasnt ended yet.");
            return;
        }
        client.giveawaysManager.reroll(giveawaysObj.messageId).then(() => {
            return interaction.followUp("Giveaway ended.");
        });
    },
};