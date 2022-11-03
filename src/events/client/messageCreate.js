const { EmbedBuilder, Message } = require("discord.js");

module.exports = {
    name: "messageCreate",
    run: async (client, message) => {
        if (
            message.content === `<@${client.user.id}>` ||
            message.content === `<@!${client.user.id}>`
        )
            return message.reply({
                content: `**› Hi ${message.author} I'm **${client.user.username}**\nA Powerful Slash Giveaway Discord Bot**`,
            });

    },
};
