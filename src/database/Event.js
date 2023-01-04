import { verifyResult } from "./general.js";

export async function getSomeEvents(limit, offset) {
    let fetchResult = await fetch("http://localhost:3000/owapi/events/?" + new URLSearchParams({
        limit: limit,
        offset: offset
    }), {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
        'auth': sessionStorage.getItem("token"),
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
        "auth": sessionStorage.getItem("token"),
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
        'auth': sessionStorage.getItem('token'),
        },
        body: JSON.stringify(event)
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    return verifyResult(data);
}


export async function getEventsByHero(hero) {
    try {
        hero = parseInt(hero);
    }
    catch (err) {
        return 0;
    }
    let url = "http://localhost:3000/owapi/events/hero/" + hero.toString();
    let fetchResult = await fetch(url, {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    return verifyResult(data);
}