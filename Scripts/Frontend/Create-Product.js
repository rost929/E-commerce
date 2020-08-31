import { endpointNewProduct } from "./Endpoints.js";
import { createNewProduct, logOutUser } from "./Requests.js";

// HTML Elements 
const nameProduct = document.querySelector("#nameProduct");
const description = document.querySelector("#descriptionProduct");
const basePrice = document.querySelector("#basePrice");
const taxRate = document.querySelector("#taxtRate");
const status = document.querySelector("#productStatus");
const inventoryQuantity = document.querySelector("#invQuantity");
const btnSubmit = document.querySelector(".btnCreateProduct");
const btnLogOut = document.querySelector(".btnLogOut");

// Events
btnSubmit.addEventListener("click", prepareNewProduct);
btnLogOut.addEventListener("click", logOutUser);


/**
 * @method prepareNewProduct
 * @description preprocesses and sends new user information to sign up
 * @param {} 
 * @returns {}
 */
function prepareNewProduct() {
    let infoCorrect = validateNonEmptyField();
    if (infoCorrect) {
        const newProduct = buildNewProduct();
        const token = localStorage.getItem("TOKEN");
        createNewProduct(endpointNewProduct, newProduct, token)
            .then(response => {
                clearFormFields();
            })
            .catch(error => { console.log(error); })
    }
}

/**
 * @method validateNonEmptyField
 * @description  Validates if exists empty fields or not
 * @param {} 
 * @returns boolean
 */
const validateNonEmptyField = () => {
    let infoValidated = false;
    if (nameProduct.value && description.value && basePrice.value && taxRate.value && status.value !== "--" && inventoryQuantity.value) {
        infoValidated = true;
        return infoValidated;
    }
    swal("There are empty fields", "please fill the form completely", "error");
    return infoValidated;
}

/**
 * @method buildNewProduct
 * @description  Builds and returns a new product as n object
 * @param {} 
 * @returns {object}
 */
const buildNewProduct = () => {
    let statusValue = "";
    (status.value == 1) ? statusValue = "Publicado": statusValue = "Borrador";
    return {
        name: nameProduct.value,
        description: description.value,
        basePrice: basePrice.value,
        taxRate: taxRate.value,
        productStatus: statusValue,
        inventoryQuantity: inventoryQuantity.value
    }

}

/**
 * @method clearFormFields
 * @description Clears all the flieds and sends an alert
 * @param {} 
 * @returns {}
 */
const clearFormFields = () => {
    nameProduct.value = "";
    description.value = ""
    basePrice.value = ""
    taxRate.value = ""
    status.value = "--"
    inventoryQuantity.value = ""

    swal("Product Register successfully", "", "success");
}