const chalk = require("chalk");

class Logger {
  constructor () {}

  info (content) {
    return console.info(`${chalk.bgBlack.green(content)}`);
  }

  error (content) {
    return console.error(`${chalk.bgBlack.red(content)}`);
  }
}

module.exports = Logger;
