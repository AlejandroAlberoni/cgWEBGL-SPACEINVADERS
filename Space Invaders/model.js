class Model {
    constructor(gl, meshProgramInfo, uniforms, bufferInfo, translation = [0,0,0]){
        this.gl = gl;
        this.meshProgramInfo = meshProgramInfo;
        this.translation = translation;
        this.uniforms = uniforms;
        this.bufferInfo = bufferInfo;
        this.rotation = Math.PI;
        this.vao = twgl.createVAOFromBufferInfo(gl, meshProgramInfo, bufferInfo);
    }
    computeMatrix(viewProjectionMatrix, translation=this.translation) {
        let matrix = m4.translate(viewProjectionMatrix, translation[0], translation[1], translation[2]);
        this.uniforms.u_matrix = m4.yRotate(matrix, this.rotation);
        this.translation = translation;
    }

    setTranslation(translation) {
        this.translation = translation
    }
}