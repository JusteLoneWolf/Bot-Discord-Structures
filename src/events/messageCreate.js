const Event = require("../Structure/Event");
const CommandService = require("../Structure/Service/CommandService");

class MessageCreate extends Event {
  constructor (client) {
    super(client, { name: "messageCreate"});
    this.once = false

    this.commands = new CommandService(this.client);
  }

  static bootstrap (client) {
    return new MessageCreate(client);
  }

  async run (message) {
    if (message.author.bot || !message.channel.guild) return;
    await this.commands.handle(message);
  }
}
module.exports = MessageCreate;
