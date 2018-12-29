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
        var newQuest = new Quest(quest.id, quest.name);
        
        newQuest.description = quest.description;
        newQuest.reward = quest.reward;
        newQuest.minParty = quest.minParty;
        newQuest.maxParty = quest.maxParty;
        newQuest.minRank = quest.minRank;
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
        this.reward = reward;
        this.minParty = minParty;
        this.maxParty = maxParty;
        this.minRank = minRank;

        this.status = "open";
        this.assignedParty = "";
        this.members = [];
    }
}


module.exports = {QuestsCollection, Quest}