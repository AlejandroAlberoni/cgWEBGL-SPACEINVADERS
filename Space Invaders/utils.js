const degToRad = (d) => (d * Math.PI) / 180;
const radToDeg = (r) => (r * 180) / Math.PI;

const getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
}

const vs = `#version 300 es
  in vec4 a_position;
  in vec4 a_color;

  uniform mat4 u_matrix;

  //out vec4 v_color;

  void main() {
    gl_Position = u_matrix * a_position;

    //v_color = a_color;
  }
`;

const fs = `#version 300 es
precision highp float;

//in vec4 v_color;

uniform vec4 u_colorMult;

out vec4 outColor;

void main() {
  outColor = u_colorMult;
}
`;

const initializeWorld = () => {
    const canvas = document.getElementById("c")
    const gl = canvas.getContext("webgl2");
    if (!gl) { return }
    twgl.setAttributePrefix("a_");
    const meshProgramInfo = twgl.createProgramInfo(gl,[vs,fs]);
    return {gl, meshProgramInfo};
  };

const { gl, meshProgramInfo } = initializeWorld();
var defender;
var worldObjects = [];
var shots = [];
