module.exports = (client) => {
  process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log(err, origin);
  });
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(err, origin);
  });
};