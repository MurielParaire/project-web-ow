

export async function createUserHistory(history) {
    let res = await fetch("http://localhost:3000/owapi/users/history/new/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "authorization": sessionStorage.getItem("token")
        },
        body: JSON.stringify(history)
    }).catch((err) => { console.log(err); });
    return res.status;
}


export async function getUserInformation() {
    let url = 'http://localhost:3000/owapi/users/info/';
    let fetchResult = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("token")
      },
    }).catch((err) => console.log(err));
    let data = await fetchResult.json();
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
    return data;
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