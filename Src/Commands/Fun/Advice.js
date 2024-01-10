const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require('superagent');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('advice')
    .setDescription('Gives you some advice')
    .setNSFW(false),
  execute: async (client, interaction) => {
    await get('http://api.adviceslip.com/advice').end(async (err, res) => {
      if (!err && res.status === 200) {
        try {
          await JSON.parse(res.text);
        } catch {
          return await interaction.reply({ content: 'An api error occurred.' });
        }
        const embeds = new EmbedBuilder()
          .setDescription(`**${await JSON.parse(res.text).slip.advice}**`)
          .setColor(0x141318);
        return await interaction.reply({ embeds: [embeds] });
      } else {
        return await interaction.reply({ content: `REST call failed: ${err}, status code: ${res.status}` });
      }
    });
  }
};