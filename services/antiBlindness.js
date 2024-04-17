// thx to etheradon for the actual removal
if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad')

const BLINDNESS = Java.type("net.minecraft.class_1294").field_5919; //net.minecraft.entity.effect.StatusEffects
let player = Player.getPlayer().getRaw();

JsMacros.on('EntityLoad', JavaWrapper.methodToJava(e => {
    if (e.entity.getType() !== 'minecraft:armor_stand') return;
    if (!e.entity.getName().withoutFormatting().getString().includes("Berserker Berry [Lv. 500]")) return;
    Chat.log("Berry detected")
    for (let i = 0; i < 2000; i++) {
        Chat.log("Attempting to remove blindness")
        if (player.method_6059(BLINDNESS)) { //hasStatusEffect
            player.method_6111(BLINDNESS); //removeStatusEffectInternal
            Chat.log("Removed Blindness")
        }
        Chat.log("Blindness check failed")
        Client.waitTick(1)
    }
}));