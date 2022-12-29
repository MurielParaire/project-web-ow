export function verifyResult(data) {
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