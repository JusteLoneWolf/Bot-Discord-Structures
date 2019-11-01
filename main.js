const {Client, Collection} = require('discord.js'),
    client = new Client({
        disableEveryone: true,
        fetchAllMembers: false
          disabledEvents:[
      'GUILD_UPDATE',
      'GUILD_MEMBER_UPDATE',
      'GUILD_MEMBERS_CHUNK',
      'GUILD_INTEGRATIONS_UPDATE',
      'GUILD_ROLE_CREATE',
      'GUILD_ROLE_DELETE',
      'GUILD_ROLE_UPDATE',
      'GUILD_BAN_ADD',
      'GUILD_BAN_REMOVE',
      'GUILD_EMOJIS_UPDATE',
      'CHANNEL_CREATE',
      'CHANNEL_DELETE',
      'CHANNEL_UPDATE',
      'CHANNEL_PINS_UPDATE',
      'MESSAGE_UPDATE',
      'MESSAGE_DELETE',
      'MESSAGE_DELETE_BULK',
      'MESSAGE_REACTION_ADD',
      'MESSAGE_REACTION_REMOVE',
      'MESSAGE_REACTION_REMOVE_ALL',
      'USER_UPDATE',
      'USER_SETTINGS_UPDATE',
      'PRESENCE_UPDATE',
      'TYPING_START',
      'VOICE_STATE_UPDATE',
      'VOICE_SERVER_UPDATE',
      'WEBHOOKS_UPDATE',
  ],
  messageCacheMaxSize: 20
    }),
    Enmap = require('enmap');
const {SomeError} = require('./utils/CustomError');

if(client.shard === null) throw new SomeError('Shards are not findable');
//DATABASE

const fs = require('fs');

if (!fs.existsSync('./database')) {

      fs.mkdirSync('./database');
}
if (!fs.existsSync('./database/guilddb')) {

      fs.mkdirSync('./database/guilddb');
}
client.guilddb = new Enmap({name: "guilddb", dataDir: './database/guilddb'});

//SET COLLECTION
client.commandes = new Collection();
client.aliases = new Collection();


//SET UTILS & PLUGINS
client.logger = require('./utils/logger');
client.color = require('./utils/color.js');
client.plugins = require('./plugins/index');

//OTHER UTILS
require('./utils/enmap')(client);

require('./utils/errorHandler')(client);

//SET CONFIG
client.config = require('./config');

//SEARCH COMMAND ANS MORE
require('./index.js')(client);

client.login(client.config.token);
