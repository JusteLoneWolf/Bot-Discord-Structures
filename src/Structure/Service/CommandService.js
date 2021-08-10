const Context = require("../../commands/Context");

class CommandService {
  GuildData;
  MemberData;
  constructor (client) {
    this.client = client;
  }

  async handle (message) {
    const guild = message.guild;
    const me = guild.members.cache.get(this.client.user.id);
    let data = {};

    if (!me.hasPermission("SEND_MESSAGES")) return;
    if(this.client.opts.databaseModule !== 'none' || !this.client.opts.databaseModule){


    if(this.client.opts.databaseModule === 'mongo') {
      this.GuildData = await this.client.db.getData('Guild', {id: message.guild.id})
      this.MemberData = await this.client.db.getData('Guild', {id: message.member.id})
    }
      data.guild = this.GuildData;
      data.member = this.MemberData;
    }

    this.client.translate.setLang(data?.guild?.lang || "fr"); //required even if translateModule is false
    const prefix = ( data?.guild?.prefix || this.client.config.prefix ).toLowerCase();

    if (!message.content.toString().toLowerCase().startsWith(prefix))
      return;

    const args = message.content.slice(prefix.length).split(/ +/g).cleanArray().removeSpace();
    const command = this.client.commands.findCommand(args.shift());

    if (!command) return;

    if ( command.conf.ownerOnly && !this.client.config.owner.includes(message.author.id) ) {
      if (!command.conf.hidden)
        return message.channel.send(this.client.translate.get("messageEvent.notUse"));
      if (command.conf.disabled)
        return message.channel.send(this.client.translate.get("messageEvent.cmdDisabled"));
    }

    if ( command.conf.userPermissions.length > 0 && !command.conf.userPermissions.every((p) => guild.members.cache.get(message.author.id).hasPermission(p, {checkAdmin: true, checkOwner: true,})) ) {
      return message.channel.send(this.client.translate.get("messageEvent.userNoPerm", command.conf.userPermissions.join("`, `")));
    }
    if ( command.conf.botPermissions.length > 0 && !command.conf.botPermissions.every((p) => guild.members.cache.get(this.client.user.id).hasPermission(p, {checkAdmin: true, checkOwner: true,})) ) {
      return message.channel.send(this.client.translate.get("messageEvent.userNoPerm", command.conf.userPermissions.join("`, `")));
    }

    if(this.client.opts.cooldownManager){
      const cooldownLeft = await command.cooldownInfo(message.author);
      if (cooldownLeft.status)
        return message.reply(this.client.translate.get("messageEvent.cdwOn", ( cooldownLeft.time / 1000 ).toFixed(0)));
    }

    const ctx = new Context(this.client, message, args, data);

    try {
      await command.run(ctx);
    } catch (error) {
      this.client.logger.error(error);
    }
  }
}

module.exports = CommandService;
