"use strict";

const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9]
];

let diagonalPertama = 0;
let diagonalKedua = 0;

let penjumlahanDiagonalPertama = '';
let penjumlahanDiagonalKedua = '';

for (let i = 0; i < Matrix.length; i++) {
  diagonalPertama += Matrix[i][i];
  penjumlahanDiagonalPertama += Matrix[i][i] + ' + ';
  
  diagonalKedua += Matrix[i][Matrix.length - 1 - i];
  penjumlahanDiagonalKedua += Matrix[i][Matrix.length - 1 - i] + ' + ';
}

penjumlahanDiagonalPertama = penjumlahanDiagonalPertama.slice(0, -3) + ' = ' + diagonalPertama;
penjumlahanDiagonalKedua = penjumlahanDiagonalKedua.slice(0, -3) + ' = ' + diagonalKedua;

console.log('Diagonal pertama:', penjumlahanDiagonalPertama);
console.log('Diagonal kedua:', penjumlahanDiagonalKedua);

const hasil = diagonalPertama - diagonalKedua;
console.log('Hasil akhir:', diagonalPertama, '-', diagonalKedua, '=', hasil); 
