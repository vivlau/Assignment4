const Express = require('express');
const router = Express.Router();

// FUNCTIONS
// Shuffles array
const shuffles = function(array) {
  let i = 0
  let j = 0
  let temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
};

// Make parameter names into array
 const nameArray = function(params) {
   let nameString = params.names.split(", ");
   // console.log(nameString);
   return nameString;
 };

// If method 1 or 2 then based on number, do a thing
const teamResult = function(params, array) {
  let whichMethod = parseInt(params.method);
  let whatNumber = parseInt(params.number);
  let newArray = [];
  // if method, then look at number
  // Method 1 is TEAM COUNT
  if (whichMethod == 1) {
    let anArray = [];
    let teamAmounts = Math.ceil(array.length/whatNumber);
    for (let i=0; i<= array.length; i++){
      let tempArray = array.slice(0, teamAmounts);
      for (let j=0; j<teamAmounts; j++){
        array.shift();
      }
      anArray.push(tempArray);
    }
    while (array.length > teamAmounts){
      console.log(array);
      anotherName = array.pop();
      anArray.push(array);
      anArray.push([anotherName]);
    }
    if (array.length != 0){
      anArray.push(array);
    }
    return anArray; // this is the final array of arrays
  }
  // Method 2 is NUM PER TEAM
  else if (whichMethod == 2) {
    let anotherArray = [];
    for (let i=0; i<= array.length; i++){
      let tempArray = array.slice(0, whatNumber);
      for (let j=0; j<whatNumber; j++){
        array.shift();
      }
      console.log(array);
      anotherArray.push(tempArray);
    }
    while (array.length > whatNumber){
      console.log(array + 'fuckimg');
      anotherName = array.pop();
      anotherArray.push(array);
      anotherArray.push([anotherName]);
    }
    console.log(anotherArray + 'lol');
    if (array.length != 0){
      anotherArray.push(array);
    }
    return anotherArray; // this is the final array of arrays
  }
  // Number was not entered
  else {
    return "You did not enter a valid number."
  }
}


router.get('/', function (req, res, next) {
  res.render('index');
})

router.get('/teamrandomizer', function (req, res, next) {
  res.render('teamrandomizer', { params: null, teamsMethod1: null, teamsMethod2: null });
})

router.post('/teamrandomizer', function (req, res, next) {
  const params = req.body;
  console.log(params);
  // Output shuffled array
  const shuffledArray = shuffles(nameArray(params));
  // Output for Method
  const teams = teamResult(params, shuffledArray);

  res.render('teamrandomizer', { params: params, teams: teams });
})
module.exports = router;
