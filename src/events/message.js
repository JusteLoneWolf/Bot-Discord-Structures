const Event = require("../Structure/Event");
const CommandService = require("../Structure/Service/CommandService");

class Message extends Event {
  constructor (client) {
    super(client, { name: "message" });
    this.commands = new CommandService(this.client);
  }

  static bootstrap (client) {
    return new Message(client);
  }

  async run (message) {
    if (message.author.bot || !message.channel.guild) return;
    await this.commands.handle(message);
  }
}
module.exports = Message;
