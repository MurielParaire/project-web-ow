//functions that verifies that there are no special characters (a part dashes or spaces) in a name
export function validName(name) {
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if (validNamePattern.test(name)) {
        return true;
    }
    return false;
}

//functions that verifies that there are no special characters (a part dashes) in a username
export function validUsername(username) {
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-][a-zA-Z]+)*$");
    if (validNamePattern.test(username)) {
        return true;
    }
    return false;
}

//verify correct email
export function validEmail(email) {
    let validEmailPattern = new RegExp("^[a-z0-9]+@[a-z]+.{2,3}");
    return validEmailPattern.test(email);
}
