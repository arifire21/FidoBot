const Discord = require('discord.js');
// const index = require('./../index.js');
let dogNameArg = '';

const dogProfile = new Discord.MessageEmbed()
    //todo ping user when embed is shown
    .setColor('#45C3D6')
    .setTitle(dogNameArg)
    .setAuthor('Follow Fido App')
    //commented out to avoid taking up resources, will replace with actual user acc stuff    
    // .setThumbnail('https://raw.githubusercontent.com/arifire21/FidoBot/main/FidoBot_js/dog_icons/dog1.png')
    .addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	);

    module.exports = {
    name: 'embedtest',
	description: 'test',
	execute(message, args) {
        const user = message.author;
        console.log(args[0]);
        dogNameArg = args[0];

        if(!dogNameArg){
            message.reply('you need to provide a single dog name.');
        }
        else{
            message.channel.send(`<@${user.id}> Profile for your dog \`` + dogNameArg + `\``);
            message.channel.send(dogProfile);
        }
    },
}