const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class NomCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'nom',
            group: 'mapping',
            memberName: 'nom',
            description: "reserve a nomination"
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

        if(args.length == 0)
        {
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
            if(taskCount > 0 || beatmap.host == user)
            {
                message.channel.send("You can only reserve nominations for mapsets you did not participate in!");
            }
            //else if(){
            //    message.channel.send("not BN");
            //}
            else if(beatmap.bns.length > 1){
                message.channel.send("There are already two Beatmap Nominators reserved for this mapset!");
            }else if(beatmap.bns.indexOf(user) >= 0){
                message.channel.send("You've already reserved your nomination for this map!");
            }
            else{
                beatmap.bns.push(user);
                message.channel.send(`You've been added to the Beatmap Nominator reserve list for **${beatmap.artist}** - **${beatmap.title}**!`);
            }
        }
    }
}

module.exports = NomCommand;