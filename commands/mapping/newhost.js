const allData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class NewHostCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'newhost',
            group: 'mapping',
            memberName: 'newhost',
            description: "transfers host on a mapset"
        });
    }

    async run(message, args)
    {

        //establish data
        var maps = allData.getMaps();
        var user = message.member.displayName;
        var users = allData.getUsers();


        //process arguments
        var formatError = 'Incorrect format! The format is `!newHost mapID | otherUser`';
        var splits = args.split("|");
        if(splits.length < 2)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }
        var mapID = splits[0].trim();
        var otherUser = splits[1].trim().toLowerCase();
        if(mapID.length == 0 || otherUser.length == 0)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }


        //find beatmap
        var beatmap = maps.getBeatmap(mapID);

        var otherUserData = users.getUser(otherUser);


        
        if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }else if(beatmap.host != user){
            message.channel.send("You cannot transfer the host of someone else's mapset!");
        }else if(otherUserData == undefined){
            message.channel.send("That user isn't involved with the Mappers' Guild!");
        }else{
            message.channel.send(`Host has been transferred!`);
            beatmap.host = otherUserData.name;
        }
    }
}

module.exports = NewHostCommand;