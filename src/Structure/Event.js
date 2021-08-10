class Event {
  constructor (client, { name = null }) {
    if (this.constructor === Event)
      throw new Error("Event class is an abstract class");
    this.client = client;
    this.name = name;
  }

  static bootstrap (client) {
    throw new Error(
        `You must create a bootstrap method into your ${this.name} event class`
    );
  }

  run (...args) {
    console.info(`${this.name} event is not implemented yet`);
  }
}
module.exports = Event;
