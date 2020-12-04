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


// table maker
const tablemaker = (lines, columns, fill) => {
    tempArr = new Array(lines).fill(fill).map(currentRow => {
        return new Array(columns).fill(fill);
    })
    return tempArr;
}

// INSTRUCTIONS MANAGEMENT
const instructions = input.split('\r\n');

const parseInput = instruction => {
    let arrayInput = [];
    arrayInput[0] = parseInt(instruction.match(/\d+/g)[0]);
    arrayInput[1] = parseInt(instruction.match(/\d+/g)[1]);
    arrayInput[2] = instruction.substring(instruction.indexOf(':')-1,instruction.indexOf(':'));
    arrayInput[3] = instruction.substring(instruction.indexOf(':')+2,instruction.length);

    return arrayInput;
 }

//Table of instructions
instructionsArray = tablemaker(instructions.length,4,'');
    for (let i = 0; i < instructions.length; i++) {
        instructionsArray[i] = parseInput(instructions[i]);
    }
// console.table(instructionsArray);

// Part 1: Number of times
const pwdCheck = (array) => {
    let sum=0;
    for (let i = 0; i < array.length; i++) {
        var re = new RegExp(instructionsArray[i][2], 'g');
        count = (instructionsArray[i][3].match(re) || []).length;
        if ((count >= instructionsArray[i][0]) && (count <= instructionsArray[i][1]) ) {
            sum += 1;  
        }
    } 
    return sum;
}
// console.log(pwdCheck(instructionsArray));

// Part 2: letter position
const pwdCheck2 = (array) => {
    let valid=0;
    for (let i = 0; i < array.length; i++) {
        let resultArray=[];
        for (let j = 0; j < array[i][3].length; j++) {
            position = array[i][3].indexOf(array[i][2], j)
            if (position!==-1 && ( (position == array[i][0]-1)) || (position == array[i][1]-1) ) {
                resultArray.push(position+1); 
            }
            
            if (position !== -1) {
                j = position;
            }
        }
        
        if (resultArray.length == 1) {
            valid++;
        }
    }
        console.log(valid)  
}
console.log(pwdCheck2(instructionsArray));
