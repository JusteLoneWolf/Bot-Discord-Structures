const Event = require("../Structure/Event");
class Ready extends Event {
  constructor (client) {
    super(client, { name: "ready" });
    this.once = true
    this.client = client;
  }

  static bootstrap (client) {
    return new Ready(client);
  }

  async _status () {

    for(const activity of this.client.config.status){
      activity.option.type = Ready.getType(activity.option.type)
    }

    await this.client.user.setPresence({ activities: this.client.config.status });

  }

  async run () {
    await this._status();
  }

  static getType(type){
    switch ( type ){
      case "PLAYING":
      case '0':
        return 'PLAYING'
      case "STREAMING":
      case '1':
        return 'STREAMING'
      case "LISTENING":
      case '2':
        return 'LISTENING'
      case "WATCHING":
      case '3':
        return 'WATCHING'
      case "COMPETING":
      case '5':
        return 'COMPETING'
      default:
        return 'PLAYING'
    }
  }
}
module.exports = Ready;
