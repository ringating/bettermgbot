const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class RegisterCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'register',
            group: 'user',
            memberName: 'register',
            description: "registers user"
        });
    }

    async run(message, args)
    {
        //get data
        var user = message.member.displayName;
        var users = allData.getUsers();


        //do shit
        if(users.getUser(user) != undefined)
        {
            message.channel.send(`You're already registered!`);
        }else{
            users.addUser(user);


        //confirmation message
        message.channel.send(`**${user}** is now registered with the Mappers' Guild!`);
        }
    }
}

module.exports = RegisterCommand;