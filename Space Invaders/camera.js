class Camera {
    constructor(fov=60){    
        this.fov = degToRad(fov);
        this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        this.projectionMatrix = m4.perspective(this.fov, this.aspect, 1, 2000);
        this.cameraPosition = [50, -50, 100];
        this.target = [50, -50, 0];
        this.up = [0, 1, 0];
        this.cameraMatrix = m4.lookAt(this.cameraPosition, this.target, this.up);
        this.viewMatrix = m4.inverse(this.cameraMatrix);
        this.viewProjectionMatrix = m4.multiply(this.projectionMatrix, this.viewMatrix);
    }
    
    updateCamera(cameraPosition, target){
        this.cameraPosition = [50 || this.cameraPosition[0],-50 || this.cameraPosition[1],100 || this.cameraPosition[2]];
        this.target = [50 || this.cameraPosition[0],-50 || this.cameraPosition[1],0 || this.cameraPosition[2]];
        this.up = [0, 1, 0];
        this.cameraMatrix = m4.lookAt(this.cameraPosition, this.target, this.up);
        this.viewMatrix = m4.inverse(this.cameraMatrix);
        this.viewProjectionMatrix = m4.multiply(this.projectionMatrix, this.viewMatrix);
    }

}