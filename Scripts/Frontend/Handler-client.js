import { findAllProducts, logOutUser } from "./Requests.js";
import { endpointFindAllProducts } from "./Endpoints.js";
import { createProductCardsClients } from "./Markup/Mark-up.js";

//HTML Elements
const btnShowAllPRoducts = document.querySelector(".btnShowAllProducts");
const btnLogOut = document.querySelector(".btnLogOut");

//Events
btnShowAllPRoducts.addEventListener("click", getAllProducts);
btnLogOut.addEventListener("click", logOutUser);

/**
 * @method signNegetAllProductswUserUp
 * @description Show all the products available
 * @param {} 
 * @returns {}
 */
function getAllProducts() {
    let token = localStorage.getItem("TOKEN");
    findAllProducts(endpointFindAllProducts, token)
        .then(response => {
            //console.log(response.results);
            swal("Finding successful", "", "success");
            createProductCardsClients(response.results);
        }).catch(error => {
            console.log(error);
        })
}