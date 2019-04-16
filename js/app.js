'use strict';
//hold all card objects
var allCards = [];

//holds all first names of classmates in the pictures
var firstNameArr = ['charlie','cristian','david','demi','devon','jhia','john','jorie','kent','lena','levi','liz','matt','williams','paula','peter','robert','roger','sam','stephen','tim','vinh','yuan','paolo'];

//holds all last names of classmates in the pictures
var lastNameArr = ['winters','restrepo','marchante','hamm','hackley','turner','winters','fernandez','ketter','eivy','porter','mahoney','guesswho','osunkwo','thomas','tynan','bronson','huba','hamm','chu','busch','nguyen','gao','chidrome'];

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
  this.userNamesArr = [];
  this.tmpPlaceHolder = null;

  //sets score values in localStorage
  this.toLocalStorage = function(){

    //store scores
    this.scoresArr = [];

    //store usernames
    this.userNamesArr = [];

    //stores index of where the new high score will stand amongst the top 5
    this.tmpPlaceHolder = null;

    //check to see if localStorage has anything stores
    if(localStorage.length > 0){
      //get values from localStorage
      for(let i = 0; i < localStorage.length;i++){
        this.scoresArr.push(JSON.parse( localStorage.getItem(localStorage.key(i))));
        this.userNamesArr.push(localStorage.key(i));
      }
      //iterate over scores and compare current user score to the saved 5 high scores
      for(let i = 0; i < this.scoresArr.length; i++){
        if(this.score <= this.scoresArr[i]){
          this.tmpPlaceHolder = i;
          break;
        }
      }
      //if a new top 5 high score is identfied and there is already 5 top scores
      if(!(this.tmpPlaceHolder === null) && (localStorage.length >= 5)){
        this.scoresArr.splice(this.tmpPlaceHolder,0,this.score);
        this.userNamesArr.splice(this.tmpPlaceHolder,0,this.userName);
        this.scoresArr.pop();
        this.userNamesArr.pop();
      }
      //if a new top 5 high score is identified and there is currently less than 5 top scores saved
      else if(!(this.tmpPlaceHolder === null) && (localStorage.length < 5)){
        this.scoresArr.splice(this.tmpPlaceHolder,0,this.score);
        this.userNamesArr.splice(this.tmpPlaceHolder,0,this.userName);
      }
      //if a score was not higher than the saved high scores, but there are less than 5 high scores stored
      else if((this.tmpPlaceHolder === null) && (localStorage.length < 5)){
        this.scoresArr.push(this.score);
        this.userNamesArr.push(this.userName);
      }
      //if the score isn't high enough and there are already 5 top scores then do nothing
      else{
        //do nothing
      }
    }
    //initializing localStorage
    else{
      this.scoresArr.push(this.score);
      this.userNamesArr.push(this.userName);
    }
    //clear localStorage so only 5 top scores are saved. Accounting for duplicate user high scores needs to be handled after mvp
    localStorage.clear();
    for(let i = 0; i < this.scoresArr.length;i++){
      localStorage.setItem(this.userNamesArr[i],this.scoresArr[i]);
    }
  };
}
var testArr = [];
for(let i = 0; i < 10;i++){
  testArr.push(new Score(i+i,'bob'+i));
}
for(let i = testArr.length-1; i >= 0; i--){
  testArr[i].toLocalStorage();
}
