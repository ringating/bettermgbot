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
        }else if(invalidTask()){
            message.channel.sendMessage(`**${name}** is an invalid task! Tasks include \`easy\`, \`normal\`, \`hard\`, \`insane\`, \`extra\`, \`storyboard\`, \`background\`, and \`skin\``);
        }else if(beatmap.allLocked){
            message.channel.send("You can't claim tasks on mapsets that have been locked!");
        }else if(beatmap.bns.length > 0 && beatmap.bns.indexOf(user) > 0){
            message.channel.send("You must remove your reserved nomination before claiming a task! Use the command `!unreservenom [mapID]` to do so.");
        }else{
            var task = beatmap.addTask(name, user);
            if(collabUsers.length > 0){
                task.mappers.push.apply(task.mappers, collabUsers);
            }
            message.channel.send(`**${user}** has claimed **${printedTask}** on **${beatmap.artist}** - **${beatmap.title}**`);
        }
    }
}

module.exports = DeleteMapCommand;