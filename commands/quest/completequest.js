const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class CompleteQuestCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'completequest',
            group: 'quest',
            memberName: 'completequest',
            description: "markes a quest as complete"
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

       



        if(args.length == 0)
        {
            message.channel.send(`Only pishifat can do that.`);
        }
        else if(user != "pishifat")
        {
            message.channel.send(`Only pishifat can do that.`);
        }
        else if(quest.status == "Done"){
            message.channel.send(`Quest already complete.`);
        }
        else
        {
            //remove quest from party's assigned quest
            parties.forEach(party => {
                if(party.currentQuest == quest.name){
                    party.currentQuest = "";
                }
            })

            quest.status = "Done";

            message.channel.send(`The **${quest.name}** quest has been completed by the **${quest.assignedParty}** party!`);
        }
    }
}

module.exports = CompleteQuestCommand;