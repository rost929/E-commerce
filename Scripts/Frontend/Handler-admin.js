import { endpointNewEmployee, endpointChangeStatus } from "./Endpoints.js";
import { newUserData, changeStatus, logOutUser } from "./Requests.js";
import { validateNonEmptyField } from "./Validations.js";

//HTML Elements 
const nameElement = document.querySelector("#name");
const usernameElement = document.querySelector("#username");
const passwordElement = document.querySelector("#password");
const passConfirmedElement = document.querySelector("#confirmedPassword");
const btnSignUpElement = document.querySelector(".btnSignUp");
const inputEmployee = document.querySelector("#inputStatus");
const statusEmployee = document.querySelector("#employeeStatus");
const btnStatus = document.querySelector(".btnModifyStatus");
const btnLogOut = document.querySelector(".btnLogOut");


//Events
btnSignUpElement.addEventListener("click", signNewEmployee);
btnStatus.addEventListener("click", modifyEmployeeStatus);
btnLogOut.addEventListener("click", logOutUser);


/**
 * @method signNewUserUp
 * @description preprocesses and sends new employee information to sign up
 * @param {} 
 * @returns {}
 */
function signNewEmployee() {
    let infoCorrect = validateNonEmptyField(nameElement.value, usernameElement.value, passwordElement.value, passConfirmedElement.value);
    if (infoCorrect) {
        const newEmployee = buildNewEmployee();
        const token = localStorage.getItem("TOKEN");
        newUserData(endpointNewEmployee, newEmployee, token)
            .then(response => {
                clearFormFields();
                console.log(response);
                swal("Employee register successfully!", "", "success");
            })
            .catch(error => { console.log(error); })
    }
}

/**
 * @method modifyEmployeeStatus
 * @description preprocesses and sends status employee info  
 * @param {} 
 * @returns {}
 */
function modifyEmployeeStatus() {
    if (inputEmployee.value && statusEmployee !== "--") {
        let status = "";
        (statusEmployee.value == 1) ? status = "active": status = "blocked";
        const dataEmployee = { username: inputEmployee.value, status: status };
        const token = localStorage.getItem("TOKEN");
        changeStatus(endpointChangeStatus, dataEmployee, token)
            .then(response => {
                swal("Employee status change successfully", "", "success");
                inputEmployee.value = "";
                statusEmployee.value = "--";
            })
            .catch(error => { console.log(error); })
    } else {
        swal("There's something missing ", "Please fill the fields to proceed", "error");
    }
}


/**
 * @method clearFormFields
 * @description Clears all fields
 * @param {} 
 * @returns {}
 */
const clearFormFields = () => {
    nameElement.value = ""
    usernameElement.value = ""
    passwordElement.value = ""
    passConfirmedElement.value = "";
}

/**
 * @method buildNewEmployee
 * @description Builds ans sends a new employee as an object
 * @param {} 
 * @returns {object}
 */
const buildNewEmployee = () => {
    return {
        name: nameElement.value,
        username: usernameElement.value,
        password: passwordElement.value
    };
}