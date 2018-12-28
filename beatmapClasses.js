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
        console.log(beatmap);
        beatmap.tasks = [];
        
        var newBeatmap = new Beatmap(beatmap.id, beatmap.artist, beatmap.title, beatmap.host);
        oldTasks.forEach(task => {
            newBeatmap.addJSONTask(task);
        });

        newBeatmap.rank = beatmap.rank;
        newBeatmap.currentQuest = beatmap.currentQuest;
        newBeatmap.members = beatmap.members;

        this.beatmaps.push(newBeatmap);
        this.beatmapSearch[newBeatmap.id] = newBeatmap;
    }


    addBeatmap(id, artist, title, host)
    {
        var beatmapVar = (new Beatmap(id, artist, title, host));
        this.beatmaps.push(beatmapVar);
        this.beatmapSearch[id] = beatmapVar;
    }

    getBeatmap(id)
    {
        return this.beatmapSearch[id];
    }

    removeBeatmap(id)
    {
        //TODO
        // search beatmaps for beatmap with matching id property
        // if it's found remove that beatmap from beatmaps and return it
        // else return false

        var index = getBeatmapIndex(id);
        if(index >= 0)
        {
            var bm = this.beatmaps[index].copy();
        }
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
        this.locked = false;
        this.bns = [];
        this.quest = "";
        this.modders = [];
    }

    addJSONTask(task)
    {
        var newTask = new Task(task.name);

        newTask.mappers = task.mappers;
        newTask.status = task.status;
        newTask.locked = task.locked;

        this.tasks.push(newTask);
    }

    getTask(name)
    {
        var index = getTaskIndex(name);
        if(index >= 0)
        {
            return this.tasks[index];
        }
        return false;
    }

    getTaskIndex(name)
    {
        var i;
        for(i = 0; i < this.tasks.length; ++i)
        {
            if(this.tasks[i].name == name)
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

    setStatus(status)
    {
        // returns true if status matches any of the valid strings (thus getting set)
        // returns false if status is invalid
        if(status == "work-in-progress" || status == "complete")
        {
            this.status = status;
            return true;
        }
        return false;
    }

    setLock(locked)
    {
        if(locked == true || locked == false)
        {
            this.locked = locked;
            return true;
        }
        return false;
    }

    flipLock(){ this.locked = !this.locked;}

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
        this.status = "...";
        this.locked = false;
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
        if(status == "✓" || status == "...")
        {
            this.status = status;
            return true;
        }
        return false;
    }

    setLock(locked)
    {
        if(locked == true || locked == false)
        {
            this.locked = locked;
            return true;
        }
        return false;
    }

    flipLock(){ this.locked = !this.locked;}
}

module.exports = {BeatmapCollection, Beatmap, Task}