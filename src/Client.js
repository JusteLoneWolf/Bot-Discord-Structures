const { Client, Collection } = require("discord.js"),
    Logger = require("./utils/Logger"),
    Utils = require("./utils/utils"),
    Events = require("./utils/Manager/EventManager"),
    Translate = require("./Structure/Service/TranslationService"),
    MongoDatabase = require("./utils/Manager/MongoDatabaseManager"),
    Commands = require("./utils/Manager/CommandManager");

class StructureClient extends Client {
  constructor (otps = {
    conf:{},
    clientOption: {},
    translateModule:false,
    databaseModule:"none",
    commands:true,
    cooldownManager:true
  }) {
    super(otps.clientOption);
    this.config = otps.conf;
    this.opts = otps
    console.info(`[StructureClient] Les options client sont:
      Module de traduction: ${otps.translateModule}
      Module de base de donné: ${otps.databaseModule}
      Module de commandes: ${otps.commands}
      Module de cooldown: ${otps.cooldownManager}`)
    this.logger = new Logger();
    this.utils = new Utils();
    this.events = new Events(this);
    this.translate = new Translate(this); //required even if translateModule is false

    if(otps.commands){
      this.commands = new Commands(this);
      if(otps.cooldownManager){
        ["cooldowns"].forEach((x) => ( this[x] = new Collection() ));
      }
    }
    if(otps.databaseModule === 'mongo'){
      this.db = new MongoDatabase(this)
    }
  }

  init = async () => {
    if ( this.opts.commands ) {
      console.info("(──────────────────────)");
      console.info("[CommandManager] Chargement des commandes");
      await this.commands.loadCommands();
      this.logger.info("[CommandManager] Chargement des commandes terminé");
    }
    console.info("(──────────────────────)");
    console.info("[EventManager] Chargement des évènements");
    await this.events.loadEvent();
    this.logger.info("[EventManager] Chargement des évènements terminé");
    console.info("(──────────────────────)");
    console.info("[Translate] Chargement des traduction");
    if ( !this.opts.translateModule ) {
      console.warn("Le module de traduction est désactivé vous pourriez donc pas change de langue pour un serveur")
    }
    await this.translate.initLang();
    this.logger.info("[Translate] Chargement des traduction terminé");
    console.info("(──────────────────────)");
    if ( this.opts.databaseModule === "mongo" ) {
      console.init("[Mongo] Connection en cours");
      await require("./module/mongoose").init(this);
      console.info("(──────────────────────)");
    }
    await this.connect();
  };
  connect = () => {
    if(!this.config.token) return console.error('Aucun token')
    super.login(this.config.token).then(async () => {
      this.logger.info("     BOT CONNECTER");
      console.info("(──────────────────────)");
    }).catch((err) =>{
      if(err.message === "An invalid token was provided."){
        console.error("Mauvais token")
      }
    })
  };

}

module.exports = StructureClient;
