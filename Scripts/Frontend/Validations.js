/**
 * @method validateNonEmptyField
 * @description  Validates if exists empty fields or not
 * @param {} 
 * @returns {boolean}
 */

export const validateNonEmptyField = (name, username, password, passConfirmed) => {
    let infoValidated = false;
    if (name && username && password && passConfirmed) {
        infoValidated = validateSamePassword(password, passConfirmed);
        return infoValidated;
    }
    swal("There is something missing ", "Please fill all the fields", "error");
    return infoValidated;
}


/**
 * @method validateSamePassword
 * @description Validates if passwords are the same
 * @param {} 
 * @returns {boolean}
 */
const validateSamePassword = (password, passConfirmed) => {
    if (password === passConfirmed) {
        return true;
    }
    swal("Passwords do not match", "Please check your info", "error");
    return false;
}