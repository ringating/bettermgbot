const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class ChangeArtistCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'changeartist',
            group: 'mapping',
            memberName: 'changeartist',
            description: "changes artist metadata"
        });
    }

    async run(message, args)
    {

        //establish data
        var maps = bmData.getMaps();
        var user = message.member.displayName;


        //process arguments
        var formatError = ("Incorrect format! The format is `!changeArtist mapID | artist`");
        var splits = args.split("|");
        if(args.length == 0)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }
        var mapID = splits[0].trim();
        var artist = splits[1].trim().toLowerCase();

        //find beatmap
        var beatmap = maps.getBeatmap(mapID);


        
        if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }else if(beatmap.host != user){
            message.channel.send("You can't edit someone else's mapset!");
        }else if(beatmap.artist == artist){
            message.channel.send("That's the mapset's current artist!");
        }else{
            beatmap.artist = artist;
            message.channel.send(`Your map's metadata has been updated to **${beatmap.artist}** - **${beatmap.title}**!`);
        }
    }
}

module.exports = ChangeArtistCommand;