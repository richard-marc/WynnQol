/* 
TODO:
make it so the commands are suggested
*/
if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad')

var SPELL_SEQUENCE_CONFIG = require('../config/spellSequenceConfig.json');
var KEYBIND_CONFIG = require('../config/keybindConfig.json');
var ACTION_DELAY_CONFIG = require('../config/actionDelayConfig.json');
var ARCHER_TOGGLE_CONFIG = require('../config/archerToggle.json');

let playerKey = KEYBIND_CONFIG.spellMacroKeyBind;
let ACTION_DELAY = ACTION_DELAY_CONFIG.action_delay;
let archerToggle = ARCHER_TOGGLE_CONFIG.archerToggle;

const CommandManager = Chat.getCommandManager();

let command = CommandManager.createCommandBuilder("wynnqol");
command.unregister();

command.wordArg("module").wordArg("setting").greedyStringArg("things").executes(JavaWrapper.methodToJava((event) => {
    if (event.getArg("module") === "spellmacro") {
        if (event.getArg("setting") === "spells") {
            var spells = event.getArg("things").toUpperCase().split(/\s+/); // Split based on whitespace
            Chat.log("Spell sequence: " + spells);
            FS.open('../config/spellSequenceConfig.json').write(JSON.stringify({ spellSequence: spells }));
            SPELL_SEQUENCE_CONFIG = require('../config/spellSequenceConfig.json');
        } else if (event.getArg("setting") === "keybind") {
            playerKey = "key.keyboard." + event.getArg("things");
            Chat.log("Keybind changed to: " + playerKey);
            FS.open('../config/keybindConfig.json').write(JSON.stringify({ spellMacroKeyBind: playerKey }));
        } else if (event.getArg("setting") === "delay") {
            ACTION_DELAY = event.getArg("things");
            Chat.log("Delay changed to: " + ACTION_DELAY);
            FS.open('../config/actionDelayConfig.json').write(JSON.stringify({ action_delay: ACTION_DELAY }));
        } else if (event.getArg("setting") === "archertoggle") {
            archerToggle = event.getArg("things");
            Chat.log("Archer toggle: " + archerToggle);
            FS.open('../config/archerToggle.json').write(JSON.stringify({ archerToggle: archerToggle }));
        } else {
            Chat.log("Unknown setting!");
        }
    }
})).register();
