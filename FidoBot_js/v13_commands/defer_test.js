const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('defertest')
		.setDescription('defers message'),
	async execute(interaction) {
		await interaction.deferReply();
        // await wait(4000);
        await interaction.editReply('New text!');
	},
};