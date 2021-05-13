const {Collection} = require("discord.js");
module.exports = async (client,message) => {
    if (message.author.bot || message.channel.type === "dm") return;
    let prefix = "!";
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.split(' ').slice(1);

    const command = message.content.split(' ')[0].slice(prefix.length);
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    //Cooldown
    if (!client.cooldowns.has(cmd.help.name)) {
        client.cooldowns.set(cmd.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(cmd.help.name);
    const cdAmount = (cmd.help.cooldown || 5) * 1000;

    if (!client.config.owner.includes(message.author.id)){

        if (tStamps.has(message.author.id)) {
            const exT = tStamps.get(message.author.id) + cdAmount

            if (timeNow < exT) {
                let remain = (exT - timeNow) / 1000
                return message.reply(`Please wait ${remain.toFixed(0)} second(s) before using \`${cmd.help.name}\`.`);
            }
        } else {
            tStamps.set(message.author.id, timeNow);
        }
    }
    setTimeout(()=> tStamps.delete(message.author.id),cdAmount)
    //Cooldown

    cmd.setMessage(message);
    try {
        //await this.getInvite(client,message.guild, guildData)

        cmd.run(message, args);
    } catch (e) {
        client.emit('error', e.stack, message.channel, cmd)
    }

}

