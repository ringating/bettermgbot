const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class AcceptQuestCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'accept',
            group: 'quest',
            memberName: 'accept',
            description: "accepts a quest for a party"
        });
    }

    async run(message, args)
    {
        //get data
        var user = message.member.displayName;
        var questID = args;
        var quests = allData.getQuests();

        var partiesCollection = allData.getParties();
        var parties = partiesCollection.parties;

        //find party
        var partyName;
        parties.forEach(party => {
            if(party.members.indexOf(user) >= 0){
                partyName = party.name;
            }
        })

        var party;
        if(partyName != undefined){
            party = partiesCollection.partySearch[partyName.toLowerCase()];
        }

        //find quest
        var quest = quests.getQuest(questID);

        if(args.length == 0)
        {
            message.channel.send(`You must specify a quest ID!`);
        }
        else if(party == undefined)
        {
            message.channel.send(`You need to be in a party to accept quests!`);
        }
        else if(quest == undefined)
        {
            message.channel.send(`That quest doesn't exist! Re-check your quest ID.`);
        }
        else if(party.leader != user)
        {
            message.channel.send(`You need to be a party leader to accept quests!`);
        }
        else if(party.currentQuest != "")
        {
            message.channel.send(`You can only do one quest at a time!`);
        }
        else if(party.rank < quest.minRank)
        {
           message.channel.send(`Your party is not a high enough rank to accept this quest! For rank 1 quests, at least half of the party's members must be rank 1.`);
        }
        else if(party.members.length < quest.minParty)
        {
            message.channel.send(`Your party does not have enough members for this quest!`);
        }
        else if(party.members.length > quest.maxParty)
        {
            message.channel.send(`Your party does not have enough members for this quest!`);
        }
        else
        {
            quest.assignedParty = party.name;
            quest.members.push.apply(quest.members, party.members);
            quest.status = "WIP";
            party.currentQuest = quest.name;
            message.channel.send(`The **${party.name}** party has registered the **${quest.name}** quest! Good luck!`);
        }
    }
}

module.exports = AcceptQuestCommand;