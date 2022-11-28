const init_invaders  = function( gl, meshProgramInfo ) {
    let y_start = 0
    for ( const x of Array(8).keys() ){
        let x_start = 0;
        for ( const y of Array(14).keys()){
            gen_invader( gl, meshProgramInfo, translation=[x_start, y_start, 0] );
            x_start += 5;
        }
        y_start -= 5
    }
}

const init_defender  = function(gl, meshProgramInfo ) {
    return gen_defender( gl, meshProgramInfo )
}

const make_shoot = (gl, meshProgramInfo) => {
    return gen_shot(gl, meshProgramInfo) 
}