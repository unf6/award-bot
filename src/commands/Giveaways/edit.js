const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: 'editt',
    description: 'edit a giveaway',
    botPerms: [],
    userPerms: [],
    owner: false,

    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to end (message ID)',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'duration',
            description: 'Setting time of mentioned giveaway. Eg. 1h sets the current giveaway to end after an hour!',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'winners',
            description: 'How many winners the giveaway should have',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'prize',
            description: 'What the prize of the giveaway should be',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
  
   run: async (client, interaction, args ) => {

        const gid = interaction.options.getString('giveaway');
        const time = ms(interaction.options.getString('duration'));
        const winnersCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
   
           // Edit the giveaway
           try {
           await client.giveawaysManager.edit(gid, {
               newWinnersCount: winnersCount,
               newPrize: prize,
               addTime: time
           })
           } catch(e) {
   return interaction.followUp({
               content:
                   `No giveaway found with the given message ID: \`${gid}\``,
               ephemeral: true
           });
           }
           interaction.followUp({
               content:
                   `This giveaway has now been edited!`,
               ephemeral: true
           });

   }
}