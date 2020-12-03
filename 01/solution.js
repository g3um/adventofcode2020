const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
});

const inputTest = fs.readFileSync('inputTest.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
});


// Instructions management
const instructionsArray = input.split('\r\n');

const instructions = instructionsArray.map( x => parseInt(x));

//PART 1: Array of sums 2 numbers
const findTheSum2 = (array , sum) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = i+1 ; j < array.length; j++) {
            if((array[i]+array[j])==sum) {
                return(array[i]*array[j]);
            };
        }
    }
}

//PART 2: Array of sums 3 numbers
const findTheSum3 = (array , sum) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = i+1 ; j < array.length; j++) {
            for (let k = j+1 ; k < array.length; k++) {
                if((array[i]+array[j]+array[k])==sum) {
                    return(array[i]*array[j]*array[k]);
                };
            }
        }
    }
}

console.log(findTheSum3(instructions,2020));
