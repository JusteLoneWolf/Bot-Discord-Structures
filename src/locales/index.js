const fs = require("fs/promises");

module.exports = {
  init(client) {
    let langs = [];

    fs.readdir("./src/locales/language").then(async (file) => {
      if ( !file )
        throw new Error("[Translation] Aucun fichier de langue trouvé");
      let langinit = 0;
      if ( !client.opts.translateModule ) {
        langinit++;
        langs.push('fr');
      } else {
        for ( const lang of file ) {
          langinit++;
          langs.push(lang.split(".")[0]);
        }
      }
      console.info("[Translation] " + langinit + "/" + file.length + " langues initialisé");
      console.info("(──────────────────────)");
    });
  },


  getLocal (lang) {
    if (!lang) throw new Error("[Translation] Langue non trouve");
    return require("./language/" + lang);
  },
};
