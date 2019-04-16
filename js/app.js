'use strict';
//hold all card objects
var allCards = [];

//holds all first names of classmates in the pictures
var firstNameArr = ['charlie','cristian','david','demi','devon','jhia','john','jorie','kent','lena','levi','liz','matt','osunkwo','paula','peter','robert','roger','sam','stephen','tim','vinh','yuan','paolo'];

//holds all last names of classmates in the pictures
var lastNameArr = ['winters','restrepo','marchante','hamm','hackley','turner','winters','fernandez','ketter','eivy','porter','mahoney','guesswho','williams','thomas','tynan','bronson','huba','hamm','chu','busch','nguyen','gao','chidrome'];

//Card object to be handled
function Card(firstName,lastName,value){
  this.filePath = 'assets/facePics/' + firstName + '.jpeg';
  this.firstName = firstName;
  this.lastName = lastName;
  this.value = value;
  this.facts = 'I am a Code Fellow!';

  allCards.push(this);
}

//initialize allCards
for(let i = 0; i < firstNameArr.length; i++){
  new Card(firstNameArr[i],lastNameArr[i],i);
}
//Score object to be handled
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

    if(localStorage.getItem('game_1st') === null){
      for(let i = 0; i < this.keys.length;i++){
        this.scoresArr.push('no one');
      }
    }

    else{

      //get values from localStorage
      for(let i = 0; i < this.keys.length;i++){
        if(!(localStorage.getItem(this.keys[i]) === 'no one')){

          this.scoresArr.push(JSON.parse(localStorage.getItem(this.keys[i])));

        }
        else{
          this.scoresArr.push(localStorage.getItem(this.keys[i]));

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