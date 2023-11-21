const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const superagent = require('superagent');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8ball a question')
    .setNSFW(false)
    .addStringOption((options) => options
      .setName('question')
      .setDescription('What you want to ask the magic 8ball?')
      .setRequired(true)
    ),
  execute: async (client, interaction) => {
    superagent.get(`https://eightballapi.com/api/biased?question=${interaction.options.getString('question').replace(/ /g, '+')}`).end(async (err, res) => {
      // if (!err && res.status === 200) {
      /* try {
        await res.body.reading;
      } catch {
        return await interaction.reply({ content: 'An api error occurred.' });
      } */
      const embeds = new EmbedBuilder()
        .setDescription(`**${await res.body.reading}**`)
        .setColor(0x2c2d31);
      interaction.reply({ embeds: [embeds] });
      // } /* else {
      // return await interaction.reply({ content: `REST call failed: ${err}, status code: ${res.status}` });
      // } */
    });
  }
};