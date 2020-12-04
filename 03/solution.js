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


// INSTRUCTIONS MANAGEMENT
const instructions = input.split('\r\n');


const slideAway = (array, hor, ver) => {
    let trees=0;
    let j=0;
    for (let i = 0; i < array.length; i+=ver) {
        // console.log(i);
        // console.log(j);
        // console.log(instructions[i][j]);
        if(instructions[i][j] == "#") {
            trees++;
        }
        if (j+hor < array[i].length){
        j+=hor;        
        }
        else {
            j = hor-(array[i].length-j);        
        }
    }
    return trees;
}

const part2 = slideAway(instructions,1,1) * slideAway(instructions,3,1) * slideAway(instructions,5,1) * slideAway(instructions,7,1) * slideAway(instructions,1,2)

console.log(part2);
