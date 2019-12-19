const axios = require('axios');
const chalk = require('chalk');
const error = require('./utils/CheweybotError');
const settings = {
    token: "",
    active: false
};
var data
module.exports.login =(ApiToken,lib)=>{
    if (settings.active){
        return new Promise((resolve, reject) => {
            throw reject('The API is already initialized')
        })
    }else if (typeof ApiToken == "string") {
        settings.token = ApiToken;
        return new Promise(async (resolve, reject) => {
            await axios.get(`https://api.chewey-bot.ga/endpoints`, {headers: {"Authorization":ApiToken}}).then(() => {
                settings.active = true
            }).catch((error) => {
                reject(error)
            })
        })
    } else {
        reject( new error.MissingTokenError('Token must be a string or not specified'))
    }
    if(lib){
        init(lib)
    }

};

module.exports.image ={
    async get(endpoint,token) {
        return new Promise(async (resolve, reject) => {
            if (!settings.token && !token|| token && typeof token !== 'string') {
                throw new error.MissingTokenError('Token must be a string or not specified')
            }
            if(!endpoint){
                reject(  new error.NoEndpointSpecified('No endpoint specified'))
            }
            await axios.get(`https://api.chewey-bot.ga/${endpoint}`, {headers: {"Authorization": token ? token : settings.token}}).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                if (err.response.status === 404) {
                    reject( new error.NoEndpointFind('No endpoint find'))
                } else if(token || settings.token) {
                    if(err.response.status === 403) {
                        reject( new error.IncorrectLogin('Incorrect token provided'))
                    }
                }else{
                    reject(`${chalk.blue('[CheWeyBot-Wrapper]')} ${chalk.red('[Error]')} Internal error: ${error.toString()} with error code ${error.response.status}`);
                }
            })
        })
    }
};


module.exports.mc = async (ip,token) =>{
    return new Promise(async (resolve, reject) => {
        if (!settings.token && !token|| token && typeof token !== 'string') {
            reject( new error.MissingTokenError('Token must be a string or not specified'))
        }
        if(!ip){
            reject( new error.NoIPSpecified('No ip specified'))
        }
        await axios.get(`https://api.chewey-bot.ga/mcap/server/${ip}`, {headers: {"Authorization": token ? token : settings.token}}).then((res) => {
            resolve(res.data)
        }).catch(err => {
             if(token || settings.token) {
                if(err.response.status === 403) {
                    reject( new error.IncorrectLogin('Incorrect token provided'))
                }
            }else{
                reject(`${chalk.blue('[CheWeyBot-Wrapper]')} ${chalk.red('[Error]')} Internal error: ${error.toString()} with error code ${error.response.status}`);
            }
        })
    })
};

module.exports.analystics = {
    init,
    start,
    stop
}

function start() {
    if(data.running === false){
        autoloader(data.lib)
    }else{
        console.log('[CheWeyBot-Wrapper] [Analystics] Analystics is already started')
    }
}
function stop() {
        if(data.running === true){
            stopautoloader(data.lib)
        }else{
            console.log('[CheWeyBot-Wrapper] [Analystics] Analystics is not started')
        }
}

function init(lib,id,token) {
    if (lib != null) {
        return new Promise(async (resolve, reject) => {
            if (!settings.token && !token) {
                reject(new error.MissingTokenError('Token must be a string or not specified'))
            }
            if (!lib) {
                reject(new error.NoLibSpecified('Lib not specified'))
            }
            if(!id){
                reject(new error.NoIDSpecified('Missing owner id'))
            }
            if(token){
                settings.token = token
            }
                 data = {
                owner: id,
                    lib: lib,
                    running: true,
                    sent_messages: 0,
                    received_messages: 0
                };
                CollectMessage();
        })
    }
}

function CollectMessage() {
    return new Promise(async (resolve, reject) => {
        if (data.lib != null) {
            if (data.lib.user === null) {
                data.lib.on("ready", () => {
                        console.log('[CheWeyBot-Wrapper] [Analystics] Ready');
                        autoloader();
                        resolve(sender(MakeData()))
                })
            } else {
                    console.log('[CheWeyBot-Wrapper] [Analystics] Ready');
                    autoloader();
                    resolve(sender(MakeData()))
            }

            data.lib.on("messageCreate", (msg) => {
                data.received_messages++;
                if (msg.author.id === data.lib.user.id) {
                    data.sent_messages++;
                }
            });

            data.lib.on("message", (msg) => {
                data.received_messages++;
                if (msg.author.id === data.lib.user.id) {
                    data.sent_messages++;
                }
            })

        }
    })
}
function autoloader() {
        if (data.lib && !data.interval) {
            data.interval = setInterval(() => {
                resolve(sender(MakeData())).then(() => {}, () => {})
            }, 10.1 * 60 * 1000);
            console.log('[CheWeyBot-Wrapper] [Analystics] Autoload has been started')
        } else {
            console.log('[CheWeyBot-Wrapper] [Analystics] Analystics is not initialized')
        }
}

function stopautoloader() {
    if(data.interval){
        clearInterval(data.interval);
        delete data.interval;
        console.log('[CheWeyBot-Wrapper] [Analystics] Autoload has been stop')
    } else {
        console.log('[CheWeyBot-Wrapper] [Analystics] Autoload is not initialized')
    }
}

function MakeData(){
    console.log('[CheWeyBot-Wrapper] [Analystics] Collecting Data...')
        let channelCount = data.lib.channelGuildMap ? Object.keys(data.lib.channelGuildMap).length : data.lib.channels.size
    return {
            servers: data.lib.guilds.size,
            users: data.lib.users.size,
            channels: channelCount,
            sent_messages: data.sent_messages,
            received_messages: data.received_messages,
            ram_used: process.memoryUsage().heapUsed
        }
}

function sender(send) {
    return new Promise(async (resolve, reject) => {
        let content = JSON.stringify(send);
        console.log('[CheWeyBot-Wrapper] [Analystics] Send Data...')
        axios.post('https://api.chewey-bot.ga/analytics/post', content, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': content.length,
                'Authorization': settings.token
            }
        }).then((res) => {
            res.data.url = `https://cheweyz.github.io/discord-bot-analytics-dash/index.html?id=${data.owner}`
            console.log(`[CheWeyBot-Wrapper] [Analystics] Post done !\n${res.data.url}`);
        }).catch(err => {
            if (settings.token) {
                if (err.response.status === 403) {
                    return console.error(new error.IncorrectLogin('Incorrect token provided'))
                }else if(err.response.status === 429){
                   return console.error('[CheWeyBot-Wrapper] [Analystics] Error: Too many request HTTPError: 429')
                }
            }
            reject(`[CheWeyBot-Wrapper] [Analystics] ERROR: ${err}`)
        })
    })
}