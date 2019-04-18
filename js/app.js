'use strict';
//hold all card objects
var allCards = [];

//holds all first names of classmates in the pictures
var firstNameArr = ['sam','demi','john','charlie','paolo','t1000','dwight','charles','reina','kent','tisha','evan','kishor','cristian','david','devon','jhia','jorie','lena','levi','liz','matt','williams','paula','peter','robert','roger','stephen','tim','vinh','yuan','chaitanya','doug','ed','kush','luke','saurav','sudip','xia'];

//holds all last names of classmates in the pictures
var lastNameArr = ['hamm','hamm','winters','winters','chidrome','terminator','schrute', 'clemens','vencer','ketter','greenidge','slaton','pandey','restrepo','marchante','hackley','turner','fernandez','eivy','porter','mahoney','guesswho','osunkwo','thomas','tynan','bronson','huba','chu','busch','nguyen','gao','narukulla','klemp','abrahamsen','shrestha','chandler','kadariya','adhikari','liu'];

var factPool = ['I like to watch epic Sax Man on repeat once a week', 'If I could be any fruit, I\'d be an apple. How about dem apples? ','My guilty pleasure is Ryan Gosling movies.','I am really from a small planet somewhere in the vincinity of betelgeuse','I write poetry about poetry.','I am the new Mayor of Quahog','I always have my towel.','I wear long sleeve shirts under short sleeve shirts under long sleeve shirts','Dont make me angry. You wouldn\'t like me when I\'m angry...','WHAT\'S IN THE BOX??!!','There\'s a passage I learned that seemed appropriate for the moment: Ezekiel 25:17.','I don\'t want to be a product of my environment. I want my environment to be a product of me','I want to make a movie about a theme park with dinosaurs.. Original, right?','I like to sing Phil Collin\'s "In the Air Tonight", while getting punched in the face by Mike Tyson.','I bowel really well with hook hand.','AALLLLLRIGHTY THEN!','I watch Tommy Boy just to hear Chris Farely say "holy schnikes".','I have a beautiful mind.... and I see people who aren\'t really there.','Me and my brother are Irish.. and vigilantes.','My perfect evening ends with a One Hour Photo viewing.','I think that "The Prestige" and "The Illuionist are the same"','I wouldn\'t want anyone meddling in my personal life. That\'s why I cleverly have no personal life.','If greatness was measured in water, I\'d be the Pacific','You\'re not superbad unless you watch "Superbad".','If I had a million dollars, I probably wouldn\'t be in this game right now.','I am a fellow of house Code.','In HBO\'s Game of Thrones: Who Will Take the Iron Throne? Poll, why does Greyworm have 10% of votes?','I wish I had a snickers.','I don\'t like turtles! :-p'];

//Card object to be handled
function Card(firstName,lastName,value){
  this.filePath = 'assets/facePics/' + firstName + '.jpeg';
  this.firstName = firstName;
  this.lastName = lastName;
  this.value = value;
  this.facts = '';

  allCards.push(this);
}

//initialize allCards
function cardDeckInit(){
  for(let i = 0; i < firstNameArr.length; i++){
    new Card(firstNameArr[i],lastNameArr[i],i);
  }
  var usedFactArr = [];
  var index = 13;
  while(index < allCards.length){
    var tmpRandomNumber = Math.floor(Math.random() * factPool.length);
    if(!(usedFactArr.includes(tmpRandomNumber))){
      allCards[index].facts = factPool[tmpRandomNumber];
      usedFactArr.push(tmpRandomNumber);
      index++;
    }
  }
  allCards[0].facts = 'I am secretly Dark Overlord Dr. Van Code-n-Play... I also have several furry companions. One of them I bring to work regularly; The awesome Demi of house Hamm!!';
  allCards[1].facts = 'I am one of the coolest dogs with legs >= 3. Ask Sam!';
  allCards[2].facts = 'I created my own version of TRON and CLU. They are both annoying..';
  allCards[3].facts = 'I am currently John\'s roomie! You know, fun fact, I secretly rub my butt on John\'s pillow.';
  allCards[4].facts = 'Bruno Mars wishes he was like me! ....In my dreams... :-(';
  allCards[5].facts = 'I am looking for Sarah Conner.';
  allCards[6].facts = 'I saw Wedding Crashers accidentally. I bought a ticket for “Grizzly Man” and went into the wrong theater. After an hour, I figured I was in the wrong theater, but I kept waiting. Cuz that’s the thing about bear attacks… they come when you least expect it.';
  allCards[7].facts = 'My favorite movie is John Carpenter\'s The Thing, 1982.';
  allCards[8].facts = 'I have a Shiba Inu.';
  allCards[9].facts = 'I like turtles.';
  allCards[10].facts = 'I am an awesome fellow of house Code!';
  allCards[11].facts = 'I am a belieber!';
  allCards[12].facts = 'I am still working on a fact for myself. I\'ll let you know in 301.';

}

//Score object to be handled
// eslint-disable-next-line no-unused-vars
function Score(score,userName){
  this.score = score;
  this.userName = userName;
  this.scoresArr = [];
  //this.keysArr = [];
  this.tmpPlaceHolder = null;
  this.saveDataArr = [];
  this.keys = ['game_1st','game_2nd','game_3rd','game_4th','game_5th'];

  //sets score values in localStorage
  this.toLocalStorage = function(){
    //store scores
    this.scoresArr = [];

    //stores score, username to pass to localStorage
    this.saveDataArr = [];//ensure array is empty

    //append current user and score
    this.saveDataArr.push(this.userName);
    this.saveDataArr.push(this.score);

    //stores index of where the new high score will stand amongst the top 5
    this.tmpPlaceHolder = null;

    //check to see if localStorage has anything stores

    //get values from localStorage
    for(let i = 0; i < this.keys.length;i++){
      if(!( (localStorage.getItem(this.keys[i]) === null) || (localStorage.getItem(this.keys[i]) === 'no one')) ){

        this.scoresArr.push(JSON.parse(localStorage.getItem(this.keys[i])));

      }

      else{
        this.scoresArr.push('no one');
      }
    }

    //iterate over scores and compare current user score to the saved 5 high scores
    for(let i = 0; i < this.scoresArr.length; i++){

      if(this.score >= this.scoresArr[i][1] || this.scoresArr[i] === 'no one'){
        this.tmpPlaceHolder = i;
        break;
      }
    }

    //if a new top 5 high score is identfied and there is already 5 top scores
    if(!(this.tmpPlaceHolder === null) ){
      this.scoresArr.splice(this.tmpPlaceHolder,0,this.saveDataArr);

      this.scoresArr.pop();

    }

    //clear localStorage so only 5 top scores are saved. Accounting for duplicate user high scores needs to be handled after mvp

    for(let i = 0; i < this.keys.length;i++){
      localStorage.removeItem(this.keys[i]);
    }
    for(let i = 0; i < this.scoresArr.length;i++){
      if(!(this.scoresArr[i] === 'no one')){
        this.scoresArr[i] = JSON.stringify(this.scoresArr[i]);
      }
      localStorage.setItem(this.keys[i],this.scoresArr[i]);
    }
  };
  this.readHighScores = function(){
    let highScoreArr = [];
    for(let i = 0; i < this.keys.length;i++){
      highScoreArr.push(JSON.parse(localStorage.getItem(this.keys[i])));
    }
    return highScoreArr;
  };
}

//create the deck of cards
cardDeckInit();

/* test case
var testArr = [];

testArr.push(new Score(Math.floor(Math.random() * 1000),'bob'));
testArr.push(new Score(Math.floor(Math.random() * 1000),'bill'));
testArr.push(new Score(Math.floor(Math.random() * 1000),'janice'));
testArr.push(new Score(Math.floor(Math.random() * 1000),'mike'));
testArr.push(new Score(Math.floor(Math.random() * 1000),'stephen'));
testArr.push(new Score(Math.floor(Math.random() * 1000),'vinh'));
testArr.push(new Score(Math.floor(Math.random() * 1000),'john'));
testArr.push(new Score(Math.floor(Math.random() * 1000),'pat'));
testArr.push(new Score(Math.floor(Math.random() * 1000),'matt'));
testArr.push(new Score(Math.floor(Math.random() * 1000),'sam'));
for(let i = testArr.length-1; i >= 0; i--){
  testArr[i].toLocalStorage();

}

console.table(testArr[0].readHighScores());
*/
