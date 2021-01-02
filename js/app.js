const phrase = document.getElementById('phrase');
const buttons = document.getElementById('qwerty');
const overlay = document.querySelector('#overlay');
let missed = 0;
let startBtn = document.querySelector('.btn__reset');
let tries = document.getElementsByClassName('tries');

// Array of Project
let phrases = [
    "Legato", 
    "Pianossimo", 
    "Staccato", 
    "Diminuendo", 
    "Presto", 
    "Adagio"
];
// 


// Returns a random phrase from an array
const getRandomPhraseArray = arr => {
    return arr[Math.floor(Math.random()*arr.length)].split('');
}

// getRandomPhraseArray(phrases);

//

// Start Game Button - Hides Display to show the game.
startBtn.addEventListener('click', () => {
    reset();
    overlay.style.display = 'none'; 
    const phraseArray = getRandomPhraseArray(phrases);
    addPhraseToDisplay(phraseArray);
 });

// Adds the letters of a string to the display 
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++){
       let listItem = document.createElement('li');
       let ulItem = document.querySelector('#phrase ul');
       listItem.textContent = arr[i]; 
       ulItem.appendChild(listItem);
       if(arr[i] != ' '){
        listItem.className = 'letter';
      } else {
        listItem.className = 'space';
      }
    }
}

// Checks if the a letter is in the phrase
const checkLetter = button => {
    let letter = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < letter.length; i++) {
        if (letter[i].textContent.toLowerCase() === button.textContent.toLowerCase()) {
            match = true;
            letter[i].classList.add('show');
        }
    };
    return match; 
}

// 

// check if the game has been won or lost
const checkWin = () => {
    const liLetterClass = document.querySelectorAll('.letter');
    const liShowClass = document.querySelectorAll('.show');
    if (liLetterClass.length === liShowClass.length) {
       document.querySelector('#overlay').classList.add('win');
       document.querySelector('.title').innerHTML = "Congratulations you won the game!";
       overlay.style.display = 'flex'; 
       document.querySelector('a').innerText = "Play Again?"; 
    } if (missed > 4) {
       document.querySelector('#overlay').classList.add('lose');
       document.querySelector('.title').innerHTML = "You lost the game bruh!"; 
       overlay.style.display = 'flex';
       document.querySelector('a').innerText = "Play Again?";
    }
};

// Resets Game

const reset = () => {

    missed = 0;

    // resets onscreen keyboard
    let buttons = document.querySelectorAll("BUTTON");
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled');
        buttons[i].setAttribute('class', '');
    };

    for (let i = 0; i < tries.length; i++) {
        tries[i].firstChild.src = 'images/liveHeart.png';
    };

    document.querySelector('#phrase ul').innerHTML = '';
}

// Start Game Button - Hides Display to show the game.
startBtn.addEventListener('click', () => {
    overlay.style.display = 'none'; 
 });
 

// listens for the onscreen keyboard to be clicked
buttons.addEventListener('click', (event) => {
    const hearts = document.querySelectorAll('.tries img');
    if (event.target.tagName === 'BUTTON') {
        event.target.classList.add('chosen');
        event.target.disabled = true;
    } if(!checkLetter(event.target) && event.target.tagName === 'BUTTON') {
        hearts[missed].src = 'images/lostHeart.png';
        missed++;
    }
    checkWin();
});
