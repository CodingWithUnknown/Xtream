const { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require('superagent');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription(';lkjrghal;kfnqioucvofnqwofh')
    .setNSFW(false),
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   */
  execute: async (client, interaction) => {
    await get('http://icanhazdadjoke.com').set('Accept', 'application/json').end(async (err, res) => {
      if (!err && res.status === 200) {
        try {
          await res.body.joke;
        } catch (err) {
          return await interaction.reply({ content: 'An api error occurred.' });
        }
        const embeds = new EmbedBuilder()
          .setDescription(`**${await res.body.joke}**`)
          .setColor(0x141318);
        return await interaction.reply({ embeds: [embeds] });
      } else {
        return await interaction.reply({ content: `REST call failed: ${err}, status code: ${res.status}` });
      }
    });
  }
};