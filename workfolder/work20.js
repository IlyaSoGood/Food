"use strict";

const films = [
    {
        name: 'Titanic',
        rating: 9
    },
    {
        name: 'Die hard 5',
        rating: 5
    },
    {
        name: 'Matrix',
        rating: 8
    },
    {
        name: 'Some bad film',
        rating: 4
    }
];
// 1
function showGoodFilms(arr) {
    return arr.filter(film => film.rating >= 8);
}
// console.log(showGoodFilms(films));

// 2
function showListOfFilms(arr) {
    return arr.reduce(function (accumulator, currentValue, i) {
        if (i !== arr.length - 1) {
            return accumulator + `${currentValue.name}, `;
        } 
        else if (i === arr.length - 1) {
            return accumulator + `${currentValue.name}`;
        }    
    }, ''
    );
}
// console.log(showListOfFilms(films));

// 3
function setFilmsIds(arr) {
    return arr.map((film, i) => {
        film.id = i;
        return film;
        }
    );
}
console.log(setFilmsIds(films));

//4
const tranformedArray = setFilmsIds(films);

function checkFilms(arr) {
    return arr.every(film => film.id >= 0);
}
console.log(checkFilms(tranformedArray));