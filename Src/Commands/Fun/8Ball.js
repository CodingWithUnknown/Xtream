const { Client, chatInputApplicationCommandMention, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require('superagent');

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
  /**
   * 
   * @param {Client} client 
   * @param {chatInputApplicationCommandMention} interaction 
   */
  execute: async (client, interaction) => {
    await get(`https://eightballapi.com/api/biased?question=${interaction.options.getString('question').replace(/ /g, '+')}&lucky=${Boolean(Math.round(Math.random()))}`).then(async (res) => {
      try {
        const embeds = new EmbedBuilder()
          .setDescription(`**${await res.body.reading}**`)
          .setColor(0x2c2d31);
        return await interaction.reply({ embeds: [embeds] });
      } catch (err) {
        console.log(err);
        return await interaction.reply({ content: 'An api error occurred.' });
      }
    });
  }
};