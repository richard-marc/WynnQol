/*
Notes:

Waiting on fuy.gg chat fix

/party blacklist add [player] -- saves player to blacklist file
/party blacklist list -- shows blacklisted players
/party blacklist remove [player] -- removes player from blacklist file

Howto:
Have user do /party list (look into doing it on party join, possibly with a scoreboard update as it says "Party")
Log all party members
Check blacklist
Return blacklisted players

*/


// Below is scrapped scoreboard system due to fuy.gg something something i forgot

/*
let scoreboard = World.getScoreboards().getCurrentScoreboard().getPlayerScores();
scoreboard = scoreboard.toString(); // .replace(/§./g, ''); is to remove formatting :D 
Chat.log(scoreboard);

     
// Scoreboard:
// {ÀÀ=13, - [||9470||] Rikko_ [105]=14, Party: [Lv. 105]=15, À=16}

// &r{ÀÀ=13, &e- &4[&c||9470||&4] &fRikko_&7 [105]=14, &e&lParty:&6 [Lv. 105]=15, À=16}


const extractName = (scoreboard) => {
    const preNameIndex = scoreboard.indexOf('||] ');
    if (preNameIndex === -1) {
        Chat.log("1")
        return undefined;
    }
    const postNameIndex = scoreboard.indexOf(' ', preNameIndex + 4);
    if (postNameIndex === -1) {
        Chat.log("2")
        return undefined;
    }
    return scoreboard.substring(preNameIndex + 4, postNameIndex);
}

Chat.log(extractName(scoreboard));

*/