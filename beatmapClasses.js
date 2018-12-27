class BeatmapCollection
{
    constructor()
    {
        this.beatmaps = [];
    }

    addBeatmap(id, artist, title, host)
    {
        this.beatmaps.push(new Beatmap(id, artist, title, host));
    }

    getBeatmap(id)
    {
        var index = getBeatmapIndex(id);
        if(index >= 0)
        {
            return this.beatmaps[index];
        }
        return false;
    }

    getBeatmapIndex(id)
    {
        var i;
        for(i = 0; i < this.beatmaps.length; ++i)
        {
            if(this.beatmaps[i].id == id)
            {
                return i;
            }
        }
        return -1;
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

    addTask(taskName)
    {
        this.tasks.push(new Task(taskName));
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