require('dotenv').config({ path: '.env' });
const { ShardingManager, ShardEvents } = require('discord.js');
const Logger = require('./Src/Models/Logger');

let manager = new ShardingManager('./Src/Xtream.js', { token: process.env.DISCORD_TOKEN, respawn: true, totalShards: 'auto', shardList: 'auto', mode: 'process' });

manager.on('shardCreate', async (shard) => {
  shard.logger = new Logger();
  await shard.logger.system(`Shard system ${shard.id + 1}/${manager.totalShards} connected to Discord's Gateway`);

  shard.on(ShardEvents.Ready, async () => {
    await shard.logger.system(`Shard system ${shard.id + 1}/${manager.totalShards} Ready.`);
  });

  shard.on(ShardEvents.Disconnect, async () => {
    await shard.logger.warn(`Shard system ${shard.id + 1}/${manager.totalShards} disconnected.`);
  });

  shard.on(ShardEvents.Reconnecting, async () => {
    await shard.logger.await(`Reconnecting shard system ${shard.id + 1}/${manager.totalShards}`);
  });

  shard.on(ShardEvents.Resume, async () => {
    await shard.logger.system(`Shard system ${shard.id + 1}/${manager.totalShards} Resumed.`);
  });

  shard.on(ShardEvents.Death, async (process) => {
    await shard.logger.warn(`Closing shard system ${shard.id + 1}/${manager.totalShards} unexpectedly.`);

    if (process.exitCode === null) {
      await shard.logger.warn(`Shard system ${shard.id + 1}/${manager.totalShards} exited.\n\n**PID** - \`${process.pid}\`\n**Code** - \`${process.exitCode}\``);
    }
  });
});

manager.spawn({ amount: 'auto', delay: null, timeout: -1 });