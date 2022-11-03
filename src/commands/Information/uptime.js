const { Client, EmbedBuilder } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "uptime",
  description: "Display client uptime",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const d = moment.duration(interaction.client.uptime);
    const days = d.days() == 1 ? `${d.days()} day` : `${d.days()} days`;
    const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
    const minutes =
      d.minutes() == 1 ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
    const seconds =
      d.seconds() == 1 ? `${d.seconds()} second` : `${d.seconds()} seconds`;
    const date = moment().subtract(d, "ms").format("dddd, MMMM Do YYYY");

    const replyEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} Uptime`)
      .setDescription(
        `\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``
      )
      .setTimestamp()
      .setColor("Blue");

    interaction.followUp({ embeds: [replyEmbed] });
  },
};