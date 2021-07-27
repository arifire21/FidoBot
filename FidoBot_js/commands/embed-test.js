const Discord = require('discord.js');
// const index = require('./../index.js');
var dogNameArg = '';
var dogBreed = '';

function capitalizeDogName(dogName){
	return dogNameArg = charAt(0).toUpperCase() + dogNameArg.slice(1);
}

const dogProfile = new Discord.MessageEmbed()
    .setColor('#45C3D6')
    .setTitle('Dog Name')
    .setAuthor('Follow Fido App')
    //commented out to avoid taking up resources, will replace with actual user acc stuff    
    // .setThumbnail('https://raw.githubusercontent.com/arifire21/FidoBot/main/FidoBot_js/dog_icons/dog1.png')
    // .addFields(
	// 	{ name: 'Breed', value: 'Some value here' },
	// 	{ name: '\u200B', value: '\u200B' },
	// 	{ name: 'Today\'s Walk Dist.', value: 'Some value here', inline: true },
	// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
    // )
	;

    module.exports = {
    name: 'embedtest',
	description: 'test',
	execute(message, args) {
        const user = message.author;
        dogNameArg = args[0];
        dogBreed = args[1];

        if(!dogNameArg){
            message.reply('you need to provide a single dog name.');
        }
        else{
            message.channel.send(`<@${user.id}> Profile for your dog \`` + dogNameArg + `\``);
            capitalizeDogName(dogNameArg);
            dogProfile.setTitle(dogNameArg);
            dogProfile.addFields(
                { name: 'Breed', value: dogBreed },
                { name: '\u200B', value: '\u200B' },
                { name: 'Today\'s Walk Dist.', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            message.channel.send(dogProfile);
        }
    },
}
