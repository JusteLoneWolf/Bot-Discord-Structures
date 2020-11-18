const mongoose = require("mongoose");
const {config} = require("../../option");

const guildSchema = mongoose.Schema({
    TableId: mongoose.Schema.Types.ObjectId,
    GuildId: String,
    prefix: {
        type: String,
        default: config.prefix
    }
});

module.exports = mongoose.model("Guild",guildSchema);
