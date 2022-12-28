export async function getAllCharacters() {
    let fetchResult = await fetch("http://localhost:3000/owapi/heroes/").catch((err) => console.log(err));
    let data = await fetchResult.json();
    return data;
}


export async function getSomeHeroes(limit, offset) {
    console.log('limit')
    console.log(limit)
    console.log('offset')
    console.log(offset)
    let url = 'http://localhost:3000/owapi/heroes/';
    let fetchResult = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("token"),
        'limit': limit,
        'offset': offset
      },
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    return data;
}

export async function deleteHeroById(id) {
    let url = 'http://localhost:3000/owapi/heroes/' + id.toString();
    let fetchResult = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("token"),
      },
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    return data;
}


export async function getCharacterDetails(name) {
    let url = 'http://localhost:3000/owapi/heroes/name/' + name;
    let data = await fetch(url).catch((err) => console.log(err));
    let char = await data.json();
    return char;
}

export async function getHeroesByType(type) {
    let url = 'http://localhost:3000/owapi/heroes/type/' + type.toString();
    let data = await fetch(url).catch((err) => console.log(err));
    let heroes = await data.json();
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
        'authorization': sessionStorage.getItem("token"),
        },
        body: JSON.stringify(hero)
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    let keys = Object.keys(data);
    if (keys.length > 0) {
        keys.forEach(key => {
            if (key === 'msg') {
                console.log('here')
                alert(data.msg)
                data = 0;
                
            }
        })
    }   
    return data;
}