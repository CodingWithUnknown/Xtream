const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require('superagent');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('testing command')
    .setNSFW(false),
  execute: async (client, interaction) => {
    get('http://icanhazdadjoke.com').set('Accept', 'application/json').end(async (err, res) => {
      if (!err && res.status === 200) {
        try {
          await res.body.joke;
        } catch {
          return await interaction.reply({ content: 'An api error occurred.' });
        }
        const embeds = new EmbedBuilder()
          .setDescription(`**${await res.body.joke}**`)
          .setColor(0x2c2d31);
        return await interaction.reply({ embeds: [embeds] });
      } else {
        return await interaction.reply({ content: `REST call failed: ${err}, status code: ${res.status}` });
      }
    });
  }
};