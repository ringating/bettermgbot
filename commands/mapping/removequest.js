const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class RemoveQuestCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'removequest',
            group: 'mapping',
            memberName: 'removequest',
            description: "removes the link of a quest to a mapset"
        });
    }

    async run(message, args)
    {
        //establish data
        var maps = allData.getMaps();
        var user = message.member.displayName;
        var mapID = args;

        //find beatmap
        var beatmap = maps.getBeatmap(mapID);     


        if(args.length == 0){
            message.channel.send("You must specify a map ID!");
        }
        else if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }
        else if(beatmap.host != user)
        {
            message.channel.send("You cannot edit someone else's mapset!");
        }
        else if(beatmap.quest == "")
        {
            message.channel.send("There is no quest assigned this mapset!");
        }  
        else{
            message.channel.send(`The **${beatmap.quest}** quest has been removed from **${beatmap.artist}** - **${beatmap.title}**!`);
            beatmap.quest = "";
        }

    }
}

module.exports = RemoveQuestCommand;