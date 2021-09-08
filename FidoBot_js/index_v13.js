const config = require('./config.json');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./v13_commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./v13_commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('FidoBot-- v13! Ready!');
	client.user.setActivity('Now js v13!'); client.user.setStatus('online');
});

client.on('interactionCreate', async interaction => {
	console.log(interaction);
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(config.token);