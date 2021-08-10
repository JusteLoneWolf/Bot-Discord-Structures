const Akina = require("./src/Client");
const client = new Akina({
  conf: require('./config.js.exemple'),
  translateModule:false,
  databaseModule:'none',
  commands:true,
  cooldownManager:false,
});
new (require("cat-loggr"))().setGlobal();
client.init();
require('./src/utils/prototype')

