const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class NewPartyCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'newparty',
            group: 'party',
            memberName: 'newparty',
            description: "creates a party"
        });
    }

    async run(message, args)
    {
        var user = message.member.displayName;
        var partyName = args;
        var parties = allData.getParties();
        var party = parties.partySearch[partyName.toLowerCase()];
        if(!(party == undefined))
        {
            message.channel.send(`name in use`);
        }else if(parties.isLeader(user) || parties.isMember(user))
        {
            message.channel.send(`already in a party`);
        }else{
            parties.addParty(partyName, user);
        }
    }
}

module.exports = NewPartyCommand;