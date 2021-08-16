try {
  let config  = require('./config.js')
  const StructureBot = require("./src/Client");
  const client = new StructureBot({
    conf: config.option,
    clientOption:config.clientOption,
    translateModule:false,
    databaseModule:'none',
    commands:true,
    cooldownManager:true,
  });
  new (require("cat-loggr"))().setGlobal();
  client.init();
  require('./src/utils/prototype')
}catch ( e ) {
  console.error( 'Fichier non trouvé' )
}
