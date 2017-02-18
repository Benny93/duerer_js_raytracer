var defaultBlack = Vec3(255, 255, 255);
var defaultWhite = Vec3(0, 0, 0);
var defaultBlue = Vec3 (0,0,255);

function Vec3(x, y, z) {
    return {
        "x": x,
        "y": y,
        "z": z
    }
}

function dot(A, B) {
    return A.x * B.x + A.y * B.y + A.z * B.z;
}

function normalize(A) {
    var dotA = dot(A, A);
    var nom = Math.sqrt(dotA);
    var res = Vec3(0, 0, 0);
    res.x = A.x / nom;
    res.y = A.y / nom;
    res.z = A.z / nom;
    return res;
}

function subVec3(A, B) {
    return Vec3(
        A.x - B.x,
        A.y - B.y,
        A.z - B.z)
}

function addVec3(A, B) {
    return Vec3(
        A.x + B.x,
        A.y + B.y,
        A.z + B.z)
}

function scaleVec3(A, factor) {
    return Vec3(
        A.x * factor,
        A.y * factor,
        A.z * factor)
}

function createRay(O, D) {
    return {
        "origin": O,
        "direction": D
    }
}

function hit(obj, hitPoint, normal, rayColor) {
    return {
        "object": obj,
        "hitPoint": hitPoint,
        "normal": normal,
        "rayColor": rayColor
    }
}

function color(_r, _g, _b) {
    return {
        "r": _r,
        "g": _g,
        "b": _b
    }
}


var planeCheckBoard =
    function getPlaneColorAtPoint(point) {
        /*printVec3(point);
        println("lhs " + (Math.floor(point.x * 2) % 2));
        println("rhs " + (Math.floor(point.z * 2) % 2));*/
        if ((Math.floor(point.x * 2) % 2) == (Math.floor(point.z * 2) % 2)) {          
            return defaultWhite;
        } else {
            return defaultBlue;
        }        
    }


//TODO: chess color of plane
function add_plane(position, normal) {
    return {
        "type": "plane",
        "position": position,
        "normal": normal,
        "s_color": Vec3(255, 255, 255),
        "checkerBoard": planeCheckBoard,
        "diffuse_c": 0.75,
        "specular_c": 0.5,
        "reflection": 0.25
    }
}

function add_sphere(position, radius, s_color) {
    return {
        "type": "sphere",
        "position": position,
        "radius": radius,
        "s_color": s_color,
        "diffuse_c": 0.75,
        "specular_c": 0.5,
        "reflection": 0.5
    }
}
