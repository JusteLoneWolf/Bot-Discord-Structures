module.exports = message => {
  if (message.author.bot) return;
    const client = message.client;

      if(!message.content.startsWith(client.prefix)) return;

      const command = message.content.split(' ')[0].slice(client.prefix.length);
  const params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, params);
    }
}