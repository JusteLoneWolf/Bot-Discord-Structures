const fs = require('fs');

module.exports = async client => {

  //LOADER ALL FILE AND COMMANDS
  fs.readdir("./command/", (err, files) => {
  if (err) client.logger.error(err);
  files.forEach(dir => {
    fs.readdir('./command/'+dir+'/', (err, file) => {
      if (err) client.logger.error(err);
      client.logger.loader(`${client.color.chalkcolor.magenta('[CATEGORY] ')} ${client.color.chalkcolor.blue(`${dir}`)} loadings...`);
      file.forEach(f => {
        const props = require(`./command/${dir}/${f}`);
        client.logger.loader(`[COMMANDE] ${client.color.chalkcolor.cyanBright(`${f}`)} is loadings`);
        client.commandes.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      });
      client.logger.loader(`${client.color.chalkcolor.magenta('[CATEGORY]')} ${client.color.chalkcolor.red('[FINISH]')} ${client.color.chalkcolor.blue(`${dir}`)} is loadings`)
    })
  });
});
//LOADER ALL EVENT
 fs.readdir("./event/", (err, files) => {
   if (err) client.logger.error(err);
   files.forEach(file => {
     const event = require(`./event/${file}`);
     let eventName = file.split(".")[0];
     client.logger.loader(`[EVENT] ${client.color.chalkcolor.green(`${eventName}.js`)} is loadings`);
     client.on(eventName, event.bind(null, client));
   });
   client.logger.loader(`[EVENT] ${client.color.chalkcolor.red('[FINISH]')} ${files.length} events loaded`)
 });

//LOADER ALL UTILS FILES
 fs.readdir('./utils/', (err, files) => {
   if (err) client.logger.error(err);
   files.forEach((f) => {
     client.logger.loader(`[UTILS] ${client.color.chalkcolor.green(f)} is loadings`);
     client[f.split('.')[0]] = require(`./utils/${f}`);
   });
   client.logger.loader(`[UTILS] ${client.color.chalkcolor.red('[FINISH]')} ${files.length} utility load`);
 });

  fs.readdir('./plugins/', (err, files) => {
    if (err) return console.log(err);
    files.forEach((f) => {
      client.logger.loader(`[PLUGINS] ${client.color.chalkcolor.green(f)} is loadings`);

    });
      let f = [];
      f.push(Object.keys(client.plugins.fonction));
      f.push(Object.keys(client.plugins.permission));
      f.push(Object.keys(client.plugins.parseUser));
      for (let i = 0; i < f.length; i++) {
        client.logger.loader(`[PLUGINS] ${client.color.chalkcolor.yellow('[FONCTION]')} ${client.color.chalkcolor.green(`${f[i]}`)} is loadings`);
      }
    client.logger.loader(`[PLUGINS] ${client.color.chalkcolor.red('[FINISH]')} ${files.length} plugins load`);
  });
};
