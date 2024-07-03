if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad');

// requires
let config = require('../config.json');
let configFS = FS.open("../config.json");

// declarations
let playerKey = config.keybind;
let actionDelay = config.action_delay;
let archerToggle = config.archer_toggle;
let spells = config.spell_sequence;
let weaponSpeed = config.weapon_speed;
let toggle = false;
let limiter = false;
let mouseDown = false;
let weaponSpeedNums = {
    "weaponSpeedNums": [
        { INSTANT: 20 },
        { SUPER_FAST: 233 },
        { VERY_FAST: 323 },
        { FAST: 401 },
        { NORMAL: 488 },
        { SLOW: 667 },
        { VERY_SLOW: 1205 },
        { SUPER_SLOW: 1961 }
    ]
}

let isMacroRunning = false;

// Command Handler
let configJson = JSON.parse(configFS.read())
// unregister in case its already loaded
// command.unregister();
const cmd = Chat.getCommandManager().createCommandBuilder('wynnqol').executes(JavaWrapper.methodToJava((event) => {
    Chat.log("test")
}))
    .literalArg("keybind")
    .wordArg("keybind").executes(JavaWrapper.methodToJava((event) => {
        playerKey = `key.keyboard.` + `${event.getArg("keybind")}`;
        configJson.keybind = playerKey;
        configFS.write(JSON.stringify(configJson))
        Chat.log(`Keybind set to: ${playerKey}`);
    }))
    .or().or()
    .literalArg("action_delay")
    .wordArg("delay").executes(JavaWrapper.methodToJava((event) => {
        configJson.action_delay = event.getArg("delay")
        actionDelay = configJson.action_delay;
        configFS.write(JSON.stringify(configJson))
        Chat.log(`Action delay set to: ${actionDelay}`);
    })).or().or()
    .literalArg("archer_toggle")
    .wordArg("toggle").suggestMatching("true", "false").executes(JavaWrapper.methodToJava((event) => {
        configJson.archer_toggle = event.getArg("toggle")
        archerToggle = configJson.archer_toggle;
        configFS.write(JSON.stringify(configJson))
        Chat.log(`Archer toggle: ${archerToggle}`);
    })).or().or()
    .literalArg("weapon_speed")
    .wordArg("speed").suggestMatching("SUPER_SLOW", "VERY_SLOW", "SLOW", "NORMAL", "FAST", "VERY_FAST", "SUPER_FAST", "INSTANT").executes(JavaWrapper.methodToJava((event) => {
        configJson.weapon_speed = event.getArg("speed").toUpperCase();
        weaponSpeed = configJson.weapon_speed;
        configFS.write(JSON.stringify(configJson))
        Chat.log(`Weapon speed set to: ${weaponSpeed}`);
    })).or().or()
    .literalArg("spell_sequence")
    .greedyStringArg("sequence").executes(JavaWrapper.methodToJava((event) => {
        configJson.spell_sequence = event.getArg("sequence").toUpperCase().split(/\s+/);
        spells = configJson.spell_sequence;
        configFS.write(JSON.stringify(configJson));
        Chat.log(`Spell Sequence: ${spells}`);
    })).register();


// Spell Macro
JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
    config = require('../config.json');
    playerKey = config.keybind;
    archerToggle = config.archer_toggle === "true";
    // Multi-Cast
    if (event.action === 1 && event.key == playerKey) { // if on press
        if (isMacroRunning) return;
        isMacroRunning = true;
        context.releaseLock()
        do {
            if (archerToggle == true) {
                // Chat.log("Entered archer")
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
                        case "R":
                            R();
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
                        case "L":
                            L();
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
    // Single Spells
    if (event.action === 1 && (event.key == "key.keyboard.z" || event.key == "key.keyboard.x" || event.key == "key.keyboard.c" || event.key == "key.keyboard.v")) { // if on press
        if (isMacroRunning) return;
        isMacroRunning = true;
        context.releaseLock()
        do {
            // rlr
            if (archerToggle && event.key == "key.keyboard.z") {
                LRL();
                // Chat.log("RUNNING A SPELL AHHH")
            }
            // rrr
            else if (archerToggle && event.key == "key.keyboard.x") {
                LLL();
            }
            // rll
            else if (archerToggle && event.key == "key.keyboard.c") {
                LRR();
            }
            // rrl
            else if (archerToggle && event.key == "key.keyboard.v") {
                LLR();
            }
            // Non-archer toggle spells
            else if (!archerToggle && event.key == "key.keyboard.z") {
                RLR();
            }
            // rrr
            else if (!archerToggle && event.key == "key.keyboard.x") {
                RRR();
            }
            // rll
            else if (!archerToggle && event.key == "key.keyboard.c") {
                RLL();
            }
            // rrl
            else if (!archerToggle && event.key == "key.keyboard.v") {
                RRL();
            }
            Time.sleep(50);
        } while (KeyBind.getPressedKeys().contains(event.key));
        isMacroRunning = false;
    }
    // Chat.log(event.action + " + " + event.key)
    // Auto clicker -- SCRAPPED FOR NOW
    // if (event.action === 1 && event.key === "key.mouse.left") { // if on press
    //     if (isMacroRunning) return;
    //     isMacroRunning = true;
    //     context.releaseLock()
    //     do {
    //         if (archerToggle == true) {
    //             R();
    //         } else {
    //             L();
    //         }
    //         Time.sleep(50)
    //     } while (KeyBind.getPressedKeys().contains("key.mouse.left"))
    //     isMacroRunning = false;
    // }
    // blocking attack/interact during macro execution
    if (isMacroRunning && event.key === "key.mouse.left" || isMacroRunning && event.key === "key.mouse.right") {
        event.cancel();
        // Chat.log("Blocked")
    }
}))

// functions
function getActionDelay() {
    return parseInt(config.action_delay);
}

function getWeaponSpeed() {
    let speed = weaponSpeedNums.weaponSpeedNums.find(speedObj => Object.keys(speedObj)[0] === weaponSpeed);
    if (speed) {
        // Chat.log(speed[weaponSpeed]);
        return speed[weaponSpeed];
    } else {
        Chat.log(`Unknown weapon speed: ${weaponSpeed}, clicking with 250ms`);
        return 250;
    }
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
    Time.sleep(getActionDelay());
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


// R
function R() {
    Player.getPlayer().interact();
    Time.sleep(getWeaponSpeed());
}

// L
function L() {
    Player.getPlayer().attack();
    Time.sleep(getWeaponSpeed());
}