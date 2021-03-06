const Discord = require('discord.js-commando');
const bot = new Discord.Client({
    commandPrefix: '!',
    owner: '92858431257456640',
    disableEveryone: true,
    unknownCommandResponse: true
});
const fs = require('fs');
const TOKEN = JSON.parse(fs.readFileSync('indexToken.json','utf-8')).token;

bot.registry.registerGroup('reactive', 'Reactive');
bot.registry.registerGroup('reference', 'References');
bot.registry.registerGroup('party', 'Party');
bot.registry.registerGroup('quest', 'Quest');
bot.registry.registerGroup('mapping', 'Mapping');
bot.registry.registerGroup('user', 'User');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');


bot.on('ready', function(){
    console.log("ready");
})

bot.login(TOKEN);
