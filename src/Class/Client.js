const {Client,Collection} = require('discord.js'),
    {readdir} = require("fs"),
    DbManager = require('../utils/DatabaseManager'),
    Logger = require('../utils/Logger'),
    Utils = require('../utils/Utils')

class StructureBot extends Client{
    constructor(config) {
        super(config.client);
        ["commands", "aliases","cooldowns"].forEach(x => this[x] = new Collection())
        this.dbmanager = new DbManager()
        this.config = config.option
        this.logger = new Logger()
        this.utils = new Utils()

    }
    init= () =>{
        //require('../module/mongoose').init()
        this.commandLoader()
        this.eventLoader()
        this.connect()

    }
    connect = () =>{
        super.login(this.config.token)
    }
    commandLoader = () =>{
        console.log("ttest")
        readdir("./src/commands/", (err, files) => {
            if (err) this.emit("error", err);
            for (const dir of files) {
                readdir(`./src/commands/${dir}/`, (err, commands) => {
                    if (err) this.emit("error", err);
                    for (const com of commands) {
                        try {
                            if (!com) return;
                            const command = new (require(`../commands/${dir}/${com}`))(this);
                            this.commands.set(command.help.name, command);
                            command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
                            this.logger.info(`[Client] ${com} load`)
                        } catch (e) {
                            this.emit("error", `[Client] ${com} not loaded ${e.message}`)
                        }
                    }

                })
            }
        });
    }

    eventLoader = () =>{
        readdir("./src/events", (err, files) => {
            if (!files) return;
            if (err) this.emit("error", err);
            for (const dir of files) {
                readdir(`./src/events/${dir}`, (err, file) => {
                    if (!file) return;
                    if (err) this.emit("error", err);
                    for (const evt of file) {
                        try {
                            if (!evt) return;
                            const event =require(`../events/${dir}/${evt}`);
                            this.logger.info(`[Client] ${evt} load`);
                            super.on(evt.split(".")[0], event.bind(null, this));
                        } catch (e) {
                            this.emit("error", `[Client] ${evt} not loaded ${e.stack}`)
                        }
                    }
                })
            }
        });
    }

}

module.exports = StructureBot
