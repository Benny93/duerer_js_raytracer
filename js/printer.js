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
    var A = Vec3(1, 1, 1);
    var dotA = dot(A, A);
    println("Shader Type " + shaderType);
}

function printVec3(vector){
    var vectorStr = "{" + vector.x + ", " + vector.y + ", " + vector.z  + "}";
    println(vectorStr);
}