const mongoose = require("mongoose");
const {option} = require('../../config');
module.exports = {
    init: async () => {
        if(!option.connection) throw new Error('Connection impossible, please puts mongoDb url on config file')
        else if(option.connection !== 'none'){
            mongoose.connect(option.connection, {useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                autoIndex: false,
                poolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4});
            mongoose.Promise = global.Promise;
            await mongoose.connection.on("connected", () => Logger.info("Mongoose est connecté!"));
        }


    }
}
