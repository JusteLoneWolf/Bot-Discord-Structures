const mongoose = require("mongoose");

module.exports = {
  async init (client) {
    client.connectionMongo = mongoose.connection;
    if (!client.config.option.db)
      throw new Error("Connection a mongoDB impossible (manque l'url de connection dans le fichier option.js) veuillez verifier le fichier .env ou le README.md");
    await mongoose.connect(client.config.option.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
      poolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    mongoose.Promise = global.Promise;

    mongoose.connection.once("connected", () => {
      client.logger.info("[Mongo] Mongoose est connecté!");
      console.info("(──────────────────────)");
    });
    mongoose.connection.on("error", (err) => {
      client.logger.error("[Mongo] Une erreur es survenue!");
      client.logger.error(err);
    });

  },
};
