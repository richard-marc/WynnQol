// thx to etheradon for the actual removal i just made it work as a service
if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad')

const BLINDNESS = Java.type("net.minecraft.class_1294").field_5919; //net.minecraft.entity.effect.StatusEffects
let player = Player.getPlayer().getRaw();

JsMacros.on('StatusEffectUpdate', JavaWrapper.methodToJava(event => {
    if (event.added) {
        let effect = event.newEffect;
        if (effect.getId() == "minecraft:blindness") {
            player.method_6111(BLINDNESS); //removeStatusEffectInternal
            Chat.log("Removed Blindness")
        }
    }
}));