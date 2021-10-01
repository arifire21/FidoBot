const config = require('./config.json');
const fs = require('fs');
const { Client, Collection, Intents, MessageButton, ButtonInteraction } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES]});
client.commands = new Collection();

const commandFiles = fs.readdirSync('./v13_commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./v13_commands/${file}`);
	// console.log(file);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module

	//extra thing bc the non-slash cmd keeps killing it
	//TODO: verify it gets name
	// if(file === 'color-roles-admin.js'){
	// 	client.commands.set(command.name, command);
	// 	console.log('color-roles-admin cmd set');
	// } else {
		client.commands.set(command.data.name, command);
	// }
}

client.once('ready', () => {
	// Remove all commands
	// client.application.commands.set([])
	// .then(console.log)
	// .catch(console.error);
	
	console.log('FidoBot-- v13! Ready!');
	//just fun to swap out lol
	client.user.setActivity('Now js v13!'); client.user.setStatus('online');
	//client.user.setActivity('TESTING COMMANDS'); client.user.setStatus('dnd');

});

//for slash commands
client.on('interactionCreate', async interaction => {
	// console.log(interaction);
	if(interaction.isCommand()){
	const command = client.commands.get(interaction.commandName);
		if (!command) return; //catch all for mistake??

		try {
			if(command === 'colorroles-new'){
				//extra thing to make it owner/admin only
				if(interaction.user.id != config.owner){
					interaction.reply('Bork! This command is only accessable to my owner!')
				} else {
					console.log('colorroles-new called!');
					await command.execute(interaction);
				}
			} else
				await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}	//end isCommand

	if(interaction.isButton()){
		console.log('\nyes, im a button')
		targetColor = interaction.customId;		//actually spent 20 mins thinking it was some complicated ButtonInteraction stuff, ofc its simple
		console.log('target: ' + targetColor);
		//look for role
		const role = interaction.guild.roles.cache.find(role => role.name === targetColor);
		console.log('role: ' + role);
		const member = interaction.member; //is it really that much shorter?
		console.log('user: ' + member);

		//check to see if user already has it...
		if(member.roles.cache.some(role => role.name === targetColor)) {
			//if yes, remove
			member.roles.remove(role);
			console.log(targetColor + ' removed from ' + member.displayName + ' in ' + interaction.guild.name);
			await interaction.reply({ content: 'Successfully removed ' + targetColor + '.', ephemeral: true });
		}else {	//if no, add
			member.roles.add(role);
			console.log(targetColor + ' added to ' + member.displayName + ' in ' + interaction.guild.name);
			await interaction.reply({ content: 'Successfully added ' + targetColor + '.', ephemeral: true });
		}
	}	//end isButton
});

//for non slash commands, keep in case needed
// client.on('message', message => {
// 	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

// 	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
// 	const command = args.shift().toLowerCase();

// 	if (!client.commands.has(command)) return;

// 	try {
// 		if(command === 'colorroles-new'){
// 			//extra thing to make it owner/admin only
// 			// if(message.author.id != config.owner){
// 				message.reply('Bork! This command is only accessable to my owner!')
// 			// } else {
// 				console.log('colorroles-new called!');
// 				client.commands.get('colorroles-new').execute(message, client);
// 			// }
// 		}
	// } catch (error) {
	// 	console.error(error);
	// 	message.reply('There was an error trying to execute that command!');
	// }
// });

client.login(config.token);