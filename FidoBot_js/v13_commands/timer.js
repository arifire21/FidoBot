const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const Timer = require('tiny-timer');
const ms = require('ms');

const timer = new Timer();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timer')
        .setDescription('Create, delete, or get time on a timer')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a new timer, display msg once done')
                .addIntegerOption(option => option.setName('time').setDescription('amnt of time (int)').setRequired(true))
                .addStringOption(option => option.setName('duration').setDescription('S (seconds), or M (minutes)').setRequired(true))
                .addStringOption(option => option.setName('message').setDescription('msg to send').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Select a role to ping [wip]').setRequired(false))
            )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Stop and delete an ongoing timer'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('Display current time, if any'))
    ,

    //setup done, now to the guts of this...
    async execute(interaction) {
        //subcommand 1
        if (interaction.options.getSubcommand() === 'create') {
            console.log("\ncreate_timer call");
            inputTime = interaction.options.getInteger('time');
            inputDuration = interaction.options.getString('duration');
            inputMsg = interaction.options.getString('message');
            roleID = interaction.options.getRole('role');
            userToMention = userMention(interaction.user.id);
    
            // arraySkeleton.timers.push(new BotTimer(inputTime,inputDuration, inputMsg, userID));
            // console.log(arraySkeleton.timers[arraySkeleton.timers.length-1].id);
    
            isTimerAllowed = true;
            //check if timer is currently running (todo, make one timer per person)
            if(timer.status == 'running'){
                await interaction.reply(userToMention + ', right now I can only process one timer at a time. Please wait.');
                isTimerAllowed = false;
                console.log('timer not created, one already running');
            }
            
            if(isTimerAllowed){
                console.log("input time: " + inputTime); console.log("input msg: " + inputMsg);
                inputTime.toString();
                catTime = inputTime + " " + inputDuration; console.log("cat: " + catTime);
                convertedTime = ms(catTime);
                console.log("converted to ms: " + convertedTime);
    
                roleToMention = roleMention(roleID);
                console.log("input role: " + roleToMention);
    
            //todo actually go based off id
                await interaction.reply(userToMention + ', timer set for ' + catTime + '...');
                timer.start(convertedTime);
                console.log('timer set successfully')
            }
    
            timer.on('done', () => {
                try {
                    console.log(convertedTime + ' -- timer done!');
                    if(roleToMention && isTimerAllowed){
                        interaction.followUp(roleToMention + ' -- ' + inputMsg);
                        //todo actually go based off id
                        // arraySkeleton.timers.pop()
                    }else{
                        if(isTimerAllowed){
                            interaction.followUp(userToMention + ' -- ' + inputMsg);
                        }
                        // }else{
                        //     interaction.followUp(userToMention + ' -- ' + inputMsg);
                        // }
                    } 
                } catch (error) {}
            })  //end timer done event
        }   //end create execute

        //subcommand 2
        else if(interaction.options.getSubcommand() === 'delete'){
            console.log("\ndelete_timer call");
            //todo finish
            timer.stop();
            console.log()
        }

        //subcommand 3
        else{
            console.log("\nget_timer call");
            userToMention = userMention(interaction.user.id);
    
            if(timer.status != 'running'){
                console.log(timer.status);
                await interaction.reply(userToMention + ', there is no timer running.');
            }else{
                timerEmbed.setDescription('time remaining: `' + ms(timer.time) + '`');
                await interaction.reply({ embeds: [embed]});
            }
        }
    }
}