const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { get } = require('superagent');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('google')
        .setDescription('Google')
        .addSubcommand((options) => options
            .setName('search')
            .setDescription('search')
            .addStringOption((options) => options
                .setName('query')
                .setDescription('Please type your query!')
                .setRequired(true)
            )
        ),
    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {
        switch (interaction.options.getSubcommand()) {
            case 'search':
                await interaction.deferReply();
                let query = interaction.options.getString('query');
                let res = await get('https://customsearch.googleapis.com/customsearch/v1')
                    .query({ q: query, cx: process.env.GOOGLE_CX, key: process.env.GOOGLE_KEY });

                if (res.status >= 400) {
                    await interaction.editReply({ content: 'error' });
                }

                if (!res.body.items) {
                    const embeds = new EmbedBuilder()
                        .setDescription(`Your search - **${query}** - did not match any documents.`)
                        .addFields(
                            {
                                name: 'Suggestions:', value: [
                                    `• Make sure that all words are spelled correctly.`,
                                    `• Try different keywords.`,
                                    `• Try more general keywords.`,
                                    `• Try fewer keywords.`
                                ].join('\n')
                            }
                        )
                        .setColor(0x141318);
                    return await interaction.editReply({ embeds: [embeds], ephemeral: true });
                } else {
                    const embeds = new EmbedBuilder()
                        .setTitle(res.body.items[0].title)
                        .setURL(res.body.items[0].link)
                        .setDescription(res.body.items[0].snippet)
                        .setImage(res.body.items[0].pagemap.cse_image[0].src ?? res.body.items[0].pagemap.cse_thumbnail[0].src)
                        .setColor(0x141318);
                    return await interaction.editReply({ embeds: [embeds] });
                }
        }
    }
};