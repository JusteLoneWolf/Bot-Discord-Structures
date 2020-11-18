function checkuser(client, message, user) {

        if (!user) {
         throw client.plugins.fonction.sendEmbed(message,'You must mention a user !')
        }
        if (user.id === message.author.id) {
            throw client.plugins.fonction.sendEmbed(message,'You can not do that on yourself')
        }
        if (user.id === message.guild.owner.user.id) {
            throw client.plugins.fonction.sendEmbed(message,'You can not do this to the server owner!')
        }
    let members = message.guild.member(user);
        if (message.author.id === message.guild.owner.user.id) {
        } else {
            if (members.highestRole.position >= message.guild.member(message.member).highestRole.position) {
                throw client.plugins.fonction.sendEmbed(message,'The targeted member has a position more or equal to yours at the role level. Please check the height of your role and try again if the problem persists please contact the developer.')
            }
            if (!members.bannable) {
                throw client.plugins.fonction.sendEmbed(message,'I can not do it on him or the person to mention is the owner of the server or he has the same role as me!')
            }
        }
        return members
}

module.exports = {
    checkuser
};