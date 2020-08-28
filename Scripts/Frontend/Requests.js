export const newUserData = ((URL, data) => {
    return new Promise((resolve, reject) => {
        fetch(URL, {
                method: "post",
                body: JSON.stringify(data),
                headers: { "content-type": "application/json" }
            })
            .then((response) => resolve(response))
            .catch((error) => reject(error))
    });
});

export const allUsersData = ((URL) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}`)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});