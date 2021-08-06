//basically do the heavy work in here. interpret returned values in index.js
//success = 1, false = 0

// module.exports.totallyRealAuthentication = function(){
module.exports = {
    execute(message, args){
        let specifiedUser = getUserFromMention(args[0]);
        let tempPass = arg[1];
        // const user = message.author;
        
        //check if user given matches the author
        if(specifiedUser.id != message.author.id){
            return message.reply('Auth failed. Msg author and argument do not match.');
        }else{
            return message.reply('Auth passed. Msg author and argument match.');
        }
        // if tempPass
    }
}

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		// if (mention.startsWith('!')) {
		// 	mention = mention.slice(1);
		// }

		return client.users.cache.get(mention);
	}
}
