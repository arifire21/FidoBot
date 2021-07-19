module.exports = {
    name: 'colorroles',
	description: 'Create set of color emojis so users can react',
	execute(message, args) {
        message.channel.send('Cool collar colors! :sparkles: React to one to change your name color!')
            .then(function (message){
                message.react('🔴')
                message.react('🟠')
                message.react('🟡')
                message.react('🟢')
                message.react('🔵')
                message.react('🟣')
                message.react('🟤')
            }
        );
	},
}