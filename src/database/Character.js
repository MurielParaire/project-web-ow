import { verifyResult } from "./general.js";

export async function getAllCharacters() {
  let fetchResult = await fetch("http://localhost:3000/owapi/heroes/").catch((err) => console.log(err));
  let data = await fetchResult.json();
  return verifyResult(data);
}


export async function getSomeHeroes(limit, offset) {
  try {
    let param = new URLSearchParams({
      "limit": limit,
      "offset": offset
    });
    let url = 'http://localhost:3000/owapi/heroes/?';
    let fetchResult = await fetch(url + param.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "auth": sessionStorage.getItem("token")
      },
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    console.log(data)
    return verifyResult(data);
  }
  catch (err) {
    console.log(err)
  }

}

export async function deleteHeroById(id) {
  let url = 'http://localhost:3000/owapi/heroes/' + id.toString();
  let fetchResult = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "auth": sessionStorage.getItem("token"),
    },
  }).catch((err) => console.log(err));
  let data = await fetchResult.json();
  return verifyResult(data);
}


export async function getCharacterDetails(name) {
  let url = 'http://localhost:3000/owapi/heroes/name/' + name;
  let data = await fetch(url).catch((err) => console.log(err));
  let char = await data.json();
  return verifyResult(char);
}

export async function getHeroesByRole(role) {
  let url = 'http://localhost:3000/owapi/heroes/role/' + role.toString();
  let data = await fetch(url).catch((err) => console.log(err));
  let heroes = await data.json();
  verifyResult(heroes)
  let characters = []
  heroes.forEach(hero => {
    characters.push(hero.name)
  });
  return characters;
}

export async function createHero(hero) {
  let url = 'http://localhost:3000/owapi/heroes/';
  let fetchResult = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem("token"),
    },
    body: JSON.stringify(hero)
  }).catch((err) => console.log(err));
  let data = await fetchResult.json();
  return verifyResult(data);
}


export async function modifyHero(hero) {
  console.log('hero')
  console.log(hero)
  let url = "http://localhost:3000/owapi/heroes/" + hero.id_char.toString()
  console.log(url)
  let fetchResult = await fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem('token'),
    },
    body: JSON.stringify(hero)
  }).catch((err) => console.log(err));
  let data = await fetchResult.json();
  return verifyResult(data);
}

export async function getImageAndEvent(name) {
  if (name === 'Lucio') {
    name = 'Lúcio';
  }
  else if (name === 'Torbjorn') {
    name = 'Torbjörn';
  }
  else if (name === 'Junker-Queen') {
    name = 'Junker Queen';
  }
  else if (name === 'Soldier-76') {
    name = 'Soldier: 76';
  }
  else if (name === 'wrecking-ball') {
    name = 'Wrecking Ball';
  }
  else {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  let url = 'http://localhost:3000/owapi/heroes/event/' + name;
  let data = await fetch(url).catch((err) => console.log(err));
  let image = await data.json();
  return image;
}