const cardGrid = document.querySelector('.card-grid'); 
let tempArray =[];
let click = 0;  

let arrayCardType= ["queen-spades", "ace-hearts", "ace-diamonds", "queen-clubs", "diamonds7", "hearts7"]; 
for (let i =0; i< arrayCardType.length; i++) {
    for(let j=0; j< 2; j++) {
    let template = document.createElement('div'); 
    template.innerHTML =`
    <img class ="front-card">
    <img class ="back-card">
    `;
    template.className = `front-back ${arrayCardType[i]}`; 
    template.setAttribute("data-rank", i); 
    cardGrid.appendChild(template);
    }
}
const cardContainer = document.querySelectorAll('.front-back');
let cardContainerArray = [...cardContainer];

shuffleCards();

cardContainer.forEach((container,index) => container.setAttribute("data-index", index)); 
cardContainer.forEach(container => container.addEventListener("click", displayCard)); 
cardContainer.forEach(container => container.setAttribute("data-matched", "false")); 
 
function displayCard() {
    if (click == 2) return; 
    if (this.dataset.matched == "true") {
        return; 
    }
    if (this.classList.contains('flipped')) {
        return;
    }

    click += 1;
    let rank = this.getAttribute("data-rank"); 
    let index = this.getAttribute("data-index"); 

    tempArray.push({rank: rank, index: index});

    cardContainer[index].classList.add('flipped'); 

    if (click ==2) {
    setTimeout(function()  {

        if (tempArray[0].rank ==tempArray[1].rank) {
            cardContainer[tempArray[0].index].setAttribute("data-matched", "true"); 
            cardContainer[tempArray[1].index].setAttribute("data-matched", "true"); 
            shuffleCardIndex();
          
        } else { 
            cardContainer[tempArray[0].index].classList.remove('flipped'); 
            cardContainer[tempArray[1].index].classList.remove('flipped');
        }
        click = 0;
        tempArray.splice(0,2);
       
    },1000);

    }
}


function shuffleCards() {
    // _ can represent container: unused argument value placeHolder 
    let shuffleArray = cardContainerArray.map((_, index) => index);  
    let newArray = shuffle2(shuffleArray); 

    for(let i =0; i< newArray.length; i++){
        cardContainer[i].style.order = newArray[i]; 
    }

}

function shuffleCardIndex() {
    if (cardContainerArray.every(x => x.getAttribute("data-matched") =="true")) { 
        shuffleCards(); 
        cardContainer.forEach(container => container.classList.remove('flipped'));
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
// different shuffle better for larger deck assuming cards is array of objects; 
function shuffle2(cards) {
    return cards
        .map(x => ({ card: x, rand:  Math.random() }))
        .sort((a, b) => a.rand - b.rand)
        .map(x => x.card);
}

 
/*
add play new game feature at end of game which can shuffle the cards
and start over. would be really cool if cards actually shuffle on the screen however this 
would require me to change away from flex-box order. and use a grid instead..and then adjust 
*/ 

