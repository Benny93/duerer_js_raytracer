function inputButtonPressedRender() {
    render(document.getElementsByName('renderDepth')[0].value);
}

function inputButtonPressedSetPreset() {
    var presetIdx = document.getElementsByName('preset')[0].value;
    switch (presetIdx) {
        case "1":
            document.getElementsByName('shaderType')[0].value = 1;
            document.getElementsByName('castShadows')[0].value = 1;
            document.getElementsByName('imageWidth')[0].value = 400;
            document.getElementsByName('imageHeight')[0].value = 300;
            document.getElementsByName('renderDepth')[0].value = 3;
            break;
        case "2":
            document.getElementsByName('shaderType')[0].value = 1;
            document.getElementsByName('castShadows')[0].value = 1;
            document.getElementsByName('imageWidth')[0].value = 800;
            document.getElementsByName('imageHeight')[0].value = 600;
            document.getElementsByName('renderDepth')[0].value = 4;
            break;
        case "3": //toon preset
            document.getElementsByName('shaderType')[0].value = 2;
            document.getElementsByName('castShadows')[0].value = 1;
            document.getElementsByName('imageWidth')[0].value = 400;
            document.getElementsByName('imageHeight')[0].value = 300;
            document.getElementsByName('renderDepth')[0].value = 1;
            break;
        default:
            document.getElementsByName('shaderType')[0].value = 1;
            document.getElementsByName('castShadows')[0].value = 1;
            document.getElementsByName('imageWidth')[0].value = 40;
            document.getElementsByName('imageHeight')[0].value = 30;
            document.getElementsByName('renderDepth')[0].value = 1;
            break;
    }

}
