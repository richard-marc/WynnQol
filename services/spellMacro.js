// waiting for world to load
if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad')

var KEYBIND_CONFIG = require('../config/keybindConfig.json');
var SPELL_SEQUENCE_CONFIG = require('../config/spellSequenceConfig.json');
var ACTION_DELAY_CONFIG = require('../config/actionDelayConfig.json');
var ARCHER_TOGGLE_CONFIG = require('../config/archerToggle.json');

var playerKey = KEYBIND_CONFIG.spellMacroKeyBind;
var archerToggle = ARCHER_TOGGLE_CONFIG.archerToggle === 'true';
var isMacroRunning = false;

// do the macro
JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
    KEYBIND_CONFIG = require('../config/keybindConfig.json');
    SPELL_SEQUENCE_CONFIG = require('../config/spellSequenceConfig.json');
    ARCHER_TOGGLE_CONFIG = require('../config/archerToggle.json');
    playerKey = KEYBIND_CONFIG.spellMacroKeyBind;
    spells = SPELL_SEQUENCE_CONFIG.spellSequence;
    archerToggle = ARCHER_TOGGLE_CONFIG.archerToggle === 'true';
    if (event.action === 1 && event.key == playerKey) { // if on press
        if (isMacroRunning) return;
        isMacroRunning = true;
        context.releaseLock()
        do {
            if (archerToggle) {
                for (let i = 0; i < spells.length; i++) {
                    switch (spells[i]) {
                        case "LLL":
                            LLL();
                            break;
                        case "LLR":
                            LLR();
                            break;
                        case "LRL":
                            LRL();
                            break;
                        case "LRR":
                            LRR();
                            break;
                        default:
                            Chat.log("Unknown spell: " + spells[i]);
                    }
                }
            } else {
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
            }
            Time.sleep(50)
        } while (KeyBind.getPressedKeys().contains(playerKey))
        isMacroRunning = false;
    }
    // cancel player left and right click while macro is running
    if (isMacroRunning && event.key === "key.mouse.left" || isMacroRunning && event.key === "key.mouse.right") {
        event.cancel();
    }
}));

function getActionDelay() {
    var ACTION_DELAY_CONFIG = require('../config/actionDelayConfig.json');
    var ACTION_DELAY = parseInt(ACTION_DELAY_CONFIG.action_delay, 10);
    return ACTION_DELAY;
}

//RRR
function RRR() {
    Player.getPlayer().interact();
    Time.sleep(getActionDelay());
    Player.getPlayer().interact();
    Time.sleep(getActionDelay());
    Player.getPlayer().interact();
    Time.sleep(getActionDelay());
}

// RRL
function RRL() {
    Player.getPlayer().interact();
    Time.sleep(getActionDelay());
    Player.getPlayer().interact();
    Player.getPlayer().attack();
    Time.sleep(getActionDelay());
}

//RLR
function RLR() {
    Player.getPlayer().interact();
    Player.getPlayer().attack();
    Time.sleep(getActionDelay());
    Player.getPlayer().interact();
    Time.sleep(getActionDelay());
}

//RLL
function RLL() {
    Player.getPlayer().interact();
    Player.getPlayer().attack();
    Time.sleep(getActionDelay());
    Player.getPlayer().attack();
    Time.sleep(getActionDelay());
}

//LLL
function LLL() {
    Player.getPlayer().attack();
    Time.sleep(getActionDelay());
    Player.getPlayer().attack();
    Time.sleep(getActionDelay());
    Player.getPlayer().attack();
    Time.sleep(getActionDelay());
}

//LLR
function LLR() {
    Player.getPlayer().attack();
    Time.sleep(getActionDelay());
    Player.getPlayer().attack();
    Player.getPlayer().interact();
    Time.sleep(getActionDelay());
}

//LRR
function LRR() {
    Player.getPlayer().attack();
    Player.getPlayer().interact();
    Time.sleep(getActionDelay());
    Player.getPlayer().interact();
    Time.sleep(getActionDelay());
}

//LRL
function LRL() {
    Player.getPlayer().attack();
    Player.getPlayer().interact();
    Time.sleep(getActionDelay());
    Player.getPlayer().attack();
    Time.sleep(getActionDelay());
}
