import { verifyResult } from "./general.js";


const servurl = "https://cluster-2022-8.dopolytech.fr/owapi";
/**
 * Description: gets All characters
 * Returns: a list with all the heroes
 * */
export async function getAllCharacters() {
  let url = servurl + "/heroes/"
  let fetchResult = await fetch(url).catch((err) => console.log(err));
  let data = await fetchResult.json();
  return verifyResult(data);
}


/**
 * Description: get only some characters
 * Arguments:
 *      - limit : the maximal number of characters to get
 *      - offset : the offset 
 * Returns: a list with some heroes
 * */
export async function getSomeHeroes(limit, offset) {
  try {
    let param = new URLSearchParams({
      "limit": limit,
      "offset": offset
    });
    let url = servurl + '/heroes/?';
    let fetchResult = await fetch(url + param.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "auth": sessionStorage.getItem("token")
      },
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    return verifyResult(data);
  }
  catch (err) {
    console.log(err)
  }

}

/**
 * Description: delete a character
 * Arguments:
 *      - id : the id of the character
 * Returns: 1 if it was successfull, 0 if it wasn't
 * */
export async function deleteHeroById(id) {
  let url = servurl + '/heroes/' + id.toString();
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


/**
 * Description: gets the details of one character
 * Arguments:
 *      - name : the name of the character
 * Returns: the character
 * */
export async function getCharacterDetails(name) {
  let url = servurl +  '/heroes/name/' + name;
  let data = await fetch(url).catch((err) => console.log(err));
  let char = await data.json();
  return verifyResult(char);
}


/**
 * Description: gets all characters of a specific role
 * Arguments:
 *      - role : the role of teh heroes
 * Returns: a list with all the heroes of that role
 * */
export async function getHeroesByRole(role) {
  let url = servurl + '/heroes/role/' + role.toString();
  let data = await fetch(url).catch((err) => console.log(err));
  let heroes = await data.json();
  verifyResult(heroes)
  let characters = []
  heroes.forEach(hero => {
    characters.push(hero.name)
  });
  return characters;
}


/**
 * Description: create a new hero
 * Arguments:
 *      - hero : the hero with all the information to create a new character
 * Returns: 1 if it went well, else 0
 * */
export async function createHero(hero) {
  let url = servurl + '/heroes/';
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


/**
 * Description: modify an existing character
 * Arguments:
 *      - hero : the hero with the modified information
 * Returns: 1 if it was successfull, 0 else
 * */
export async function modifyHero(hero) {
  let url = servurl + "/heroes/" + hero.id_char.toString()
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


/**
 * Description: gets the special events and image of a hero
 * Arguments:
 *      - name : the name of the hero
 * Returns: a)n object representing an array of events with the image of teh hero or only the image
 * */
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
  let url = servurl + '/heroes/event/' + name;
  let data = await fetch(url).catch((err) => console.log(err));
  let image = await data.json();
  return image;
}
