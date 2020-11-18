const {Intents} = require('discord.js')

    module.exports= {
    client:{
        ws:{ intent:Intents.ALL},
        disableMentions: 'all',
        messageCacheMaxSize: 100,
        messageSweepInterval: 120,
    },
    option:{
        connection:'none',
        token:'',
        prefix:'!',
        owner:[]
    }

}
