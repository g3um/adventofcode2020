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
    let regex = / bag/gi, result, indices = [];
    let arrayInput = [];
    while ( (result = regex.exec(instruction)) ) {
        indices.push(result.index);
    }

    for (let i = 0; i < indices.length; i++) {
        let firstSpace = instruction.lastIndexOf(' ', indices[i]-1);
        let secondSpace = instruction.lastIndexOf(' ',firstSpace-1);
        let substring=instruction.substring(secondSpace+1,indices[i]);
        if(substring !== 'no other'){
        arrayInput[i] = substring;
        }
    }

    return arrayInput;
 }

 const parsePart2 = instruction => {
    let regex = / bag/gi, result, indices = [];
    let arrayInput = [];
    while ( (result = regex.exec(instruction)) ) {
        indices.push(result.index);
    }

    for (let i = 0; i < indices.length; i++) {
        let firstSpace = instruction.lastIndexOf(' ', indices[i]-1);
        let secondSpace = instruction.lastIndexOf(' ',firstSpace-1);
        let substring=instruction.substring(secondSpace+1,indices[i]);
        
        // if(substring !== 'no other'){
                let number=instruction.substring(secondSpace-1,secondSpace);
                
                if(isNaN(parseInt(number))) { number = 1};
                arrayInput[i] = [substring,parseInt(number)];
        // }
    }

    return arrayInput;
 }

// Table of instructions
instructionsArray = tablemaker(instructions.length,4,'');
    for (let i = 0; i < instructions.length; i++) {
        instructionsArray[i] = parseInput(instructions[i]);
    }

instructionsArray2 = tablemaker(instructions.length,4,'');
for (let i = 0; i < instructions.length; i++) {
    instructionsArray2[i] = parsePart2(instructions[i]);
}

console.table(instructionsArray2);

//Function to find which bag is directly in another bag
const bagSearch = (array,string) => {
    let bags=[];
    let filteredArray = array.filter(element => element.includes(string)&&element[0]!== string);
    for (let i = 0; i < filteredArray.length; i++) {
        bags.push(filteredArray[i][0]);
    }
    return bags;
}

//Function to find all parents
const thoroughSearch = (array,string) => {
    let allBags = [], tempBags =[];
    allBags = bagSearch(array,string);
    for (let i = 0; i < allBags.length; i++) {
        tempBags=bagSearch(array,allBags[i]);
        for (let j = 0; j < tempBags.length; j++) {
            if(allBags.includes(tempBags[j])) {
            }
            else{
                allBags.push(tempBags[j]);
            }
        }
    }
    return allBags.length;

}

//Function to find all children
const childSearch = (array,string) => {
    let filteredArray=[], bags=[];
    filteredArray = array.filter(element => element[0].includes(string)&&element[0]!== string);
    for (let i = 0; i < filteredArray.length; i++) {
        bags.push(filteredArray[i]);
    }
    return bags;
}


const isArrayEqual = (array1,array2) => {
    // compare lengths
    if (array1.length != array2.length)
        return false;

    for (let i = 0, l=array1.length; i < l; i++) {
        // Check if we have nested arrays
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!isArrayEqual(array1[i],array2[i]))
                return false;       
        }           
        else if (array1[i] != array2[i]) { 
            return false;   
        }           
    }       
    return true;
}



const searchFirstCol = (array,str) => {
    let index=-1;
    for (let i = 0; i < array.length; i++) {
        if(array[i][0][0] == str){
            index = i;
        } 
    }
    return index;
}


const bagSorter = array => {
    let slicedArray=[];
    let tempArray=[];
    let copyArray =[...array];
    for (let i = 0; i < copyArray.length; i++) {
        if (copyArray[i][1][0] == 'no other') {
            tempArray= slicedArray.concat(copyArray.splice(i,1));
            slicedArray = tempArray;
            i--;
        }
    }
    tempArray=[];
    let slicedArray2 =[];
    for (let i = copyArray.length-1; i > 0; i--) {
        for (let j = 1; j < copyArray[i].length; j++) {
            let index = searchFirstCol(copyArray, copyArray[i][j][0]);
            if( index < i) {
                tempArray= slicedArray2.concat(copyArray.splice(index,1));
                slicedArray2 = tempArray;
                tempArray = copyArray.concat(slicedArray2);
                slicedArray2=[];
                copyArray = tempArray;
                i--;
            }            
        }
    }

    tempArray = copyArray.concat(slicedArray)
    copyArray = tempArray;
    return copyArray;
}




const matryoshka = (array,string) => {
    let allBags = [],allBagsTemp = [], tempBags =[], sumBag =0;
    allBags = childSearch(array,string);
    

    for (let i = 0; i < allBags.length; i++) {
        for (let j = 1; j < allBags[i].length; j++) {
        tempBags = [...allBags];
        allBags = tempBags.concat(childSearch(array,tempBags[i][j][0]));     
        }
        for (let i = 0; i < allBags.length; i++) {
            for (let j = i+1; j < allBags.length; j++) {
                if (isArrayEqual(allBags[i][0],allBags[j][0])) {
                    allBags.splice(j,1);
                }
            }
        }
    }

    console.table(allBags);
    allBagsTemp = bagSorter(bagSorter(allBags));
    allBags=allBagsTemp;
    console.table(allBags);

    
    for (let i = allBags.length-1; i >=0; i--) {   
        if(allBags[i][1][0] !== 'no other'){
            allBags[i][0][1]=0;
        }

        for (let j = 1; j < allBags[i].length; j++) {
            let result=searchFirstCol(allBags , allBags[i][j][0]);

            if(result !== -1){
                if( (allBags[result][0][1] == 1) && (allBags[result][1][0] == 'no other')  ){
                    allBags[i][j][1] *= allBags[result][0][1];
                    allBags[i][0][1]+=allBags[i][j][1]; 
                }
                else{
                    allBags[i][j][1] = allBags[i][j][1]*allBags[result][0][1] + allBags[i][j][1];
                    allBags[i][0][1]+=allBags[i][j][1]; 
                }
            }
                      
        }
    }
    allBags[0][0][1]=0;
    for (let j = 1; j < allBags[0].length; j++) {
        allBags[0][0][1]+=allBags[0][j][1];
    }

    console.table(allBags);
    return allBags[0][0][1];
}

console.log(matryoshka(instructionsArray2,'shiny gold'));


