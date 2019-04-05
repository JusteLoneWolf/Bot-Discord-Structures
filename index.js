const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: false,
});
const fs = require("fs");
client.prefix = "/"; //change your prefix
require("./utils/eventLoader")(client);//export event
    
client.commands = new Discord.Collection();//create colection
client.aliases= new Discord.Collection();//create colection
fs.readdir("./commandes/info", (err, files) => {
  files.forEach((f) => {
    const props = require(`./commandes/info/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
fs.readdir("./commandes/fun", (err, files) => {       //copy this to each new folder
  files.forEach((f) => {                                //copy this to each new folder
    const props = require(`./commandes/fun/${f}`);    //copy this to each new folder
    client.commands.set(props.help.name, props);      //copy this to each new folder
    props.conf.aliases.forEach((alias) => {             //copy this to each new folder
      client.aliases.set(alias, props.help.name);     //copy this to each new folder
    });                                               //copy this to each new folder
  });                                                 //copy this to each new folder
});                                                   //copy this to each new folder
client.login(client.token);//change token bot
