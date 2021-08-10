const StructureBot = require("./src/Client");
const client = new StructureBot({
  conf: require('./config.js.exemple').option,
  clientOption:require('./config.js.exemple').clientOption,
  translateModule:false,
  databaseModule:'none',
  commands:true,
  cooldownManager:false,
});
new (require("cat-loggr"))().setGlobal();
client.init();
require('./src/utils/prototype')

