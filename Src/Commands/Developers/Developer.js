const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { request } = require('axios');
const { Supplementary } = require('../../Models/Module');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('developer')
    .setDescription('This ( / ) command was only be execute by the Developer')
    .addSubcommand((options) => options
      .setName('evaluate')
      .setDescription('This ( / ) command was only be execute by the Developer')
      .addStringOption((options) => options
        .setName('code')
        .setDescription('Provide JavaScript codes')
        .setRequired(true)
      )
    )
    .addSubcommand((options) => options
      .setName('update')
      .setDescription('This ( / ) command was only be execute by the Developer')
      .addStringOption((options) => options
        .setName('folder')
        .setDescription('Provide a folder name')
        .setRequired(true)
      )
      .addStringOption((options) => options
        .setName('file')
        .setDescription('Provide a file name')
        .setRequired(true)
      )
    )
    .addSubcommand((options) => options
      .setName('screenshot')
      .setDescription('Takes a Screenshot of any domains or webpages')
      .addStringOption((options) => options
        .setName('domain')
        .setDescription('lol')
        .setRequired(true)
      )
    ),
  developer: true,
  execute: async (client, interaction) => {
    switch (interaction.options.getSubcommand()) {
      case 'evaluate':
        //try {
        let code = interaction.options.getString('code');
        if (!code) return;
        let evaled;
        if (code.includes('process.env') || code.includes('token') || code.includes('mongodb') || code.includes('key')) {
          evaled = 'This code is not contents in any Developer code!';
        } else {
          evaled = await eval(code);
        }
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 0 });
        if (Supplementary(evaled).length >= 1024) {
          let res = request('https://hastebin.com/documents/aeiou')
            .set('Authorization', `Bearer ${process.env.TOPTAL_KEY}`, 'content-type: text/plain')
            .send(Supplementary(evaled));
          console.log(res)
          const embeds = new EmbedBuilder()
            .setAuthor(
              { name: 'Evaluation Completed', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .addFields(
              { name: 'Input', value: '```js\n' + code + '```' },
              { name: 'Output', value: `https://hastebin.com/share/${res.key}.js` },
            )
            .setFooter(
              { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setColor(0x2c2d31)
            .setTimestamp();
          await interaction.reply({ embeds: [embeds] });
        } else {
          const embeds = new EmbedBuilder()
            .setAuthor(
              { name: 'Evaluation Completed', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .addFields(
              { name: 'Input', value: '```js\n' + code + '```' },
              { name: 'Output', value: '```js\n' + Supplementary(evaled) + '```' }
            )
            .setFooter(
              { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setColor(0x2c2d31)
            .setTimestamp();
          await interaction.reply({ embeds: [embeds] });
        }
        /*} catch (error) {
          if (Supplementary(error).length > 1024) {
            const { body } = await post('https://hastebin.com/documents').send(Supplementary(error));
            const embeds = new EmbedBuilder()
              .setAuthor(
                { name: 'Evaluation Failure', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
              )
              .addFields(
                { name: 'Input', value: '```js\n' + code + '```' },
                { name: 'Error', value: `https://hastebin.com/${body.key}.js` },
              )
              .setFooter(
                { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
              )
              .setColor('0x2c2d31')
              .setTimestamp();
            await interaction.reply({ embeds: [embeds] });
          } else {
            const embeds = new EmbedBuilder()
              .setAuthor(
                { name: 'Evaluation Failure', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
              )
              .addFields(
                { name: 'Input', value: '```js\n' + code + '```' },
                { name: 'Error', value: '```js\n' + Supplementary(error) + '```' },
              )
              .setFooter(
                { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
              )
              .setColor('0x2c2d31')
              .setTimestamp();
            await interaction.reply({ embeds: [embeds] });
          }
        }*/
        break;
      case 'update':
        const folder = interaction.options.getString('folder');
        const commandName = interaction.options.getString('file');
        const command = interaction.client.commands.get(commandName);

        if (!command) {
          return interaction.reply(`There is no command with name \`${commandName}\`!`);
        }


        try {
          delete require.cache[require.resolve(`../../Commands/${folder}/${command.name}.js`)];
          client.commands.delete(command.name);
          const newCommand = require(`./${command.name}.js`);
          client.commands.set(newCommand.name, newCommand);
          await interaction.reply(`Command \`${newCommand.name}\` was reloaded!`);
        } catch (error) {
          console.error(error);
          await interaction.reply(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
        break;
      case 'screenshot':
        let domain = interaction.options.getString('domain');

        if (domain.length <= 8) {
          const embeds = new EmbedBuilder()
            .setDescription('https is too short to reach - 8 limit')
          return await interaction.reply({ embeds: [embeds] });
        }

        try {
          let { body } = await fetch(`https://image.thum.io/get/width/1920/crop/675/noanimate/${/^(https?:\/\/)/i.test(domain) ? domain : `http://${domain}`}`),
            file = new AttachmentBuilder(body, { name: 'Screenshot.webp' });

          return await interaction.reply({ files: [file] });
        } catch (err) {
          console.log(err)
          if (err.status === 404) return await interaction.reply('Could not find any results. Invalid URL?');
          return await interaction.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
  }
};