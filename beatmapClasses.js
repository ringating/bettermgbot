class BeatmapCollection
{
    constructor()
    {
        this.beatmaps = [];
        this.beatmapSearch = {};
    }

    loadFromJSON(json){
        //console.log(json.maps.beatmaps);
        json.maps.beatmaps.forEach(beatmap => {
            this.addJSONBeatmap(beatmap);
        });
    }

    addJSONBeatmap(beatmap){
        var oldTasks = beatmap.tasks;
        beatmap.tasks = [];
        
        var newBeatmap = new Beatmap(beatmap.id, beatmap.artist, beatmap.title, beatmap.host);
        oldTasks.forEach(task => {
            newBeatmap.addJSONTask(task);
        });

        newBeatmap.status = beatmap.status;
        newBeatmap.quest = beatmap.quest;
        newBeatmap.link = beatmap.link;
        newBeatmap.allLocked = beatmap.allLocked;
        newBeatmap.bns = beatmap.bns;
        newBeatmap.modders = beatmap.modders;
        newBeatmap.categoriesLocked = beatmap.categoriesLocked;
        

        this.beatmaps.push(newBeatmap);
        this.beatmapSearch[newBeatmap.id] = newBeatmap;
    }


    addBeatmap(id, artist, title, host)
    {
        var beatmapVar = new Beatmap(id, artist, title, host);
        this.beatmaps.push(beatmapVar);
        this.beatmapSearch[id] = beatmapVar;
    }

    getBeatmap(id)
    {
        return this.beatmapSearch[id];
    }

    removeBeatmap(id)
    {
        var index = this.beatmapSearch[id];
        this.beatmaps.splice(index, 1);
        delete this.beatmapSearch[id];
    }

    getTopID()
    {
        return this.beatmaps[this.beatmaps.length-1].id;
    }
}

class Beatmap
{
    constructor(id, artist, title, host)
    {
        this.id = id;
        this.artist = artist;
        this.title = title;  	
        this.host = host;

        this.tasks = [];
        this.status = "WIP";
        this.bns = [];
        this.quest = "";
        this.modders = [];
        this.link = "";

        this.allLocked = false;
        this.categoriesLocked = [];
    }

    addJSONTask(task)
    {
        var newTask = new Task(task.name);

        newTask.mappers = task.mappers;
        newTask.status = task.status;
        newTask.locked = task.locked;

        this.tasks.push(newTask);
    }

    getTask(name, user)
    {
        var index = this.getTaskIndex(name, user);
        if(index >= 0)
        {
            return this.tasks[index];
        }
        return false;
    }

    getTaskIndex(name, user)
    {
        var i;
        for(i = 0; i < this.tasks.length; ++i)
        {
            if(this.tasks[i].name == name && this.tasks[i].mappers.indexOf(user) >= 0)
            {
                return i;
            }
        }
        return -1;
    }

    copy()
    {
        var ret = new Beatmap(this.id, this.artist, this.title, this.host);

        ret.tasks = this.tasks.slice();
        ret.status = this.status.slice();
        ret.locked = this.locked.slice();
        ret.bns = this.bns.slice();
        ret.quest = this.quest.slice();
        ret.modders = this.modders.slice();

        return ret;
    }

    setHost(host)
    {
        this.host = host;
    }

    addTask(taskName, user)
    {
        var newTask = new Task(taskName);
        this.tasks.push(newTask);
        newTask.mappers.push(user);
        return newTask;
    }


    lockCategory(category)
    {
        if(this.categoriesLocked.indexOf(category) < 0)
        {
            this.categoriesLocked.push(category);
        }
    }

    unlockCategory(category)
    {
        var lockedItemIndex = this.categoriesLocked.indexOf(category);
        if(lockedItemIndex >=0)
        {
            this.categoriesLocked.splice(lockedItemIndex, 1);
        }
    }

    flipLock(){ this.allLocked = !this.allLocked;}

    addBNs(bn)
    {
        bns.push(bn);
    }

    removeBNs(bn)
    {
        if(bns.indexOf(bn) >= 0)
        {
            bns.splice(bns.indexOf(bn), 1);
            return true;
        }
        return false;
    }

    setQuest(quest)
    {
        this.quest = quest;
    }

    removeQuest(quest)
    {
        this.quest = "";
    }

    addModder(modder)
    {
        this.modders.push(modder);
    }

    removeModders(modder)
    {
        if(this.modders.indexOf(modder) >= 0)
        {
            this.modders.splice(this.modders.indexOf(modder), 1);
            return true;
        }
        return false;
    }
}


class Task
{
    constructor(name)
    {
        this.name = name;
        this.mappers = [];
        this.status = "WIP";
    }



    addMapper(mapper)
    {
        this.mappers.push(mapper);
    }

    removeMapper(mapper)
    {
        // returns true if the mapper was found and removed, returns false if the mapper was not found
        if(this.mappers.indexOf(mapper) >= 0)
        {
            this.mappers.splice(mappers.indexOf(mapper), 1);
            return true;
        }
        return false;
    }

    setStatus(status)
    {
        // returns 
        if(status == "Done" || status == "WIP")
        {
            this.status = status;
            return true;
        }
        return false;
    }


    flipLock(){ this.locked = !this.locked;}
}

module.exports = {BeatmapCollection, Beatmap, Task}