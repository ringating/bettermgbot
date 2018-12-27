const bmData = require("../../beatmapData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class NewMapCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'newmap',
            group: 'mapping',
            memberName: 'newmap',
            description: "inserts new map"
        });
    }

    async run(message, args)
    {
        var maps = bmData.getMaps();

        message.channel.send("```" + JSON.stringify(maps) + "```");
        console.log(maps);

        var formatError = "Incorrect format! The format is `!newmap artist | title`";
        var splits = args.split("|");
        if(splits.length !== 2)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }
        var artist = splits[0].trim();
        var title = splits[1].trim();
        if(artist.length == 0 || title.length == 0)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }

        maps.addBeatmap(maps.getTopID()+1, artist, title, message.member.displayName);

        maps.getBeatmap(1).host
    }
}

module.exports = NewMapCommand;