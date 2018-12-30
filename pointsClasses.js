class Points
{
    constructor(task, mapsetStatus, mapsetQuest)
    {
        this.task = task;
        this.mapsetStatus = mapsetStatus;
        this.mapsetQuest = mapsetQuest;
    }
    
}

class PointsCalculation
{
    constructor(beatmaps)
    {
        this.beatmaps = beatmaps;
    }

    createTaskPointsData(user)
    {
        var userPoints = [];
        this.beatmaps.forEach(beatmap => {
            beatmap.tasks.forEach(task => {
                if(task.mappers.indexOf(user) >= 0){
                    userPoints.push(new Points(task, beatmap.status, beatmap.quest));
                }
            })
        }) 
        return userPoints;
    }    

    calculateAllTaskPoints(user)
    {
        var pointsData = this.createTaskPointsData(user.name);
        
        //console.log(user);

        var totalPoints = 0;
        var easyPoints = 0;
        var normalPoints = 0;
        var hardPoints = 0;
        var insanePoints = 0;
        var extraPoints = 0;
        var storyboardPoints = 0;
        var backgroundPoints = 0;
        var skinPoints = 0;

        //console.log(pointsData.length);

        pointsData.forEach(taskAndStatus => {
            //console.log(taskAndStatus);
            if(taskAndStatus.mapsetStatus == "Done")
            {
                easyPoints += this.calculateSpecificTaskPoints(taskAndStatus.task.name, taskAndStatus.mapsetQuest, "Easy", 5, 2);
                //console.log(easyPoints);
                //console.log(taskAndStatus.task.name)
                normalPoints += this.calculateSpecificTaskPoints(taskAndStatus.task.name, taskAndStatus.mapsetQuest, "Normal", 6, 2);
                hardPoints += this.calculateSpecificTaskPoints(taskAndStatus.task.name, taskAndStatus.mapsetQuest, "Hard", 7, 2);
                insanePoints += this.calculateSpecificTaskPoints(taskAndStatus.task.name, taskAndStatus.mapsetQuest, "Insane", 8, 2);
                extraPoints += this.calculateSpecificTaskPoints(taskAndStatus.task.name, taskAndStatus.mapsetQuest, "Extra", 8, 2);
                storyboardPoints += this.calculateSpecificTaskPoints(taskAndStatus.task.name, taskAndStatus.mapsetQuest, "Storyboard", 10, 3);
                backgroundPoints += this.calculateSpecificTaskPoints(taskAndStatus.task.name, taskAndStatus.mapsetQuest, "Background", 2, 0);
                skinPoints += this.calculateSpecificTaskPoints(taskAndStatus.task.name, taskAndStatus.mapsetQuest, "Skin", 2, 0);
            }
        }) 
        totalPoints += easyPoints + normalPoints + hardPoints + insanePoints + extraPoints + storyboardPoints + backgroundPoints + skinPoints;
        
        user.totalPoints = totalPoints;
        user.easyPoints = easyPoints;
        user.normalPoints = normalPoints;
        user.hardPoints = hardPoints;
        user.insanePoints = insanePoints;
        user.extraPoints = extraPoints;
        user.storyboardPoints = storyboardPoints;
        user.backgroundPoints = backgroundPoints;
        user.skinPoints = skinPoints;

    }

    calculateSpecificTaskPoints(name, quest, targetName, taskPoints, questPoints)
    {
    var pointsVar = 0;
    if(name == targetName)
        {
            pointsVar += taskPoints;
            if(quest != "")
            {
                pointsVar += questPoints;
            }
        }
    return pointsVar;
    }

}


module.exports = {Points, PointsCalculation}