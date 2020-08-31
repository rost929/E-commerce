import { endpointNewClient } from "./Endpoints.js";
import { newUserData } from "./Requests.js";
import { validateNonEmptyField } from "./Validations.js";

//HTML Elements
const nameElement = document.querySelector("#name");
const usernameElement = document.querySelector("#username");
const passwordElement = document.querySelector("#password");
const passConfirmedElement = document.querySelector("#confirmedPassword");
const btnSignUpElement = document.querySelector(".btnSignUp");

//Events
btnSignUpElement.addEventListener("click", signNewClient);

/**
 * @method signNewUserUp
 * @description preprocesses and sends new user information to sign up
 * @param {} 
 * @returns {}
 */
function signNewClient() {
    let infoCorrect = validateNonEmptyField(nameElement.value, usernameElement.value, passwordElement.value, passConfirmedElement.value);
    if (infoCorrect) {
        const newUser = buildNewUser();
        newUserData(endpointNewClient, newUser)
            .then(response => {
                clearFormFields();
                swal("User register successfully!");
            })
            .catch(error => { console.log(error); })
    }
}

/**
 * @method clearFormFields
 * @description Clear all empty fields
 * @param {} 
 * @returns {}
 */
const clearFormFields = () => {
    nameElement.value = ""
    usernameElement.value = ""
    passwordElement.value = ""
    passConfirmedElement.value = "";
    //userTypeElement.value = "--";
}

/**
 * @method buildNewUser
 * @description Builds and returns a new user as an object
 * @param {} 
 * @returns {object}
 */
const buildNewUser = () => {
    return {
        name: nameElement.value,
        username: usernameElement.value,
        password: passwordElement.value
    };
}