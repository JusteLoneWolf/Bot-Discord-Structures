class Command {

    constructor(client, options) {
        this.help = {
            name: options.name || null,
            description: options.description || "No information.",
            usage: options.usage ?  `${client.config.prefix}${options.usage}`: "",
            category: options.category || "Information",
            exemple: options.exemple || "No exemple",
            args: options.args || "Pno sub command"
        };
        this.conf = {
            permLevel: options.permLevel || 0,
            permission: options.permission || "SEND_MESSAGES",
            cooldowns: options.cooldowns || 1000,
            aliases: options.aliases || [],
            allowDMs: options.allowDMs || false,
            args : options.args || "No args",
            mention : options.mention || false
        };
        this.cooldown = new Set();
    }
    startCooldown = (user) => {
        if(!user) return console.log("[CoolDown] No user data")
        this.cooldown.add(user);
        setTimeout(() => {
            this.cooldown.delete(user);
        }, this.conf.cooldown);
    }

    setMessage= (message) => {
        this.message = message;
    }

    respond= (message) => {
        this.message.channel.send(this.client.utils.parseMessage(message));
    }

}

module.exports = Command;
