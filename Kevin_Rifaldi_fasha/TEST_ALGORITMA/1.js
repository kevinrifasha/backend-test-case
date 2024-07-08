"use strict";

let string1 = "NEGIE1";
let letters = [];
let numbers = [];

for(let i = 0; i < string1.length; i++) {
    if(isNaN(string1[i])) {
        letters.push(string1[i]);
    } else {
        numbers.push(string1[i]);
    }
}

letters.reverse();

let result = letters.join('') + numbers.join('');

console.log(result);
