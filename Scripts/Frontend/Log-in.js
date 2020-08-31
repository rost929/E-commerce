import { validateIdentity } from "./Requests.js";
import { endpointValidateClient, endpointValidateEmployee, endpointValidateAdmin } from "./Endpoints.js";

// HTML Elements
const usernameElement = document.querySelector("#username");
const passwordElement = document.querySelector("#password");
const userTypeElement = document.querySelector(".userType");
const btnSubmitElement = document.querySelector(".btnSubmit");

//Events
btnSubmitElement.addEventListener("click", loginUser);


/**
 * @method loginUser
 * @description Send and validates user info  
 * @param {} 
 * @returns {}
 */
function loginUser() {
    const infoNotEmpty = noneEmptyFields();
    if (infoNotEmpty == true) {
        let endpoint = defineUserType();
        const userToValidate = buildUserToValidate();
        validateIdentity(endpoint, userToValidate)
            .then(response => {
                console.log(response);
                if (response.status === true) {
                    if (response.user[0].status === "active") {
                        const token = response.token;
                        localStorage.setItem("TOKEN", token);
                        clearFormFields();
                        allowUserAccess(response.typeUser);
                    } else {
                        swal("The user es currently blocked", "Please try later", "error");
                    }
                } else {
                    swal("Wrong credentials", "please check you info", "error");
                }
            })
            .catch(error => { console.log(error); })
    }
}

/**
 * @method noneEmptyFields
 * @description Validates if exists empty fields or not  
 * @param {} 
 * @returns {boolean}
 */
const noneEmptyFields = () => {
    let infoValidated = false;
    if (usernameElement.value && passwordElement.value && userTypeElement.value !== "--") {
        infoValidated = true;
        return infoValidated;
    }
    swal("There are empty fields", "please check your info", "error");
    return false;
}

/**
 * @method defineUserType
 * @description Verifies user type  
 * @param {} 
 * @returns {string}
 */
const defineUserType = () => {
    let endpoint;
    if (userTypeElement.value == 1) {
        return endpoint = endpointValidateEmployee;
    } else if (userTypeElement.value == 2) {
        return endpoint = endpointValidateClient;
    } else if (userTypeElement.value == 3)
        return endpoint = endpointValidateAdmin;
}

/**
 * @method buildUserToValidate
 * @description Buils and sends a new user as abject to validate   
 * @param {} 
 * @returns {object}
 */
const buildUserToValidate = () => {
    const user = {
        username: usernameElement.value,
        password: passwordElement.value
    }
    return user;
}

/**
 * @method clearFormFields
 * @description Clear all fields    
 * @param {} 
 * @returns {}
 */
const clearFormFields = () => {
    usernameElement.value = "";
    passwordElement.value = "";
    userTypeElement.value = "--";
}

/**
 * @method allowUserAccess
 * @description Redirects the page to a menu depending on the user type    
 * @param {} 
 * @returns {}
 */
const allowUserAccess = (typeUser) => {
    if (typeUser === "Employee") {
        window.location.replace('http://127.0.0.1:5500/HTML/Employee-menu.html');
    } else if (typeUser === "Client") {
        window.location.replace('http://127.0.0.1:5500/HTML/Client-menu.html');
    } else if (typeUser === "Admin") {
        window.location.replace('http://127.0.0.1:5500/HTML/Admin-menu.html');
    }
}