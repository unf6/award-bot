const { Client, ApplicationCommandOptionType, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ms = require("ms");
const messages = require("../../utils/messages");

module.exports = {
  name: "create",
  description: "start a giveaway",
  userPerms: ['ManageGuild'],
  botPerms: ['ManageGuild'],
  owner: false,

  options: [
    {
      name: "duration",
      description:
        "How long the giveaway should last for. Example values: 1m, 1h, 1d",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "winners",
      description: "How many winners the giveaway should have",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "prize",
      description: "What the prize of the giveaway should be",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "channel",
      description: "The channel to start the giveaway in",
      type: ApplicationCommandOptionType.Channel,
      ChannelTypes: ['GUILD_TEXT'],
      required: true,
    },
  ],
  

  run: async (client, interaction) => {
    
    const duration = ms(interaction.options.getString("duration"));
    const winners = interaction.options.getNumber("winners");
    const prize = interaction.options.getString("prize");
    const channel = interaction.options.getChannel("channel");
    
    const giveawayInfo = await client.giveawaysManager.start(channel, {
      duration,
      winnerCount: winners,
      prize,
      hostedBy: interaction.member,
      messages,

    });

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Giveaway URL')
            .setURL(giveawayInfo.messageURL)
        )

    return interaction.followUp({ content: `Giveaway started!`, components: [row] });
  },
};