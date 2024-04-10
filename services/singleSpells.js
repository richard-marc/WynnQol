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
    // rlr
    if (archerToggle) {
        if (event.action === 1 && event.key == "key.keyboard.z") { // if on press
            if (isMacroRunning) return;
            isMacroRunning = true;
            context.releaseLock()
            LRL();
            isMacroRunning = false;
        }
        // rrr
        if (event.action === 1 && event.key == "key.keyboard.x") { // if on press
            if (isMacroRunning) return;
            isMacroRunning = true;
            context.releaseLock()
            LLL();
            isMacroRunning = false;
        }
        // rll
        if (event.action === 1 && event.key == "key.keyboard.c") { // if on press
            if (isMacroRunning) return;
            isMacroRunning = true;
            context.releaseLock()
            LRR();
            isMacroRunning = false;
        }
        // rrl
        if (event.action === 1 && event.key == "key.keyboard.v") { // if on press
            if (isMacroRunning) return;
            isMacroRunning = true;
            context.releaseLock()
            LLR();
            isMacroRunning = false;
        }
    } else {
        if (event.action === 1 && event.key == "key.keyboard.z") { // if on press
            if (isMacroRunning) return;
            isMacroRunning = true;
            context.releaseLock()
            RLR();
            isMacroRunning = false;
        }
        // rrr
        if (event.action === 1 && event.key == "key.keyboard.x") { // if on press
            if (isMacroRunning) return;
            isMacroRunning = true;
            context.releaseLock()
            RRR();
            isMacroRunning = false;
        }
        // rll
        if (event.action === 1 && event.key == "key.keyboard.c") { // if on press
            if (isMacroRunning) return;
            isMacroRunning = true;
            context.releaseLock()
            RLL();
            isMacroRunning = false;
        }
        // rrl
        if (event.action === 1 && event.key == "key.keyboard.v") { // if on press
            if (isMacroRunning) return;
            isMacroRunning = true;
            context.releaseLock()
            RRL();
            isMacroRunning = false;
        }
    }
    // cancel player left and right click while macro is running
    if (isMacroRunning && event.key === "key.mouse.left" || isMacroRunning && event.key === "key.mouse.right") {
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