const Command = require("../../Class/Command");
const {HELPER } = require("../../utils/CommandeHelper");

class Help extends Command{
    constructor(client){
        super(client,HELPER.COMMANDS.INFO.HELP);
        this.client = client
    }

    async run(message,args) {
        if (!args[0]) {
            const categorie = [];

            for (const c of this.client.commands.array()) {
                if (!categorie.includes(c.help.category)) {
                    categorie.push(c.help.category);
                }
            }
            await message.channel.send({
                embed: {
                    title: this.client.user.username,
                    author: {
                        name: `${this.client.user.username} | Commandes`,
                        icon_url: this.client.user.avatarURL()
                    },
                    description: `${this.client.config.prefix}help [command name] pour plus d'aide`,
                    fields: categorie.sort().map(c => {
                        return {
                            name: `❱ ${c}`,
                            value: this.client.commands.filter((command) => command.help.category === c).map((command) => `\`${command.help.name}\``).join(`, `),
                        };
                    }),
                }
            })
        } else {

            let command = args[0];
            if (this.client.commands.has(command)) {
                command = this.client.commands.get(command);
            } else if (this.client.aliases.has(command)) {
                command = this.client.commands.get(this.client.aliases.get(command));
            }
            if (!command.conf) return message.channel.send("Cette commande n'existe pas");
            let subcmdInfo = ''

            for(let test of command.help.args){
                subcmdInfo += `**Description** ${test.description}\n${test.arg}\n\n**Exemple** ${test.usage}}\n\n`
            }

            await message.channel.send({
                embed: {
                    title: `Help page of ${command.help.name}`,
                    fields: [
                        {
                            name: 'Description',
                            value: command.help.description
                        },
                        {
                            name: 'Usage',
                            value: command.help.usage
                        },
                        {
                            name: 'Aliase',
                            value: command.conf.aliases.join(', ')
                        },
                        {
                            name: 'Exemple',
                            value: command.help.exemple
                        }
                    ]

                }
            })
        }
    }
}

module.exports = Help;
