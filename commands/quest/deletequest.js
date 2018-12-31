const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class DeleteQuestCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'deletequest',
            group: 'quest',
            memberName: 'deletequest',
            description: "deletes a quest"
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

        //find quest
        var quest = quests.getQuest(questID);

       

        var party;
        if(partyName != undefined){
            party = partiesCollection.partySearch[partyName.toLowerCase()];
        }



        if(args.length == 0)
        {
            message.channel.send(`You must specify a quest ID!`);
        }
        else if(user != "pishifat")
        {
            message.channel.send(`You're not allowed to do that ;)`);
        }
        else
        {
            //remove quest from party's assigned quest
            var partyName;
            parties.forEach(party => {
                if(party.currentQuest == quest.name){
                    party.currentQuest = "";
                }
            })

            message.channel.send(`The **${quest.name}** quest has been deleted!`);
            
            quests.removeQuest(questID);

            
        }
    }
}

module.exports = DeleteQuestCommand;