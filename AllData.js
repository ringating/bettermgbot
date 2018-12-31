const fs = require('fs');
const bm = require('./beatmapClasses.js');
const pt = require('./partiesClasses.js');
const qt = require('./questClasses.js');
const ur = require('./userClasses.js');
const points = require('./pointsClasses.js');

const DataPath = 'testfile34.json';

class AllData
{
    constructor(fileName){
        this.maps = new bm.BeatmapCollection();
        this.parties = new pt.PartiesCollection();
        this.quests = new qt.QuestsCollection();
        this.users = new ur.UsersCollection();
        this.fileName = fileName;
    }

    loadFile()
    {
        fs.readFile(this.fileName, (err, data)=>
        {
            if(err)
            {
                console.log("fs.readFile returned error: " + err);
                this.maps.addBeatmap(0,"EXAMPLE_ARTIST","EXAMPLE_TITLE","EXAMPLE_HOST");
                this.parties.addParty("party name", "username");
                this.quests.addQuest(0, "quest name", "quest description!!!", 25, 4, 8, 0);
                this.users.addUser("sample user");
                console.log("*new map list json generated*");
                return;
            }
            var json = JSON.parse(data);
            this.maps.loadFromJSON(json);
            this.parties.loadFromJSON(json);
            this.quests.loadFromJSON(json);
            this.users.loadFromJSON(json);
            console.log(this.fileName + " has been successfully loaded.");
        });
    }

    updateFile()
    {
        fs.writeFile(this.fileName, JSON.stringify(this), (err)=>
        {
            if(err){console.log("fs.writeFile returned error: " + err);}
        });
    }

    updateUsers()
    {   
        var userPoints = new points.PointsCalculation(this.maps.beatmaps);
        this.users.users.forEach(user =>{
            user.resetPoints();
            userPoints.calculateAllTaskPoints(user);
        })

        //quest points
        this.quests.quests.forEach(quest =>{
            if(quest.status == "Done")
            {
                this.updateQuestPoints(quest.name, quest.reward, quest.members);
            }
        })

        //host points
        this.maps.beatmaps.forEach(beatmap =>{
            if(beatmap.status == "Done")
            {
                var user = this.users.getUser(beatmap.host);
                user.hostPoints += 5;
            }
        });


        //modder points
        this.maps.beatmaps.forEach(beatmap =>{
            if(beatmap.status == "Done")
            {
                this.users.users.forEach(user =>{
                    if(beatmap.modders.indexOf(user.name) >= 0)
                    user.modPoints += 2.5;
                });
            }
        });


        //total points and rank
        this.users.users.forEach(user =>{
            user.totalPoints += user.easyPoints + user.normalPoints + user.hardPoints + user.insanePoints + user.extraPoints + user.storyboardPoints + user.backgroundPoints + user.skinPoints + user.questPoints + user.modPoints + user.hostPoints;
            if(user.totalPoints < 100){
                user.rank = 0;
            }else if(user.totalPoints < 250){
                user.rank = 1;
            }else if(user.totalPoints < 500){
                user.rank = 2;
            }else{
                user.rank = 3;
            }
        });


        //current party
        this.parties.parties.forEach(party =>{
            this.users.users.forEach(user =>{
                if (party.members.indexOf(user.name) >= 0)
                {
                    user.currentParty = party.name;
                }
            });
        });
    }

    updateQuestPoints(name, reward, members)
    {
        members.forEach(username =>{
            var user = this.users.getUser(username);
            user.questPoints += reward;
            user.completedQuests.push(name);
        })
    }


}

function updatePartyRank()
{
    
    allData.parties.parties.forEach(party =>{
        var partyCumulativeRank = 0;
        party.members.forEach(username =>{
            var user = allData.users.getUser(username);
            partyCumulativeRank += user.rank;
            //console.log(user.rank);
        })
        party.rank = Math.round(partyCumulativeRank/party.members.length);
        //console.log("party rank: " + party.rank);
    })
}

// 
var allData = new AllData(DataPath);
allData.loadFile();
setInterval(updateFile, 5000);
setInterval(updateUsers, 5000);
setInterval(updatePartyRank, 6000);
// 




function updateUsers()
{
    allData.updateUsers();
}


function updateFile()
{
    allData.updateFile();
}

function getMaps()
{
    return allData.maps;
}

function getParties()
{
    return allData.parties;
}

function getQuests()
{
    return allData.quests;
}

function getUsers()
{
    return allData.users;
}

module.exports = {getMaps, getParties, getQuests, getUsers};