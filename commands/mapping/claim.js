const bmData = require("../../AllData.js");
const commando = require('discord.js-commando');
const discord = require('discord.js');

class ClaimCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'claim',
            group: 'mapping',
            memberName: 'claim',
            description: "claims a task"
        });
    }

    async run(message, args)
    {

        //establish data
        var maps = bmData.getMaps();
        var user = message.member.displayName;


        //process arguments
        var formatError = "Incorrect format! The format is `!claim mapID | task.` \nIf claiming a collaborative difficulty, the format is `!claim mapID | task | user1 | user2 (etc.)`, not including yourself";
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
                collabUsers.push(splits[i].trim());
            }
        }
        if(mapID.length == 0 || name.length == 0)
        {
            message.channel.send(formatError);
            return; // breaks out of run(), effectively halting this command here
        }

        //find beatmap
        var beatmap = maps.getBeatmap(mapID);

        //invalid task check
        var taskArray = [
            "easy", "normal", "hard", "insane", "extra", "storyboard", "background", "skin"
        ];
        function invalidTask(){
            return !(taskArray.indexOf(name) >=0);
        }

        //set contribution rules check
        // function breaksRC(mapSheetData, user){
        //     if((task == 'storyboard') || (task == 'background') || (task == 'skin')){
        //         return false;
        //     }else{
        //     var spreadArray = mapSheetData[myRow].slice(Easy,Extra);
        //     console.log(spreadArray);
        //     var hostCount = countUsers(spreadArray, mapSheetData[myRow][Host]);
        //     var userCount = countUsers(spreadArray, user) + 1;
        //     return userCount > hostCount;
        //     }
        // }


        //check if task is sb/bg/skin and someone else claimed it already
        function taskOnlyAllowsOneUser(){
            var result = false;
            if(printedTask == "Background" || printedTask == "Storyboard" || printedTask == "Skin"){
                beatmap.tasks.forEach(task =>{
                    if(task.name == "Background" || task.name == "Storyboard" || task.name == "Skin"){
                        result = true;
                    }
                });
            }
            return result;
        }


        //capitalize first letter of task name
        var printedTask = printTask(name);
        function printTask(name){
            return name.charAt(0).toUpperCase() + name.substr(1)
        }
        //console.log(printedTask);
        
        if(beatmap == undefined){
            message.channel.send("That map doesn't exist! Re-check your Map ID.");
        }else if(invalidTask()){
            message.channel.sendMessage(`**${printedTask}** is an invalid task! Tasks include \`easy\`, \`normal\`, \`hard\`, \`insane\`, \`extra\`, \`storyboard\`, \`background\`, and \`skin\``);
        }else if(beatmap.allLocked && beatmap.host != user){
            message.channel.send("You can't claim tasks on mapsets that have been locked!");
        }else if(beatmap.bns.length > 0 && beatmap.bns.indexOf(user) >= 0){
            message.channel.send("You must remove your reserved nomination before claiming a task! Use the command `!unnom mapID`");
        }else if(beatmap.categoriesLocked.indexOf(printedTask) >= 0 && beatmap.host != user){
            message.channel.send("You can't claim tasks that have been locked!");
        }else if(taskOnlyAllowsOneUser()){
            message.channel.send("Only one user can claim that task!");
        }else{
            if(beatmap.status == "Done")
            {
                beatmap.status = "WIP"
            }

            var task = beatmap.addTask(printedTask, user);
            if(collabUsers.length > 0)
            {
                task.mappers.push.apply(task.mappers, collabUsers);
                message.channel.send(`**${user}** has claimed a collab for **${printedTask}** on **${beatmap.artist}** - **${beatmap.title}**`);
            }else if(beatmap.allLocked){
                message.channel.send(`**${user}** has claimed **${printedTask}** on **${beatmap.artist}** - **${beatmap.title}**. (host bypasses lock)`);
            }else{
                message.channel.send(`**${user}** has claimed **${printedTask}** on **${beatmap.artist}** - **${beatmap.title}**`);
            }
        }
    }
}

module.exports = ClaimCommand;