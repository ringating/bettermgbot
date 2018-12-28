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
            message.channel.send(`That name is already being used by another party! Choose a different name.`);
        }else if(parties.isLeader(user) || parties.isMember(user))
        {
            message.channel.send(`You can only be involved with one party at a time! Leave your current party before creating a new one.`);
        }else{
            parties.addParty(partyName, user);
            parties.joinParty(partyName, user);
            message.channel.send(`The **${partyName}** party has been created!`);
        }
    }
}

module.exports = NewPartyCommand;