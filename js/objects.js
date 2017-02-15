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

function normalize(A){
    var dotA = dot(A,A);
    var nom = Math.sqrt(dotA);
    var res = Vec3(0,0,0);
    res.x = A.x / nom;
    res.y = A.y / nom;
    res.z = A.z / nom;
    return res;
}

function color(_r, _g, _b) {
    return {
        "r": _r,
        "g": _g,
        "b": _b
    }
}


function add_plane(){
}