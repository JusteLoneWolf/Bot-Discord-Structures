const HELPER = {
    COMMANDS :{
        INFO: {
            HELP: {
                name: "help",
                description: "Envoi la page d\'aide",
                usage: `help`,
                cooldowns: 5000,
                aliases: ["h"],
                permission: "READ_MESSAGES",
                allowDMs: true,
                category: "Information",
                mention: true
            },
        },
        OWNER:{
            BAN:{
                name: "ban",
                description: "Ban un utilisateur",
                usage: `ban`,
                cooldowns: 5000,
                aliases: ["b"],
                permission: "READ_MESSAGES",
                allowDMs: true,
                category: "Owner",
                mention: true
            }
        }
    }
};

module.exports.HELPER = HELPER;
