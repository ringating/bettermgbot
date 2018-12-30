const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class LinkCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'link',
            group: 'mapping',
            memberName: 'link',
            description: "links a mapset to its osu parallel"
        });
    }

    async run(message, args)
    {
        //establish data
        var maps = bmData.getMaps();
        var user = message.member.displayName;


        //process arguments
        var formatError = 'Incorrect format! The format is `!link mapID | onlineMapID`. Your online map ID is the number following "beatmapsets" in the URL.\nFor example, the online map ID for <https://osu.ppy.sh/beatmapsets/669437#osu/1415946> is "669437"';
        var splits = args.split("|");
        if(splits.length < 2)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }
        var mapID = splits[0].trim();
        var onlineMapID = splits[1].trim();
        if(mapID.length == 0 || onlineMapID.length == 0)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }

        //find beatmap
        var beatmap = maps.getBeatmap(mapID);       
        
        if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }
        else if(beatmap.host != user){
            message.channel.send("You cannot edit someone else's mapset!");
        }
        //else if(online id doesnt match song){
        //    message.channel.send('Your online map ID is the number following "beatmapsets" in the URL.\nFor example, the online map ID for <https://osu.ppy.sh/beatmapsets/669437#osu/1415946> is "669437"');
        //}
        else{
            beatmap.link = `https://osu.ppy.sh/beatmapsets/${onlineMapID}`;
            message.channel.send(`The link for **${beatmap.artist}** - **${beatmap.title}** has been updated!`);
        }
    }
}

module.exports = LinkCommand;