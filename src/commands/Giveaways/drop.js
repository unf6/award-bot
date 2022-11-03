const { Client, ApplicationCommandOptionType, ChannelType } = require("discord.js");
const ms = require("ms");
const messages = require("../../utils/messages");
module.exports = {
  name: "drop",
  description: "start a giveaway",
  userPerms: ['ManageGuild'],
  botPerms: ['ManageGuild'],
  owner: false,

  options: [
    {
      name: "winners",
      description: "How many winners the drop should have",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "prize",
      description: "What the prize of the drop should be",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "channel",
      description: "The channel to start the drop in",
      type: ApplicationCommandOptionType.Channel,
      ChannelTypes: ['GUILD_TEXT'],
      required: true,
    },
  ],
  
  run: async (client, interaction, args) => {
    
    const winners = interaction.options.getNumber("winners");
    const prize = interaction.options.getString("prize");
    const channel = interaction.options.getChannel("channel");
    
    client.giveawaysManager.start(channel, {
      isDrop: true,
      winnerCount: winners,
      prize,
      hostedBy: interaction.member,
      messages,
    });

    return interaction.followUp("Drop started!");
  },
};