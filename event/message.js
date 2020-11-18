module.exports = (client,message) => {
    let guildDb = client.guilddb.get(message.guild.id);
        prefix = guildDb.prefix;
    if(message.author.bot){return}
    if(!message.content.startsWith(prefix)){return}

    const command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
    const params = message.content.split(' ').slice(1);
    let cmd;

    if (client.commandes.has(command)){
        cmd = client.commandes.get(command)
    }else if(client.aliases.has(command)){
        cmd = client.commandes.get(client.aliases.get(command))
    }
    if(!cmd) return;
    try {
        cmd.run(client, message, params);
    } catch (e) {
        client.emit("error", e, message);
    }
};
