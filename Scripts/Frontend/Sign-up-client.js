import { endpointNewClient } from "./Endpoints.js";
import { newUserData } from "./Requests.js";
import { validateNonEmptyField } from "./Validations.js";


const nameElement = document.querySelector("#name");
const usernameElement = document.querySelector("#username");
const passwordElement = document.querySelector("#password");
const passConfirmedElement = document.querySelector("#confirmedPassword");
const btnSignUpElement = document.querySelector(".btnSignUp");

let outputValidationElement = document.querySelector("#outputValidation");

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
        outputValidationElement.innerHTML = "";
        //(userTypeElement.value == 1) ? endpoint = endpointNewEmployee: endpoint = endpointNewClient;
        const newUser = buildNewUser();
        newUserData(endpointNewClient, newUser)
            .then(response => {
                clearFormFields();
                alert("User register successfully!");
            })
            .catch(error => { console.log(error); })
    }
}

/**
 * @method clearFormFields
 * @description 
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
 * @description 
 * @param {} 
 * @returns {object}
 */
const buildNewUser = () => {
    const newUser = {
        name: nameElement.value,
        username: usernameElement.value,
        password: passwordElement.value
    }
    return newUser;
}