//settings
var width = 40;
var height = 30;
var lightPos = Vec3(5, 5, -10);
var light_color = Vec3(1,1,1);

// Default light and material parameters.
var ambient = 0.05;
var diffuse_c = 1;
var specular_c = 1;
var specular_k = 50;

var black = color(0,0,0);  // Current color.
var O = Vec3(0, 0.35, -1);  // Camera.
var Q = Vec3(0, 0, 0);  // Camera pointing to.

/*global variables*/
var myConsole = document.getElementById('log');



function println(text) {
    myConsole.innerHTML += '<br>&gt; ' + text;
}
function clearLog() {
    myConsole.innerHTML = 'Console:~$';
}
/*error handling*/
window.onerror = function (error, url, line) {
    println(error + ' at ln ' + line);
}





function printInfo() {
    println('Light pos ' + lightPos.y);
    var A = Vec3(1,1,1);
    var dotA = dot(A,A);
    
}

function render(depth) {
    clearLog();
    println('Time: ' + getCurrentTime());
    println('Redering with depth' + depth + '!');
    printInfo();
    var pixelData = createBackgroundImage();
    
    for (var x = 0; x < width; x++) {        
        for (var y = 0; y < height; y++) {
            //camera direcion
            
            
        }
    }
    displayImage(pixelData);
}
