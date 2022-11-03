const { Client, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "pause",
    description: "pause a giveaway",
    userPerms: ['ManageGuild'],
    botPerms: ['ManageGuild'],
    owner: false,

    options: [
        {
            name: "giveaway",
            description: "The giveaway to pause (message ID)",
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
        if (giveawaysObj.pauseOptions.isPaused) {
            interaction.followUp("Giveaway is already paused.");
            return;
        }
        client.giveawaysManager.pause(giveawaysObj.messageId).then(() => {
            return interaction.followUp("Giveaway paused.");
        });
    },
};