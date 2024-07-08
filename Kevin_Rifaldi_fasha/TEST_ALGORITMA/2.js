"use strict";

const sentence = "Saya sangat senang mengerjakan soal algoritma";

function findTheLongestWord(sentence) {
    const words = sentence.split(" ");
    let longestWord = "";

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longestWord.length) {
            longestWord = words[i];
        }
    }

    return `${longestWord} (${longestWord.length} character${longestWord.length > 1 ? 's' : ''})`;
}

console.log(findTheLongestWord(sentence));
