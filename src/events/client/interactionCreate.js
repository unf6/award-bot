const { InteractionType, EmbedBuilder, PermissionsBitField } = require("discord.js");
const client = require("../../bot");

module.exports = {
	name: "interactionCreate",
	run: async (client, interaction) => {
		if (!interaction.inGuild()) return;
		if (interaction.type === InteractionType.ApplicationCommand) {
			await interaction.deferReply();

			const cmd = client.slashCommands.get(interaction.commandName);
			if (!cmd)
				return interaction.followUp({
					embeds: [
						{
							color: 13584458,
							description: "There was an error - please try again! ",
						},
					],
				});

			const args = [];

			for (let option of interaction.options.data) {
				if (option.type === "SUB_COMMAND") {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					});
				} else if (option.value) args.push(option.value);
			}
			interaction.member = interaction.guild.members.cache.get(
				interaction.user.id
			);

			const embed = new EmbedBuilder()
				.setColor("Blue")

			if (cmd.botPerms) {
				if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve(cmd.botPerms || []))) {
					embed.setDescription(`I don't have **\`${cmd.botPerms}\`** permission in ${interaction.channel.toString()} to execute this **\`${cmd.name}\`** command.`);
					return interaction.followUp({ embeds: [embed] });
				}
			}

			if (cmd.userPerms) {
				if (!interaction.member.permissions.has(PermissionsBitField.resolve(cmd.userPerms || []))) {
					embed.setDescription(`You don't have **\`${cmd.userPerms}\`** permission in ${interaction.channel.toString()} to execute this **\`${cmd.name}\`** command.`);
					return interaction.followUp({ embeds: [embed] });
				}
			}

			const embed2 = new EmbedBuilder()
			.setDescription("Only bot developer can use this command")

			const { owners } = require("../../config");
			if (cmd) {
				if (cmd.owner) {
					if
					(!owners.includes(interaction.user.id))
					return interaction.followUp({ embeds: [embed2] });

				}}

				// ==============================< If command doesn't found >=============================\\
				if (!cmd) return client.slashCommands.delete(interaction.commandName);

			return cmd.run(client, interaction, args);

		}
		// Context Menu Handling
		if (interaction.isUserContextMenuCommand()) {
			await interaction.deferReply({ ephemeral: false });
			const command = client.slashCommands.get(interaction.commandName);
			if (command) command.run(client, interaction);
		}
	},
};