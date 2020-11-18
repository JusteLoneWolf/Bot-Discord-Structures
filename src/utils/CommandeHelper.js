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
        }
    }
};

module.exports.HELPER = HELPER;
