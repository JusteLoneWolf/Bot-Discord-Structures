const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: false,
});

const fs = require('fs');
require('dotenv').config()

require('./util/eventLoader')(client);


client.commandsinfo = new Discord.Collection();
client.aliasesinfo = new Discord.Collection();
fs.readdir('./commandes/info', (err, files) => {
  files.forEach(f => {
    const props = require(`./commandes/info/${f}`);

    client.commandsinfo.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliasesinfo.set(alias, props.help.name);
    });
  });
      console.log(`${files.length} commandes info,`);


client.commandsadmin = new Discord.Collection();
client.aliasesadmin = new Discord.Collection();
fs.readdir('./commandes/Admin', (err, files) => {
  files.forEach(f => {
    const props = require(`./commandes/Admin/${f}`);

    client.commandsadmin.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliasesadmin.set(alias, props.help.name);
    });
  });
      console.log(`${files.length} commandes admin,`);

});
});

client.login(process.env.TOKEN)
module.exports = client;
