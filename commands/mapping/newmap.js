const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');
const responses = require('../../responses.js');

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

        //process the argument
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


        //adds the map
        var id = maps.getTopID()+1;
        maps.addBeatmap(id, artist, title, message.member.displayName);


        //confirmation message
        message.channel.send(eval("`" + responses.mappingActions.new_map_added + "`"));
    }
}

module.exports = NewMapCommand;