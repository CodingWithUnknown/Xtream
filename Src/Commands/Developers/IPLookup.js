const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { get } = require('superagent');
const moment = require('moment');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ip')
    .setDescription('IP Address refers to the unique means of identification of any domain or website')
    .addSubcommand((options) => options
      .setName('lookup')
      .setDescription('IP Address refers to the unique means of identification of any domain or website')
      .addStringOption((options) => options
        .setName('query')
        .setDescription('Type your IP Address')
        .setRequired(true)
      )
    ),
  developer: true,
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   */
  execute: async (client, interaction) => {
    if ('lookup'.includes(interaction.options.getSubcommand())) {
      await Promise.all([
        await get(`http://ipwho.is/${interaction.options.getString('query')}`).then((res) => JSON.parse(res.text)),
        await get(`https://api.ipdata.co/${interaction.options.getString('query')}?api-key=${process.env.IPDATA_KEY}`).then((res) => JSON.parse(res.text)),
        await get(`https://api.ip2location.io/?key=${process.env.IPLOCATION_KEY}&ip=${interaction.options.getString('query')}&format=json`).then((res) => JSON.parse(res.text))
      ]).then(async (res) => {
        try {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'IP Address Information', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setThumbnail(res[1].flag)
            .addFields([
              {
                name: 'IP Information', value: [
                  `\`\`\``,
                  `IP Address: ${res[0].ip} (${res[0].type})`,
                  `Continent: ${res[0].continent} (${res[0].continent_code})`,
                  `Country: ${res[0].country} (${res[0].country_code})`,
                  `Region: ${res[0].region} (${res[0].region_code})`,
                  `Capital: ${res[0].capital}`,
                  `City: ${res[0].city} (${res[2].city_name})`,
                  `Borders: ${res[0].borders}`,
                  `Zip Code: ${res[2].zip_code}`,
                  `Language: ${res[1].languages[0].name} (${res[1].languages[0].code})`,
                  `Native: ${res[1].languages[0].native}`,
                  `Calling Code: +${res[0].calling_code}`,
                  `Coordinate: ${res[0].latitude}/${res[0].longitude} (Lat/Long)`,
                  `\`\`\``
                ].join('\n')
              }, {
                name: 'Contractor/Hosting Information', value: [
                  `\`\`\``,
                  `Routing: ${res[1].asn.route}`,
                  `ISP: ${res[0].connection.isp}`,
                  `Organisation: ${res[0].connection.org} (${res[1].asn.type.charAt(0).toUpperCase() + res[1].asn.type.slice(1)})`,
                  `Autonomous System: ${res[2].as}`,
                  `Autonomous System Number: ${res[0].connection.asn}`,
                  `Domain Name: ${res[0].connection.domain}`,
                  `\`\`\``
                ].join('\n')
              }, {
                name: 'Timezone Information', value: [
                  `\`\`\``,
                  `Timezone: ${res[0].timezone.id} (${res[0].timezone.abbr})`,
                  `Timezone Type: ${res[0].timezone.utc} (GMT)`,
                  `Timezone Offset: ${res[0].timezone.offset}`,
                  `Current Time: ${res[0].timezone.current_time}`,
                  `Current Time: ${moment(res[0].timezone.current_time).format('Do MMMM, YYYY, h:mm:ss a')}`,
                  `\`\`\``
                ].join('\n')
              }, {
                name: 'Currency Information', value: [
                  `\`\`\``,
                  `Currency Type: ${res[1].currency.name} (${res[1].currency.code})`,
                  `Currency Plural: ${res[1].currency.plural}`,
                  `Currency Symbol: ${res[1].currency.native} (${res[1].currency.symbol})`,
                  `\`\`\``
                ].join('\n')
              }, {
                name: 'Defending Information', value: [
                  `\`\`\``,
                  `Tor Browsing: ${res[1].threat.is_tor ? 'Yes' : 'No'}`,
                  `Proxy: ${res[1].threat.is_proxy ? 'Yes' : 'No'}`,
                  `iCloud Relay: ${res[1].threat.is_icloud_relay ? 'Yes' : 'No'}`,
                  `Datacenter: ${res[1].threat.is_datacenter ? 'Yes' : 'No'}`,
                  `Anonymous: ${res[1].threat.is_anonymous ? 'Yes' : 'No'}`,
                  `Known Attacking: ${res[1].threat.is_known_attacker ? 'Yes' : 'No'}`,
                  `Known Abuses: ${res[1].threat.is_known_abuser ? 'Yes' : 'No'}`,
                  `Threating: ${res[1].threat.is_threat ? 'Yes' : 'No'}`,
                  `Bogoning: ${res[1].threat.is_bogon ? 'Yes' : 'No'}`,
                  `\`\`\``
                ].join('\n')
              }
            ])
            .setFooter(
              { text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) }
            )
            .setColor(0x2c2d31)
            .setTimestamp();
          return await interaction.reply({ embeds: [embeds] });
        } catch {
          const embeds = new EmbedBuilder()
            .setAuthor({ name: 'IP Information', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setThumbnail(res[0].flag.img)
            .addFields([
              {
                name: 'IP Information', value: [
                  `\`\`\``,
                  `IP Address: ${res[0].ip} (${res[0].type})`,
                  `Continent: ${res[0].continent} (${res[0].continent_code})`,
                  `Country: ${res[0].country} (${res[0].country_code})`,
                  `Region: ${res[0].region} (${res[0].region_code})`,
                  `Capital: ${res[0].capital}`,
                  `City: ${res[0].city} (${res[2].city_name})`,
                  `Borders: ${res[0].borders}`,
                  `Zip Code: ${res[2].zip_code}`,
                  `Calling Code: +${res[0].calling_code}`,
                  `Coordinate: ${res[0].latitude}/${res[0].longitude} (Lat/Long)`,
                  `\`\`\``
                ].join('\n')
              }, {
                name: 'Contractor/Hosting Information', value: [
                  `\`\`\``,
                  `Routing: ${res[1].asn.route}`,
                  `ISP: ${res[0].connection.isp}`,
                  `Organisation: ${res[0].connection.org} (${res[1].asn.type.charAt(0).toUpperCase() + res[1].asn.type.slice(1)})`,
                  `Autonomous System: ${res[2].as}`,
                  `Autonomous System Number: ${res[0].connection.asn}`,
                  `Domain Name: ${res[0].connection.domain}`,
                  `\`\`\``
                ].join('\n')
              }, {
                name: 'Timezone Information', value: [
                  `\`\`\``,
                  `Timezone: ${res[0].timezone.id} (${res[0].timezone.abbr})`,
                  `Timezone Type: ${res[0].timezone.utc} (GMT)`,
                  `Timezone Offset: ${res[0].timezone.offset}`,
                  `Current Time: ${res[0].timezone.current_time}`,
                  `Current Time: ${moment(res[0].timezone.current_time).format('Do MMMM, YYYY, h:mm:ss a')}`,
                  `\`\`\``
                ].join('\n')
              }, {
                name: 'Defending Information', value: [
                  `\`\`\``,
                  `Tor Browsing: ${res[1].threat.is_tor ? 'Yes' : 'No'}`,
                  `Proxy: ${res[1].threat.is_proxy ? 'Yes' : 'No'}`,
                  `iCloud Relay: ${res[1].threat.is_icloud_relay ? 'Yes' : 'No'}`,
                  `Datacenter: ${res[1].threat.is_datacenter ? 'Yes' : 'No'}`,
                  `Anonymous: ${res[1].threat.is_anonymous ? 'Yes' : 'No'}`,
                  `Known Attacking: ${res[1].threat.is_known_attacker ? 'Yes' : 'No'}`,
                  `Known Abuses: ${res[1].threat.is_known_abuser ? 'Yes' : 'No'}`,
                  `Threating: ${res[1].threat.is_threat ? 'Yes' : 'No'}`,
                  `Bogoning: ${res[1].threat.is_bogon ? 'Yes' : 'No'}`,
                  `\`\`\``
                ].join('\n')
              }
            ])
            .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
            .setColor(0x2c2d31)
            .setTimestamp();
          return await interaction.reply({ embeds: [embeds] });
        }
      }).catch(async (err) => {
        const embeds = new EmbedBuilder()
          .setAuthor({ name: 'Xtream Defender', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
          .setDescription(`${err.response.body.message ? err.response.body.message : err.response.body.error.error_message}`)
          .setFooter({ text: 'Xtream Developers', iconURL: client.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
          .setColor(0x2c2d31)
          .setTimestamp();
        return await interaction.reply({ embeds: [embeds] });
      });
    }
  }
};