import { verifyResult } from "./general.js";

export async function createUserHistory(history) {
  let res = await fetch("http://localhost:3000/owapi/users/history", {
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


export async function getUserInformation() {
  let url = 'http://localhost:3000/owapi/users/info';
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

export async function getUserHistory(limit, offset) {
  let url = 'http://localhost:3000/owapi/users/history/?' + new URLSearchParams({
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

export async function verifyUser(user) {
  let fetchResult = await fetch("http://localhost:3000/owapi/users/verify/", {
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

export async function createUser(user) {
  let fetchResult = await fetch("http://localhost:3000/owapi/users/create", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).catch((err) => console.log(err));
  return fetchResult.status;
}


export async function getSomeUsers(limit, offset) {
  let url = 'http://localhost:3000/owapi/users/?' + new URLSearchParams({
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


export async function deleteUserById(id) {
  let url = 'http://localhost:3000/owapi/users/' + id.toString();
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

export async function modifyUser(user, id) {
  let url = 'http://localhost:3000/owapi/users/' + id.toString();
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


export async function deleteRoleFromUserByUserId(user, role) {
  let url = 'http://localhost:3000/owapi/users/' + user.user_id.toString() + '/roles?' + new URLSearchParams({role: role});
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

export async function addRoleToUserByUserId(user, role) {
  let url = 'http://localhost:3000/owapi/users/' + user.user_id.toString() + '/roles?' + new URLSearchParams({role: role});
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