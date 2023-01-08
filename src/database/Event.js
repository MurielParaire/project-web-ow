import { verifyResult } from "./general.js";

const servurl = "https://cluster-2022-8.dopolytech.fr/owapi";
/**
 * Description: get some events
 * Arguments:
 *      - limit : the maximul number of events to retrieve
 *      - offset : the offset of the events
 * Returns: a list with some events
 * */
export async function getSomeEvents(limit, offset) {
    let url = servurl + "/events/?"
    let fetchResult = await fetch(url + new URLSearchParams({
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


/**
 * Description: get all existing event types
 * Returns: a list with all event types
 * */
export async function getEventTypes() {
    let url = servurl + "/events/type/all";
    let fetchResult = await fetch(url, {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
    let types = [];
    verifyResult(data);
    for (let counter = 0; counter < data.length; counter++) {
        types.push(data[counter].type)
    }
    return types
}


/**
 * Description: create a new event
 * Arguments:
 *      - event : the information about the event
 * Returns: 1 if it worked, else 0
 * */
export async function createEvent(event) {
    let url = servurl + "/events/";
    let fetchResult = await fetch(url, {
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


/**
 * Description: delete an event by its id
 * Arguments:
 *      - id :  the id of the event
 * Returns: 1 if it worked, else 0
 * */
export async function deleteEventById(id) {
    let url = servurl + '/events/' + id.toString();
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
 * Description: modify an event
 * Arguments:
 *      - event :  the modified event
 * Returns: 1 if it worked, else 0
 * */
export async function modifyEvent(event) {
    let url =  servurl + "/events/" + event.event_id.toString()
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


/**
 * Description: get all events for one hero
 * Arguments:
 *      - hero :  the id of the hero
 * Returns: a list of events
 * */
export async function getEventsByHero(hero) {
    try {
        hero = parseInt(hero);
    }
    catch (err) {
        return 0;
    }
    let url = servurl + "/events/hero/" + hero.toString();
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
