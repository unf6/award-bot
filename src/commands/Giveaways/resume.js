const { Client, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "resume",
    description: "resume a giveaway",
    options: [
        {
            name: "giveaway",
            description: "The giveaway to resume (message ID)",
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
        if (!giveawaysObj.pauseOptions.isPaused) {
            interaction.followUp("Giveaway is already paused.");
            return;
        }
        client.giveawaysManager.unpause(giveawaysObj.messageId).then(() => {
            return interaction.followUp("Giveaway paused.");
        });
    },
};