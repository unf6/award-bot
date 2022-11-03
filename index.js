const Cluster = require('discord-hybrid-sharding');

const manager = new Cluster.Manager(`./src/bot.js`, {
    totalShards: 1,
    shardsPerClusters: 1,
    totalClusters: 1,
    mode: "process",
    token: process.env.MULTITOKEN,
});

manager.extend(
    new Cluster.HeartbeatManager({
        interval: 2000,
        maxMissedHeartbeats: 5,
    })
);

manager.on("clusterCreate", (cluster) => {
    console.log(`Launched Cluster ${cluster.id}`);

    cluster.on("ready", () => {
        console.log(`Cluster ${cluster.id} seems ready`);
    });

    cluster.on("reconnecting", () => {
        console.log(`Cluster ${cluster.id} is reconnecting`);
    });

    cluster.on("disconnect", async () => {
        console.log(`Cluster ${cluster.id} disconnected`);
    });

    cluster.on("death", () => {
        console.log(`Cluster ${cluster.id} died`);
    });

    cluster.on("error", () => {
        console.log(`Cluster ${cluster.id} errored`);
    });

    cluster.on("spawn", () => {
        console.log(`Cluster ${cluster.id} has spawned`);
    });
});
manager.spawn({ timeout: -1 });
