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
const instructions = input.split(/(\r?\n)\s*\1+/g);
let instructionsClean = [];
for (let index = 0; index < instructions.length; index++) {
  if (index % 2 == 0) {
    instructionsClean.push(instructions[index].replace(/\r\n/g, " "));
  }
}
// console.table(instructionsClean);

const parseInput = instruction => {
  let splitArray = [];
  splitArray = instruction.split(" ");
  return splitArray;
}


//Table of instructions
instructionsArray = tablemaker(instructionsClean.length,8,'');
  for (let i = 0; i < instructionsClean.length; i++) {
      instructionsArray[i] = parseInput(instructionsClean[i]);
  }
// console.table(instructionsArray);

const characterCheck = (str) => {
  if (str.length !== 6) {
    return false
  }
  else {
    let count =0;
    for (let i = 0; i < 6; i++) {
      if (isNaN(parseInt(str[i]))) {
       if (str[i] == 'a' || str[i] == 'b' || str[i] == 'c' || str[i] == 'd' || str[i] == 'e' || str[i] == 'f' ) {
         count++;
       }
      }
      else{
        if( (parseInt(str[i])>=0) && (parseInt(str[i])<=9) ) {
          count++;
        }
      }
    }
    
    switch (count) {
      case 6:
        return true;
       
    
      default:
        return false;
    }
  }
}



const passCheck = (array) => {
  let validPass=0;
  for (let i = 0; i < array.length; i++) {
    let count =0;
    for (let j = 0; j < array[i].length; j++) {
      // console.log(`\ni: ${i}`);
      // console.log(`\nj: ${j}`);
    if (array[i][j].indexOf('byr',0)!==-1) {
      let byr= array[i][j].substring(array[i][j].indexOf(':')+1);
      if ( (byr.length == 4) && (parseInt(byr)>=1920) && (parseInt(byr)<=2002) ) {
        count++;
        // console.log('byr OK');
      }
      
    }
    if (array[i][j].indexOf('iyr',0)!==-1) {
      let iyr= array[i][j].substring(array[i][j].indexOf(':')+1);
      if ( (iyr.length == 4) && (parseInt(iyr)>=2010) && (parseInt(iyr)<=2020) ) {
        count++;
        // console.log('iyr OK');
      }
    }
    if (array[i][j].indexOf('eyr',0)!==-1) {
      let eyr= array[i][j].substring(array[i][j].indexOf(':')+1);
      if ( (eyr.length == 4) && (parseInt(eyr)>=2020) && (parseInt(eyr)<=2030) ) {
        count++;
        // console.log('eyr OK');
      }
    }
    if (array[i][j].indexOf('hgt',0)!==-1) {
      let hgt= array[i][j].substring(array[i][j].indexOf(':')+1);
      if ( (hgt.substring(hgt.length-2) == 'cm') && (parseInt(hgt.substring(0,hgt.length-2))>=150) && (parseInt(hgt.substring(0,hgt.length-2))<=193) ) {
        count++;
        // console.log('hgt OK');
      }
      if ( (hgt.substring(hgt.length-2) == 'in') && (parseInt(hgt.substring(0,hgt.length-2))>=59) && (parseInt(hgt.substring(0,hgt.length-2))<=76) ) {
        count++;
        // console.log('hgt OK');
      }
      
    }
    if (array[i][j].indexOf('hcl',0)!==-1) {
      let hcl= array[i][j].substring(array[i][j].indexOf(':')+1);
      if ( (hcl.substring(0,1) == '#') && (characterCheck(hcl.substring(1))) ) {
        count++;
        // console.log('hcl OK');
      }
    }
    if (array[i][j].indexOf('ecl',0)!==-1) {
      let ecl= array[i][j].substring(array[i][j].indexOf(':')+1);
      if ( (ecl == 'amb') || (ecl == 'blu') || (ecl == 'brn') || (ecl == 'gry') || (ecl == 'grn') || (ecl == 'hzl') || (ecl == 'oth') ) {
        count++;
        // console.log('ecl OK');
      }
    }
    if (array[i][j].indexOf('pid',0)!==-1) {
      let pid= array[i][j].substring(array[i][j].indexOf(':')+1);
      if ( pid.length == 9 ) {
        count++;
        // console.log('pid OK');
      }
    }
    // if (array[i].indexOf('cid',0)!==-1) {
    //   count++;
    // }

  }
  if (count == 7) {
    validPass++;
  }
  }
  return validPass;
}

console.log(passCheck(instructionsArray));
