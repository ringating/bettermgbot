const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class LeavePartyCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'leaveparty',
            group: 'party',
            memberName: 'leaveparty',
            description: "deletes user from a party"
        });
    }

    async run(message, args)
    {
        var user = message.member.displayName;
        var partiesCollection = allData.getParties();
        var parties = partiesCollection.parties;

        //find party name and user's position in members list
        var partyName;
        var userIndex;
        parties.forEach(party => {
            if(party.members.indexOf(user) >= 0){
                partyName = party.name;
                userIndex = party.members.indexOf(user);
                console.log(partyName);
                console.log(userIndex);
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

        
        

        //do shit
        if(party == undefined)
        {
            message.channel.send(`You are not in any parties!`);
        }
        else if(party.members.length == 1)
        {
            partiesCollection.removeParty(partyName);
            message.channel.send(`**${user}** has left the **${partyName}** party! The **${partyName}** party has been disbanded!`);
        }
        else if(partiesCollection.isLeader(user))
        {
            message.channel.send("You must transfer leadership before leaving this party! Use the command `!newLeader partyName | user`");
        }
        else if(party.members.length == quest.minParty)
        {
            party.members.splice(userIndex, 1);
            party.currentQuest = "";

            quest.members = [];
            quest.status = "open";
            quest.assignedParty = "";

            //find which maps mapper made and remove quest from them
            var maps = allData.getMaps();
            maps.beatmaps.forEach(beatmap =>{
                if(beatmap.host == user)
                {
                    if(beatmap.status != "Ranked"){
                        beatmap.quest = "";
                    }
                }
            })

            message.channel.send(`**${user}** has left the **${partyName}** party! The **${partyName}** party has abandoned **${quest.name}**!`);
        }
        else
        {

            //find which maps mapper made and remove quest from them
            var maps = allData.getMaps();
            maps.beatmaps.forEach(beatmap =>{
                if(beatmap.host == user)
                {
                    if(beatmap.status != "Ranked"){
                        beatmap.quest = "";
                    }
                }
            })

            party.members.splice(userIndex, 1);
            quest.members.splice(questUserIndex, 1);

            

            message.channel.send(`**${user}** has left the **${partyName}** party!`);
        }
    }
}

module.exports = LeavePartyCommand;