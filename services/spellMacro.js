/**
 * spellMacro.js
 * 
 * Author: rikko.
 * 
 * Description:
 * /spellmacro [spells] (ex. /spellmacro rrr rrr rlr rrr rll rrl)
 * /spellmacrokeybind [keybind] (ex. /spellmacrokeybind f)
 * /spellmacrodelay [delay] (ex. /spellmacrodelay 50)
 * 
 * Hold your keybind key to play a continous loop of the macro
 * Left/Right click inputs during macro are blocked
 * 
 * ps. i know the code is awful, feel free to improve upon it if you wish
 */

// waiting for world to load
if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad')

var KEYBIND_CONFIG = require('../config/keybindConfig.json');
var SPELL_SEQUENCE_CONFIG = require('../config/spellSequenceConfig.json');
var ACTION_DELAY_CONFIG = require('../config/actionDelayConfig.json');
let playerKey = KEYBIND_CONFIG.spellMacroKeyBind;
let ACTION_DELAY = ACTION_DELAY_CONFIG.action_delay;
let isMacroRunning = false;


const CommandManager = Chat.getCommandManager();
// change keybind command
let commandSMKB = CommandManager.createCommandBuilder("spellmacrokeybind");
commandSMKB.unregister();

// spell macro command
let commandSM = CommandManager.createCommandBuilder("spellmacro");
commandSM.unregister();

// spell delay command
let commandSMDelay = CommandManager.createCommandBuilder("spellmacrodelay");
commandSMDelay.unregister();


// change keybind command
commandSMKB.greedyStringArg("spellBind").executes(JavaWrapper.methodToJava((event) => {
    playerKey = "key.keyboard." + event.getArg("spellBind");
    Chat.log("Keybind changed to: " + playerKey);
    FS.open('../config/keybindConfig.json').write(JSON.stringify({ spellMacroKeyBind: playerKey }));
})).register();

// spell macro command
commandSM.greedyStringArg("spellSequence").executes(JavaWrapper.methodToJava((event) => {
    var spells = event.getArg("spellSequence").toUpperCase().split(/\s+/); // Split based on whitespace
    Chat.log("Spell sequence: " + spells);
    FS.open('../config/spellSequenceConfig.json').write(JSON.stringify({ spellSequence: spells }));
    SPELL_SEQUENCE_CONFIG = require('../config/spellSequenceConfig.json');
})).register();

commandSMDelay.intArg("spellDelay").executes(JavaWrapper.methodToJava((event) => {
    ACTION_DELAY = event.getArg("spellDelay");
    Chat.log("Delay changed to: " + ACTION_DELAY);
    FS.open('../config/actionDelayConfig.json').write(JSON.stringify({ action_delay: ACTION_DELAY }));
})).register();

// do the macro
JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
    if (event.action === 1 && event.key == playerKey) { // if on press
        if (isMacroRunning) return;
        isMacroRunning = true;
        context.releaseLock()
        spells = SPELL_SEQUENCE_CONFIG.spellSequence;
        do {
            for (let i = 0; i < spells.length; i++) {
                switch (spells[i]) {
                    case "RRR":
                        RRR();
                        break;
                    case "RRL":
                        RRL();
                        break;
                    case "RLR":
                        RLR();
                        break;
                    case "RLL":
                        RLL();
                        break;
                    default:
                        Chat.log("Unknown spell: " + spells[i]);
                }
            }
            Time.sleep(50)
        } while (KeyBind.getPressedKeys().contains('key.keyboard.n'))


        isMacroRunning = false;
    }
    // cancel player left and right click while macro is running
    if (isMacroRunning && event.key === "key.mouse.left" || isMacroRunning && event.key === "key.mouse.right") {
        event.cancel();
    }
}));

//RRR
function RRR() {
    Player.getPlayer().interact();
    Time.sleep(ACTION_DELAY);
    Player.getPlayer().interact();
    Time.sleep(ACTION_DELAY);
    Player.getPlayer().interact();
    Time.sleep(ACTION_DELAY);
}

// RRL
function RRL() {
    Player.getPlayer().interact();
    Time.sleep(ACTION_DELAY);
    Player.getPlayer().interact();
    Player.getPlayer().attack();
    Time.sleep(ACTION_DELAY);
}

//RLR
function RLR() {
    Player.getPlayer().interact();
    Player.getPlayer().attack();
    Time.sleep(ACTION_DELAY);
    Player.getPlayer().interact();
    Time.sleep(ACTION_DELAY);
}

//RLL
function RLL() {
    Player.getPlayer().interact();
    Player.getPlayer().attack();
    Time.sleep(ACTION_DELAY);
    Player.getPlayer().attack();
    Time.sleep(ACTION_DELAY);
}