const control = { move: 50 };
const addShot = { createShot:(e) => {gen_shot( gl, meshProgramInfo, defender.translation )}}

const loadGUI = () => {
  const gui = new dat.GUI();
  gui.add(control, "move", -50, 150, 0.01).name("Defender Control");
  gui.add(addShot, "createShot").name("Atirar");
}