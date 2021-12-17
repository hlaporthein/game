function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

//show info toggle
function showInfoToggle() {
    document.body.classList.toggle('show-info-box');
}

function showInfobox() {
    document.body.classList.add('show-info-box');
}

function showInfoByStatus(status) {
    if ( status ) {
        document.body.classList.add('show-info-box');
    } else {
        document.body.classList.remove('show-info-box');
    }
}

//get item status
function getItemStatus(value) {
    switch (value) {
        case 1:
            return {
                icon: "🔋",
                score: 10,
            }
            break;

            case 2:
            return {
                icon: "🧃",
                score: 20,
            }
            break;


            case 3:
            return {
                icon: "🔦",
                score: 30,
            }
            break;

            case 4:
            return {
                icon: "💡",
                score: 40,
            }
            break;

            case 5:
            return {
                icon: "🔥",
                score: -10,
            }
            break;

            case 6:
            return {
                icon: "💥",
                score: -20,
            }
            break;

            case 7:
            return {
                icon: "🧨",
                score: -30,
            }
            break;

            case 8:
            return {
                icon: "💣",
                score: -40,
            }
            break;
    
        default:
            break;
    }
}

//create item 
function createItem() {
    const item = document.createElement("div");
    item.classList.add("item");
    let status = getItemStatus(getRandomNumber(1, 8));
    let randomLeft = getRandomNumber(0, window.innerWidth);
    let randomTop =getRandomNumber(0, 300);
    item.textContent = status.icon;
    item.setAttribute('data-score', status.score);
    item.style.left = randomLeft + "px";
    item.style.marginTop = randomTop + "px";
    
    return item;
}


//variables
const playStation = document.getElementById("play-station");
const showTime = document.querySelector("#show-time");
const fragment = new DocumentFragment();
const gameControlButton = document.querySelector("#game-control-btn");
let isPaused = true;

setInterval(function(){
    if ( !isPaused ) {
        const items = document.querySelectorAll('.item');
        for ( let item of items ) {
            item.style.top = item.offsetTop + 10 + "px";
        }
    }

}, 0)

gameControlButton.addEventListener("click", function(){
    isPaused = ! isPaused;
    let buttonText = isPaused ? "Play" : "Pause";
    gameControlButton.textContent = buttonText;
    showInfoByStatus(isPaused)

});

let i = 1;
setInterval(function() {
    if ( !isPaused ) {
        while (i < 50 ) {
            const item = createItem();
            fragment.appendChild(item);
            i++;
        }
        i = 1;
        playStation.appendChild(fragment);
    }

}, 2500);

//remove item
document.addEventListener("click", function(event) {

    if (event.target.className === "item" ) {
        let item = event.target;
        const scoreELement = document.getElementById("score");
        let oldScore = parseInt(scoreELement.textContent, 10)
        let currentScore = parseInt(item.getAttribute('data-score'), 10);

        let newScore = oldScore + currentScore;

        scoreELement.textContent = newScore;

        item.classList.add('remove');

        setTimeout(function(){
            item.remove();
        }, 500);

    }

    event.preventDefault();
});

let stopSeconds = 60;

const showTimeInterval =  setInterval(function(){
    if ( !isPaused ) {
        stopSeconds--;
        if ( stopSeconds === 0 ) {
            clearInterval(showTimeInterval);
            showInfoByStatus(isPaused)
        }
        showTime.textContent = stopSeconds;
    }

}, 1000)


setInterval(function(){
    if ( !isPaused ) {

        const items = document.querySelectorAll(".item");

        if ( items.length ) {
            items.forEach(function(item){
                let rect = item.getBoundingClientRect();
                if ( rect.top > (window.innerHeight - 50) ) {
                    item.remove();
                }
            })
        }

    }
}, 3000);

//stop action
function gameStopAction() {
    isPaused = !isPaused
    let buttonText = isPaused ? "Play" : "Pause";
    gameControlButton.textContent = buttonText;
    showInfoByStatus(isPaused)
}


document.addEventListener("keydown", function(event) {
    if ( event.code === "Space" && event.target.id !== "game-control-btn" ) {
        gameStopAction();
    }
});


document.addEventListener("keydown", function(event) {

    if ( event.code === "Escape"  ) {
        gameStopAction();
    }
});

document.addEventListener("DOMContentLoaded", function(event) {
    if ( isPaused ) {
        showInfoByStatus(isPaused)
    }
});