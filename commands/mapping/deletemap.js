const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class DeleteMapCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'deletemap',
            group: 'mapping',
            memberName: 'deletemap',
            description: "deletes a map"
        });
    }

    async run(message, args)
    {

        //establish data
        var maps = bmData.getMaps();
        var user = message.member.displayName;
        var mapID = args;
        
        var beatmap = maps.getBeatmap(mapID);
        if(args.length == 0){
            message.channel.send("You must specify a map ID!");
        }else if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }else if(beatmap.host != user){
            message.channel.send("You cannot delete someone else's mapset!");
        }else{
            maps.removeBeatmap(mapID);
            message.channel.send(`**${beatmap.artist}** - **${beatmap.title}** has been deleted!`);
        }
    }
}

module.exports = DeleteMapCommand;