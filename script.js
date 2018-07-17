//some buttons and cards
var buttonStand = document.getElementById('stand');
var dealerCard1 = document.getElementById('dc1');
var dealerCard2 = document.getElementById('dc2');
var playerCard = document.getElementById('pc1');
var buttonHit = document.getElementById('hit');
var scorePlayer = document.getElementById('score-player');
var scoreDealer = document.getElementById('score-dealer');
var results = document.getElementById('results');
var buttonNewGame = document.getElementById('newgame');

//Dowloading JSON file as request from server
//    'action': 'hit', 
//        'data': {'player': 0,'card': {'c1'}}

//function(){
//    var requestURL = '#';
//    var request = new XMLHttpRequest();
//    request.open('GET', requestURL);
//    request.responseType = 'json';
//    request.send();
//    var response = request.response;
//}


//array of cards
var cards = ['c1', 'd1', 'h1', 's1', 'c2', 'd2', 'h2', 's2', 'c3', 'd3', 'h3', 's3', 'c4', 'd4', 'h4', 's4', 'c5', 'd5', 'h5', 's5', 'c6', 'd6', 'h6', 's6', 'c7', 'd7', 'h7', 's7', 'c8', 'd8', 'h8', 's8', 'c9', 'd9', 'h9', 's9', 'c10', 'd10', 'h10', 's10', 'c11', 'd11', 'h11', 's11', 'c12', 'd12', 'h12', 's12', 'c13', 'd13', 'h13', 's13'];

//game on/off
var game = true;

//creating player class
var Player = function(){
    this.hand = [];
    this.randomCard = function(){
        //returns random card and deletes it from the deck
        var card = cards[Math.floor(Math.random()*cards.length)];
        var index = cards.indexOf(card);
        if (index > -1) {
            cards.splice(index, 1);
            }   
        this.hand.push(card);
    return card
    };
    //calculating the hand of the class instance
    this.calculateHand = function (){
        var sum = 0;
        var l =[]; //array for int values of cards, ace = 1
        for(var i=0; i<this.hand.length; i++){
            var score = parseInt(this.hand[i].slice(1));
            if(score>10){
                l.push(10)
            }else{
                l.push(score);
            };   
        };
        if(l.includes(1)){
            sum = l.reduce((a, b) => a + b, 0)
            if(sum<=11){
                sum+=10
            }         
        } else {
            sum = l.reduce((a, b) => a + b, 0)
        };     
        return sum;
    };

};
//initialising dealer and a player1 as class instances
var dealer = new Player;  
var player1 = new Player;
//var player2 = new Player;
//var player3 = new Player;

function finishGame(){
    //open dealer's card
    dealerCard2.src = 'img/'+dealer.randomCard()+'.png';
    //add more cards until 17
    while(dealer.calculateHand()<17){
        dealDealer();
    }
    //calculate and compare
    var dealerScore = dealer.calculateHand();
    var playerScore = player1.calculateHand();
    scoreDealer.innerHTML = dealerScore;
    scorePlayer.innerHTML = playerScore;   
    //give results
    var message = '';
    if(playerScore>dealerScore && playerScore<=21){
        message = 'YOU WIN!!!!'
    }else if(playerScore<21 && dealerScore>21){
        message = 'YOU WIN!!!!'
    }else if(playerScore===dealerScore){
        message = "IT'S A DRAW GAME"
    }else{
        message = 'YOU LOSE. GAME OVER.'
    };
    results.innerHTML = message;
    document.querySelector('.btn').style.display = 'none';

};

function newCardFile(p){
    //get img name for a new random card 
    return 'img/'+p.randomCard()+'.png';
}

function dealDealer(){
    //create new image in html
    var img = document.createElement("img");
    img.src = newCardFile(dealer);
    document.querySelector('.dealer').appendChild(img);
}

function dealNewCard(){
    //create new image in html
    var img = document.createElement("img");
    img.src = newCardFile(player1);
    document.querySelector('.player').appendChild(img);
    if(player1.calculateHand()>=21){
        finishGame();
    }
}
function newGame(){
    location.reload();
}
//player's and dealer's first cards are shown
dealerCard1.src = 'img/'+dealer.randomCard()+'.png';
playerCard.src = 'img/'+player1.randomCard()+'.png';


buttonStand.addEventListener('click', finishGame);
buttonHit.addEventListener('click', dealNewCard);
buttonNewGame.addEventListener('click',newGame);




