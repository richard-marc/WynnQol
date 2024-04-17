if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad')

var mouseDown = false;
var SpellDetected = false
var ARCHER_TOGGLE_CONFIG = require('../config/archerToggle.json');
var archerToggle = ARCHER_TOGGLE_CONFIG.archerToggle === 'true';


JsMacros.on('Title', JavaWrapper.methodToJava(event => {
    let actionBar = event.message.withoutFormatting();
    if (archerToggle) {
        if (actionBar.getString().startsWith("L-")) {
            SpellDetected = true;
        } else {
            SpellDetected = false
        }
    } else {
        if (actionBar.getString().startsWith("R-")) {
            SpellDetected = true;
        } else {
            SpellDetected = false
        }
    }
}));

JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
    

    if (archerToggle) {
        if (event.action === 1 && event.key == "key.mouse.right") {
            mouseDown = true;
            Chat.log("Clicker started")
            context.releaseLock()

            do {
                Player.getPlayer().interact()
                Time.sleep(50)
            } while (mouseDown)

        } else if (event.action === 0 && event.key == "key.mouse.right") {
            mouseDown = false;
            Chat.log("Clicker stopped")
        }
    } else {
        if (event.action === 1 && event.key == "key.mouse.left") {
            var timer = 0;
            mouseDown = true;
            Chat.log("Clicker started")
            context.releaseLock()

            do {
                timer++;
                KeyBind.releaseKeyBind('key.attack');
                if (SpellDetected) {
                    Chat.log(timer)
                    Chat.log("Spell detected!")
                    Time.sleep(1)
                    return;
                } else {
                    Player.getPlayer().attack()
                    Chat.log("Attacked")
                    Time.sleep(100)
                }
                // KeyBind.pressKeyBind('key.attack');  ### WHY DID I HAVE THIS LINE? IT BREAKS EVERYTHING
            } while (mouseDown)

        } else if (event.action === 0 && event.key == "key.mouse.left") {
            mouseDown = false;
            Chat.log("Clicker stopped")
        }
    }
}));