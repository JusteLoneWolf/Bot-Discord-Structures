const DiscordBotStructure = require('./src/Class/Client')
const client = new DiscordBotStructure(require('./config'))

client.init()
