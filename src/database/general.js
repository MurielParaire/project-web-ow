import {router} from '../router/router.js'

export function verifyResult(data) {
    let keys = Object.keys(data);
    console.log('data')
    console.log(data)
    console.log('keys')
    console.log(keys)
    if (keys.length > 0) {
        keys.forEach(key => {
            if (key === 'msg') {
                if (data.status === 401) {
                    console.log('d')
                    router.push({
                        name: 'Login'
                    })
                }
                alert(data.msg)
                data = 0;
            }
        })
    }
    return data; 
}