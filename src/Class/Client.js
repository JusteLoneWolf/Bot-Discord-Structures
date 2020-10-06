const {Client,Collection} = require('discord.js'),
    DbManager = require('../utils/DatabaseManager'),
    Logger = require('../utils/Logger'),
    Utils = require('../utils/Utils')

class StructureBot extends Client{
    constructor(option) {
        super(option.client);

        this.dbmanager = new DbManager()
        this.config = option.config
        this.logger = new Logger()
        this.utils = new Utils()

            ["command", "aliases"].forEach(x => this[x] = new Collection())

    }
    init = ()=>{
        require('../module/mongoose')

    }
    connect = () =>{

    }
    commandLoader = () =>{

    }

    eventLoader = () =>{

    }

}

module.exports = StructureBot