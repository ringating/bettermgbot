class PartiesCollection
{
    constructor()
    {
        this.parties = [];
        this.partySearch = {};
    }

    loadFromJSON(json){
        json.parties.parties.forEach(party => {
            this.addJSONParty(party)
        });
    }

    addJSONParty(party){
        var newParty = new Party(party.name, party.leader);
        
        newParty.rank = party.rank;
        newParty.currentQuest = party.currentQuest;
        newParty.members = party.members;

        this.parties.push(newParty);
        this.partySearch[newParty.name.toLowerCase()] = newParty;
    }

    addParty(name, leader)
    {
        var partyVar = (new Party(name, leader));
        this.parties.push(partyVar);
        this.partySearch[name.toLowerCase()] = partyVar;
    }

    isLeader(user)
    {
        for (var i = 0; i < this.parties.length; i++)
        {
            var party = this.parties[i];
            if(party.leader == user){
                return true;
            }
        }
        return false;
    }

    isMember(user)
    {
        for (var i = 0; i < this.parties.length; i++)
        {
            var party = this.parties[i];
            //console.log(party + "eeee");
            if(party.members.includes(user)){
                return true;
            }
        }
        return false;
    }

    test(){
        return "hello";
    }

}

class Party
{
    constructor(name, leader)
    {
        this.name = name;
        this.leader = leader;
        
        this.rank = "";
        this.currentQuest = "";
        this.members = [];
    }
    
    reachesMemberLimit(){
        return this.members.length > 10;
    }
}


module.exports = {PartiesCollection, Party}