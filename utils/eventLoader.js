const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('message', reqEvent('message'));//export event message in message.js	
  client.on('ready', () => reqEvent('ready')(client));//export event message in ready.js
};