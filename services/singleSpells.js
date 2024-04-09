// replacement for wynntils spells. no queuing system, i plan on doing it at some point. blocks left/right mouse inputs. ACTION_DELAY requires spellMacro.js

var isMacroRunning = false;

function getActionDelay() {
    var ACTION_DELAY_CONFIG = require('../config/actionDelayConfig.json');
    var ACTION_DELAY = ACTION_DELAY_CONFIG.action_delay;
    return ACTION_DELAY;
}

JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
    // rlr
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