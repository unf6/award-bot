const { Activity } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");

module.exports = {
  name: "ready",
  run: async (client) => {
	
    console.log(`${client.user.username} online!`, "ready");

    const activities = [
        { name: `/help | ${client.guilds.cache.size} Guilds`, type: 3 }, // WATCHING
        { name: `Discord.js v14 by Liaam#9901 `, type: 3 }, // WATCHING
    ];
    const status = ["online"];
    let i = 0;
    setInterval(() => {
        if (i >= activities.length) i = 0;
        client.user.setActivity(activities[i]);
        i++;
    }, 5000);

    let s = 0;
    setInterval(() => {
        if (s >= activities.length) s = 0;
        client.user.setStatus(status[s]);
        s++;
    }, 30000);
  },
};
