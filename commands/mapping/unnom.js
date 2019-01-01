const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class UnnomCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'unnom',
            group: 'mapping',
            memberName: 'unnom',
            description: "unreserve a nomination"
        });
    }

    async run(message, args)
    {
        //establish data
        var maps = bmData.getMaps();
        var user = message.member.displayName;
        var mapID = args;

        //find beatmap
        var beatmap = maps.getBeatmap(mapID);

        if(args.length == 0){
            message.channel.send("You must specify a map ID!");
        }
        else if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }else{
            var taskCount = 0;
            for(var i=0; beatmap.tasks[i] != undefined; i++)
            {
                if(beatmap.tasks[i].mappers.indexOf(user) >= 0)
                {
                    taskCount++;
                    console.log(taskCount);
                }
            }
            if(taskCount > 0)
            {
                message.channel.send("You can't unreserve nominations for mapsets you participated in!");
            }else if(beatmap.bns.indexOf(user) < 0){
                message.channel.send("You didn't have a nomination for this mapset reserved!");
            //}else if(USER ALREADY NOMINATED){
            //    message.channel.send("There are already two Beatmap Nominator reserved for this mapset!");
            }else{
                beatmap.bns.splice(beatmap.bns.indexOf(user), 1);
                message.channel.send(`You've been removed from the Beatmap Nominator reserve list for **${beatmap.artist}** - **${beatmap.title}**!`);
            }
        }
    }
}

module.exports = UnnomCommand;