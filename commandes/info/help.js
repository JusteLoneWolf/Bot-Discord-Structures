exports.run = (client, message, params) => {
	if(!params[0]){
          message.channel.send({
            color: "#F55404",
            embed: {

              title: `__**Help page**__`,
              description: `**${client.prefix}help [command] for more information**`,
              fields: [{
                name: "Info",
                value: `${client.commands.filter(cmd => cmd.conf.category =="info").map(c => `\`${c.help.name}\``).join(', ')}`//Put all the commands with the category 'info' in this field
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
	}else { 
        let command = params[0];
        if (client.commands.has(command)) {
          command = client.commands.get(command);
              var getvalueof;
          if (command.conf.aliases.lenght === 0 ) {

          getvalueof ="No aliases";
	  } else {
            getvalueof = `${client.prefix}${command.conf.aliases}`;
           }
          message.channel.send({
            color: "#F55404",
            embed: {

              title: `__**${command.help.name}**__`,
              description: `**${command.help.description}**`,
              fields: [{
                name: "Usage",
                value: `${client.prefix}${command.help.usage}`
              },
              {
                name: "Aliases",
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
      };
    };
exports.conf = {
  category:'info', //for help command
    aliases: ['h'], //set aliase
  };
exports.help = {
    name: "help", //name for execute this command
    description: "Send help page", //description of this command
    usage: "help [command]" //exemple usage for this command
  };
/*ALL EXPORT (export.conf and export.help) must be inside ALL commands
ALL EXPORT (export.conf and export.help) must be inside ALL commands
ALL EXPORT (export.conf and export.help) must be inside ALL commands
ALL EXPORT (export.conf and export.help) must be inside ALL commands
ALL EXPORT (export.conf and export.help) must be inside ALL commands*/

