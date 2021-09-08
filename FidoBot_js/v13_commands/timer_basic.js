const { SlashCommandBuilder } = require('@discordjs/builders');
const Timer = require('tiny-timer');

const timer = new Timer();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timerbasic')
		.setDescription('timer that lasts for specified seconds, then sends message')
        .addIntegerOption(option => option.setName('ms').setDescription('time in milliseconds').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('msg to send after timer').setRequired(true))
        ,
	
    async execute(interaction) {
        const inputTime = interaction.options.getInteger('ms');
        const inputMsg = interaction.options.getString('message');
        console.log("input time: " + inputTime);
        console.log("input msg: " + inputMsg);

        await interaction.deferReply();
        // setTimeout(() => console.log("Second"), inputTime);

        timer.start(inputTime);

        timer.on('done', () => {
            console.log('timer done!');
            interaction.editReply(inputMsg);
        })
    }
}