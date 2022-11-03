const { readdirSync } = require('fs');
const { PermissionsBitField, Routes, Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
/** 
 * @param {Client} client 
 */
module.exports = (client) => {
    const data = [];
    let count = 0;
    readdirSync("./src/commands/").forEach((dir) => {
        const slashCommandFile = readdirSync(`./src/commands/${dir}/`).filter((files) => files.endsWith(".js"));

        for (const file of slashCommandFile) {
            const slashCommand = require(`../commands/${dir}/${file}`);
            if (!slashCommand.name) return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);
            if (!slashCommand.description) return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);
            client.slashCommands.set(slashCommand.name, slashCommand);

            data.push({
                name: slashCommand.name,
                description: slashCommand.description,
                type: slashCommand.type,
                options: slashCommand.options ? slashCommand.options : null,
                default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
            });
            count++;
        }
    });
    console.log(`Loaded: ${count} SlashCommands (/)`);
    const rest = new REST({ version: '10' }).setToken(client.config.token);
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(client.config.clientID), { body: data });
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}