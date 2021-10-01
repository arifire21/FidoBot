const {MessageActionRow, MessageButton} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('Project Info')
            .setStyle('LINK')
            .setURL('https://devpost.com/software/follow-fido'),
        new MessageButton()
            .setLabel('Main GitHub')
            .setStyle('LINK')
            .setURL('https://github.com/andrewscfl/follow-fido'),
        new MessageButton()
            .setLabel('FidoBot GitHub')
            .setStyle('LINK')
            .setURL('https://github.com/arifire21/FidoBot'),
    )

module.exports = {
    data: new SlashCommandBuilder()
    .setName('followfido')
    .setDescription('About Us!')
    .addBooleanOption(option => option.setName('hide-buttons').setDescription('Make visible *only* to you').setRequired(true))
    ,

    async execute(interaction) {
        const boolean = interaction.options.getBoolean('hide-buttons');
        console.log('show button option: ' + boolean);

        if(boolean)
            await interaction.reply({ content: 'Learn about us here! :blue_heart:', ephemeral: true, components: [row] });
        else{
        //if no option was clicked, or if user manually selected false
            await interaction.reply({ content: 'Learn about us here! :blue_heart:', components: [row] });
        }
    }
}
