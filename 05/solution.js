const { Console } = require('console');
const { S_IWOTH } = require('constants');
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

const seatFinder = array => {
    let seats=[];
    for (let i = 0; i < array.length; i++) {
        let frontRow=0;
        let backRow=127;
        let lCol=0;
        let rCol=7;
        for (let j = 0; j < array[i].length; j++) {
              switch (instructions[i][j]) {
                    case 'F':
                      backRow=((backRow+frontRow+1)/2)-1;
                        break;
                    case 'B':
                        frontRow=(frontRow+backRow+1)/2;
                        break;
                    case 'L':
                        rCol=((lCol+rCol+1)/2)-1;
                        break;
                    case 'R':
                        lCol=(lCol+rCol+1)/2;
                        break;
              }
        }
        
        if ( (instructions[i][6] == 'F') && (instructions[i][9] == 'R') ) {
            seats.push(frontRow*8+rCol);
        }
        if ( (instructions[i][6] == 'F') && (instructions[i][9] == 'L') ) {
            seats.push(frontRow*8+lCol);
        }
        if ( (instructions[i][6] == 'B') && (instructions[i][9]== 'R') ) {
            seats.push(backRow*8+rCol);
        }
        if ( (instructions[i][6] == 'B') && (instructions[i][9] == 'L') ) {
            seats.push(backRow*8+lCol);
        } 
    }

    seats.sort((a,b) => a-b);
    let missing=0;
    for (let k = 0; k < seats.length-1; k++) {
        if ((seats[k]+1) !== seats[k+1]) {
            missing=seats[k]+1;
        }
    }
    console.log(`\nPart 1: ${seats[seats.length-1]}`);
    console.log(`\nPart 2: ${missing}`);
}

seatFinder(instructions);