const chalk = require('chalk');
const moment = require('moment');

module.exports = class Logger {
  static log(content, type = 'log') {
    let date = `${moment().format('DD-MM-YYYY hh:mm:ss')}`;
    switch (type) {
      case 'log': {
        return console.log(`[${chalk.gray(date)}]: [${chalk.blue(type.charAt(0).toUpperCase() + type.slice(1))}] ${chalk.blue(content)}`);
      }
      case 'warn': {
        return console.log(`[${chalk.gray(date)}]: [${chalk.yellow(type.charAt(0).toUpperCase() + type.slice(1))}] ${chalk.blue(content)}`);
      }
      case 'debug': {
        return console.log(`[${chalk.gray(date)}]: [${chalk.blue(type.charAt(0).toUpperCase() + type.slice(1))}] ${chalk.blue(content)}`);
      }
      case 'ready': {
        return console.log(`[${chalk.gray(date)}]: [${chalk.green(type.charAt(0).toUpperCase() + type.slice(1))}] ${chalk.blue(content)}`);
      }
      case 'event': {
        return console.log(`[${chalk.gray(date)}]: [${chalk.green(type.charAt(0).toUpperCase() + type.slice(1))}] ${chalk.blue(content)}`);
      }
      case 'cmd': {
        return console.log(`[${chalk.gray(date)}]: [${chalk.green(type.charAt(0).toUpperCase() + type.slice(1))}] ${chalk.blue(content)}`);
      }
      case 'system': {
        return console.log(`[${chalk.gray(date)}]: [${chalk.magenta(type.charAt(0).toUpperCase() + type.slice(1))}] ${chalk.blue(content)}`);
      }
      case 'error': {
        return console.log(`[${chalk.gray(date)}]: [${chalk.red(type.charAt(0).toUpperCase() + type.slice(1))}] ${chalk.gray(content)}`);
      }
      default:
        throw new TypeError('Logger type must be either log, warn, debug, ready, event, cmd, system or error.');
    }
  }
};