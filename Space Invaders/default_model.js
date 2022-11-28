const gen_defender = function ( gl, meshProgramInfo, translation ) {
  let modelUniforms = {
    u_colorMult: [0, 0.85, 0, 1],
    u_matrix: m4.identity(),
  };
  let size = 2;
  let defenderBufferInfo = twgl.primitives.createCubeBufferInfo(gl, size=size);
  let defender = new Model(gl, meshProgramInfo, modelUniforms, defenderBufferInfo, translation);
  return defender;
}

const gen_invader = function ( gl, meshProgramInfo, translation ) {
  let modelUniforms = {
    u_colorMult: [1, Math.random(0, 0.01), Math.random(0, 0.01), 1],
    u_matrix: m4.identity(),
  };
  let size = 3;
  let invaderBufferInfo = twgl.primitives.createCubeBufferInfo(gl, size=size);
  let form = new Model(gl, meshProgramInfo, modelUniforms, invaderBufferInfo, translation);
  worldObjects.push(form);
}

const gen_shot = function (gl, meshProgramInfo, defenderTranslation) {
  let modelUniforms = {
    u_colorMult: [1, 0, 0, 1],
    u_matrix: m4.identity(),
  };
  let translation = [defenderTranslation[0], defenderTranslation[1], defenderTranslation[2]];
  let size = 1;
  let shotBufferInfo = twgl.primitives.createCubeBufferInfo(gl, size=size);
  let shot = new Model(gl, meshProgramInfo, modelUniforms, shotBufferInfo, translation);
  shots.push(shot);
}