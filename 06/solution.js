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
const instructions = input.split('\r\n\r\n');
// console.table(instructions);
let instructionsComplete = tablemaker(instructions.length,0,'');
for (let i = 0; i < instructions.length; i++) {
    var count = (instructions[i].match(/\r\n/g) || []).length;
    instructionsComplete[i].push(instructions[i].replace(/\r\n/g,''));
    instructionsComplete[i].push(count+1);
}
// console.table(instructionsComplete);

const questionsOnly = instructionsComplete.map( ([a,b]) => a)
// console.table(questionsOnly);

const countUniqueChars = (array) => {
    let uniqueChars = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let count=0;
            for (let k = 0; k < uniqueChars.length; k++) {
                if(array[i][j] == uniqueChars[k]) {
                    count++;
                }
            }
            if (count == 0){
                uniqueChars.push(array[i][j]);
            }
        }
    }
    return uniqueChars.length;
}




const customsCheck = array => {
    let sum=0;
    for (let i = 0; i < array.length; i++) {
       sum += countUniqueChars(array[i]);
    }
    return sum;
}

// console.log(customsCheck(questionsOnly));



// PART2


let newArray=tablemaker(instructions.length,0,'');
for (let i = 0; i < instructions.length; i++) {
    newArray[i].push(instructions[i].split('\r\n'));
}
// console.table(newArray);

const dicoCheck = (arrayChar, arrayOutput) => {
    arrayOutput.forEach(([a,b]) => {
        if(arrayChar == a) {
            b++;
        }
        else {
            arrayOutput.push([arrayChar,1]);
        }
    })
    return arrayOutput;
}

const part2 = (array) => {
    let total=0;
    for (let i = 0; i < array.length; i++) { // [i][0] is the group
        // console.log(`\ni: ${i}`);
        let questions=[ [array[i][0][0][0] , 0] ];
        for (let j = 0; j < array[i][0].length; j++) { //j is subgroup (line)
            // console.log(`\nj: ${j}`);
            for (let k = 0; k < array[i][0][j].length; k++) { //k is qeustion (letters)
                let z=0;
                let l=questions.length;

                for (let z = 0; z < l; z++) {
                    if(array[i][0][j][k] == questions[z][0]) {
                                questions[z][1]++;
                                break;
                            }
                    else {
                        if (z == l-1) {
                            questions.push([array[i][0][j][k],1]); 
                        }
                    }         
                    
                }
            }
        }

        for (let k = 0; k < questions.length; k++) {
            if (questions[k][1] == instructionsComplete[i][1]) {
                total++;
            }
        }
    }
    return total;

}

console.log(part2(newArray));
