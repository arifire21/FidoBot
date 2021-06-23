module.exports = {
    name: 'colorroles',
	description: 'Create set of color emojis so users can react',
	execute(message, args) {
        message.channel.send('test').then(msg=> { msg.react('🔴') }).catch();
		// message.channel.send('Cool collar colors! :sparkle" React to one to change your name color!');
        // message.react('🔴');
        // message.react('🟠');
        // message.react('🟡');
        // message.react('🟢');
        // message.react('🔵');
        // message.react('🟣');
        // message.react('🟤');

        
	},
}