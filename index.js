require('dotenv').config({ path: '.env' });
const { ShardingManager, ShardEvents } = require('discord.js');
const Logger = require('./Src/Models/Logger');

let manager = new ShardingManager('./Src/Xtream.js', { token: process.env.DISCORD_TOKEN, respawn: true, totalShards: 'auto', shardList: 'auto', mode: 'process' });

manager.once('shardCreate', async (shard) => {
  shard.logger = new Logger();
  await shard.logger.system(`Shard system ${shard.id + 1}/${manager.totalShards} connected to Discord's Gateway`);

  shard.once(ShardEvents.Ready, async () => {
    await shard.logger.system(`Shard system ${shard.id + 1}/${manager.totalShards} Ready.`);
  });

  shard.once(ShardEvents.Disconnect, async () => {
    await shard.logger.system(`Shard system ${shard.id + 1}/${manager.totalShards} disconnected.`);
  });

  shard.once(ShardEvents.Reconnecting, async () => {
    await shard.logger.system(`Reconnecting shard system ${shard.id + 1}/${manager.totalShards}`);
  });

  shard.once(ShardEvents.Death, async (process) => {
    await shard.logger.system(`Closing shard system ${shard.id + 1}/${manager.totalShards} unexpectedly.`);

    if (process.exitCode === null) {
      await shard.logger.system(`Shard system ${shard.id + 1}/${manager.totalShards} exited.\n\n**PID** - \`${process.pid}\`\n**Code** - \`${process.exitCode}\``);
    }
  });
});

manager.spawn({ amount: 'auto', delay: null, timeout: -1 });