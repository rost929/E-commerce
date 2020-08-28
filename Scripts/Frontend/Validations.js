let outputValidationElement = document.querySelector("#outputValidation");

/**
 * @method validateNonEmptyField
 * @description 
 * @param {} 
 * @returns {boolean}
 */

export const validateNonEmptyField = (name, username, password, passConfirmed) => {
    let infoValidated = false;
    if (name && username && password && passConfirmed) {
        infoValidated = validateSamePassword(password, passConfirmed);
        return infoValidated;
    }
    outputValidationElement.innerHTML = "There empty field, please fill the form completely";
    return infoValidated;
}


/**
 * @method validateSamePassword
 * @description 
 * @param {} 
 * @returns {boolean}
 */
const validateSamePassword = (password, passConfirmed) => {
    if (password === passConfirmed) {
        outputValidationElement.innerHTML = "";
        return true;
    }
    outputValidationElement.innerHTML = "Passwords do not match";
    return false;
}