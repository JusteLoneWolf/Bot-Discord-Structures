

const NSFAI = require('nsfai');
const fs =require('fs')

module.exports = class {
    constructor(client) {
        this.client = client;
        this.key = "d133e3d6886843d18ce8229579932f38"

    }
    init(){
        this.client.logger.info(`[NSFWIA] Ready`)
    }

    checkword(str) {
        return new Promise((resolve, reject) => {
            fs.readFile('./assets/database/badwords.json', 'utf8', async (err, data) => {
                const banword = JSON.parse(data);
                for(const wrd of banword){
                    if(str === wrd){
                        resolve({detect : true,wrd})
                    }
                }
                resolve(false)
            })
        })

    }

    makePredict(url){
        const nsfai = new NSFAI(this.key)
        return new Promise((resolve, reject) => {
            nsfai.predict(url).then((res)=>{
                if (res.sfw) {
                    resolve( {type: 'sfw',confidence: res.confidence})
                } else {
                    resolve ({type: 'nsfw',confidence: res.confidence})

                }
            }).catch(this.handleError); // URL

        })
    }

    handleError(error) {
        console.error(error);
    }

}
