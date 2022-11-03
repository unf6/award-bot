require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "", // your bot token
    clientID: process.env.CLIENT_ID || "", // your bot client id
    owners: process.env.OWNERS || "", // your account id
    mongourl: process.env.MONGO || "", //MongoDb Url
    embedcolor: process.env.COLOR || 0x303236, // embed colour
    logs: process.env.LOGS || "", // channel id for guild create and delete logs
    everyoneMention: process.env.everyoneMention || false,

  }