const Event = require("../Structure/Event");
class Ready extends Event {
  constructor (client) {
    super(client, { name: "ready" });
    this.client = client;
  }

  static bootstrap (client) {
    return new Ready(client);
  }

  async _status () {
    await this.client.user.setActivity(`${this.client.config.status.name}`, {
          type:Ready.getType(this.client.config.status.option.type),
          url:this.client.config.status.option.url
        });

  }

  async run () {
    await this._status();
  }

  static getType(type){
    switch ( type ){
      case "PLAYING":
      case 0:
        return 0
      case "STREAMING":
      case 1:
        return 1
      case "LISTENING":
      case 2:
        return 2
      case "WATCHING":
      case 3:
        return 3
      case "COMPETING":
      case 5:
        return 5
      default:
        return 0
    }
  }
}
module.exports = Ready;
