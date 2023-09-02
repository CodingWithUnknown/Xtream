const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'play',
  description: 'Plays audio from any supported source',
  type: ApplicationCommandType.ChatInput,
  owner: false,
  options: [
    {
      name: 'query',
      description: 'Provide a song query or URL',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: true,
    },
  ],
  execute: async (client, interaction) => {
    await interaction.deferReply();
    let player = client.manager.get(interaction.guildId),
      query = interaction.options.getString('query');

    if (!player) {
      player = client.manager.create({
        guild: interaction.guildId,
        voiceChannel: interaction.member.voice.channelId,
        textChannel: interaction.channelId,
        selfDeafen: true,
        volume: 80,
      });
    }

    if (player.state !== 'CONNECTED') await player.connect();
    let res = await player.search({ query: query, source: 'youtube' }, interaction.user);

    switch (res.loadType) {
      case 'TRACK_LOADED':
      case 'SEARCH_RESULT':
        await player.queue.add(res.tracks[0]);
      if (!player.playing && !player.paused && !player.queue.size) {
        const embeds = new EmbedBuilder()
          .setAuthor(
            { name: 'Added to Queue', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
          )
          .setThumbnail(res.tracks[0].thumbnail)
          .setDescription(`Player track has been added song to queue [${res.tracks[0].title}](${res.tracks[0].uri})`)
          .setFooter(
            { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
          )
          .setColor('0x2f3136')
          .setTimestamp();
        await interaction.editReply({ embeds: [embeds] }).then(async () => await player.play());
      } else {
        const embeds = new EmbedBuilder()
          .setAuthor(
            { name: 'Added to Queue', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
          )
          .setThumbnail(res.tracks[0].thumbnail)
          .setDescription(`Player track has been added song to queue [${res.tracks[0].title}](${res.tracks[0].uri})`)
          .setFooter(
            { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
          )
          .setColor('0x2f3136')
          .setTimestamp();
        await interaction.editReply({ embeds: [embeds] });
      }
        break;
      case 'PLAYLIST_LOADED':
        for (const track of track.tracks) await player.queue.add(track);
      if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.size) {
        const embeds = new EmbedBuilder()
          .setAuthor(
            { name: 'Playlist Queued', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
          )
          .setThumbnail(res.playlist.selectedTrack.thumbnail)
          .setDescription(`Player playlist has been added to queue from ${res.playlist.name}`)
          .setFooter(
            { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
          )
          .setColor('0x2f3136')
          .setTimestamp();
        await interaction.editReply({ embeds: [embeds] }).then(async () => await player.play());
      }
        break;
    }

    /*if (res.loadType === 'TRACK_LOADED' || res.loadType === 'SEARCH_RESULT') {
      await player.queue.add(res.tracks[0]);
      if (!player.playing && !player.paused && !player.queue.size) {
        const embeds = new EmbedBuilder()
          .setAuthor(
            { name: 'Added to Queue', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
          )
          .setThumbnail(res.tracks[0].thumbnail)
          .setDescription(`Player track has been added song to queue [${res.tracks[0].title}](${res.tracks[0].uri})`)
          .setFooter(
            { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
          )
          .setColor('0x2f3136')
          .setTimestamp();
        await interaction.editReply({ embeds: [embeds] }).then(async () => await player.play());
      }
    }
    if (res.loadType === 'PLAYLIST_LOADED') {
    for (const track of track.tracks) await player.queue.add(track);
      //await player.queue.add(track.tracks[0]);
      if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.size) {
        const embeds = new EmbedBuilder()
          .setAuthor(
            { name: 'Playlist Queued', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
          )
          .setThumbnail(track.playlist.selectedTrack.thumbnail)
          .setDescription(`Player playlist has been added to queue from ${res.playlist.name}`)
          .setFooter(
            { text: 'Xara Developers', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
          )
          .setColor('0x2f3136')
          .setTimestamp();
        await interaction.editReply({ embeds: [embeds] }).then(async () => await player.play());
      }
    }*/
  }
};