const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require('superagent');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('testing command'),
  execute: async (client, interaction) => {
    await get('http://icanhazdadjoke.com')
      .set({ Headers: { 'Accept': 'application/json' } })
      .end(async (err, res) => {
        console.log(res);
        console.log(err);
        /*const embeds = new EmbedBuilder()
          .setDescription(`👉  **${(await res.json().joke)}**`)
          .setColor(0x2c2d31)
          .setTimestamp();
        return await interaction.reply({ embeds: [embeds] });*/
      })
  }
};