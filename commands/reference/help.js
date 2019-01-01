const commando = require('discord.js-commando');
const discord = require('discord.js');

class helpCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name: 'help',
            group: 'reference',
            memberName: 'help',
            description: 'explain available commands',
        });
    }

    async run(message, args)
    {
        args = args.toLowerCase();
        if(args.length == 0)
            {
                message.channel.sendMessage("**Commands** (type `!help <command>` for usage)");
        var helpList = new discord.RichEmbed()
            .addField("Mapset Host Actions", "!newMap\n!applyQuest\n!removeQuest\n!newHost\n!deleteMap\n!lock\n!unlock\n!link\n!changeArtist\n!changeTitle", true)
            .addField("General Mapper Actions", "!claim\n!unclaim\n!done\n!wip", true)
            .addField("Modder Actions", "\n!mod\n!nom\n!unNom", true)
            .addField("Party Actions", "!newParty\n!joinParty\n!leaveParty\n!newLeader\n!removeFromParty", true)
            .addField("Quest Actions", "!newQuest\n!accept\n!drop\n!completeQuest\n!deleteQuest", true)
            .addField("Other", "!help\n!register", true)
            .setColor(0x5697ff)
            message.channel.sendEmbed(helpList)
        //other
        }else if(args == "help" || args == "!help"){
            message.channel.sendMessage("...");
        }else if(args == "register" || args == "!register"){
            message.channel.sendMessage("`!register` adds a user to the Mappers' Guild database. Commands don't work if a user is not registered. When someone eventually renames themselves, they will need to re-register and pishifat will struggle to transfer all data.");
        //party actions
        }else if(args == "newparty" || args == "!newparty"){
            message.channel.sendMessage("`!newParty <partyName>` creates a new party and adds the sender to its member list\nexample: `!newParty the anime bros`");
        }else if(args == "joinparty" || args == "!joinparty"){
            message.channel.sendMessage("`!joinParty <partyName>` adds the sender to the party's member list\nexample: `!joinParty the rival party");
        }else if(args == "leaveparty" || args == "!leaveparty"){
            message.channel.sendMessage("`!leaveParty` removes a user from their current party");
        }else if(args == "newleader" || args == "!newleader"){
            message.channel.sendMessage("`!newLeader <user>` transfers leadership between members of the same party. This can only be used by a party's leader.\nexample: `!newLeader Nyquill`");
        }else if(args == "removefromparty" || args == "!removefromparty"){
            message.channel.sendMessage("`!removeFromParty <user>` removes another user from a party. This can only be used by a party's leader.\nexample: `!removeFromParty Nyquill`");
        }
        //quest actions
        else if(args == "newquest" || args == "!newquest"){
            message.channel.sendMessage("`!newQuest` creates a new quest and is only used by pishifat.");
        }else if(args == "accept" || args == "!accept"){
            message.channel.sendMessage("`!accept <questID>` assigns party to a quest. This can only be used by a party's leader.\nexample: `!accept 39`");
        }else if(args == "drop" || args == "!drop"){
            message.channel.sendMessage("`!drop` drops a party's current quest. This can only be used by a party's leader.");
        }else if(args == "completequest" || args == "!completequest"){
            message.channel.sendMessage("`!completeQuest <questID>` marks a quest as complete and gives users their quest bonus points. This can only be used by pishifat");
        }else if(args == "deletequest" || args == "!deletequest"){
            message.channel.sendMessage("`!deleteQuest <questID>` deletes a quest and is only used by pishifat");
        }
        //mapping actions
        else if(args == "newmap" || args == "!newmap"){
            message.channel.sendMessage("`!newmap <artist> | <title>` creates a new entry for a map.\nexample: `!newmap Camellia | Exit This Earth's Atomosphere`");
        }else if(args == "changeartist" || args == "!changeartist"){
            message.channel.sendMessage("`!changeArtist <mapID> | <artist>` changes the artist metadata of an existing mapset. This can only be done by a mapset's host and should only be used to fix typos, not to replace existing mapsets\nexample: `!changeArtist 86 | *namirin`");
        }else if(args == "changetitle" || args == "!changetitle"){
            message.channel.sendMessage("`!changeTitle <mapID> | <title>` changes the artist metadata of an existing mapset. This can only be done by a mapset's host and should only be used to fix typos, not to replace existing mapsets\nexample: `!changeArtist 86 | closing eyes`");
        }else if(args == "applyquest" || args == "!applyquest"){
            message.channel.sendMessage("`!applyQuest <mapID>` links a map to a user's party's quest\nexample: `!applyQuest 86`");
        }else if(args == "removequest" || args == "!removequest"){
            message.channel.sendMessage("`!removeQuest <mapID>` unlinks a map from a user's party's quest\nexample: `!removeQuest 86`");
        }else if(args == "newhost" || args == "!newhost"){
            message.channel.sendMessage("`!newHost <mapID> | <user>` changes the host of a mapset to a specified user\nexample: `!transferHost 86 | Nyquill`");
        }else if(args == "deletemap" || args == "!deletemap"){
            message.channel.sendMessage("`!deleteMap <mapID>` removes a map from the listing\nexample: `!deleteMap 86`");
        }else if(args == "claim" || args == "!claim"){
            message.channel.sendMessage("`!claim <mapID> | <task>` assigns the sender to a task. `!claim <mapID> | <task> | <collabMapper> | <collabMapper> (etc.)` assigns the sender and any listed collab mappers to the same task\nexample: `!claim 86 | insane`, or for a collab difficulty, `!claim 86 | insane | Nyquill`");
        }else if(args == "unclaim" || args == "!unclaim"){
            message.channel.sendMessage("`!unclaim <mapID> | <task>` removes a specified task from a mapset. A mapset host can remove anyone's claims, while a guest difficulty creator can only remove their own claims. If there are 2+ of the same task on a mapset, a mapset host using !unclaim will remove claims chronologically.\nexample: `!unclaim 86 | insane`");
        }else if(args == "lock" || args == "!lock"){
            message.channel.sendMessage("`!lock <mapID>` disables all claims for a mapset\n`!lock <mapID> | <task>` disables claims for a specific task on a mapset\nexample: `!lock 86 | insane`");
        }else if(args == "unlock" || args == "!unlock"){
            message.channel.sendMessage("`!unlock <mapID>` re-enables all claims for a mapset\n`!lock <mapID> | <task>` re-enables claims for a specific task on a mapset\nexample: `!unlock 86 | insane`");
        }else if(args == "link" || args == "!link"){
            message.channel.sendMessage("`!link <mapID> | <onlineID>` adds an osu!web link to a map. 'OnlineID' is the number following 'beatmapsets' in a map's URL.\nexample: `!link 86 | 884977`");
        }else if(args == "done" || args == "!done"){
            message.channel.sendMessage("`!done <mapID>` marks a mapset's status as complete\n`!done <mapID> | <task>` marks a specific task of a mapset as complete in its corresponding cell\nexample: `!done 86 | insane`");
        }else if(args == "wip" || args == "!wip"){
            message.channel.sendMessage("`!wip <mapID>` marks a mapset's status as work-in-progress\n`!wip <mapID> | <task>` marks a specific task of a mapset as work-in-progress in its corresponding cell\nexample: `!wip 86 | insane`");
        }else if(args == "nom" || args == "!nom"){
            message.channel.sendMessage("`!nom <mapID>` puts a user in a Beatmap Nominator reserve slot for a mapset\nexample: `!nom 225`");
        }else if(args == "unnom" || args == "!unnom"){
            message.channel.sendMessage("`!unNom <mapID>` removes a user in a Beatmap Nominator reserve slot for a mapset\nexample: `!unNom 225`");
        }else if(args == "mod" || args == "!mod"){
            message.channel.sendMessage("`!mod <mapID>` logs when a user has modded a mapset\nexample: `!mod 225`");
        }else{
            message.channel.sendMessage("That command doesn't exist! Check your spelling.");
        }
    }
}

module.exports = helpCommand;