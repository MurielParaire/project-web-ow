import {router} from '../router/router.js'

export function verifyResult(data) {
    let keys = Object.keys(data);
    if (keys.length > 0) {
        keys.forEach(key => {
            if (key === 'msg') {
                if (data.status === 401) {
                    router.push({
                        name: 'Login'
                    });
                }
                alert(data.msg);
                data = 0;
            }
        })
    }
    return data; 
}