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

function printInfo(scene) {
    println('Light at ' + toStrVec3(lightPos));    
    println('Camera at ' + toStrVec3(O));
    for(var i = 0; i < scene.length ; i++){
        println(scene[i].type + " at " + toStrVec3(scene[i].position));
    }
    println('Time: ' + getCurrentTime());
    println('Redering!');
}

