import { verifyResult } from "./general.js";

export async function getSomeEvents(limit, offset) {
    let fetchResult = await fetch("http://localhost:3000/owapi/events/", {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'limit': limit,
        'offset': offset
        }
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    return verifyResult(data);
}


export async function createEvent(event) {
    let fetchResult = await fetch("http://localhost:3000/owapi/events/", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem("token"),
        },
        body: JSON.stringify(event)
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    return verifyResult(data);
}


export async function deleteEventById(id) {
    let url = 'http://localhost:3000/owapi/events/' + id.toString();
    let fetchResult = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("token"),
      },
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    return verifyResult(data);
}


export async function modifyEvent(event) {
    console.log('event')
    console.log(event)
    let url = "http://localhost:3000/owapi/events/" + event.event_id.toString()
    console.log(url)
    let fetchResult = await fetch(url, {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token'),
        },
        body: JSON.stringify(event)
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    return verifyResult(data);
}


export async function getEventsByHero(hero) {

    hero = {hero: hero}
    let fetchResult = await fetch("http://localhost:3000/owapi/events/hero", {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(hero)
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    return verifyResult(data);
}