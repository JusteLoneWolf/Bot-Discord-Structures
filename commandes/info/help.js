const Discord = require("discord.js");
const fs = require ("fs")
exports.run = async (client, message, params) => {

  let prefix = prefixes[message.guild.id].prefixes;

    if (!params[0]) {
fs.readdir('./commandes/info', (err, filesi) => {
fs.readdir('./commandes/Admin', (err, filesa) => {
        var embed = new Discord.RichEmbed()
            .setColor(0x0a5870)
            .setTitle(`${client.user.username}` )
            .setDescription(`**${prefix}help [command] for more information**\nCommand Numbers: **${filesa.length+++filesi.length}**`)
            .addField(`:satellite: Informations (${filesi.length-1})`, `${client.commandsinfo.map(c => `\`${c.help.name}\``).join(', ')}`, false)
            .addField(`:tools: Admin (${filesa.length-1})`, `${client.commandsadmin.map(c => `\`${c.help.name}\``).join(', ')}`, false)
            .setThumbnail(client.user.avatarURL)
            .setFooter("© " + client.user.username+ "", client.user.avatarURL)
        message.channel.send(embed);
}) ;
}) ;

    }else {
          let command = params[0];
          if (client.commandsinfo.has(command)) {
            command = client.commandsinfo.get(command);
                var getvalueof;
                if (command.conf.aliases.lenght === 0 ) {
                getvalueof ="Pas d'aliase";
      	  } else {
                  getvalueof = `${client.prefix}${command.conf.aliases}`;
                 }
            message.channel.send({
              color: 0x0a5870,
              embed: {

                title: `__**${command.help.name}**__`,
                description: `**${command.help.description}**`,
                fields: [{
                  name: "Usage",
                  value: `${prefix}${command.help.usage}`
                },
                {
                  name: "Aliase",
                  value: getvalueof
                },
                ],
                thumbnail: {
                  url: client.user.avatarURL,
                },

                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© " + client.user.username+ ""
                }
              }
            });
          }
          else {
          let command = params[0];
          if (client.commandsadmin.has(command)) {
            command = client.commandsadmin.get(command);
            var getvalueof;
            if (command.conf.aliases.lenght === 0 ) {
            getvalueof ="Pas d'aliase";
  	  } else {
              getvalueof = `${client.prefix}${command.conf.aliases}`;
             }}
            message.channel.send({
              color: 0x0a5870,
              embed: {

                title: `__**${command.help.name}**__`,
                description: `**${command.help.description}**`,
                fields: [{
                  name: "Usage",
                  value: `${prefix}${command.help.usage}`
                },
                {
                  name: "Aliase",
                  value: getvalueof
                },
                ],
                thumbnail: {
                  url: client.user.avatarURL,
                },

                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© " + client.user.username+ ""
                }
              }
            });
          }
          }
        }
      }
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h'],
  };
exports.help = {
    name: "help",
    description: "Send help page",
    usage: "help"
}
