require('dotenv').config({ path: '.env' });
const { ShardingManager, ShardEvents } = require('discord.js');

let manager = new ShardingManager('./Src/Xtream.js', { token: process.env.DISCORD_TOKEN, respawn: true, totalShards: 'auto', shardList: 'auto', mode: 'process' });

manager.once('shardCreate', async (shard) => {
  shard.logger = require('./Src/Models/Logger');
  await shard.logger.log(`Shard system ${shard.id + 1}/${manager.totalShards} connected to Discord's Gateway`, 'system');

  shard.once(ShardEvents.Ready, async () => {
    await shard.logger.log(`Shard system ${shard.id + 1}/${manager.totalShards} Ready.`, 'system');
  });

  shard.once(ShardEvents.Disconnect, async () => {
    await shard.logger.log(`Shard system ${shard.id + 1}/${manager.totalShards} disconnected.`, 'system');
  });

  shard.once(ShardEvents.Reconnecting, async () => {
    await shard.logger.log(`Reconnecting shard system ${shard.id + 1}/${manager.totalShards}`, 'system');
  });

  shard.once(ShardEvents.Death, async (process) => {
    await shard.logger.log(`Closing shard system ${shard.id + 1}/${manager.totalShards} unexpectedly.`, 'system');

    if (process.exitCode === null) {
      await shard.logger.log(`Shard system ${shard.id + 1}/${manager.totalShards} exited.\n\n**PID** - \`${process.pid}\`\n**Code** - \`${process.exitCode}\``, 'system');
    }
  });
});

manager.spawn({ amount: 'auto', delay: null, timeout: -1 });