const { Collection } = require("discord.js");

class Command {
  constructor (client, options) {
    this.opts = client.opts
    this.help = {
      name: options.name || "Pas de nom",
      description: options.description || "Pas de description",
      usage: options.usage || "Pas d'usage",
      aliases: options.aliases || ["Aucun aliases"],
      category: options.category || "Pas de catégorie",
      cooldowns: options.cooldowns || 1000,
      exemple: options.exemple || "Pas d'exemple",
      subCommands: options.subCommands || [],
      args: options.args || [],
    };
    this.conf = {
      botPermissions: options.botPermissions || [],
      userPermissions: options.userPermissions || [],
      disabled: options.disabled || false,
      ownerOnly: options.ownerOnly || false,
      hidden: options.hidden || false,
    };
    this._dataCooldown = new Collection();
  }

  static bootstrap (client) {
    throw new Error(
        `You must create a bootstrap method into your ${this.name} command class`
    );
  }

  findMembers (ctx) {
    return new Promise((resolve, reject) => {
      const query = ctx.args.join(" ");
      if (!query) return resolve(ctx.member.user);

      const mention = new RegExp(/<@!|<@/g);
      if (mention.test(query))
        return resolve(
            ctx.guild.members.cache.get(query.replace(/<@!|<@|>/g, "")).user
        );

      const matche = ctx.guild.members.cache.filter(
          (x) =>
              x.user.username.toLowerCase().includes(query) ||
              x.user.discriminator.includes(query) ||
              x.user.id === query
      ).map((x) => x.user);

      if (matche.length === 1) return resolve(matche[0]);
      else if (matche.length > 1) {
        ctx.send({
          embed: {
            color: 0x2f3136,
            author: {
              name: ctx.author.tag,
              icon_url: ctx.author.displayAvatarURL({
                dynamic: true,
              }),
            },
            title: "Selected a member with the number associated with his nickname",
            description: `${matche.slice(0, 5).map((u, i) => `[${i + 1}] ◉ ${u.tag}`).join("\n")}\n\n${
                matche.length > 5
                    ? `and ${matche.length - 5} more...`
                    : ""
            }`,
            timestamp: new Date(),
            footer: {
              text: `${ctx.client.user.username} : You have 30 seconds to make your choice`,
              iconURL: ctx.client.user.avatarURL(),
            },
          },
        });
        ctx.channel.awaitMessages((x) => x.author.id === ctx.author.id, {
          max: 1,
          time: 30000,
        }).then((collect) => {
          if (collect.size === 0)
            return ctx.send(
                "No answer after 30 seconds, operation canceled."
            );

          if (!isNaN(collect.first().content) &&
              collect.first().content <= 5 &&
              collect.first().content > 0) {
            return resolve(matche[collect.first().content - 1]);
          } else return ctx.send("The request selection is invalid");
        }).catch((err) => {
          ctx.send("Internal Error");
          reject(new Error(err));
        });
      }
    });
  }

  cooldownInfo (user) {
    if(!this.opts.cooldownManager) return
    let now = Date.now();
    if (!this._dataCooldown.has(this.name))
      this._dataCooldown.set(this.name, new Collection());
    const timestamp = this._dataCooldown.get(this.name).get(user.id);
    if (timestamp > now) return { status: true, time: timestamp - now };
    else {
      this._dataCooldown.get(this.name).set(user.id, now + this.help.cooldowns);
      return { status: false };
    }
  }

  _sweep () {
    for (const [key, value] of this._dataCooldown) {
      this._dataCooldown.set(
          key,
          value.filter((x) => x > Date.now())
      );
    }
  }

  millisToMinutesAndSeconds (millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ( ( millis % 60000 ) / 1000 ).toFixed(0);
    return minutes + ":" + ( seconds < 10 ? "0" : "" ) + seconds;
  }

  hasPermission (ctx, command) {
    if (command.conf.ownerOnly &&
        !ctx.client.config.owner.includes(ctx.author.id))
      return false;
    return !( command.conf.userPermissions.length > 0 && !command.conf.userPermissions.every((p) => ctx.member.hasPermission(p))
    );
  }
}

module.exports = Command;
