const { Signale } = require('signale');

module.exports = class Logger extends Signale {
  constructor() {
    super({
      disabled: false,
      interactive: false,
      scope: 'Xtream Defender',
      logLevel: 'info',
      stream: process.stdout,
      config: {
        displayDate: true,
        displayTimestamp: true,
        displayFilename: true,
        underlineLabel: false
      },
      types: {
        system: {
          badge: '/',
          label: 'System',
          color: 'magenta'
        },
        info: {
          label: 'Info'
        },
        debug: {
          label: 'Debug'
        },
        warn: {
          label: 'Warn'
        },
        error: {
          label: 'Error'
        },
        success: {
          label: 'Success'
        },
        pending: {
          label: 'Pending'
        },
        await: {
          label: 'Awaiting'
        },
        complete: {
          label: 'Complete'
        },
        fatal: {
          label: 'Fatal'
        },
        fav: {
          label: 'Fav'
        },
        note: {
          label: 'Note'
        },
        watch: {
          label: 'Watch'
        },
      }
    });
  }
};