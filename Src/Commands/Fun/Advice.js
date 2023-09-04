const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const superagent = require('superagent');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('advice')
    .setDescription('Gives you some advice'),
  execute: async (client, interaction) => {
    superagent.get('http://api.adviceslip.com/advice').end((err, res) => {
      if (!err && res.status === 200) {
        try {
          JSON.parse(res.text);
        } catch {
          return message.reply({ content: 'An api error occurred.' });
        }
        const advice = JSON.parse(res.text);
        const embed = new EmbedBuilder()
          .setTitle('Advice')
          .setDescription(`👉  **${advice.slip.advice}**`)
          .setFooter({
            text: 'Xara Developers',
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setColor('Random')
          .setTimestamp();
        return message.reply({ embeds: [embed] });
      } else {
        return message.reply(
          `REST call failed: ${err}, status code: ${res.status}`
        );
      }
    });
  },
};
