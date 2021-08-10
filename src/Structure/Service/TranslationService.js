const fs = require("fs/promises");

module.exports = class {
  constructor (client) {
    this.client = client;
    this.lang = this.client.opts.translateModule ? "" :"fr";
    this.language = [];
    this.languageManager = require("../../locales/index");
  }

  initLang () {
    fs.readdir("./src/locales/language").then(async (file) => {
      if (!file) throw new Error("Les langues sont introuvable");
      this.languageManager.init(this.client);
      if(this.client.opts.translateModule){
        this.language = this.client.opts.translateModule ? file.map((g) => g.split(".")[0]) : ["fr"];
        console.info("[Translation] Chargement des langue terminé");
      }

    });
  }

  setLang (lang) {
    this.lang = this.client.opts.translateModule ? lang :"fr";
  }

  getLang () {
    if(!this.client.opts.translateModule) throw new Error("Le module des langue n'est pas chargé entièrement. Merci de mettre l'option client translateModule a true ");
    return this.language;
  }

  get (term, ...args) {
    if (!this.lang)
      return "Langue introuvable/non initialisé, merci d'utilisé .setLang(lang)";
      if (!term) return "Term introuvable";
    const Lang = this.languageManager.getLocal(this.client.opts.translateModule ? this.lang :"fr");
    if(!this.client.opts.translateModule) console.warn("Le module des langue n'est pas chargé entièrement la langue par default est francais. Merci de mettre l'option client translateModule a true ");

    if (!Lang.term)
      return ( "Les terme sont introuvable dans dans le fichier de langue: " + this.client.opts.translateModule ? this.lang :"fr" );
    let value = Lang.term;
    let keys = term.split(".");
    keys.forEach((key) => {
      if (!value[key]){
        console.error(`Traduction manquante: \`${term}\`  in ${this.client.opts.translateModule ? this.lang :"fr"}`)
        return Lang.term.TraductionManage.notFound(term, this.client.opts.translateModule ? this.lang :"fr");
      }
      value = value[key];
    });
    switch (typeof value) {
      case "function":
        return value(...args);
      case "string":
        return value;
      default:
        console.error(`Traduction manquante: \`${term}\`  in ${this.client.opts.translateModule ? this.lang :"fr"}`)
        return Lang.term.TraductionManage.notFound(term, this.client.opts.translateModule ? this.lang :"fr");
    }
  }
};
