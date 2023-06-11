let numberOfDrums = document.querySelectorAll(".drum").length;


for (let i = 0; i < numberOfDrums; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        let buttonInnerHTML = this.innerHTML;
        playAudioForKey(buttonInnerHTML);
        animateButton(buttonInnerHTML);
    })
}


document.addEventListener("keydown", function(event) {
    playAudioForKey(event.key);
    animateButton(key);
})


function playAudioForKey(key) {
    switch (key) {
        case "w":
            let tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        case "a":
            let tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
        case "s":
            let tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        case "d":
            let tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        case "j":
            let snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "k":
            let kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
        case "l":
            let crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
        default:
            console.log(key);
    }
}

function animateButton(key) {
    document.querySelector("." + key).classList.add("pressed");
    setTimeout(function() {
        document.querySelector("." + key).classList.remove("pressed");
    }, 100);
}