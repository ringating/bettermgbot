const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class ApplyQuestCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'applyquest',
            group: 'mapping',
            memberName: 'applyquest',
            description: "links a quest to a mapset"
        });
    }

    async run(message, args)
    {
        //establish data
        var maps = allData.getMaps();
        var user = message.member.displayName;
        var mapID = args;

        var partiesCollection = allData.getParties();
        var parties = partiesCollection.parties;

        //find beatmap
        var beatmap = maps.getBeatmap(mapID);     
        
        

        //find party name and user's position in members list
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


        if(args.length == 0){
            message.channel.send("You must specify a map ID!");
        }
        else if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }
        else if(party == undefined){
            message.channel.send("You must be in a party to connect mapsets to quests!");
        }
        else if(beatmap.host != user)
        {
            message.channel.send("You cannot edit someone else's mapset!");
        }
        else if(party.currentQuest == "")
        {
            message.channel.send("Your party is not currently assigned to any quests!");
        }
        else if(beatmap.quest != "")
        {
            message.channel.send("A quest has already been linked to this mapset!");
        }
        else{
            message.channel.send(`The **${party.currentQuest}** quest has been linked to **${beatmap.artist}** - **${beatmap.title}**!`);
            beatmap.quest = party.currentQuest;
        }

    }
}

module.exports = ApplyQuestCommand;