const { EmbedBuilder, Client } = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows a list of all commands",

    run: async (client, interaction) => {

        const slashCommands = await client.application.commands.fetch();

        const embed = new EmbedBuilder()

            .setAuthor({ name: `${interaction.user.username}!`, iconURL: interaction.user.displayAvatarURL() })
            .setTitle(`${client.user.username} Help Menu`)
            .setDescription(`• Total Commands: **${slashCommands}**`)
            .addFields(

                { name: '❔ Information', value: `\`help,invite,ping,botinfo,uptime\``, inline: true },
                { name: '🎉 Giveaways', value: `\`create,delete,drop,edit,end,pause,reroll,resume\``, inline: true },

            )

        interaction.followUp({ embeds: [embed] });

    }
}