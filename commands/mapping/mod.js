const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class ModCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'mod',
            group: 'mapping',
            memberName: 'mod',
            description: "modder modded"
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

        
        if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }else if(beatmap.host == user){
            message.channel.send("You can't mod your own mapset!");
        }else if(beatmap.modders.length > 0 && beatmap.modders.indexOf(user) >= 0){
            message.channel.send("You've already been marked as a modder for this mapset!");
    //    }else if(USER DIDNT MOD ENOUGH){
    //        message.channel.send("You haven't modded enough of the mapset to be rewarded points.");
        }else{
            beatmap.modders.push(user);
            message.channel.send(`You've been added to the modder list for **${beatmap.artist}** - **${beatmap.title}**! <@!92858431257456640> will ensure you actually did it though ;)`);
        }
    }
}

module.exports = ModCommand;