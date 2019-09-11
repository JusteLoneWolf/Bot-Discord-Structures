const {Client, Collection} = require('discord.js'),
    client = new Client({
        disableEveryone: true,
        fetchAllMembers: false
    }),
    Enmap = require('enmap');
const {SomeError} = require('./utils/CustomError');

if(client.shard === null) throw new SomeError('Shards are not findable');
//DATABASE
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
