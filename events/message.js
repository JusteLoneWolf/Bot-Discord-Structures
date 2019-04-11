
const Discord = require('discord.js');

module.exports = message => {
  if (message.author.bot) return;
  if(message.channel.type === "dm") return;;
  const client = message.client;

  if (!message.content.startsWith(prefix)) return;

  const command = message.content.split(' ')[0].slice(prefix.length);
  const params = message.content.split(' ').slice(1);
   let cmd;

  if (client.commandsinfo.has(command)) {
    cmd = client.commandsinfo.get(command);
  } else if (client.aliasesinfo.has(command)) {
    cmd = client.commandsinfo.get(client.aliasesinfo.get(command));
  }
  if (client.commandsadmin.has(command)) {
    cmd = client.commandsadmin.get(command);
  } else if (client.aliasesadmin.has(command)) {
    cmd = client.commandsadmin.get(client.aliasesadmin.get(command));
  }
 try {

    cmd.run(client, message, params);
  } catch (e) {
    if (!cmd) {
      return;
    }else {
   message.channel.send(`Error ${e.message}`)  }} finally {
    if (!cmd) {
      return;
    } else {
          }
  }
};
