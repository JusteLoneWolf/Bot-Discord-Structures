module.exports = async (client) => {
  require('../utils/database')(client);

  client.logger.info(`${client.user.tag} est prêt !`)
};
