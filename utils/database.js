module.exports = client => {
client.guilds.forEach((g) => {
  if(!client.guilddb.get(g.id)){
    let defaut = {
      _id: g.id,
      name: g.name,
      prefix:client.config.prefix,
    };
    client.guilddb.set(g.id,defaut);
    client.logger.database(`${g.name} is registered is database`)
  }
});
};
