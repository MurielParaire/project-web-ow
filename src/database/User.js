import { verifyResult } from "./general.js";

const servurl = "https://cluster-2022-8.dopolytech.fr/owapi";

/**
 * Description: create a new user history
 * Arguments:
 *      - history :  the history to create
 * Returns: 1 if it worked, else 0
 * */
export async function createUserHistory(history) {
  let url = servurl + "/users/history";
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "auth": sessionStorage.getItem("token")
    },
    body: JSON.stringify(history)
  }).catch((err) => { console.log(err); });
  return res.status;
}


/**
 * Description: get the user information
 * Returns: the user information
 * */
export async function getUserInformation() {
  let url = servurl + '/users/info';
  let fetchResult = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "auth": sessionStorage.getItem("token")
    },
  }).catch((err) => console.log(err));
  let data = await fetchResult.json();
  return verifyResult(data, fetchResult.status);
}


/**
 * Description: get the user history
 * Arguments:
 *      - limit :  the maximal number of user history entries to return
 *      - offset : the offset of the entries to retrieve
 * Returns: the list of the user histories entries
 * */
export async function getUserHistory(limit, offset) {
  let url = servurl + '/users/history/?' + new URLSearchParams({
    limit: limit,
    offset: offset
  });
  let fetchResult = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "auth": sessionStorage.getItem("token"),
    },
  }).catch((err) => console.log(err));
  let data = await fetchResult.json();
  if (verifyResult(data, fetchResult.status) === 0) {
    return 0;
  }
  return data;
}


/**
 * Description: verifies the users username and password
 * Arguments:
 *      - user :  objec containing the username and password the user has entered
 * Returns: a jwt token
 * */
export async function verifyUser(user) {
  let url = servurl + "/users/verify/"
  let fetchResult = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).catch((err) => console.log(err));
  let data = await fetchResult.json();
  return verifyResult(data, fetchResult.status);
}


/**
 * Description: create a new user
 * Arguments:
 *      - user :  the new user's information
 * Returns: 1 if it worked, else 0
 * */
export async function createUser(user) {
  let url = servurl + "/users/create";
  let fetchResult = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).catch((err) => console.log(err));
  return fetchResult.status;
}


/**
 * Description: get some users
 * Arguments:
 *      - limit :  the maximal number of users to retrieve
 *      - offset : the offset for returning the users
 * Returns: a list of some users
 * */
export async function getSomeUsers(limit, offset) {
  let url = servurl + '/users/?' + new URLSearchParams({
    limit: limit,
    offset: offset
  });
  let fetchResult = await fetch(url, {
    method: 'GET',
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
 * Description: delete a user by his id
 * Arguments:
 *      - id :  the id of the user
 * Returns: 1 if it worked, else 0
 * */
export async function deleteUserById(id) {
  let url = servurl + '/users/' + id.toString();
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
 * Description: modify a user by his id
 * Arguments:
 *      - id :  the id of the user
 *      - user : the modified user information
 * Returns: 1 if it worked, else 0
 * */
export async function modifyUser(user, id) {
  let url = servurl + '/users/' + id.toString();
  let fetchResult = await fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "auth": sessionStorage.getItem("token"),
    },
    body: JSON.stringify(user)
  }).catch((err) => console.log(err));
  let data = await fetchResult.json();
  return verifyResult(data);
}


/**
 * Description: delete a role from a user
 * Arguments:
 *      - user :  the id of the user
 *      - role : the name of the role
 * Returns: 1 if it worked, else 0
 * */
export async function deleteRoleFromUserByUserId(user, role) {
  let url = servurl + '/users/' + user.user_id.toString() + '/roles?' + new URLSearchParams({role: role});
  let fetchResult = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "auth": sessionStorage.getItem("token")
    },
  }).catch((err) => console.log(err));
  let data = await fetchResult.json();
  return verifyResult(data);
}


/**
 * Description: ass a role to a user
 * Arguments:
 *      - user :  the id of the user
 *      - role : the name of the role
 * Returns: 1 if it worked, else 0
 * */
export async function addRoleToUserByUserId(user, role) {
  let url = servurl + '/users/' + user.user_id.toString() + '/roles?' + new URLSearchParams({role: role});
  let fetchResult = await fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "auth": sessionStorage.getItem("token")
    },
  }).catch((err) => console.log(err));
  let data = await fetchResult.json();
  return verifyResult(data);
}
