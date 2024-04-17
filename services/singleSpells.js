// replacement for wynntils spells. no queuing system, i plan on doing it at some point. blocks left/right mouse inputs.

if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad')

var isMacroRunning = false;

function getActionDelay() {
    var ACTION_DELAY_CONFIG = require('../config/actionDelayConfig.json');
    var ACTION_DELAY = parseInt(ACTION_DELAY_CONFIG.action_delay, 10);
    return ACTION_DELAY;
}

JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
    var ARCHER_TOGGLE_CONFIG = require('../config/archerToggle.json');
    var archerToggle = ARCHER_TOGGLE_CONFIG.archerToggle === 'true';
    if (event.action === 1 && (event.key == "key.keyboard.z" || event.key == "key.keyboard.x" || event.key == "key.keyboard.c" || event.key == "key.keyboard.v")) { // if on press
        if (isMacroRunning) return;
        isMacroRunning = true;
        context.releaseLock()
        do {
            // rlr
            if (archerToggle && event.key == "key.keyboard.z") {
                LRL();
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
            Time.sleep(150); // Small delay to check the key press status again
        } while (KeyBind.getPressedKeys().contains(event.key)); // Check if the initial key is still being pressed
        isMacroRunning = false;
    }
    // cancel player left and right click while macro is running
    if (isMacroRunning && (event.key === "key.mouse.left" || event.key === "key.mouse.right")) {
        event.cancel();
    }
}));

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