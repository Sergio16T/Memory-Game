const aceHearts = document.getElementById('ace-hearts'); 
const aceDiamonds = document.getElementById('ace-diamonds');
const queenSpades = document.getElementById('queen-spades');
const queenClubs = document.getElementById('queen-clubs');
const diamonds7 = document.getElementById('diamonds7'); 
const hearts7 = document.getElementById('hearts7'); 
const cards = document.querySelectorAll('.front-card'); 
const backCards = document.querySelectorAll('.back-card'); 
const cardContainer = document.querySelectorAll('.front-back'); 
var rankArray =[]; 
var tempArray =[]; 
let click = 0; 

cards.forEach((card,index) => card.setAttribute("data-index", index)); 
cardContainer.forEach(container => container.addEventListener("click", hideCard)); 
cards.forEach(function(card){
    let rank = card.getAttribute("data-rank"); 
    rankArray.push(rank); 
});


function hideCard() {
    click+= 1; 
    if(click > 2) {
        click = 1;
        tempArray.splice(0,2);  
    }
    let index = this.firstElementChild.getAttribute("data-index");  
   /* below code was useful when I was testing game with front-cards display block 
      to make sure the code game logic was working. Now I'm hiding the cards for memory game. 

    if (cardContainer[index].firstElementChild.style.display == "none") { 
        cardContainer[index].firstElementChild.style.display ="block"; 
    } 
    else  {
        cardContainer[index].firstElementChild.style.display = "none";

    }  */ 
    cardContainer[index].firstElementChild.style.display ="block"; 

    let rank = this.firstElementChild.getAttribute("data-rank"); 

   
    tempArray.push({rank: rank, index: index});
  
    // added setTimeout(function() {put existing while loop here}, interval in ms); 
    setTimeout(function() {
    while (click == 2) {
    
    if (tempArray[0].rank ==tempArray[1].rank) {
        cardContainer[tempArray[0].index].firstElementChild.style.display ="block"; 
        cardContainer[tempArray[1].index].firstElementChild.style.display ="block"; 
    } else { 
        cardContainer[tempArray[0].index].firstElementChild.style.display ="none"; 
        cardContainer[tempArray[1].index].firstElementChild.style.display ="none"; 
    }
    break; 
    }
},2000);
   
}




 