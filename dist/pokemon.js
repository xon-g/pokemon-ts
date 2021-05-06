"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("./data"));
///// Answers /////
function answerOne() {
    const legendaries = [];
    for (let p of data_1.default) {
        let pokemon;
        pokemon = p;
        if (pokemon.legendary) {
            legendaries.push(pokemon);
        }
    }
    console.log(`\n1. There are ${legendaries.length} legendary Pokemon:`);
    const legendaryNames = [];
    for (let p of legendaries) {
        legendaryNames.push(p.name);
    }
    console.log(legendaryNames);
}
function answerTwo() {
    console.log(`\n2. Here are the top 10 Pokemon with the highest (def) stat:`);
    data_1.default.sort(function (pokeA, pokeB) {
        return pokeB.def - pokeA.def;
    });
    for (let p of data_1.default.slice(0, 10)) {
        console.log({ name: p.name, def: p.def });
    }
}
function answerThree() {
    console.log(`\n3. Here are the top 10 overweight Pokemon:`);
    const overweightPokemon = [];
    for (let p of data_1.default) {
        let pokemon;
        pokemon = p;
        if (pokemon.weight > pokemon.height * 60) {
            overweightPokemon.push(pokemon);
        }
    }
    overweightPokemon.sort(function (pokeA, pokeB) {
        let aRate = pokeB.weight - pokeB.height * 60;
        let bRate = pokeA.weight - pokeA.height * 60;
        return bRate - aRate;
    });
    for (let p of overweightPokemon.slice(0, 10)) {
        console.log({ name: p.name, weight: p.weight, height: p.height });
    }
}
function answerFour() {
    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => v === value && count++);
        return count;
    }
    const pokeNumber = [];
    const variedPokemon = [];
    data_1.default.sort(function (pokeA, pokeB) {
        return pokeA.number - pokeB.number - (pokeB.code - pokeA.code);
    });
    for (let p of data_1.default) {
        pokeNumber.push(p.number);
    }
    let pokeNm = [];
    for (let p of data_1.default) {
        let frequency = getOccurrence(pokeNumber, p.number);
        if (frequency > 1) {
            pokeNm.push(p.number);
            variedPokemon.push({
                number: p.number,
                name: p.name,
                ability: [p.ability1, p.ability2],
                hidden_ability: p.hidden_ability,
            });
        }
    }
    let newPokeNm = [...new Set(pokeNm)];
    console.log(`\n4. ${newPokeNm.length} Pokemon have two or more variations; (${pokeNm.length}) if we include their variants:`);
    let pokeNames = [];
    let count = 0;
    for (let n of newPokeNm) {
        for (let p of data_1.default) {
            if (n === p.number) {
                pokeNames.push(p.name);
            }
        }
    }
    console.log(pokeNames);
}
function answerFive() {
    console.log(`\n5. Here are the list of Pokemon types (and the amount of Pokemon having that type) from the the most common to the least:`);
    const pokeTypes = [];
    for (let p of data_1.default) {
        let pokemon;
        pokemon = p;
        if (typeof pokemon.type === "string") {
            pokeTypes.push(pokemon.type);
        }
        else {
            for (let t of pokemon.type) {
                pokeTypes.push(t);
            }
        }
    }
    let pokeTypesNoDuplicates = [...new Set(pokeTypes)];
    let PokeTypesNoDuplicatesPlus = [];
    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => v === value && count++);
        return count;
    }
    for (let t of pokeTypesNoDuplicates) {
        let frequency = getOccurrence(pokeTypes, t);
        PokeTypesNoDuplicatesPlus.push({ type: t, frequency: frequency });
    }
    PokeTypesNoDuplicatesPlus.sort(function (pokeA, pokeB) {
        return pokeB.frequency - pokeA.frequency;
    });
    for (let t of PokeTypesNoDuplicatesPlus) {
        console.log(t);
    }
}
answerOne();
answerTwo();
answerThree();
answerFour();
answerFive();
