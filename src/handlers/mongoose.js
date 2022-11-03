const mongoose = require("mongoose");
const { Client } = require("discord.js");
const chalk = require("chalk");
const config = require("../config");

/**
 * @param {Client} client
 */
module.exports = (client) => {
  const dbOptions = {
    useNewUrlParser: true,
    autoIndex: false,
    connectTimeoutMS: 10000,
    family: 4,
    useUnifiedTopology: true,
  };
  mongoose.connect(process.env.MONGO || client.config.mongourl, dbOptions);
  mongoose.Promise = global.Promise;
  mongoose.connection.on("connected", () => {
    console.log(console.log(`${chalk.grey.bold('[INFO]  ')}${chalk.green.bold('Connected to the database!')}`));
  });
  mongoose.connection.on("err", (err) => {
    console.log(`Mongoose connection error: \n ${err.stack}`, "error");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });
};
