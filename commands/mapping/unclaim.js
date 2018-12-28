const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class UnclaimCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'unclaim',
            group: 'mapping',
            memberName: 'unclaim',
            description: "unclaims a task"
        });
    }

    async run(message, args)
    {

        //establish data
        var maps = bmData.getMaps();
        var user = message.member.displayName;


        //process arguments
        var formatError = "Incorrect format! The format is `!newmap artist | title`";
        var splits = args.split("|");
        if(splits.length < 2)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }
        var mapID = splits[0].trim();
        var name = splits[1].trim().toLowerCase();
        var collabUsers = [];
        if(splits.length > 2){ 
            for(var i=2; i < splits.length; i++){
                collabUsers.push(splits[i].trim()); //if printedTask of beatmap does not exist
            }
        }
        if(mapID.length == 0 || name.length == 0)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }

        //find beatmap
        var beatmap = maps.getBeatmap(mapID);

        //find task

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
            return name.charAt(0).toUpperCase() + name.substr(1);
        }

        //find task
        var taskPositionInArray = beatmap.getTaskIndex(printedTask, user);
        var myTask = beatmap.getTask(printedTask, user);
        console.log(myTask);
        console.log(taskPositionInArray);

        
        if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }else if(invalidTask()){
            message.channel.sendMessage(`**${name}** is an invalid task! Tasks include \`easy\`, \`normal\`, \`hard\`, \`insane\`, \`extra\`, \`storyboard\`, \`background\`, and \`skin\``);
        }else if(taskPositionInArray < 0){
            message.channel.send(`You are not assigned to an **${printedTask}** task on that mapset!`);
        }else if(beatmap.host != user && beatmap.tasks[taskPositionInArray].mappers != user){
            message.channel.send("You cannot edit someone else's claim unless you are the mapset's host!");
        }else{
            beatmap.tasks.splice(taskPositionInArray, 1);
            message.channel.send(`You've removed the claim for **${printedTask}** on **${beatmap.artist}** - **${beatmap.title}**!`);
        } 
    }
}

module.exports = UnclaimCommand;