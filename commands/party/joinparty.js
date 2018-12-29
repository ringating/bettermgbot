const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class JoinPartyCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'joinparty',
            group: 'party',
            memberName: 'joinparty',
            description: "adds user to a party"
        });
    }

    async run(message, args)
    {
        var user = message.member.displayName;
        var partyName = args;
        var parties = allData.getParties();
        var party = parties.partySearch[partyName.toLowerCase()];
        if(args.length == 0)
        {
            message.channel.send(`You must specify a party name!`);
        }
        else if(party == undefined)
        {
            message.channel.send(`That party doesn't exist! Make sure you spelled it correctly.`);
        }
        else if(parties.isLeader(user) || parties.isMember(user))
        {
            message.channel.send(`You can only be involved with one party at a time! Leave your current party before joining a new one.`);
        }
        else if((party.currentQuest) != '')
        {
            message.channel.send(`You cannot join a party that is currently running a quest!`);
        }
        else if(party.reachesMemberLimit())
        {
            message.channel.send(`That party has too many members to join!`);
        }else
        {
            party.members.push(user);
            message.channel.send(`**${user}** has joined the **${party.name}** party!`);
        }
    }
}

module.exports = JoinPartyCommand;