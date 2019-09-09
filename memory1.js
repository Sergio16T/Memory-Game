const aceHearts = document.getElementById('ace-hearts'); 
const aceDiamonds = document.getElementById('ace-diamonds');
const queenSpades = document.getElementById('queen-spades');
const queenClubs = document.getElementById('queen-clubs');
const diamonds7 = document.getElementById('diamonds7'); 
const hearts7 = document.getElementById('hearts7'); 
const cards = document.querySelectorAll('.front-card'); 
const backCards = document.querySelectorAll('.back-card'); 
const cardContainer = document.querySelectorAll('.front-back'); 
let tempArray =[];
let click = 0; 
let shuffleArray = [0, 1, 2, 3, 4, 5]; 
let cardContainerArray = [...cardContainer];

shuffleCards();

cards.forEach((card,index) => card.setAttribute("data-index", index)); 
cardContainer.forEach(container => container.addEventListener("click", displayCard)); 

 
function displayCard() {
    click += 1;
    let rank = this.firstElementChild.getAttribute("data-rank"); 
    let identification = this.firstElementChild.id; 
    let index = this.firstElementChild.getAttribute("data-index"); 

    tempArray.push({rank: rank, index: index, elementId: identification});

    cardContainer[index].firstElementChild.classList.add('front-card-display'); 

    if (click == 2 && tempArray[1].elementId != tempArray[0].elementId) {
        cardContainer.forEach(container => container.removeEventListener("click", displayCard)); 
    } 
    if (click ==2 && tempArray[1].elementId == tempArray[0].elementId) {
        click -= 1; 
        tempArray.splice(1,1);
    } 
    if (click ==2 && tempArray[0].rank ==tempArray[1].rank && tempArray[0].elementId != tempArray[1].elementId) {
        cardContainer[tempArray[0].index].setAttribute("data-matched", "true"); 
        cardContainer[tempArray[1].index].setAttribute("data-matched", "true"); 
    }
    setTimeout(function()  {
        while (click == 2) {
        
        if (tempArray[0].rank ==tempArray[1].rank && tempArray[0].elementId != tempArray[1].elementId) {
            cardContainer[tempArray[0].index].firstElementChild.classList.add('front-card-display'); 
            cardContainer[tempArray[1].index].firstElementChild.classList.add('front-card-display'); 
            shuffleCardIndex();
            cardContainer.forEach(container => container.addEventListener("click", displayCard)); 
            click = 0;
            tempArray.splice(0,2);
        } else { 
            cardContainer[tempArray[0].index].firstElementChild.classList.remove('front-card-display'); 
            cardContainer[tempArray[1].index].firstElementChild.classList.remove('front-card-display'); 
            cardContainer.forEach(container => container.addEventListener("click", displayCard)); 
            click = 0;
            tempArray.splice(0,2);
        }
        break; 
        }
    },1000);

   
}


function shuffleCards() {
    let newArray = shuffle(shuffleArray); 

    for(let i =0; i< newArray.length; i++){
        cardContainer[i].style.order = newArray[i]; 
    }

}

function shuffleCardIndex() {
    if (cardContainerArray.every(x => x.getAttribute("data-matched") =="true")) { 
        shuffleCards(); 
        cards.forEach(card => card.classList.remove('front-card-display'));
        cardContainer.forEach(container => container.dataset.matched = "false");
    } 

}
/*below function very similar to approach to reversing an array in place with the task of swapping values. 
 fisher-yates-shuffle: swap randomly chosen value with current value work through array 
        from end to start
 */

function shuffle(array) {
    var i = array.length, // i assigned value of array.length 
        j,  // var temp & j declared but uninitalized values a.k.a undefined values 
        temp; 

    while (i--) {

        j = Math.floor(Math.random() * (i+1)); 
       
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}

 
/*
add play new game feature at end of game which can shuffle the cards
and start over. would be really cool if cards actually shuffle on the screen however this 
would require me to change away from flex-box order. and use a grid instead..and then adjust 
*/ 