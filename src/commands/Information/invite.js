const {
	Client,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
  } = require("discord.js");
  
  module.exports = {
	  name: "invite",
	  description: "Get the bot's invite link.",
	  run: async (client, interaction, args) => {
		  
		  const emb = new EmbedBuilder()
		.setColor("Blue")
		.setTitle(`Invite ${client.user.username}`)
		.setDescription(
		  `**${client.user.username}**，Thank you for choosing me to use you can click the button below to invite me！`
		)
		.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
		.setFooter({ text: `Award-bot - Made By ❤️ Liaam` });
  
	  const row = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
		  .setURL(
			`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`
		  )
		  .setLabel("Invite")
		  .setStyle(ButtonStyle.Link),

		  new ButtonBuilder()
		  .setLabel("Github")
		  .setStyle(ButtonStyle.Link)
		  .setURL("https://github.com/liaam-dev/award-bot"),

      new ButtonBuilder()
		  .setURL(
			`https://discord.gg/PeV2Qj5SHD`
		  )
		  .setLabel("Support")
		  .setStyle(ButtonStyle.Link)

	  );
  
	  interaction.followUp({ content: ` `, embeds: [emb], components: [row] });
	},
  };