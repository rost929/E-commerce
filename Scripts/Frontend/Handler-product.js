import { endpointFindProduct, endpointFindAllProducts, endpointDeleteProduct } from "./Endpoints.js";
import { findProduct, findAllProducts, removeProduct } from "./Requests.js";
import { createProductCards } from "./Markup/Mark-up.js";

//HTML Elements
const inputFindProduct = document.querySelector("#findProduct");
const btnFindProduct = document.querySelector(".btnFindProduct");
const btnFindAllProducts = document.querySelector(".btnAllProduct");

const btnDeleteProduct = document.querySelector(".btnDeleteProduct");
const inputDeleteProduct = document.querySelector("#deleteProduct");

//Events

btnFindProduct.addEventListener("click", getProduct);
btnFindAllProducts.addEventListener("click", getAllProducts);
btnDeleteProduct.addEventListener("click", deleteProduct);


/**
 * @method getProduct
 * @description Get a product by name
 * @param {} 
 * @returns {}
 */
function getProduct() {
    if (inputFindProduct.value) {
        let token = localStorage.getItem("TOKEN");
        findProduct(endpointFindProduct, inputFindProduct.value, token)
            .then(response => {
                console.log(response);
                createProductCards(response.results);
                swal("Finding successful", response.message, "success");
                inputFindProduct.value = "";
            }).catch(error => {
                console.log(error);
            })
    } else {
        swal("You are not enter a product yet", "Please fill the input to find the product", "warning");
    }
}


/**
 * @method getAllProducts
 * @description Get all products 
 * @param {} 
 * @returns {}
 */
function getAllProducts() {
    let token = localStorage.getItem("TOKEN");
    findAllProducts(endpointFindAllProducts, token)
        .then(response => {
            //console.log(response.results);
            swal("Finding successful", "", "success");
            createProductCards(response.results);
        }).catch(error => {
            console.log(error);
        })
}

/**
 * @method deleteProduct
 * @description delete a product by name 
 * @param {} 
 * @returns {}
 */
function deleteProduct() {
    if (inputDeleteProduct.value) {
        let token = localStorage.getItem("TOKEN");
        removeProduct(endpointDeleteProduct, inputDeleteProduct.value, token)
            .then(response => {
                alert(response.message);
                console.log(response);
                inputDeleteProduct.value = "";
            }).catch(error => {
                console.log(error);
            })
    } else {
        swal("You are not enter a product yet", "Please fill the input to delete the product", "warning");
    }
}