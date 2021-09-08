const { SlashCommandBuilder, userMention, roleMention } = require('@discordjs/builders');
const Timer = require('tiny-timer');
const ms = require('ms');

const timer = new Timer();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timerbasic')
		.setDescription('timer that lasts for specified amnt, then sends message')
        .addIntegerOption(option => option.setName('time').setDescription('amnt of time (int)').setRequired(true))
        .addStringOption(option => option.setName('duration').setDescription('s, m, or h').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('msg to send').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Select a role to ping').setRequired(false))
        ,
	
    async execute(interaction) {
        console.log("\ntimer_basic call");
        const inputTime = interaction.options.getInteger('time');
        inputTime.toString();
        const inputDuration = interaction.options.getString('duration');
        const inputMsg = interaction.options.getString('message');
        const roleID = interaction.options.getRole('role');
        console.log("input time: " + inputTime);
        console.log("input msg: " + inputMsg);
        
        const role = roleMention(roleID);
        console.log("input role: " + role);

        catTime = inputTime + " " + inputDuration;
        console.log("cat: " + catTime);
        convertedTime = ms(catTime);
        console.log("converted to ms: " + convertedTime);

        await interaction.reply("Timer set for " + catTime + "...");
        timer.start(convertedTime);

        timer.on('done', () => {
            console.log(convertedTime + ' -- timer done!');
            if(role){
                interaction.followUp(role + ' ' + inputMsg);
            }else{
                interaction.followUp(inputMsg);
            }
        })
    }
}