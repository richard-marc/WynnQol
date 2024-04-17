// notes -  make the title chat based , waiting on fuy.gg fix

if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad')
// beacon beam stuff - thanks Melo
const { createBeam } = require('../../lib/BeamElement.js')
const d3d = Hud.createDraw3D().register()
function add(elem) {
  d3d.reAddElement(elem.raw)
}

JsMacros.on('EntityLoad', JavaWrapper.methodToJava(event => {
  d3d.register();
  if (event.entity.getType() !== 'minecraft:armor_stand') return;
  if (!event.entity.getName().withoutFormatting().getString().includes("Void Hole [Lv. 130]")) return;

  Chat.title("§d§lVOID HOLE", "", 2, 10, 2);
  Chat.log("§dA void hole has been spawned!!!");
  add(createBeam(event.entity.getPos(), 0xFFFFFF).setInnerRadius(0.4));
  Client.waitTick(60);
  d3d.unregister();
}));