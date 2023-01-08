import {router} from '../router/router.js'

/**
 * Description: verify if the api has returned an error
 * Arguments:
 *      - data :  the result of the detch call
 * Returns: 0 if there was an error, else 1
 * */
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