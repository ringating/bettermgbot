const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class NewLeaderCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'newleader',
            group: 'party',
            memberName: 'newleader',
            description: "transfers leadership within a party"
        });
    }

    async run(message, args)
    {
        var user = message.member.displayName;
        var otherUser = args.toLowerCase();
        var partiesCollection = allData.getParties();
        var parties = partiesCollection.parties;

        //find party name and user's position in members list
        var partyName;
        var userIndex;
        parties.forEach(party => {
            if(party.members.indexOf(user) >= 0){
                partyName = party.name;
                userIndex = party.members.indexOf(user);
            }
        }) 

        //find other user's index
        var noCapsParty = [];
        var party;
        if(partyName != undefined){
            party = partiesCollection.partySearch[partyName.toLowerCase()];

            for (var i = 0; i < party.members.length; i++) {
                noCapsParty.push(party.members[i].toLowerCase());
            }
        }
        var otherUserIndex = noCapsParty.indexOf(otherUser);



        //do shit
        if(args.length == 0)
        {
            message.channel.send(`You must specify a user in your party to be its new leader!`);
        }
        else if(party == undefined)
        {
            message.channel.send(`You must be in a party to use this command!`);
        }
        else if(party.leader != user)
        {
            message.channel.send(`You must be a party's leader to transfer leadership!`);
        }
        else if(otherUserIndex <= 0)
        {
            message.channel.send("You cannot transfer leadership to someone outside of the party!");
        }
        else
        {
            party.leader = party.members[otherUserIndex];
            message.channel.send(`The **${party.name}** party's leader is now **${party.members[otherUserIndex]}**`);
        }
    }
}

module.exports = NewLeaderCommand;