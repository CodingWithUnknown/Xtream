const { ShardingManager } = require('discord.js');

let manager = new ShardingManager('./Src/Xara.js', { token: process.env.DISCORD_TOKEN, respawn: true });

manager.once('shardCreate', async (shard) => {
  shard.logger = require('./Src/Models/Logger');
  await shard.logger.log(`Shard system has been deployed: ${shard.id + 1}/${manager.totalShards}`, 'system')

  shard.once('shardDisconnect', async () => {
    await shard.logger.log(`Shard system ${shard.id + 1}/${manager.totalShards} disconnected.`, 'system')
  });

  shard.once('shardReconnecting', async () => {
    await shard.logger.log(`Reconnecting shard system ${shard.id + 1}/${manager.totalShards}`, 'system')
  });

  shard.once('death', async (process) => {
    await shard.logger.log(`Closing shard system ${shard.id + 1}/${manager.totalShards} unexpectedly.`, 'system')

    if (process.exitCode === null) {
      await shard.logger.log(`Shard system ${shard.id + 1}/${manager.totalShards} exited.\n\n**PID** - \`${process.pid}\`\n**Code** - \`${process.exitCode}\``, 'system')
    }
  });
});

manager.spawn();