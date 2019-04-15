'use strict';
//hold all card objects
var allCards = [];

//holds all first names of classmates in the pictures
var firstNameArr = ['charlie','cristian','david','demi','devon','jhia','john','jorie','kent','lena','levi','liz','matt','osunkwo','paula','peter','robert','roger','sam','stephen','tim','vinh','yuan','paolo'];

//holds all last names of classmates in the pictures
var lastNameArr = ['winters','restrepo','marchante','hamm','hackley','turner','winters','fernandez','ketter','eivy','porter','mahoney','guesswho','williams','thomas','tynan','bronson','huba','hamm','chu','busch','nguyen','gao','chidrome'];

//Card object to be handled
function Card(firstName,lastName,value){
  this.filePath = '/assets/facePics/' + firstName + '.jpeg';
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
  this.tmpPlaceHolder = null;

  //gets score values from localStorage
  this.fromLocalStorage = function(){
    return JSON.parse(localStorage.getItem('scores'));
  };

  //sets score values in localStorage
  this.toLocalStorage = function(){
    //top 5 scores exists
    this.tmpPlaceHolder = null;
    if(localStorage.length >= 5){
      this.scoresArr = this.fromLocalStorage();
      //finds the index in which this.score is greater than and temporarily stores it in tmpPlaceHolder
      for(let i = 0; i < this.scoresArr.length; i++){
        if(this.score > this.scoresArr[i].score){
          this.tmpPlaceHolder = i;
        }
      }
      if(this.tmpPlaceHolder !== null){
        this.scoresArr.splice(this.tmpPlaceHolder, 0, this.score);

        //pops the last value after the new value is inserted to keep the top 5 structure
        this.scoresArr.pop();
      }
    }
    // less than 5 top scores exist
    else if(localStorage.length > 0){
      this.scoresArr = this.fromLocalStorage();
      //finds the index in which this.score is greater than and temporarily stores it in this.tmpPlaceholder
      for(let i = 0;i < this.scoresArr.length;i++){
        if(this.score > this.scoresArr[i].score){
          this.tmpPlaceHolder = i;
        }
      }
      //if this.tmpPlaceHolder was set, then insert the new value
      if(this.tmpPlaceHolder !== null){
        this.scores.splice(this.tmpPlaceHolder, 0, this.score);
      }
      //if this.tmpPlaceHolder wasn't set, then append this.score to the end
      else{
        this.scoresArr.push(this.score);
      }
    }
    //no current high scores in localStorage. Append the new score
    else{
      this.scoresArr.push(this.score);
    }
    //store scores in localStorage
    localStorage.scores = JSON.stringify(this.scoresArr);
  };
}
