const { EmbedBuilder, Client, version } = require("discord.js");
const { readdirSync } = require("fs");
require("moment-duration-format");
const os = require("os");

module.exports = {
  name: "botinfo",
  description: "Information about the bot",
  
  run: async (client, interaction, args) => {
    
    var commands = [];
		readdirSync("./src/commands/").forEach((dir) => {
			var dircmds = readdirSync(`./src/commands/${dir}/`).filter((file) =>
				file.endsWith(".js")
			);

                      commands = commands.concat(dircmds);
		});
    
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.user.username} Stats/Info!`, iconURL: client.user.displayAvatarURL() })
      .addFields(
        {
          name: "Name",
          value: `┕ \`${client.user.username}\``,
            inline: true,
        },
        {
         name: "Developers",
         value: `┕ <@755566952449310842>`,
         inline: true,
        },
        {
            name: "💻 **Memory usage**",
            value: `​ ┕ \`${Math.round(
              process.memoryUsage().heapUsed / 1024 / 1024
            )}mb\``,
            inline: true,
          },
          {
            name: "🏘️ **Guilds**",
            value: `​ ┕ \`${client.guilds.cache.size}\``,
            inline: true,
          },
          {
            name: "👥 **Users**",
            value: `​ ┕ \`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\``,
            inline: true,
          },
          {
            name: "🇨🇭 **Channels**",
            value: `​ ┕ \`${client.channels.cache.size}\``,
            inline: true,
          },
          {
            name: `Node.js Version`,
            value: `┕ \`${process.version}\``,
            inline: true,
          },
          {
            name: `Discord.js Version`,
            value: `┕ \`${version}\``,
            inline: true,
          },
          {
            name: `Commands`,
            value: `┕ \`${commands.length}\``,
            inline: true,
          },
          {
            name: `Platform`,
            value: `┕ ${os.type}`,
            inline: true,
        },
        {
            name: `Cores`,
            value: `┕ ${os.cpus().length}`,
            inline: true,
        },
        {
            name: `Model`,
            value: `┕ ${os.cpus()[0].model}`,
            inline: true,
        },
        {
            name: `Speed`,
            value: `┕ ${os.cpus()[0].speed} MHz`,
            inline: true,
        },
        
          )
   
    interaction.followUp({ embeds: [embed] });
  },
};