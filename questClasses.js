class QuestsCollection
{
    constructor()
    {
        this.quests = [];
        this.questSearch = {};
    }

    loadFromJSON(json){
        json.quests.quests.forEach(quest => {
            this.addJSONParty(quest)
        });
    }

    addJSONParty(quest){
        var newQuest = new Quest(quest.id, quest.name, quest.description, quest.reward, quest.minParty, quest.maxParty, quest.minRank);
        
        newQuest.status = quest.status;
        newQuest.assignedParty = quest.assignedParty;
        newQuest.members = quest.members;

        this.quests.push(newQuest);
        this.questSearch[newQuest.id] = newQuest;
    }

    addQuest(id, name, description, reward, minParty, maxParty, minRank){
        var questVar = (new Quest(id, name, description, reward, minParty, maxParty, minRank));
        this.quests.push(questVar);
        this.questSearch[id] = questVar;
    }

    getQuest(id)
    {
        return this.questSearch[id];
    }

    removeQuest(id)
    {
        var index = this.getQuestIndex(id);
        if(index >= 0)
        {
            this.quests.splice(index, 1);
            delete this.questSearch[id];
        }
    }

    getQuestIndex(id)
    {
        for (var i = 0; i < this.quests.length; i++)
        {
            var quest = this.quests[i];
            if(quest.id == id){
                return i;
            }
        }
        return -1;
    }

    getTopID()
    {
        return this.quests[this.quests.length-1].id;
    }

}

class Quest
{
    constructor(id, name, description, reward, minParty, maxParty, minRank)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.reward = parseInt(reward);
        this.minParty = minParty;
        this.maxParty = maxParty;
        this.minRank = minRank;

        this.status = "open";
        this.assignedParty = "";
        this.members = [];
    }
}


module.exports = {QuestsCollection, Quest}