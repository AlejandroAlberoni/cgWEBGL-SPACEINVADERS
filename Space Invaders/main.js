loadGUI();
var signal;
var enemiesDeadCount = 0;
var hordeCount;
var then = 0;
var deltaTime = 0;

function main() {
  var camera = new Camera(60);
  init_invaders( gl, meshProgramInfo );
  defender = init_defender( gl, meshProgramInfo );
  hordeCount = worldObjects.length
  function render(time){
    time *= 0.001;
    deltaTime = time - then;
    then = time;
    innerPocket();
    checkColision();
    updateAllPositions(time);
    /*if (enemiesDeadCount == 13){
      num = Math.trunc(getRandomArbitrary(0, worldObjects.length -1));
      console.log(num);
      let obj = worldObjects[num]
      camera.updateCamera(cameraPosition=[null,null,50],target=obj.translation)
    }*/
    computeModelPool(camera.viewProjectionMatrix, control);
    drawEverything(defender, worldObjects, shots);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();

function innerPocket (){
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function drawObjects(objectsToDraw) {
  objectsToDraw.forEach( function(object) {
    const programInfo = object.meshProgramInfo;
    const bufferInfo = object.bufferInfo;
    const vertexArray = object.vao;
    gl.useProgram(programInfo.program);
    gl.bindVertexArray(vertexArray);
    twgl.setUniforms(programInfo, object.uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);
  });
}

function drawEverything(defender, objects, shots) {
  checkPlayerColision()
  let everySceneModel = objects.concat(defender, shots);
  drawObjects(everySceneModel);
}

function computeModelPool(vpm, control){
  defender.computeMatrix( vpm, [control.move, -100, 0] );
  worldObjects.forEach( (o) => o.computeMatrix( vpm ) );
  if (shots.length > 0){ shots.forEach( (o) => {o.computeMatrix(vpm)}); }
}

function updateAllPositions(time){
let c = time * 3;
enemiesAdjust = Math.sin(c);
if(signal && signal != Math.sign(enemiesAdjust)){
  worldObjects.forEach( (o) => {o.setTranslation([o.translation[0], o.translation[1] - 1, o.translation[2]])})
}
signal = Math.sign(enemiesAdjust);
worldObjects.forEach( (o) => o.setTranslation([o.translation[0] + enemiesAdjust, o.translation[1], o.translation[2]]) );
shots.forEach( (o) => o.setTranslation([o.translation[0], o.translation[1] + 2, o.translation[2]]) );
}

function checkColision() {
let remove_indexes;
shots.forEach((s, i1) => {
  worldObjects.forEach( (e, i2) => {
    if (s.translation[0] < e.translation[0]+3 && s.translation[0]+1 > e.translation[0] && s.translation[1] < e.translation[1]+3 && s.translation[1]+1 > e.translation[1]){
    remove_indexes = [i1, i2];
      if (enemiesDeadCount == hordeCount - 1){
        throw Error("YOU WON, LUCKY");
      }
    return removeObjects(remove_indexes);
    }
  })
})
}

function removeObjects(toRemove){
worldObjects.splice(toRemove[1], 1);
shots.splice(toRemove[0], 1);
enemiesDeadCount++;
}

function checkPlayerColision (){
  worldObjects.forEach((o) => {
    if (o.translation[0] < defender.translation[0]+2 && o.translation[0]+3 > defender.translation[0] && o.translation[1] < defender.translation[1]+2 && o.translation[1]+3 > defender.translation[1]){
      throw Error("YOURE BAD, THE GAME ENDED");
    }
  })
  return false
}

function cameraAnimation () {

}