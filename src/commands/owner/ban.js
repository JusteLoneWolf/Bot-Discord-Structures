const Command = require("../../Class/Command"),
    {
        HELPER
    } = require("../../utils/CommandeHelper");
class Ban extends Command {
    constructor(client) {
        super(client, HELPER.COMMANDS.OWNER.BAN);
        this.client = client;
    };

    async run(message, args) {
        const stringSimilarity = require("string-similarity");


        const users = []
        message.guild.members.cache.forEach(u => users.push(u.user.username))
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
        if(!member){
            const matches = stringSimilarity.findBestMatch(args[0], users);
            member = message.guild.members.cache.find( u => u.user.username === matches.bestMatch.target)
        }

        if(!member) return message.channel.send('Impossible de trouve l\'utilisateur')
        await member.ban().then(() =>{
            message.channel.send(`${member.user.username} a était ban`)
        })
    };

}
module.exports = Ban ;
