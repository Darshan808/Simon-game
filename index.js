
var level=1;
var hits=0;
var targets=[];
waitForKeyPress();

function waitForKeyPress(){
    $(document).on("keydown",function(){
        setLevel();
        nextLevel();
        $(document).off("keydown");
    });
}

$(".button").click(function(e){
    check(e.target);
});

function reset(){
    targets=targets.slice(0,0);
}

function setLevel(){
    $("h1").text("Level "+level);
    hits=0;
}

function nextLevel(){
    var colorFlashed= Math.floor((4*Math.random()))+1;
    targets.push(colorFlashed);
    var temp=$("#"+colorFlashed);
    createSound(colorFlashed);
    temp.toggleClass("flash");
    setTimeout(function(){temp.toggleClass("flash")},150);
}

function check(click){
    if(click.id==targets[hits]){
        click.classList.toggle("press");
        createSound(click.id);
        setTimeout(function(){click.classList.toggle("press")},100);
        hits++;
    }
    else{
        $("body").toggleClass("game-over");
        level=1;
        $("h1").text("Game Over! Press Any Key To Start");
        createSound(100);
        targets=targets.slice(0,0);
        setTimeout(function(){$("body").toggleClass("game-over")},900);
        waitForKeyPress();
    }
    if(hits==level){
        level++;
        setLevel();
        setTimeout(function(){nextLevel()},1000);
    }
}

function createSound(num){
    if(num==1){
        green = new Audio("Sounds/sounds_green.mp3");
        green.play();
    }
    else if(num==2){
        red = new Audio("Sounds/sounds_red.mp3");
        red.play();
    }
    else if(num==3){
        yellow = new Audio("Sounds/sounds_yellow.mp3");
        yellow.play();
    }
    else if(num==4){
        blue = new Audio("Sounds/sounds_blue.mp3");
        blue.play();
    }
    else if(num==100){
        over = new Audio("Sounds/sounds_wrong.mp3");
        over.play();
    }
}