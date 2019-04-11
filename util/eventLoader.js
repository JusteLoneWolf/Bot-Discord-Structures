const reqEvent = (event) => require(`../events/${event}`);
module.exports = async client => {

  await client.on('ready', () => reqEvent('ready')(client));
await  client.on('message', reqEvent('message'));
await  client.on('reconnecting', () => reqEvent('reconnecting')(client));
 await client.on('disconnect', () => reqEvent('disconnect')(client));
};
