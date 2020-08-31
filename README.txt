Index.html is the root project 

HTML folder : Contains the other views of the project
Scripts folder :
    Backend : .js files related to the controller and the project model
        - App.js : Entry point file to run the backend, intialize middlewares , connection server and make some imports 
        - Admin-controller.js : Contains all the logic of the admin user including API Methods, DB Queries and validations 
        - Client-controller.js : Contains all the logic of the client user including API Methods, DB Queries and validations
        - Employee-controller.js : Contains all the logic of the client user including API Methods, DB Queries and validations
        - Utils.js : Contains common functions as sha256 to hash passwords
        - BD.js : Conatains methods related to database connection
    Front : Contains .js files  
        - Login.js : Contains methods related to user authentication
        - 
        - Endpoints.js : Contains the endpoints used to the project
        - Requests.js : Contains methods related to API Request
        - Mark-up.js : Contains methods related to cards creation
        - Validations.js : Contains common validations for inputs

