const aceHearts = document.getElementById('ace-hearts'); 
const aceDiamonds = document.getElementById('ace-diamonds');
const queenSpades = document.getElementById('queen-spades');
const queenClubs = document.getElementById('queen-clubs');
const diamonds7 = document.getElementById('diamonds7'); 
const hearts7 = document.getElementById('hearts7'); 
const cards = document.querySelectorAll('.front-card'); 
const backCards = document.querySelectorAll('.back-card'); 
const cardContainer = document.querySelectorAll('.front-back'); 
let rankArray =[]; 
let tempArray =[];
let click = 0; 
let shuffleArray = [0, 1, 2, 3, 4, 5]; 
let cardContainerArray = [];

shuffleCards();

cardContainer.forEach(cardContainer =>  cardContainerArray.push(cardContainer)); 
cards.forEach((card,index) => card.setAttribute("data-index", index)); 
cardContainer.forEach(container => container.addEventListener("click", displayCard)); 
cards.forEach(function(card){
    let rank = card.getAttribute("data-rank"); 
    rankArray.push(rank); 
});


function displayCard() {
    click+= 1;
    let rank = this.firstElementChild.getAttribute("data-rank"); 
    let identification = this.firstElementChild.id; 
    let index = this.firstElementChild.getAttribute("data-index");  


    tempArray.push({rank: rank, index: index, elementId: identification});

    if(click > 2) {
        click = 1;
        tempArray.splice(0,2);  
    }
    if (click == 1) {
        cardContainer[index].firstElementChild.style.display ="block"; 
    }

    if (click == 2 && tempArray[1].elementId != tempArray[0].elementId) {
        cardContainer[index].firstElementChild.style.display ="block"; 
        

    } else if (click ==2 && tempArray[1].elementId == tempArray[0].elementId) {
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
            cardContainer[tempArray[0].index].firstElementChild.style.display ="block"; 
            cardContainer[tempArray[1].index].firstElementChild.style.display ="block"; 

            cardContainer[tempArray[0].index].removeEventListener('click', displayCard);
            cardContainer[tempArray[1].index].removeEventListener('click', displayCard);
 

            shuffleCardIndex(); 
            
        } else { 
            cardContainer[tempArray[0].index].firstElementChild.style.display ="none"; 
            cardContainer[tempArray[1].index].firstElementChild.style.display ="none"; 
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
    if (cardContainerArray.every(x => x.getAttribute("data-matched") =="true") ) { 
        shuffleCards(); 
        cards.forEach(card => card.style.display ="none");
        cardContainer.forEach(container => container.addEventListener("click", displayCard)); 
        setTimeout(function() {
            if (cardContainerArray.every(x => x.getAttribute("data-matched") =="true")) {
                cardContainer.forEach(container => container.dataset.matched = "false");
            }
        }, 1500); 
    }

}
/*below function very similar to approach to reversing an array in place with the task of swapping values. 
 fisher-yates-shuffle */

function shuffle(array) {
    var i = array.length, // i assigned value of array.length 
        j,  
        temp; // var temp & j declared but uninitalized values a.k.a undefined values 

    while (i--) {

        j = Math.floor(Math.random() * (i+1)); 
        /* swap randomly chosen value with current value work through array 
        from end to start*/
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}



 
/*
--- Below are notes for self--- 

-- add play new game feature at end of game which can shuffle the cards
and start over. would be really cool if cards actually shuffle on the screen however this 
would require me to change away from flex-box order. and use a grid instead..and then adjust 

-- need to figure out how to fix if someone clicks 3 cards very quickly that timeOut 
runs out of time so it leaves cards up even without match because I splice values from 
array.. maybe use loop and index and don't splice. Going to have to rework the code. 

---More Ideas--- below mostly already implemented. 

const choices = cards; // nodelist of all front-cards. convert to an array maybe? 

maybe make the folliowing a method: Math.floor(Math.random() * 6);

element.style.order =  Math.floor(Math.random() * 6); problem with this is I can
double assign the same order... have to put logic in method to see if order is 
already assigned.. if assigned run the random method again 
maybe something like 
while (array.includes(order)) run method again

array.every could be used to see if every array[index value].data-matched == "true"
if true then run something to show a game win message with inner HTML then setTimeout
shuffle logic to run and remove game win message when cards shuffled. 
*/