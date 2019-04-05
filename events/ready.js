module.exports = async (client) => {
console.log(`${client.user.username} conneted`);
    client.user.setActivity(`${client.prefix}help`);
};
