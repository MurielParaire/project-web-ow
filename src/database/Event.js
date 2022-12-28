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
    return data;
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


export async function deleteEventById(id) {
    console.log(id)
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
    return data;
}