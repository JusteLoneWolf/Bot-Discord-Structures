const { ShardingManager } = require("discord.js");
const {token} = require("./config.js");

const sharder = new ShardingManager("./main.js", {
    token: token,
    totalShards: 1,
    respawn: true
});

sharder.on("launch", (shard) => {
    console.log(`Sharding | Shard #${shard.id} launched !`)
});

sharder.spawn()
    .then(() => {
        console.log("Sharding | All shards startings !")
    }).catch((err) => {
        if(err) {
          return console.log(err);
        }
});
