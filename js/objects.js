function Vec3(x,y,z){
    return {
        "x": x,
        "y": y,
        "z": z
    }
}

function dot(A,B){
    return A.x * B.x + A.y * B.y + A.z * B.z;
}

function color(_r, _g, _b) {
    return {
        "r": _r,
        "g": _g,
        "b": _b
    }
}
