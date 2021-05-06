import { default as pokedex } from "./data";

interface Pokemon {
  code: number;
  name: string;
  weight: number;
  color: string;
  ability2: string;
  hp: number;
  sp_def: number;
  number: number;
  spd: number;
  height: number;
  atk: number;
  generation: number;
  mega_evolution: boolean;
  sp_atk: number;
  legendary: boolean;
  hidden_ability: string;
  serial: number;
  total: number;
  type: any;
  def: number;
  ability1: string;
}

///// Answers /////

function answerOne() {
  const legendaries: Pokemon[] = [];
  for (let p of pokedex) {
    let pokemon: Pokemon;
    pokemon = p;
    if (pokemon.legendary) {
      legendaries.push(pokemon);
    }
  }
  console.log(`\n1. There are ${legendaries.length} legendary Pokemon:`);

  const legendaryNames: string[] = [];
  for (let p of legendaries) {
    legendaryNames.push(p.name);
  }
  console.log(legendaryNames);
}

function answerTwo() {
  console.log(`\n2. Here are the top 10 Pokemon with the highest (def) stat:`);
  pokedex.sort(function (pokeA, pokeB) {
    return pokeB.def - pokeA.def;
  });
  for (let p of pokedex.slice(0, 10)) {
    console.log({ name: p.name, def: p.def });
  }
}

function answerThree() {
  console.log(`\n3. Here are the top 10 overweight Pokemon:`);

  const overweightPokemon: Pokemon[] = [];
  for (let p of pokedex) {
    let pokemon: Pokemon;
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
  function getOccurrence(array: number[], value: any) {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  }

  const pokeNumber: number[] = [];
  const variedPokemon: any[] = [];

  pokedex.sort(function (pokeA, pokeB) {
    return pokeA.number - pokeB.number - (pokeB.code - pokeA.code);
  });

  for (let p of pokedex) {
    pokeNumber.push(p.number);
  }

  let pokeNm = [];

  for (let p of pokedex) {
    let frequency: number = getOccurrence(pokeNumber, p.number);
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

  console.log(
    `\n4. ${newPokeNm.length} Pokemon have two or more variations; (${pokeNm.length}) if we include their variants:`
  );

  let pokeNames: string[] = [];
  let count = 0;
  for (let n of newPokeNm) {
    for (let p of pokedex) {
      if (n === p.number) {
        pokeNames.push(p.name);
      }
    }
  }
  console.log(pokeNames);
}

function answerFive() {
  console.log(
    `\n5. Here are the list of Pokemon types (and the amount of Pokemon having that type) from the the most common to the least:`
  );

  const pokeTypes: string[] = [];

  for (let p of pokedex) {
    let pokemon: Pokemon;
    pokemon = p;

    if (typeof pokemon.type === "string") {
      pokeTypes.push(pokemon.type);
    } else {
      for (let t of pokemon.type) {
        pokeTypes.push(t);
      }
    }
  }

  let pokeTypesNoDuplicates: string[] = [...new Set(pokeTypes)];
  let PokeTypesNoDuplicatesPlus = [];

  function getOccurrence(array: string[], value: any) {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  }

  for (let t of pokeTypesNoDuplicates) {
    let frequency: number = getOccurrence(pokeTypes, t);
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
