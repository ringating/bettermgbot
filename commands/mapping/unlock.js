const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class UnlockCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'unlock',
            group: 'mapping',
            memberName: 'unlock',
            description: "unlocks a task or a mapset"
        });
    }

    async run(message, args)
    {

        //establish data
        var maps = bmData.getMaps();
        var user = message.member.displayName;


        //process arguments
        var formatError = ("Incorrect format! The format is `!lock mapID` to lock a single mapset, or `!lock mapID | task` to lock a task on a mapset");
        var splits = args.split("|");
        if(args.length == 0)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }
        var mapID = splits[0].trim();
        var name = (splits.length > 1) ? splits[1].trim().toLowerCase() :"";

        //find beatmap
        var beatmap = maps.getBeatmap(mapID);

        //invalid task check
        var taskArray = [
            "easy", "normal", "hard", "insane", "extra", "storyboard", "background", "skin"
        ];
        function invalidTask(){
            return !(taskArray.indexOf(name) >=0);
        }


        //capitalize first letter of task name
        var printedTask = printTask(name);
        function printTask(name){
            return name.charAt(0).toUpperCase() + name.substr(1)
        }
        
        if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }else if(!beatmap.allLocked){
            message.channel.send("This mapset is already unlocked!");
        }else if(beatmap.host != user){
            message.channel.send("You can't edit someone else's mapset!");
        }else if(name == ""){
            beatmap.allLocked = false;
            message.channel.send("unlockd");
        }else if(invalidTask()){
            message.channel.sendMessage(`**${printedTask}** is an invalid task! Tasks include \`easy\`, \`normal\`, \`hard\`, \`insane\`, \`extra\`, \`storyboard\`, \`background\`, and \`skin\``);
        }else if(beatmap.categoriesLocked.indexOf(printedTask) < 0){
            message.channel.send("Claims are already disabled for this mapset!");
        }else{
            beatmap.unlockCategory(printedTask);
            message.channel.send(`Claims for **${printedTask}** on **${beatmap.artist}** - **${beatmap.title}** have been disabled!`);
        }
    }
}

module.exports = UnlockCommand;