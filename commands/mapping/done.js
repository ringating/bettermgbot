const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class DoneCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'done',
            group: 'mapping',
            memberName: 'done',
            description: "marks a mapset or task as complete"
        });
    }

    async run(message, args)
    {

        //establish data
        var maps = bmData.getMaps();
        var user = message.member.displayName;

        
        //process arguments
        var formatError = "Incorrect format! The formats are `!done mapID` and `!done mapID | task`";
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

        var taskPositionInArray;
        var myTask;

        //capitalize first letter of task name
        var printedTask = printTask(name);
        function printTask(name){
            return name.charAt(0).toUpperCase() + name.substr(1)
        }

        //find task
        if(name != ""){
            taskPositionInArray = beatmap.getTaskIndex(printedTask, user);
            myTask = beatmap.getTask(printedTask, user);
            console.log(myTask);
            console.log(taskPositionInArray);
        }
        
        const Done = "Done";
        const WIP = "WIP";
        
        
        if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }else if(name == ""){
            if(beatmap.host != user){
                message.channel.send("You can't edit someone else's mapset!");
            }else if(beatmap.status == Done){
                message.channel.send("This mapset is already marked as complete!");
            }else{
                beatmap.status = Done;
                for(var i=0; beatmap.tasks[i] != undefined; i++)
                {
                    beatmap.tasks[i].status = Done;
                    console.log(beatmap.tasks[i].status);
                }
                message.channel.send(`**${beatmap.artist}** - **${beatmap.title}** and all of its tasks have been marked as complete!`);
            }
        }else if(invalidTask()){
            message.channel.sendMessage(`**${printedTask}** is an invalid task! Tasks include \`easy\`, \`normal\`, \`hard\`, \`insane\`, \`extra\`, \`storyboard\`, \`background\`, and \`skin\``);
        }else if(beatmap.host != user && beatmap.tasks[taskPositionInArray].mappers != user){
            message.channel.send("You cannot edit someone else's map!");
        }else if(beatmap.tasks[taskPositionInArray].status == Done){
            message.channel.send("This task is already marked as complete!");
        }else{
            beatmap.tasks[taskPositionInArray].status = Done;
            message.channel.send(`**${printedTask}** on **${beatmap.artist}** - **${beatmap.title}** has been marked as complete!`);
        }
    }
}

module.exports = DoneCommand;