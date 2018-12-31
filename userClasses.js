class UsersCollection
{
    constructor()
    {
        this.users = [];
        this.userSearch = {};
    }

    loadFromJSON(json){
        json.users.users.forEach(user => {
            this.addJSONParty(user)
        });
    }

    addJSONParty(user){
        var newUser = new User(user.name);
        
        newUser.totalPoints = user.totalPoints;
        newUser.rank = user.rank;
        newUser.easyPoints = user.easyPoints;
        newUser.normalPoints = user.normalPoints;
        newUser.hardPoints = user.hardPoints;
        newUser.insanePoints = user.insanePoints;
        newUser.storyboardPoints = user.storyboardPoints;
        newUser.backgroundPoints = user.backgroundPoints;
        newUser.skinPoints = user.skinPoints;
        newUser.questPoints = user.questPoints;
        newUser.modPoints = user.modPoints;
        newUser.hostPoints = user.hostPoints;
        newUser.completedQuests = user.completedQuests;
        newUser.currentParty = user.currentParty;
       

        this.users.push(newUser);
        this.userSearch[newUser.name.toLowerCase()] = newUser;
    }

    addUser(name)
    {
        var userVar = (new User(name));
        this.users.push(userVar);
        this.userSearch[name.toLowerCase()] = userVar;
    }

    getUser(name)
    {
        return this.userSearch[name.toLowerCase()];
    }
    
}

class User
{
    constructor(name)
    {
        this.name = name;

        this.resetPoints();
        
        this.currentParty = "";

    }

    resetPoints(){
        this.totalPoints = 0;
        this.rank = 0;
        this.easyPoints = 0;
        this.normalPoints = 0;
        this.hardPoints = 0;
        this.insanePoints = 0;
        this.extraPoints = 0;
        this.storyboardPoints = 0;
        this.backgroundPoints = 0;
        this.skinPoints = 0;
        this.questPoints = 0;
        this.modPoints = 0;
        this.hostPoints = 0;
        this.completedQuests = [];
    }
}


module.exports = {UsersCollection, User}