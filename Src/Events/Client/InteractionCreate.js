const { Events, InteractionType, EmbedBuilder, PermissionFlagsBits, Client } = require('discord.js');
const Ostracize = require('../../Models/Schema/Ostracize');

module.exports = {
  name: Events.InteractionCreate,
  /**
   * 
   * @param {Client} client 
   * @param {import('discord.js').Interaction} interaction 
   * @returns 
   */
  execute: async (client, interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    let Command = await client.commands.get(interaction.commandName);
    if (!Command) {
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription('This (/) command is outdated.')
        .setFooter({ text: 'Xtream developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor(0x2d2c31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }
    /* else {
      console.log(Command)
      console.log(interaction.member)
    }*/

    await Ostracize.findOne({
      User: interaction.user.id
    }, async (err, data) => {
      if (err) throw err;
      if (data) {
        const embeds = new EmbedBuilder()
          .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setDescription('You have been restricted from the Xtream Developers')
          .setFooter({ text: 'Xtream developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setColor(0x2d2c31)
          .setTimestamp();
        return await interaction.reply({ embeds: [embeds], ephemeral: true });
      }
    });

    if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.ViewChannel && PermissionFlagsBits.SendMessages)) return;

    if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.EmbedLinks)) return await interaction.reply({ content: `I don't have \`EmbedLinks\` permission to use this command.`, ephemeral: true });

    if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.Administrator)) return await interaction.reply({ content: 'I don\'t have enough permissions to use this command.' });

    /*if (Command.clientPerms && !interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.resolve(Command.clientPerms))) {
      const embeds = new EmbedBuilder()
        .setAuthor(
          { name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setDescription(`I need to this \`${Command.clientPerms.join(', ')}\` permissions to use this command.`)
        .setFooter(
          { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setColor(0x2d2c31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    if (Command.userPerms && !interaction.channel.permissionsFor(interaction.member).has(PermissionsBitField.resolve(Command.userPerms))
    ) {
      const embeds = new EmbedBuilder()
        .setAuthor(
          { name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setDescription(`You need to this \`${Command.userPerms.join(', ')}\` permissions to use this command.`
        )
        .setFooter(
          { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setColor(0x2d2c31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }*/

    if (Command.developer && !client.developer.includes(interaction.user.id)) {
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription('This command can only be Managed or Executed by the (Developer)[https://discord.com/users/770887288464867338].')
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor(0x2d2c31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }

    try {
      await Command.execute(client, interaction);
    } catch (error) {
      client.logger.log(error, 'error');
      const embeds = new EmbedBuilder()
        .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription('There was an error executing that command.')
        .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor(0x2d2c31)
        .setTimestamp();
      return await interaction.reply({ embeds: [embeds], ephemeral: true });
    }
    /*if (interaction.type !== InteractionType.ApplicationCommandAutocomplete) return;
    if ('update'.includes(interaction.name)) {
      let focusedOption = interaction.options.getFocused(true);
      if (focusedOption.length == 0) return interaction.respond([]);

      let choices;

      if (focusedOption.name === 'folder') {
        choices = [];
      }

      if (focusedOption.name === 'file') {
        choices = [];
      }

      const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
      await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })));
    }*/
  }
};