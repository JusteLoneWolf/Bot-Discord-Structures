function check(client, message, perms) {
    if(!perms) throw new TypeError('No permission given !');
        if (!message.member.hasPermission(perms)) {
            throw client.plugins.fonction.sendEmbed(message, `You don't have permission \`${perms}\` !`)
        }
        if (!message.channel.permissionsFor(client.user).has(perms)) {
            throw client.plugins.fonction.sendEmbed(message, `I don't have permission \`${perms}\` !`)
        }
}

module.exports ={
    check
};