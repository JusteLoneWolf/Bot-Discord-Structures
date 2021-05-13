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
        token:'Nzc2NDg4NjU2MDg4MjAzMjg1.X61nag.1_d2_9uC6gc9AWW5U-3AidIY3xs',
        prefix:'!',
        owner:["571726302441111552", // boubou
            "676055540786266164", //Zinka
            "757699610264469505", //Neko Girl
            "416969081355370523", //panda
            "236627494764150784", // zechaos
            "698525430944366642",// stellario
        ],
        channels:["800033159739342848", // general
            "800033532696330241", //media
            "800033595254898721", //libre rp
            "800033621883748353", //creation
            "800033888591806506", //commande musique
            "801439479860297798", // Question
            "800390235430584400" // no micro
        ],
        adminChan: "800030082303131708",
        reliance:0.8
    }

}
