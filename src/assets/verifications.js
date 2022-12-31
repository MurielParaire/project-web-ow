

export function validName(name) {
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if (validNamePattern.test(name)) {
        return true;
    }
    return false;
}

export function validUsername(username) {
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-][a-zA-Z]+)*$");
    if (validNamePattern.test(username)) {
        return true;
    }
    return false;
}
