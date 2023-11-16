const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder, PermissionOverwriteManager } = require('discord.js');
// const { request } = require('axios');
const { create } = require('sourcebin');
const { Supplementary } = require('../../Models/Module');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('developer')
    .setDescription('This ( / ) command was only be execute by the Developer')
    .setDMPermission(false)
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
        .setAutocomplete(true)
      )
      .addStringOption((options) => options
        .setName('file')
        .setDescription('Provide a file name')
        .setRequired(true)
        .setAutocomplete(true)
      )
    )
    .addSubcommand((options) => options
      .setName('screenshot')
      .setDescription('Takes a Screenshot of any domains or webpages')
      .addStringOption((options) => options
        .setName('domain')
        .setDescription('Give a domain name or URL link to the Screenshot')
        .setRequired(true)
      )
    )
    /* .addSubcommand((options) => options
      .setName('base64')
      .setDescription('Takes a base64 encoded or decoded')
      .addStringOption((options) => options
        .addChoices(
          { name: 'encoded', value: 'base64' },
          { name: 'decoded', value: 'base64' }
          )
      )
    ) */,
  developer: true,
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @returns 
   */
  execute: async (client, interaction) => {
    switch (interaction.options.getSubcommand()) {
      case 'evaluate':
        try {
          var code = interaction.options.getString('code');
          await interaction.deferReply();
          if (!code) return;
          let evaled;
          if (code.includes('process.env') || code.includes('token') || code.includes('mongodb') || code.includes('key') || code.includes('environment') || code.includes('value') || code.includes('env')) {
            evaled = 'This code is not contents in any Developer codes!';
          } else {
            evaled = await eval(code);
          }
          if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 0 });
          if (Supplementary(evaled).length >= 1024) {
            await create({
              title: 'Evaluation Large Success Codes', description: 'Evaluation are significantly larger than regular expressions and  regular expressions when dealing with complex', files: [
                { content: Supplementary(evaled), language: 'javascript' }
              ]
            }).then(async (res) => {
              const embeds = new EmbedBuilder()
                .setAuthor({ name: 'Evaluation Completed', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .addFields(
                  { name: 'Input', value: '```js\n' + code + '```' },
                  { name: 'Output', value: `[Large Success Codes](${res.shortUrl})` }
                )
                .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(0x2c2d31)
                .setTimestamp();
              await interaction.editReply({ embeds: [embeds] });
            });
          } else {
            const embeds = new EmbedBuilder()
              .setAuthor({ name: 'Evaluation Completed', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
              .addFields(
                { name: 'Input', value: '```js\n' + code + '```' },
                { name: 'Output', value: '```js\n' + Supplementary(evaled) + '```' }
              )
              .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
              .setColor(0x2c2d31)
              .setTimestamp();
            await interaction.editReply({ embeds: [embeds] });
          }
        } catch (error) {
          if (Supplementary(error).length >= 1024) {
            await create({
              title: 'Evaluation Larger Failure Codes', description: 'Evaluation are significantly larger than regular expressions and  regular expressions when dealing with complex', files: [
                { content: Supplementary(evaled), language: 'javascript' }
              ]
            }).then(async (res) => {
              console.log(res);
              const embeds = new EmbedBuilder()
                .setAuthor({ name: 'Evaluation Failure', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .addFields(
                  { name: 'Input', value: '```js\n' + code + '```' },
                  { name: 'Error', value: `[Larger Failure Codes](${res.shortUrl})` }
                )
                .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setColor(0x2c2d31)
                .setTimestamp();
              await interaction.editReply({ embeds: [embeds] });
            });
          } else {
            const embeds = new EmbedBuilder()
              .setAuthor({ name: 'Evaluation Failure', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
              .addFields(
                { name: 'Input', value: '```js\n' + code + '```' },
                { name: 'Error', value: '```js\n' + Supplementary(error) + '```' }
              )
              .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
              .setColor(0x2c2d31)
              .setTimestamp();
            await interaction.editReply({ embeds: [embeds] });
          }
        }
        break;
      case 'update':
        let folder = interaction.options.getString('folder');
        let commandName = interaction.options.getString('file');
        let command = client.commands.get(commandName);

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
      /* break;
    case '': */
    }
  }
};