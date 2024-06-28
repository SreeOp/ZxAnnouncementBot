const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedmessage')
        .setDescription('Create an embedded message with optional fields.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The title of the embed'))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('The description of the embed'))
        .addStringOption(option =>
            option.setName('image')
                .setDescription('The URL of the image'))
        .addStringOption(option =>
            option.setName('footer')
                .setDescription('The footer text'))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The color of the embed (in hex format)')),
    async execute(interaction) {
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const image = interaction.options.getString('image');
        const footer = interaction.options.getString('footer');
        const color = interaction.options.getString('color');

        const embed = new EmbedBuilder();

        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (image) embed.setImage(image);
        if (footer) embed.setFooter({ text: footer });
        if (color) embed.setColor(color);

        await interaction.reply({ embeds: [embed] });
    },
};
