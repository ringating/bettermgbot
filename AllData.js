const fs = require('fs');
const bm = require('./beatmapClasses.js');
const pt = require('./partiesClasses.js');
const qt = require('./questClasses.js');
const ur = require('./userClasses.js');
const points = require('./pointsClasses.js');

const DataPath = 'testfile35.json';

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
                this.maps.addBeatmap(0,"EXAMPLE_ARTIST","EXAMPLE_TITLE","EXAMPLE_USER");
                this.parties.addParty("EXAMPLE_PARTY", "EXAMPLE_USER");
                this.quests.addQuest(0, "*namirin map pack", "Create at least 5 mapsets for *namirin songs, each hosted by a different user. ", 20, 5, 10, 0);
                this.quests.addQuest(1, "Culprate mini-map pack", "Create at least 3 mapsets for Culprate songs, each hosted by a different user", 10, 3, 8, 0);
                this.quests.addQuest(2, "Ben Briggs map pack", "Create at least 6 mapsets for Ben Briggs songs, our least mapped Featured Artist :(. Each must be hosted by a different user", 30, 6, 12, 0);
                this.quests.addQuest(3, "New Featured Artist map pack", "Create at least 5 mapsets for an artist that hasn't yet been announced! You'll need to keep this one a secret.", 25, 5, 10, 1);
                this.users.addUser("EXAMPLE_USER");
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
            user.totalPoints += Math.round(user.easyPoints + user.normalPoints + user.hardPoints + user.insanePoints + user.extraPoints + user.storyboardPoints + user.backgroundPoints + user.skinPoints + user.questPoints + user.modPoints + user.hostPoints);
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
        })
        party.rank = Math.round(partyCumulativeRank/party.members.length);
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