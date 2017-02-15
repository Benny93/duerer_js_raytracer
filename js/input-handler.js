document.addEventListener('keydown', function(event) {
    if(event.keyCode == 82){
        console.log("r was pressed");
        render(1);
    }
});