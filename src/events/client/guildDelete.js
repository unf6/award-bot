const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "guildDelete",
    run: async (client, guild) => {
        let channel = client.channels.cache.get(client.config.logs);
        let embed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username}#${client.user.discriminator} | ${client.user.id}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`left this ${guild.name}！`)
            .setColor("800080")
        channel.send({ embeds: [embed] })
    },
};
