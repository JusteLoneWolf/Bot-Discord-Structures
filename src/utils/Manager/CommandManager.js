const { resolve } = require("path");
const { Collection } = require("discord.js");
const { access, readdir, stat } = require("fs/promises");

class CommandsManager {
  constructor (client) {
    this._client = client;
    this._commands = new Collection();
    this._path = resolve(__dirname, "..", "..", "commands");
  }

  /**
   *
   * @returns {module:"discord.js".Collection<unknown, unknown>}
   */
  get commands () {
    return this._commands;
  }

  /**
   *
   * @param command
   */

  addCommand (command) {
    this._commands.set(command.help.name.toLowerCase(), command);
  }

  /**
   *
   * @param name
   * @returns {null|unknown}
   */

  findCommand (name) {
    if (!name || typeof name !== "string") return null;
    return this._commands.find((cmd) => {
      return (
          cmd.help.name.toLowerCase() === name.toLowerCase() ||
          cmd.help.aliases.map((a) => a.toLowerCase()).includes(name.toLowerCase())
      );
    });
  }

  async loadCommands () {
    try {
      await access(this._path);
    } catch (error) {
      return console.log(error);
    }

    const categories = await readdir(this._path);

    if (!categories || categories.length > 0) {
      for (const category of categories.filter(f => f.split('.')[1] !== 'js')) {
        const path = resolve(this._path, category);
        const stats = await stat(path);


        if (stats.isDirectory()) {
          const commands = await readdir(path);
          let isLoad = 0;
          if (commands && commands.length > 0) {
            for (const command of commands) {
              const cmdPath = resolve(path, command);
              const cmdStats = await stat(cmdPath);

              if (cmdStats.isFile() && command.endsWith(".js")) {
                this.addCommand(
                    require(cmdPath).bootstrap(this._client)
                );
                isLoad++;
              }
            }
            console.info(`${isLoad}/${commands.length} commandes dans le dossier ${category} chargé`);

          }else {
            console.warn(`Aucune commandes trouvé dans le dossier: ${category}`);

          }
        }else{
          console.warn(`Aucune dossier trouvé`);
        }
      }
    }
  }
}

module.exports = CommandsManager;
