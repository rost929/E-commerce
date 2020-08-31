Index.html : Is the root project 

HTML folder : Contains the other views of the project
Scripts folder :
    Backend : .js files related to the controller and the project model
        - App.js : Entry point file to run the backend, intialize middlewares , connection server and make some imports 
        - Admin-controller.js : Contains all the logic of the admin user including API Methods, DB Queries and validations 
        - Client-controller.js : Contains all the logic of the client user including API Methods, DB Queries and validations
        - Employee-controller.js : Contains all the logic of the client user including API Methods, DB Queries and validations
        - Utils.js : Contains common functions as sha256 to hash passwords
        - BD.js : Conatains methods related to database connection
    Frontend : Contains .js files related to views control   
        - Login.js : Contains methods related to user authentication
        - Handler-admin.js : Contains methods related to admin functions
        - Handler-client.js : Cotnains methods related to client functions
        - Handler-product.js : Contains methods related to product management for employees
        - Create-Product.js : Contains methods related to product creation
        - Sign-up-client.js : Contains methods related to new user registration
        - Endpoints.js : Contains the endpoints used to the project
        - Requests.js : Contains methods related to API Request
        - Mark-up.js : Contains methods related to cards creation
        - Validations.js : Contains common validations for inputs

Styles folder : Contains the scss files for views

Dependencies used: 

        "body-parser": "^1.19.0",
        "cors": "^2.8.5",
        "express": "^4.17.1",
        "jsonwebtoken": "^8.5.1",
        "mysql": "^2.18.1",
        "sweetalert": "^2.1.2"
        "nodemon": "^2.0.4"




