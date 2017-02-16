function getCurrentTime() {
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
    return datetime;
}

function createBackgroundImage() {    
    var pixelData = [];
    var nom = 230/height;
    for (var x = 0; x < width; x++) {
        pixelData[x] = [];
        for (var y = 0; y < height; y++) {
            pixelData[x][y] = color(0,0,230-y*nom);            
        }
    }
    return pixelData;
}

/*Displays image*/
function displayImage(pixelData){
    var c2 = document.getElementById("myCanvas");
    c2.width = width;
    c2.height = height;
    var ctx2 = c2.getContext("2d");

    var c1 = document.createElement("canvas");
    c1.width = width;
    c1.height = height;
    var ctx1 = c1.getContext("2d");
    

    var imgData = ctx1.createImageData(width, height);
    for (var i = 0; i < imgData.data.length; i += 4) {
        var x = (i / 4) % width;
        var y = Math.floor(i / (4*width));
        imgData.data[i] = pixelData[x][y].r;
        imgData.data[i + 1] = pixelData[x][y].g;
        imgData.data[i + 2] = pixelData[x][y].b;
        imgData.data[i + 3] = 255;
    }
    ctx1.putImageData(imgData, 0, 0);
    //debug stretch image
    c2.width = 400;
    c2.height = 300;

    ctx2.mozImageSmoothingEnabled = false;
    ctx2.webkitImageSmoothingEnabled = false;
    ctx2.msImageSmoothingEnabled = false;
    ctx2.imageSmoothingEnabled = false;
    ctx2.drawImage(c1, 0, 0, 400, 300);
}