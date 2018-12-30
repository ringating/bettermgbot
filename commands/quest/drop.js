const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class DropQuestCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'drop',
            group: 'quest',
            memberName: 'drop',
            description: "drops a quest for a party"
        });
    }

    async run(message, args)
    {
        //get data
        var user = message.member.displayName;

        //get party info
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

       //find quest info
       var questsCollection = allData.getQuests();
       var quests = questsCollection.quests;

       //find quest
       var questID;
       var questUserIndex;
       quests.forEach(quest => {
           if(quest.members.indexOf(user) >= 0){
               questID = quest.id;
               questUserIndex = quest.members.indexOf(user);
           }
       })

       var quest = questsCollection.getQuest(questID);



        if(party == undefined)
        {
            message.channel.send(`You need to be in a party to accept quests!`);
        }
        else if(quest == undefined)
        {
            message.channel.send(`Your party is not assigned a quest!`);
        }
        else if(party.leader != user)
        {
            message.channel.send(`Only a party's leader can drop quests!`);
        }
        else
        {
            quest.members = [];
            quest.status = "open";
            quest.assignedParty = "";

            party.currentQuest = "";

            message.channel.send(`The **${party.name}** party has dropped the **${quest.name}** quest!`);
        }
    }
}

module.exports = DropQuestCommand;