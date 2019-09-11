function sendEmbed(message, content){
    let client = message.client;
    return message.channel.send({
        embed:{
            author:{
                name:client.user.username,
                icon_url:client.user.displayAvatarURL,
            },
            color: client.color.messagecolor.blue,
            description: content,
            timestamp: Date.now()
        }
    })
}

function usage(client, message, command){
    let guildDb = client.guilddb.get(message.guild.id);
    var re = /<prefix>/gi;
    let usage = command.help.usage;
    return message.channel.send({
        embed:{
            color:client.color.messagecolor.blue,
            description: `<:ultra_warning:613333212340682754> Wrong Usage: ${usage.replace(re, guildDb.prefix)}`
        }
    })
}

module.exports = {
    sendEmbed,
    usage,
};