const { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Types } = require('mongoose');
const Data = require('../../Models/Schema/Suspension');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suspension')
    .setDescription('suspension a user from the Xtream developers')
    .addSubcommand((options) => options
      .setName('add')
      .setDescription('Ostracize to a user from the Xtream developers')
      .addStringOption((options) => options
        .setName('id')
        .setDescription('Provide a user id to ostracize for')
        .setRequired(true)
      )
    )
    .addSubcommand((options) => options
      .setName('remove')
      .setDescription('Include a user from the Xtream developers')
      .addStringOption((options) => options
        .setName('id')
        .setDescription('Provide a user id to include for')
        .setRequired(true)
      )
    ),
  developer: true,
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @returns 
   */
  execute: async (client, interaction) => {
    switch (interaction.options.getSubcommand()) {
      case 'add':
        let target = interaction.guild.members.cache.get(interaction.options.getString('id'));

        if (!target) {
          const embeds = new EmbedBuilder()
            .setDescription('This user does not exist in the server')
            .setColor(0x141318);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        await Data.findOne({ User: target.user.id }, async (err, data) => {
          if (err) throw err;
          if (data) {
            const embeds = new EmbedBuilder()
              .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
              .setDescription(`${target.user.displayName} was been already Suspended!`)
              .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
              .setColor(0x141318)
              .setTimestamp();
            return await interaction.reply({ embeds: [embeds] });
          } else {
            data = new Data({
              _id: Types.ObjectId(),
              User: target.user.id
            });
            await data.save().then(async () => {
              const embeds = new EmbedBuilder()
                .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
                .setThumbnail(target.user.displayAvatarURL({ forceStatic: true, size: 4096 }))
                .setDescription(`**${target.user.displayName}** user has been Suspended.`)
                .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
                .setColor(0x141318)
                .setTimestamp();
              return await interaction.reply({ embeds: [embeds] });
            });
          }
        });
        break;

      case 'remove':
        let user = interaction.guild.members.cache.get(interaction.options.getString('id'));

        if (!user) {
          const embeds = new EmbedBuilder()
            .setDescription('This user does not exist in the server')
            .setColor(0x141318);
          return await interaction.reply({ embeds: [embeds], ephemeral: true });
        }

        await Data.findOne({ User: user.user.id }, async (err, data) => {
          if (err) throw err;
          if (data) {
            await Data.findOneAndDelete({ User: user.user.id }).then(async () => {
              const embeds = new EmbedBuilder()
                .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
                .setThumbnail(user.user.displayAvatarURL({ forceStatic: true, size: 4096 }))
                .setDescription(`**${user.user.displayName}** user has been Reactivated.`)
                .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
                .setColor(0x141318)
                .setTimestamp();
              return await interaction.reply({ embeds: [embeds] });
            });
          } else {
            const embeds = new EmbedBuilder()
              .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
              .setDescription(`${user.user.displayName} was not suspended!`)
              .setColor(0x141318);
            return await interaction.reply({ embeds: [embeds] });
          }
        });
        break;
    }
  }
};