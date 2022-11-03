const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Displays the bot ping',
    botPerms: [''],
    userPerms: [''],
    owner: false,
  
   run: async (client, interaction, args ) => {

    const embed = new EmbedBuilder()
    .setDescription(`${client.ws.ping} Ms`)

    interaction.followUp({ embeds: [embed] });

   }
}