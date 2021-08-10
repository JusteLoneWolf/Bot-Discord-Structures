const { resolve } = require("path");
const { Collection } = require("discord.js");
const { access, readdir, stat } = require("fs/promises");

const path = require("path");

class EventsManager {
  constructor (client) {
    this._client = client;
    this._events = new Collection();
    this._path = resolve(__dirname, "..", "..", "events");
  }

  get events () {
    return this._events;
  }

  addEvent (event) {
    this._events.set(event.name.toLowerCase(), event);
    this._client.on(event.name, event.run.bind(event));
    delete require.cache[
        require.resolve(this._path + path.sep + event.name)
        ];
  }

  findEvent (name) {
    if (!name || typeof name !== "string") return null;
    return this._events.get(name.toLowerCase());
  }

  async loadEvent () {
    try {
      await access(this._path);
    } catch (error) {
      return;
    }

    const events = await readdir(this._path);

    if (events && events.length > 0) {
      let isLoad = 0;

      for (const event of events) {
        const path = resolve(this._path, event);
        const stats = await stat(path);

        if (
            event !== "Event.js" &&
            stats.isFile() &&
            event.endsWith(".js")
        ) {
          this.addEvent(require(path).bootstrap(this._client));
          isLoad++;
        }
      }
      console.info(`${isLoad}/${events.length} évent chargé`);
    }
  }
}
module.exports = EventsManager;
