const { readdirSync } = require("fs");
const { Client } = require("discord.js");
/**
 * @param {Client} client
 */
module.exports = (client) => {
  readdirSync("./src/events/client/").forEach((file) => {
    const event = require(`../events/client/${file}`);
    client.on(event.name, (...args) => event.run(client, ...args));
  });
};