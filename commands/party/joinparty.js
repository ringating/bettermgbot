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
        console.log(parties.test());
        var party = parties.partySearch[partyName.toLowerCase()];
        console.log(party);
        if(party == undefined)
        {
            message.channel.send(`that party doesnt exist`);
        }
        else if(parties.isLeader(user) || parties.isMember(user))
        {
            message.channel.send(`already in a party`);
        }
        else if((party.currentQuest) != '')
        {
            message.channel.send(`cant join a party that's running a quest`);
        }
        else if(party.reachesMemberLimit())
        {
            message.channel.send(`cant join a party that's running a quest`);
        }else
        {
            console.log(party.currentQuest + "e");
            party.members.push(user);
        }
    }
}

module.exports = JoinPartyCommand;