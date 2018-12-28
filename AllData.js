const fs = require('fs');
const bm = require('./beatmapClasses.js');
const pt = require('./partiesClasses.js');

const DataPath = 'testfile7.json';

class AllData
{
    constructor(fileName){
        this.maps = new bm.BeatmapCollection();
        this.parties = new pt.PartiesCollection();
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
                console.log("*new map list json generated*");
                return;
            }
            var json = JSON.parse(data);
            this.maps.loadFromJSON(json);
            this.parties.loadFromJSON(json);
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
}

// 
var allData = new AllData(DataPath);
allData.loadFile();
setInterval(updateFile, 5000);
// 






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

module.exports = {getMaps, getParties};