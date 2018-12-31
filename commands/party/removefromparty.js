const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class RemoveFromPartyCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'removefromparty',
            group: 'party',
            memberName: 'removefromparty',
            description: "removes someone from a party"
        });
    }

    async run(message, args)
    {
        var user = message.member.displayName;
        var otherUser = args.toLowerCase();
        var partiesCollection = allData.getParties();
        var parties = partiesCollection.parties;

        //find party name
        var partyName;
        parties.forEach(party => {
            if(party.members.indexOf(user) >= 0){
                partyName = party.name;
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


        //find quest info
        var questsCollection = allData.getQuests();
        var quests = questsCollection.quests;

        //find quest
        var questID;
        
        quests.forEach(quest => {
            if(quest.members.indexOf(user) >= 0){
                questID = quest.id;
            }
        })
        var quest = questsCollection.getQuest(questID);

        var noCapsQuest = [];
        if(quest != undefined){
            for (var i = 0; i < quest.members.length; i++) {
                noCapsQuest.push(quest.members[i].toLowerCase());
            }
        }
        var questUserIndex = noCapsQuest.indexOf(otherUser);



        //do shit
        if(args.length == 0)
        {
            message.channel.send(`You must specify a user in your party to be removed!`);
        }
        else if(party == undefined)
        {
            message.channel.send(`You must be in a party to use this command!`);
        }
        else if(party.leader != user)
        {
            message.channel.send(`You must be a party's leader to remove others from the party!`);
        }
        else if(otherUserIndex <= 0)
        {
            message.channel.send("That user isn't in your party!");
        }
        else if(party.members.length == quest.minParty)
        {
            message.channel.send(`**${user}** has been removed from the **${partyName}** party! The **${partyName}** party has abandoned **${quest.name}**!`);

            //find which maps mapper made and remove quest from them
            var maps = allData.getMaps();
            maps.beatmaps.forEach(beatmap =>{
                if(beatmap.host == party.members[otherUserIndex])
                {
                    if(beatmap.status != "Ranked"){
                        beatmap.quest = "";
                    }
                }
            });

            party.members.splice(otherUserIndex, 1);
            party.currentQuest = "";

            quest.members = [];
            quest.status = "open";
            quest.assignedParty = "";

            


        }else
        {
            //find which maps mapper made and remove quest from them
            var maps = allData.getMaps();
            maps.beatmaps.forEach(beatmap =>{
                if(beatmap.host == party.members[otherUserIndex])
                {
                    if(beatmap.status != "Ranked"){
                        beatmap.quest = "";
                    }
                }
            });

            message.channel.send(`**${party.members[otherUserIndex]}** has been removed from the **${partyName}** party!`);
            party.members.splice(otherUserIndex, 1);
            quest.members.splice(questUserIndex, 1);
        }
    }
}

module.exports = RemoveFromPartyCommand;