const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class NewQuestCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'newquest',
            group: 'quest',
            memberName: 'newquest',
            description: "creates a new quest"
        });
    }

    async run(message, args)
    {
        //get data
        var user = message.member.displayName;
        var questName = args;
        var quests = allData.getQuests();


        //process stuff
        var splits = args.split("|");
        if(splits.length < 6)
        {
            message.channel.send("no");
            return; // breaks out of run(), effectively halting this command here
        }
        var questName = splits[0].trim();
        var description = splits[1].trim();
        var reward = splits[2].trim();
        var minParty = splits[3].trim();
        var maxParty = splits[4].trim();
        var minRank = splits[5].trim();

        //template: !newquest *namirin Map Pack | Create at least 5 mapsets for *namirin songs, each hosted by a different user | 20 | 5 | 10 | 0
        

        //do shit
        if(user != "pishifat")
        {
            message.channel.send(`nope`);
        }else{
            //adds the map
            var id = quests.getTopID()+1;
            quests.addQuest(id, questName, description, reward, minParty, maxParty, minRank);


        //confirmation message
        message.channel.send(`The **${questName}** quest has been created! It's ID is **${id}**`);
        }
    }
}

module.exports = NewQuestCommand;