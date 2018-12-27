const fs = require('fs');
const bm = require('./beatmapClasses.js');

const beatmapListPath = 'maplist.json';



// 
var maps = new bm.BeatmapCollection();
loadFile();
setInterval(updateFile, 5000);
// 



function loadFile()
{
    fs.readFile(beatmapListPath, (err, data)=>
    {
        if(err)
        {
            console.log("fs.readFile returned error: " + err);
            maps.addBeatmap(0,"EXAMPLE_ARTIST","EXAMPLE_TITLE","EXAMPLE_HOST");
            console.log("*new map list json generated*");
            return;
        }
        maps = JSON.parse(data);
        console.log(beatmapListPath + " has been successfully loaded.");
    });
}

function updateFile()
{
    fs.writeFile(beatmapListPath, JSON.stringify(maps), (err)=>
    {
        if(err){console.log("fs.writeFile returned error: " + err);}
    });
}

function getMaps()
{
    return maps;
}

module.exports = {getMaps};