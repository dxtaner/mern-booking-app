Booking-App
===========================

Prerequisites
-------------

Before running the server, make sure you have the following installed:

*   Node.js
*   MongoDB
*   npm (Node Package Manager) or yarn

Installation
------------

1.  Clone this repository to your local machine:
`git clone github.com/dxtaner/mern-booking-app.  Navigate into the project directory:
`cd express-mongodb-boilerplate`5.  Install dependencies:
`npm install` or `yarn install`

Configuration
-------------

1.  Create a `.env` file in the root directory of the project.
2.  Add the following environment variables to `.env`:

PORT=5000
MONGODB\_URI=<your-mongodb-uri>

4.  Replace `<your-mongodb-uri>` with the connection URI for your MongoDB database.

Running the Server
------------------

To start the server, run:

npm start

or

yarn start

The server will start running at `http://localhost:5000` (or the port specified in your `.env` file).

Usage
-----

### Testing Error Handling

To test the error handling, you can visit `http://localhost:5000/test-error`, which will trigger a test error response.

### Authentication Routes

*   `/auth/signup`: Register a new user.
*   `/auth/login`: Login with existing user credentials.

### User Routes

*   `/user/profile`: Get current user's profile.
*   `/user/update`: Update current user's profile.

### Hotel Routes

*   `/hotel/create`: Create a new hotel.
*   `/hotel/:id`: Get details of a specific hotel.
*   `/hotel/update/:id`: Update details of a specific hotel.
*   `/hotel/delete/:id`: Delete a specific hotel.

### Room Routes

*   `/room/create`: Create a new room for a hotel.
*   `/room/:id`: Get details of a specific room.
*   `/room/update/:id`: Update details of a specific room.
*   `/room/delete/:id`: Delete a specific room.

  Auth Routes Documentation

Auth Routes Documentation
=========================

Overview
--------

The authentication routes handle user registration and login processes.

Routes
------

*   **POST /register**: Register a new user.

Accepts JSON payload containing user information.

Example:

    {
      "username": "example_user",
      "password": "example_password"
    }

*   **POST /login**: Log in an existing user.

Accepts JSON payload containing user credentials.

Example:

    {
      "username": "example_user",
      "password": "example_password"
    }

Usage
-----

To use these routes in your Express application, ensure you have properly set up the controller logic and middleware for authentication.

    // Import necessary modules and controllers
    const express = require("express");
    const router = express.Router();
    const authController = require("../controllers/authController.js");
    
    // Define routes
    router.post("/register", authController.registerUser);
    router.post("/login", authController.loginUser);
    
    module.exports = router;
    

Controller Logic
----------------

Ensure you have appropriate controller logic implemented for registering and logging in users. This logic should interact with your database or authentication service.

    // controllers/authController.js
    
    // Import necessary modules
    const User = require("../models/User");
    
    // Controller function for registering a new user
    exports.registerUser = async (req, res) => {
      // Implement registration logic here
    };
    
    // Controller function for logging in an existing user
    exports.loginUser = async (req, res) => {
      // Implement login logic here
    };
    

Error Handling
--------------

Error handling middleware is implemented to handle any errors that occur during the execution of the routes. If an error occurs, the server responds with an appropriate error message and status code.

Contributing
------------

Feel free to contribute to this project by submitting issues or pull requests.

License
-------

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
