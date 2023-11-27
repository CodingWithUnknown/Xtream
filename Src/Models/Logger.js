const colors = require('colors');
const moment = require('moment');

module.exports = class Logger {
  static log(content, type = 'log') {
    let date = `${moment().format('DD-MM-YYYY hh:mm:ss')}`;
    switch (type) {
      case 'log': {
        return console.log(`[${colors.gray(date)}]: [${colors.blue(type.charAt(0).toUpperCase() + type.slice(1))}] ${colors.blue(content)}`);
      }
      case 'warn': {
        return console.log(`[${colors.gray(date)}]: [${colors.yellow(type.charAt(0).toUpperCase() + type.slice(1))}] ${colors.blue(content)}`);
      }
      case 'debug': {
        return console.log(`[${colors.gray(date)}]: [${colors.blue(type.charAt(0).toUpperCase() + type.slice(1))}] ${colors.blue(content)}`);
      }
      case 'ready': {
        return console.log(`[${colors.gray(date)}]: [${colors.green(type.charAt(0).toUpperCase() + type.slice(1))}] ${colors.blue(content)}`);
      }
      case 'event': {
        return console.log(`[${colors.gray(date)}]: [${colors.yellow(type.charAt(0).toUpperCase() + type.slice(1))}] ${colors.blue(content)}`);
      }
      case 'system': {
        return console.log(`[${colors.gray(date)}]: [${colors.magenta(type.charAt(0).toUpperCase() + type.slice(1))}] ${colors.blue(content)}`);
      }
      case 'error': {
        return console.log(`[${colors.gray(date)}]: [${colors.red(type.charAt(0).toUpperCase() + type.slice(1))}] ${colors.gray(content)}`);
      }
      default:
        throw new TypeError('Logger type must be either log, warn, debug, ready, event, system or error.');
    }
  }
};