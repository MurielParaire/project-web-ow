export async function getAllCharacters() {
    let fetchResult = await fetch("http://localhost:3000/owapi/heroes/").catch((err) => console.log(err));
    let data = await fetchResult.json();
    return data;
}

export async function getCharacterDetails(name) {
    let url = 'http://localhost:3000/owapi/heroes/name/' + name;
    let data = await fetch(url).catch((err) => console.log(err));
    let char = await data.json();
    return char;
}