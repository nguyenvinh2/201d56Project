'use strict';

var allCards = [];
var firstNameArr = ['charlie','cristian','david','demi','devon','jhia','john','jorie','kent','lena','levi','liz','matt','osunkwo','paula','peter','robert','roger','sam','stephen','tim','vinh','yuan','paolo'];
var lastNameArr = ['winters','restrepo','marchante','hamm','hackley','turner','winters','fernandez','ketter','eivy','porter','mahoney','guesswho','williams','thomas','tynan','bronson','huba','hamm','chu','busch','nguyen','gao','chidrome'];

function Card(firstName,lastName,value)
{
  this.filePath = '/assets/facePics/' + firstName + '.jpeg';
  this.firstName = firstName;
  this.lastName = lastName;
  this.value = value;
  this.facts = 'I am a Code Fellow!';

  allCards.push(this);
}

for(let i = 0; i < firstNameArr.length; i++)
{
  new Card(firstNameArr[i],lastNameArr[i],i);
}

