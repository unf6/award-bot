const { Client, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "end",
    description: "end a giveaway",
    userPerms: ['ManageGuild'],
    botPerms: ['ManageGuild'],
    owner: false,

    options: [
        {
            name: "giveaway",
            description: "The giveaway to end (message ID)",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        const giveaway = interaction.options.getString("giveaway");

            client.giveawaysManager.giveaways.find(
                (g) => g.messageId === giveaway && g.guildId === interaction.guild.id
            );

        if (!giveawaysObj) {
            interaction.followUp("Giveaway not found.");
            return;
        }
        if (giveawaysObj.ended) {
            interaction.followUp("Giveaway already ended.");
            return;
        }
        client.giveawaysManager.end(giveawaysObj.messageId).then(() => {
            return interaction.followUp("Giveaway ended.");
        });
    },
};