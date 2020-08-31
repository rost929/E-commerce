//HTML Element where cards results are going to be wrotten
const containerCards = document.querySelector(".boxProductFound");

/**
 * @method createProductCards
 * @description Creates the cards from each product found on the API
 * @param {array} 
 * @returns {}
 */
export const createProductCards = (products) => {
    let arrayProducts = products;
    console.log(arrayProducts);
    const cards = arrayProducts.map((product, index) => cardMarkup(product.name, product.description, product.basePrice, product.taxRate, product.productStatus, product.inventoryQuantity));
    containerCards.innerHTML = cards.join("\n");
};

/**
 * @method createProductCardsClients
 * @description Creates the cards from each product found on the API for clients
 * @param {array} 
 * @returns {}
 */

export const createProductCardsClients = (products) => {
    let arrayProducts = products;
    console.log(arrayProducts);
    const cards = arrayProducts.map((product, index) => cardMarkupClient(product.name, product.description, product.basePrice, product.taxRate, product.productStatus, product.inventoryQuantity, index));
    containerCards.innerHTML = cards.join("\n");
    const arrayAddButtons = arrayProducts.map((el, index) => { return document.querySelector('#btnAdd' + index) });
    console.log(arrayAddButtons);
    assignAddEvent(arrayAddButtons, arrayProducts);
};
/**
 * @method cardMarkup
 * @description Write the card product  
 * @param {string, string, integer, integer, string, integer} 
 * @returns {string}
 */

export const cardMarkup = (name, description, basePrice, taxRate, productStatus, inventory) => {
    return (` <div class="cardProduct">
    <H3 class="nameProduct">${name} </H3>
    <div class="boxDescription">
        <p class="descriptionProduct">${description}</p>
    </div>
    <div class="detailProduct">
        <h3 class="basePrice">Base Price : USD ${basePrice}</h3>
        <h3 class="taxRate">Tax Rate : ${taxRate} </h3>
        <h3 class="productStatus">ProductStatus : ${productStatus}</h3>
        <h3 class="inventory">Inventory Quantity : ${inventory} units</h3>
    </div>
</div> `);
};
/**
 * @method cardMarkupClient
 * @description Write the card product client  
 * @param {string, string, integer, integer, string, integer , integer} 
 * @returns {String}
 */
export const cardMarkupClient = (name, description, basePrice, taxRate, productStatus, inventory, index) => {
    return (` <div class="cardProduct">
    <H3 class="nameProduct">${name} </H3>
    <div class="boxDescription">
        <p class="descriptionProduct">${description}</p>
    </div>
    <div class="detailProduct">
        <h3 class="basePrice">Base Price : USD ${basePrice}</h3>
        <h3 class="taxRate">Tax Rate : ${taxRate} </h3>
        <h3 class="productStatus">ProductStatus : ${productStatus}</h3>
        <h3 class="inventory">Inventory Quantity : ${inventory} units</h3>
        <button class="btnAddItem" id="btnAdd${index}"> Add Item </button>
    </div>
</div> `);
};

/**
 * @method assignAddEvent
 * @description Creates events for add item button  
 * @param {array, array} 
 * @returns {}
 */
const assignAddEvent = (arrayButtons, arrayProducts) => {
    arrayButtons.forEach((element, index) => {
        element.addEventListener("click", function() {
            addProductInfo(arrayProducts[index]);
        })
    });
}

/**
 * @method addProductInfo
 * @description send product info to local storage  
 * @param {object} 
 * @returns {}
 */
const addProductInfo = (productInfo) => {
    let cartItems = localStorage.getItem("ITEMS")
    if (cartItems == null) {
        localStorage.setItem("ITEMS", JSON.stringify(productInfo));
    } else {
        cartItems += productInfo;
        localStorage.setItem("ITEMS", JSON.stringify(cartItems))
    }
    let results = localStorage.getItem("ITEMS");
    console.log(JSON.parse(results));
}