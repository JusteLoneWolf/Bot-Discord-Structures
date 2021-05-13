class Automod{
    constructor(client) {
        this.client = client
    }
    word(message){
        this.client.nsfwia.checkword(message.content).then((res)=>{
            if(res.detect){
                const member = message.guild.member.cache.get(message.author)
                if(res.detect){
                    this.client.nsfwia.makePredict(message.author.avatarURL({format: 'png'})).then((ia) =>{
                        this.client.channels.fetch(this.client.config.adminChan).then(()=>{
                            this.client.channels.cache.get(this.client.config.adminChan).send(`Sex bot detecté dans ${message.channel} 
                                \nPseudo ${message.author}
                                \nID: ${message.author.id}\nMot: ${message.content} => ${res.wrd} 
                                \nImage: ${message.author.avatarURL({format: 'png'})} détecter a ${ia.confidence}/1 considéré comme ${ia.type} 
                                \nPour le bannir merci de faire \`!ban ${message.author.id}\``)
                            if(ia.confidence >= 0.9) {
                                member.ban({reason: "[AUTOMOD] Bad word: " + res.wrd}).then(() => {
                                    this.client.channels.cache.get(this.client.config.adminChan).send(`J'ai banni ${message.author.username}`)
                                })
                            }
                        })
                    })
                }

            }
        })
    }
    avatarcheck(url){
        return new Promise((resolve, reject) => {
            this.client.nsfwia.makePredict(url).then((res)=>{
                resolve(res)
            }).catch((err)=>{
                reject(err)
            })

        })
    }
}
module.exports = Automod
