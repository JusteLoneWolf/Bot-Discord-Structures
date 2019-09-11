exports.run = async (client, message, params) => {
    let guildDb = client.guilddb.get(message.guild.id);
    if(!params[0]){
        let categorie = [];
        await client.commandes.forEach(async(c) =>{
            if (!categorie.includes(c.conf.category)){await categorie.push(c.conf.category)}
        });
        message.channel.send({
            embed:{
                color:client.color.messagecolor.novuscolor,
                title:client.user.username,
                author:{
                    name:client.user.username + " | Commands",
                    icon_url:client.user.avatarURL()
                },
                description: `${guildDb.prefix}help [command name] for more infomation `,
                fields: categorie.sort().map(c => {
                    return {
                        name: c,
                        value:client.commandes.filter((command) => command.conf.category === c ).map((command)=>  `\`${command.help.name}\``).join(', '),
                    };
                }),
            }
        })
    }else {
        let command = params[0];
        if (client.commandes.has(command)) {
            command = client.commandes.get(command);
        }else if(client.aliases.has(command)){
            command = client.commandes.get(client.aliases.get(command));
        }
        if(!command.conf) return message.channel.send('This command doesn\'t exist');
        var re = /<prefix>/gi;
        let tosend=[];
        if(command.conf.aliases.length === 0){
            tosend.push('No aliases')
        }else{
            for(var i = 0; i < command.conf.aliases.length; i++){
                let alises = `<prefix>${command.conf.aliases[i]}`;
                tosend.push(alises.replace(re, guildDb.prefix))
            }
        }
        let usage = command.help.usage;
        message.channel.send({
            embed: {
                color: 0xfa6444,
                title: `__**${command.help.name}**__`,
                description: `Syntaxe: \n[] = not required\n<> = required`,
                fields: [{
                    name: 'Description',
                    value: command.help.description
                },
                    {
                        name: 'Usage',
                        value: `${usage.replace(re, guildDb.prefix)}`
                    },
                    {
                        name: 'Aliase',
                        value: tosend.join('\n')
                    },
                ],
                thumbnail: {
                    url: client.user.avatarURL,
                },

                footer: {
                    icon_url: client.user.avatarURL,
                    text: '© ' + client.user.username+ ''
                }
            }
        }).catch(e => {
            return client.fonction.crash(message, e);

        });
    }
};
exports.conf = {
    category: 'Information',
    aliases: ['h'],
    premium: false
};

exports.help = {
    name: 'help',
    description: 'Send help page and help command.',
    usage: '<prefix>help'
};