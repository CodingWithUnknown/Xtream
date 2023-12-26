const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, Client, ChatInputCommandInteraction } = require('discord.js');
const { readdirSync, readFileSync } = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View information about central user'),
  developer: true,
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @returns
   */
  execute: async (client, interaction) => {

    /* try {
      const commandFolders = fs.readdirSync('./src/commands');
      const helpEmbeds = [];

      for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

        const categoryEmbed = new EmbedBuilder()
          .setTitle(folder)
          .setFooter({
            text: `${footerData.footerText}`
          })
          .setTimestamp()
          .setThumbnail(client.user.displayAvatarURL())

        const subcommands = [];

        for (const file of commandFiles) {
          const command = require(`../../${folder}/${file}`);

          if (command.deleted) {
            continue;
          }

          const description = `${command.data.description || 'No description provided'}`;

          if (command.data.type === 'SUB_COMMAND' || command.data.type === 'SUB_COMMAND_GROUP') {
            subcommands.push(command);
          } else {
            categoryEmbed.addFields({
              name: `/${command.data.name}`,
              value: `${description}`,
            });
          }
        }

        if (subcommands.length > 0) {
          categoryEmbed.addFields({
            name: `Subcommands`,
            value: subcommands.map((subcommand) => `/${subcommand.ata.name}`).join('\n'),
          });
        }

        helpEmbeds.push(categoryEmbed);
      }

      await buttonPagination(interaction, helpEmbeds);
    } catch (err) {
      console.log(err);
    } */

    const upcaps = (string) => string;
    const commad = (name) => {
      let text = `*To Run Any Command Type*: \`/${name} {Sub Command Name}\``
      let text2 = client.commands.filter(x => x.name == name).map((x) => x.options.map((c) => '`' + c.name + '` - ' + c.description).join('\n'));
      return text2 + `\n\n` + text
    }

    let em1 = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}\'s Help Menu`, iconURL: client.user.displayAvatarURL({ format: 'png' }) })
      .setImage(`https://i.stack.imgur.com/Fzh0w.png`)
      .setColor(0x2c2d31)
      .addFields([
        {
          name: "Categories [1-9]",
          value: `>>> <:blue_snowflake:1012018251284361326>┆AFK
          <:mega_phone:1012037897857282098>┆Announcement
          <:mod_shield:1012017403892346921>┆Auto mod
          <:settings:1012018247031328868>┆Auto setup
          <:presentgift:1012018258137862275>┆Birthday
          <:discord_bot:1012038552521031703>┆Bot
          <:huge_smile:1012038461357817968>┆Casino
          <:settings:1012018247031328868>┆Configuration
          <:blue_stars:1012018254174232596>┆Custom commands`,
          inline: true
        },
        {
          name: "Categories [19-27]",
          value: `>>> <:to_space:1012038751729491968>┆Leveling
          <:values:1012038654916579358>┆Messages
          <:mod_shield:1012017403892346921>┆Moderation
          <:musicnotes:1012017302755094609>┆Music
          <:uo_paper:1015550831199789146>┆Notepad
          <:member:1012017243837702174>┆Profile
          <:uo_voice_channel:1015566886303440906>┆Radio
          <:huge_smile:1012038461357817968>┆Reaction roles
          <:ways:1012018245429121075>┆Search`,
          inline: true
        },
        {
          name: "\u200b",
          value: "\u200b",
          inline: true
        },
        {
          name: "Categories [10-18]",
          value: `>>> <:emoji_50:1015861852321874002>┆Dcredits
          <:uo_dcoin:1015563002591842314>┆Economy
          <:blue_stars:1012018254174232596>┆Family
          <:huge_smile:1012038461357817968>┆Fun
          <:to_space:1012038751729491968>┆Games
          <:uo_party:1015552073405841458>┆Giveaway
          <:discord:1012017257158824027>┆Guild settings
          <:image:1012017406572499075>┆Images
          <:add:1012018622912274502>┆Invites`,
          inline: true
        }, {
          name: "Categories Part [28-36]",
          value: `>>> <:plane:1012017388440531015>┆Server stats
          <:settings:1012018247031328868>┆Setup
          <:ways:1012018245429121075>┆Soundboard
          <:hashtag:1012018249854091415>┆Sticky messages
          <:heart_blue:1012017400314613761>┆Suggestions
          <:beIl:1012017395910594620>┆Thanks
          <:blue_ticket:1012017313878388816>┆Tickets
          <:blue_hammers:1012018248163786763>┆Tools
          <:uo_voice_channel:1015566886303440906>┆Voice`,
          inline: true
        },
        {
          name: "\u200b",
          value: "\u200b",
          inline: true
        },
      ])


    let startButton = new ButtonBuilder()
      .setStyle(2)
      .setEmoji(`1054428533033816204`)
      .setCustomId('start'),
      backButton = new ButtonBuilder()
        .setStyle(2)
        .setEmoji(`1054428491849945108`)
        .setCustomId('back'),
      forwardButton = new ButtonBuilder()
        .setStyle(2)
        .setEmoji(`1054428468265373747`)
        .setCustomId('forward'),
      endButton = new ButtonBuilder()
        .setStyle(2)
        .setEmoji(`1054428519763021904`)
        .setCustomId('end')

    /* const options = [{ label: 'Owerview', value: '0' }]
    const options2 = []

    let counter = 0
    let counter2 = 25
    require('fs').readdirSync(`${process.cwd()}/Src/Commands`).slice(0, 24).forEach(dirs => {
      counter++
      const opt = {
        label: toUpperCase(dirs.replace('-', ' ')),
        value: `${counter}`
      }
      options.push(opt)
    })
    require('fs').readdirSync(`${process.cwd()}/Src/Commands`).slice(25, 37).forEach(dirs => {
      counter2++
      const opt = {
        label: toUpperCase(dirs.replace('-', ' ')),
        value: `${counter}`
      }
      options2.push(opt)
    }) */

    /* let menu = new StringSelectMenuBuilder()
      .setPlaceholder('Change page')
      .setCustomId('pagMenu')
      .addOptions(options)
      .setMaxValues(1)
      .setMinValues(1),
      menu2 = new StringSelectMenuBuilder()
        .setPlaceholder('Change page')
        .setCustomId('pagMenu2')
        .addOptions(options2)
        .setMaxValues(1)
        .setMinValues(1) */

    const allButtons = [
      startButton.setDisabled(true),
      backButton.setDisabled(true),
      forwardButton.setDisabled(false),
      endButton.setDisabled(false)
    ]

    // let group1 = new ActionRowBuilder()
    // .addComponents(menu)
    let group2 = new ActionRowBuilder()
      .addComponents(allButtons)
    // let group3 = new ActionRowBuilder()
    // .addComponents(menu2)

    const components = [group2] // [group2, group1, group3]

    // await interaction.reply({ embeds: [em1] });


    // await interaction.deferReply();

    let helpMessage = await interaction.reply({ embeds: [em1], components: components });

    const collector = helpMessage.createMessageComponentCollector((button) => button.user.id === interaction.user.id, { time: 100000 });

    var embeds = [em1]



    readdirSync(`./Src/Commands`).forEach((dir) => {
      embeds.push(
        new EmbedBuilder()
          .setAuthor({ name: `${dir.charAt(0).toUpperCase() + dir.slice(1)}`, iconURL: client.user.displayAvatarURL() })
          .setDescription(`${commad(dir)}`)
      )
    });


    collector.on('collect', async (x) => {
      let page = 0
      if (x.user.id !== interaction.user.id) return await x.editReply({ content: `**You Can't Use it\n**`, ephemeral: true });
      switch (x.customId) {
        case 'start':
          page = 0
          group2 = new ActionRowBuilder()
            .addComponents([
              startButton.setDisabled(true),
              backButton.setDisabled(true),
              forwardButton.setDisabled(false),
              endButton.setDisabled(false)
            ])
          x.update({ embeds: [embeds[page]], components: components })
          break;
        case 'back':
          --page;
          if (page === 0) {
            group2 = new ActionRowBuilder()
              .addComponents([
                startButton.setDisabled(true),
                backButton.setDisabled(true),
                forwardButton.setDisabled(false),
                endButton.setDisabled(false)
              ])
          } else {
            group2 = new ActionRowBuilder()
              .addComponents([
                startButton.setDisabled(false),
                backButton.setDisabled(false),
                forwardButton.setDisabled(false),
                endButton.setDisabled(false)
              ])
          }
          x.update({ embeds: [embeds[page]], components: components })
          break;
        case 'forward':
          page++;
          if (page === embeds.length - 1) {
            group2 = new ActionRowBuilder()
              .addComponents([
                startButton.setDisabled(false),
                backButton.setDisabled(false),
                forwardButton.setDisabled(true),
                endButton.setDisabled(true)
              ])
          } else {
            group2 = new ActionRowBuilder()
              .addComponents([
                startButton.setDisabled(false),
                backButton.setDisabled(false),
                forwardButton.setDisabled(false),
                endButton.setDisabled(false)
              ])
          }
          x.update({ embeds: [embeds[page]], components: components })
          break;
        case 'end':
          page = embeds.length - 1;
          group2 = new ActionRowBuilder()
            .addComponents([
              startButton.setDisabled(false),
              backButton.setDisabled(false),
              forwardButton.setDisabled(true),
              endButton.setDisabled(true)
            ])
          x.update({ embeds: [embeds[page]], components: components })
          break;
        /* case 'pagMenu':
          currentPage = parseInt(b.values[0])
          if (currentPage === 0) {
            group2 = new ActionRowBuilder()
              .addComponents([
                startButton.setDisabled(true),
                backButton.setDisabled(true),
                forwardButton.setDisabled(false),
                endButton.setDisabled(false)
                
                 if (currentPage === embeds.length - 1) {
              oup2 = new ActionRowBuilder()
              .addComponents([
                startButton.setDisabled(false),
                backButton.setDisabled(false),
                forwardButton.setDisabled(true),
                endButton.setDisabled(true)
                
                 {
              oup2 = new ActionRowBuilder().addComponents([
              startButton.setDisabled(false),
              backButton.setDisabled(false),
              forwardButton.setDisabled(false),
              endButton.setDisabled(false)])
              
              date({ embeds: [embeds[currentPage]], components: components })
          break;
          se 'pagMenu2':
          currentPage = parseInt(b.values[0])
          if (currentPage === 0) {
            group2 = new ActionRowBuilder()
              .addComponents([
                startButton.setDisabled(true),
                backButton.setDisabled(true),
                forwardButton.setDisabled(false),
                endButton.setDisabled(false)
                
                 if (currentPage === embeds.length - 1) {
              oup2 = new ActionRowBuilder()
              .addComponents([
                startButton.setDisabled(false),
                backButton.setDisabled(false),
                forwardButton.setDisabled(true),
                endButton.setDisabled(true)
                
                 {
              oup2 = new ActionRowBuilder()
              .addComponents([
                startButton.setDisabled(false),
                backButton.setDisabled(false),
                forwardButton.setDisabled(false),
                endButton.setDisabled(false)
                
                
              date({ embeds: [embeds[currentPage]], components: components })
          break; */
        default:
          page = 0
          x.update({ embeds: [embeds[page]], components: null })
          break;
      }
    });

    collector.on('end', async (x) => {
      await x.update({ embeds: [helpMessage.embeds[0]], content: [], components: [] })
    });

    embeds.map((embed, index) => {
      embed.setColor(0x2c2d31)
        .setImage(`https://i.stack.imgur.com/Fzh0w.png`)
        .setFooter({ text: `Page ${index + 1} / ${embeds.length}`, iconURL: client.user.displayAvatarURL() });
    })
  }
};