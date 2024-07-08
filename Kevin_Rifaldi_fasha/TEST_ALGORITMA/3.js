"use strict";

const INPUT =['xc','dz','bbb','dz'];
const QUERY =['bbb','ac','dz'];
const OUTPUT=[];

for (let i=0;i<QUERY.length;i++){
    let count=0
    for(let j=0;j<INPUT.length;j++){
        if(QUERY[i]===INPUT[j]){
            count++;
        }
    }
    OUTPUT.push(count);

}
console.log(`OUTPUT :`,OUTPUT);