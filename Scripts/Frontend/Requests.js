/**
 * @method newUserData
 * @description Send a request with new user info 
 * @param {string, object, string} 
 * @returns {Promise}
 */
export const newUserData = ((URL, data, token) => {
    return new Promise((resolve, reject) => {
        fetch(URL, {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })
            .then((response) => resolve(response))
            .catch((error) => reject(error))
    });
});

/**
 * @method changeStatus
 * @description Send a request to change a user status 
 * @param {string, object, string} 
 * @returns {Promise}
 */
export const changeStatus = ((URL, data, token) => {
    return new Promise((resolve, reject) => {
        fetch(URL, {
                method: "put",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })
            .then((response) => resolve(response))
            .catch((error) => reject(error))
    });
});

/**
 * @method validateIdentity
 * @description Send a request to validate identity 
 * @param {string, object} 
 * @returns {Promise}
 */
export const validateIdentity = ((URL, data) => {
    return new Promise((resolve, reject) => {
        fetch(URL, {
                method: "post",
                body: JSON.stringify(data),
                headers: { "content-type": "application/json" }
            })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});

/**
 * @method createNewProduct
 * @description Send a request to create a new product 
 * @param {string, object, string} 
 * @returns {Promise}
 */
export const createNewProduct = ((URL, data, token) => {
    return new Promise((resolve, reject) => {
        fetch(URL, {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })
            .then((response) => resolve(response))
            .catch((error) => reject(error))
    });
});

/**
 * @method removeProduct
 * @description Send a request to delete a product 
 * @param {string, object, string} 
 * @returns {Promise}
 */
export const removeProduct = ((URL, data, token) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${data}`, {
                method: "delete",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});

/**
 * @method findProduct
 * @description Send a request to find a product 
 * @param {string, object, string} 
 * @returns {Promise}
 */
export const findProduct = ((URL, data, token) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${data}`, {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});

/**
 * @method findAllProduct
 * @description Send a request to find all products 
 * @param {string, string} 
 * @returns {Promise}
 */
export const findAllProducts = ((URL, token) => {
    return new Promise((resolve, reject) => {
        fetch(URL, {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});

/**
 * @method allUsersData
 * @description Send a request to get all user data 
 * @param {string} 
 * @returns {Promise}
 */
export const allUsersData = ((URL) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}`)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});

/**
 * @method logOutUser
 * @description Removes the token key and redirects to log in page 
 * @param {string, string} 
 * @returns {Promise}
 */
export const logOutUser = () => {
    localStorage.removeItem("TOKEN");
    window.location.replace('http://127.0.0.1:5500/index.html');
}