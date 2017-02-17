//settings
var width = 400;
var height = 300;
var lightPos = Vec3(5, 5, -10);
var light_color = Vec3(255, 255, 255);

// Default light and material parameters.
var ambient = 0.05;
var diffuse_c = 1;
var specular_c = 1;
var specular_k = 50;

var black = color(0, 0, 0); // Current color.
var O = Vec3(0, 0.35, -1); // Camera.
var Q = Vec3(0, 0, 0); // Camera pointing to.

//max raydepth
var inf = 100;

var shaderType = document.getElementsByName('shaderType')[0].value; //0:debug , 1: diffuse+Blinn
var castShadows = 0; //0: false, 1:true

/*global variables*/
var scene = [add_plane(Vec3(0, -5, 0), Vec3(0, 1, 0)),
            add_sphere(Vec3(0.8, 0.1, 1), 0.6, Vec3(0, 0, 255)),
            add_sphere(Vec3(0, 0.1, 2), 0.6, Vec3(0, 255, 0)),
            add_sphere(Vec3(-1.2, 0.8, 1.5), 0.6, Vec3(255, 0, 0))
            ];
//.75, .1, 1.], .6, [0., 0., 1.]

function intersectPlane(ray, position, normal) {
    //denominator
    var denom = dot(ray.direction, normal);
    if (Math.abs(denom) < 1e-6) {
        return inf;
    }
    var t = dot(subVec3(position, O), normal) / denom;
    if (t < 0) {
        return inf;
    }
    return t;

}

function intersectSphere(ray, position, radius) {
    //using Quadratic equation
    var a = dot(ray.direction, ray.direction) // length of ray dir
    var originToSphere = subVec3(ray.origin, position); // direction from sphere center to origin
    var b = 2 * dot(ray.direction, originToSphere);
    var c = dot(originToSphere, originToSphere) - radius * radius;
    var discriminant = b * b - 4 * a * c; // discriminate from midnight formula    
    if (discriminant > 0) { // there is at least one result
        var disc_sqrt = Math.sqrt(discriminant)
        var q;
        if (b < 0) {
            q = (-b - disc_sqrt) / 2.0;
        } else {
            q = (-b + disc_sqrt) / 2.0;
        }
        var t0 = q / a;
        var t1 = c / q;
        var tmin = Math.min(t0, t1);
        var tmax = Math.max(t0, t1);
        if (tmax >= 0) {
            if (tmin < 0) {
                return tmax;
            } else {
                return tmin;
            }
        }
    }
    return inf //there is no result and therefore no hitpoint

}


function intersect(ray, obj) {
    if (obj.type.localeCompare("plane") == 0) {
        return intersectPlane(ray, obj.position, obj.normal);
    }
    if (obj.type.localeCompare("sphere") == 0) {
        return intersectSphere(ray, obj.position, obj.radius);
    }
}

function getNormal(obj, intersectionPoint) {
    if (obj.type.localeCompare("plane") == 0) {
        return obj.normal;
    }
    if (obj.type.localeCompare("sphere") == 0) {
        return normalize(subVec3(intersectionPoint, obj.position));
    }
}

function getColor(obj, intersectionPoint) {
    if (obj.type.localeCompare("plane") == 0) {
        return obj.s_color;
    }
    if (obj.type.localeCompare("sphere") == 0) {
        return obj.s_color;
    }
}

function shadeDiffuseBlinn(obj, N, toL, toO, surfaceColor) {
    var rayColor = extendVec3(surfaceColor, ambient);
    // Lambert shading (diffuse). -> diffuseColor * cos(theta) * color
    var NtoL = dot(N, toL);
    //printVec3(M);    
    var diffuseFactor = obj.diffuse_c * Math.max(NtoL, 0);
    var specularFactor = obj.specular_c * Math.max(dot(N, normalize(addVec3(toL, toO))), 0) ** specular_k;
    var specularColor = extendVec3(light_color, specularFactor);

    rayColor = addVec3(rayColor, addVec3(extendVec3(surfaceColor, diffuseFactor), specularColor));
    return rayColor;
}

function shadeDebug(N) {
    return Vec3(Math.abs(N.x) * 255, Math.abs(N.y) * 255, Math.abs(N.z) * 255);
}

function traceRay(ray) {
    var t = inf;
    var objIndex = -1;
    for (var i = 0; i < scene.length; i++) {
        var objT = intersect(ray, scene[i]);
        if (objT < inf) { //select nearest hit
            t = objT;
            objIndex = i;
        }
    }
    if (t === inf) {
        return;
    }
    //ray did hit something    
    var obj = scene[objIndex];
    // Find the point of intersection on the object.
    var M = addVec3(ray.origin, extendVec3(ray.direction, t));
    // Find properties of the object.
    var N = getNormal(obj, M);
    var surfaceColor = getColor(obj, M);
    var toL = normalize(subVec3(lightPos, M)); //zum licht
    var toO = normalize(subVec3(O, M));
    if (castShadows !== 0) {
        // Shadow: find if the point is shadowed or not.
        var shadowRay = createRay(addVec3(M, extendVec3(N, 0.001)), toL);
        for (var i = 0; i < scene.length; i++) {
            if (i !== objIndex) {
                var objT = intersect(ray, scene[i]);
                if (objT < inf) {
                    return; //shadow ray hit something -> shadow
                }
            }
        }
    }
    //no shadow
    //Start computing the color.
    var rayColor;
    if (shaderType == 1) {
        rayColor = shadeDiffuseBlinn(obj, N, toL, toO, surfaceColor);
    } else {
        rayColor = shadeDebug(N);
    }
    return hit(obj, M, N, rayColor);
}

function render(maxDepth) {
    clearLog();
    println('Time: ' + getCurrentTime());
    println('Redering with depth ' + maxDepth + '!');
    printInfo();
    var start_ms = new Date().getTime();
    //fetch settings
    shaderType = document.getElementsByName('shaderType')[0].value;
    //create background image
    var pixelData = createBackgroundImage();
    var r = width / height;
    // Screen coordinates: x0, y0, x1, y1.
    var S = [-1, -1 / r + .25, 1, 1 / r + .25];
    var xStepSize = (Math.abs(S[0]) + S[2]) / width;
    var yStepSize = (Math.abs(S[1]) + S[3]) / height;
    var imagePlanePoint;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            //camera direction
            imagePlanePoint = Vec3(S[0] + xStepSize * x, S[3] - yStepSize * y, 0);
            //println(imagePlanePoint.x + ", " + imagePlanePoint.y);           
            var depth = 0;
            var D = normalize(subVec3(imagePlanePoint, O));
            var ray = createRay(O, D);
            var relfection = 1;
            var pixelColor = Vec3(0, 0, 0);
            //trace
            while (depth < maxDepth) {
                var traced = traceRay(ray);
                if (typeof traced === 'undefined') {
                    break;
                }
                //if(traced.object                 
                pixelColor = addVec3(pixelColor, traced.rayColor);
                depth++;
            }
            pixelData[x][y].r = pixelColor.x;
            pixelData[x][y].g = pixelColor.y;
            pixelData[x][y].b = pixelColor.z;
        }
    }
    displayImage(pixelData);
    
    var end_ms = new Date().getTime();
    var passedTime_ms = end_ms - start_ms;
    println("Finished in: " + passedTime_ms/1000 + " seconds");
}
