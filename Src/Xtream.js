const { Client, GatewayIntentBits, Partials, Collection, Routes, REST } = require('discord.js');
const { connect } = require('mongoose');
const { readdirSync } = require('fs');
const { join } = require('path');
const { Shoukaku, Connectors } = require('shoukaku');
const { AuthenticationError } = require('openai');

class Xtream extends Client {
  constructor() {
    super({
      fetchAllMembers: false,
      restTimeOffset: 0,
      shards: 'auto',
      allowedMentions: {
        parse: ['users', 'roles'],
        everyone: false,
        repliedUser: false
      },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
      ],
      partials: [
        Partials.User,
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.GuildMember,
        Partials.GuildScheduledEvent
      ],
    });
    this.commands = new Collection();
    this.developer = process.env.AUTHENTICATION_OWNER;
    this.logs = process.env.LOGS;
    this.logger = require('./Models/Logger');
    this._ConnectMongodb();
    this._LoadClientEvents();
    //this._loadNodeEvents();
    this._LoadSlashCommands();
    //this._crasher();
    //this.shoukaku;
    this.rest.on('rateLimited', (info) => {
      this.logger.log(info, 'log');
    });
  }
  /**
   * Import All Events
   */
  async _LoadClientEvents() {
    let folders = readdirSync(join(__dirname, 'Events'));
    for (let folder of folders) {
      let files = readdirSync(join(join(__dirname, 'Events'), folder)).filter((file) => file.endsWith('.js'));
      for (let file of files) {
        let events = require(join(join(join(__dirname, 'Events'), folder), file));
        if (events.once) {
          this.once(events.name, (...args) => events.execute(this, ...args));
        } else {
          this.on(events.name, (...args) => events.execute(this, ...args));
        }
        this.logger.log(`Loading Events Client ${file.split('.')[0]}`, 'event');
      }
    }
  }
  /**
   * Node Manager Events
   */
  /*async _loadNodeEvents() {
    this.shoukaku = new Shoukaku(new Connectors.DiscordJS(this), [{
      name: process.env.NODE_NAME,
      url: process.env.NODE_URL,
      auth: process.env.NODE_AUTH,
      secure: Boolean(process.env.NODE_SECURE),
    }], {
      moveOnDisconnect: false,
      resumable: false,
      resumableTimeout: 30,
      reconnectTries: 2,
      restTimeout: 10000,
    });
    function Boolean(value) {
      if (typeof value === 'string') {
        value = value.trim().toLowerCase();
      }
      switch (value) {
        case true:
        case 'true':
          return true;
        default:
          return false;
      }
    }
    readdirSync('./Events/Lavalink/').forEach((file) => {
      const event = require(`./Events/Lavalink/${file}`);
      let eventName = file.split('.')[0];
      this.logger.log(`Loading Events Lavalink ${eventName}`, 'event');
      this.shoukaku.on(event.name, (...args) => event.execute(this, ...args));
    });
  }*/
  /**
   * Player Manager Events
   */
  /*_loadPlayerEvents() {
    readdirSync('./Events/Players/').forEach(file => {
      const event = require(`./Events/Players/${file}`);
      let eventName = file.split('.')[0];
      this.logger.log(`Loading Events Players ${eventName}`, 'event');
      this.kazagumo.on(event.name, (...args) => event.execute(this, ...args));
    });
  };*/
  /**
   * Import All SlashCommands
   */
  async _LoadSlashCommands() {
    let Data = [];
    let folders = readdirSync(join(__dirname, 'Commands'));
    for (let folder of folders) {
      let files = readdirSync(join(join(__dirname, 'Commands'), folder)).filter((file) => file.endsWith('.js'));
      for (let file of files) {
        let command = require(join(join(join(__dirname, 'Commands'), folder), file));
        if ('data' in command && 'execute' in command || 'autocomplete' in command) {
          Data.push(command.data.toJSON());
        } else {
          this.logger.log(`[ / ] The command at ${join(join(join(__dirname, 'Commands'), folder), file)} is missing a required "data" or "execute" property.`, 'warn');
        }
        if (!command.data.name) return this.logger.log(`[ / ] ${command.split('.')[0]} application command name is required.`, 'error');
        if (!command.data.description) return this.logger.log(`[ / ] ${command.split('.')[0]} application command description is required.`, 'error');
        this.commands.set(command.data.name, command);
        this.logger.log(`[ / ] Slash Command Loaded: ${command.data.name}`, 'cmd');
      }
    }
    let rest = new REST().setToken(process.env.DISCORD_TOKEN);
    this.logger.log('Refreshing Application (/) Commands.', 'system');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: Data }).finally(() => {
      this.logger.log('Successfully Loaded All Application (/) Commands', 'system')
    }).catch((err) => this.logger.log(err, 'error'));
  }
  async _ConnectMongodb() {
    connect(process.env.MONGO_URI, {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    }).then(() => this.logger.log('Atlas Cluster Clouds Connected', 'ready')).catch((err) => this.logger.log(err, 'error'));
  }
  /*async _crasher() {
    process.on('unhandledRejection', (reason, promise) => {
      console.log('=== Unhandled Rejection ===');
      console.log('Promise:', promise, 'Reason:', reason.stack ? reason.stack : reason);
      console.log('=== Unhandled Rejection ===');
    });

    process.on('uncaughtException', (err, origin) => {
      console.log('=== Uncaught Exception ===');
      console.log('Origin:', origin, 'Exception:', err.stack ? err.stack : err)
      console.log('=== Uncaught Exception ===');
    });

    process.on('uncaughtExceptionMonitor', (err, origin) => {
      console.log('=== Uncaught Exception Monitor ===');
      console.log('Origin:', origin, 'Exception:', err.stack ? err.stack : err)
      console.log('=== Uncaught Exception Monitor ===');
    });

    process.on('multipleResolves', (type, promise, reason) => {
      console.log('=== Multiple Resolves ===');
      console.log(type, promise, reason);
      console.log('=== Multiple Resolves ===');
    });

    process.on('beforeExit', (code) => {
      console.log('=== Before Exit ===');
      console.log('Code:', code);
      console.log('=== Before Exit ===');
    });

    process.on('exit', (code) => {
      console.log('=== Exit ===');
      console.log('Code:', code);
      console.log('=== Exit ===');
    });
  }*/
};

let Defender = new Xtream();
Defender.login(process.env.DISCORD_TOKEN);