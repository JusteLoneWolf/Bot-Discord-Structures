module.exports = async (client,member) => {
    console.log('1')
    client.automod.avatarcheck(member.user.avatarURL({format:'png'})).then((data)=>{
        console.log('2')

        if(data.type === 'nsfw' && data.confidence >= client.config.reliance){
            console.log('3')

            member.ban({reason:'[AUTOMOD] Image de profile NSFW'})
            client.channels.fetch(client.config.adminChan).then(()=>{
                console.log('4')

                client.channels.cache.get(client.config.adminChan).send(`Sex bot detecté\nPseudo ${member}\nID: ${member.id}\nImage: ${member.user.avatarURL({format: 'png'})} détecter a ${data.confidence}/1 considéré comme ${data.type}`)
            })
        }
    })
}
