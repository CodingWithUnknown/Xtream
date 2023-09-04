const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('testing command'),
  execute: async (client, interaction) => {
    const ball = [
      'As I See It Yes',
      'Ask Again Later',
      'Better Not Tell You Now',
      'Cannot Predict Now',
      'Concentrate and Ask Again',
      "Don't Count On It",
      'It Is Certain',
      'It Is Decidely So',
      'Most Likely',
      'My Reply Is No',
      'My Sources Say No',
      'Outlook Good',
      'Outlook Not So Good',
      'Reply Hazy Try Again',
      'Signs Point to Yes',
      'Very Doubtful',
      'Without A Doubt',
      'Yes',
      'Yes - Definitely',
      'You May Rely On It',
      'It is certain',
      'Without a doubt',
      'You may rely on it',
      'Yes definitely',
      'It is decidedly so',
      'As I see it, yes',
      'Most likely',
      'Yes',
      'Outlook good',
      'Signs point to yes',
      'Reply hazy try again',
      'Better not tell you now',
      'Ask again later',
      'Cannot predict now',
      'Concentrate and ask again',
      'Don’t count on it',
      'Outlook not so good',
      'My sources say no',
      'Very doubtful',
      'My reply is no',
      'No',
      'Certainly',
      'Of course',
      'No doubt about that',
      'Yep i guess',
      'Problably No',
      'Not sure',
      'If you wish so',
      'Why not?',
      'Are u sure? Coz m not!',
      'Yes, if u wish',
    ];
    const question = args.join(' ');
    if (!question)
      return message.reply(
        'You need to ask a question so that I can answer to it!'
      );

    const answer = ball[Math.floor(Math.random() * ball.length)];

    const embeds = new EmbedBuilder()
      .setDescription(`${answer}`)
      .setColor('0x2f3136')
      .setTimestamp();
    return await message.reply({ embeds: [embeds] });
  },
};
