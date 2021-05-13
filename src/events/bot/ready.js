module.exports =  async (client) => {
    await client.user.setPresence({
        activity: {
            name: `les membres et ban les bots`,
            type: "LISTENING"
        }
    }).then(() => client.logger.info('Status set !'));

    client.logger.info(`${client.user.username} pret`);
    await client.guilds.cache.get('774493744829169675').leave()
};
