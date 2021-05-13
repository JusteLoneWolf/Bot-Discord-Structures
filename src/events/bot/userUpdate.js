module.exports = async (client,Ouser,Nuser) => {
    if(Nuser.avatarURL({format:'png'}) !== Ouser.avatarURL({format:'png'})){
        client.automod.avatarcheck(Nuser.avatarURL({format:'png'})).then((data)=>{
            if(data.type === 'nsfw' && data.confidence >= client.config.reliance){
                client.guilds.cache.get('774493744829169675').members.fetch(Nuser.id)
                const Nmember = client.guilds.cache.get('774493744829169675').members.cache.get(Nuser.id)
                Nmember.ban({reason:'[AUTOMOD] Image de profile NSFW'})
                client.channels.fetch(client.config.adminChan).then(()=>{
                    client.channels.cache.get(client.config.adminChan).send(`Un utilisateur a change ca photo de profile et a etais détecté comme NSFW \nPseudo ${Nuser}\nID: ${Nuser.id}\nImage: ${Nuser.avatarURL({format: 'png'})} détecter a ${data.confidence}/1 considéré comme ${data.type}\n Pour le bannir merci de faire \`!ban ${Nuser} | ${Nuser.id} | ${Nuser.username}\``)
                })
            }
        })
    }

}
