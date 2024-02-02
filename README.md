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
  User Routes Documentation

User Routes Documentation
=========================

Overview
--------

The user routes handle operations related to user profiles, such as fetching user data, updating profiles, and deleting user accounts. Additionally, certain routes are restricted to authenticated users or administrators.

Routes
------

*   **GET /:userId**: Retrieve a specific user's profile.

Requires authentication token.

Returns the user's profile data.

*   **GET /**: Retrieve all users (only accessible to administrators).

Requires authentication token and admin privileges.

Returns a list of all user profiles.

*   **PUT /:userId**: Update a specific user's profile.

Requires authentication token.

Returns a response indicating success or failure.

*   **DELETE /:userId**: Delete a specific user.

Requires authentication token.

Returns a response indicating success or failure.

Middleware
----------

The following middleware functions are utilized to authenticate and authorize users accessing these routes:

*   **authenticateToken**: Validates the authentication token provided in the request header.
*   **verifyUser**: Verifies that the requesting user is the same as the user whose profile is being accessed or modified.
*   **verifyAdmin**: Verifies that the requesting user has administrative privileges.

Usage
-----

To use these routes in your Express application, ensure you have the necessary controller logic and middleware set up.

Controller Logic
----------------

Ensure you have appropriate controller logic implemented for handling user-related operations, such as fetching user data, updating profiles, and deleting accounts.

Hotel Routes Documentation
==========================

Overview
--------

The hotel routes provide endpoints for managing hotel data, including creating, retrieving, updating, and deleting hotels. Additionally, there are endpoints for retrieving hotel statistics and room details.

Routes
------

*   **POST /**: Create a new hotel.

Requires admin privileges.

*   **GET /**: Get all hotels.
*   **GET /:id**: Get a specific hotel by ID.
*   **GET /countByCity**: Get count of hotels by city.
*   **GET /countByType**: Get count of hotels by type.
*   **GET /room/:id**: Get rooms of a specific hotel by hotel ID.
*   **PUT /:id**: Update a specific hotel by ID.

Requires admin privileges.

*   **DELETE /:id**: Delete a specific hotel by ID.

Requires admin privileges.

Middleware
----------

The `verifyAdmin` middleware is used to ensure that only administrators have access to certain routes.

Controller Functions
--------------------

*   `createHotel`: Controller function to create a new hotel.
*   `getHotels`: Controller function to get all hotels.
*   `getHotel`: Controller function to get a specific hotel by ID.
*   `countByCity`: Controller function to get count of hotels by city.
*   `countByType`: Controller function to get count of hotels by type.
*   `getHotelRooms`: Controller function to get rooms of a specific hotel by hotel ID.
*   `updateHotel`: Controller function to update a specific hotel by ID.
*   `deleteHotel`: Controller function to delete a specific hotel by ID.

Usage
-----

Ensure you have the necessary controller logic and middleware set up to handle requests to these routes.

Room Routes Documentation
=========================

Overview
--------

The room routes provide endpoints for managing room data, including creating, retrieving, updating, and deleting rooms. Additionally, there's an endpoint for updating room availability.

Routes
------

*   **POST /:hotelid**: Create a new room for a specific hotel.

Requires admin privileges.

*   **GET /**: Get all rooms.
*   **GET /:id**: Get a specific room by ID.
*   **PUT /availability/:id**: Update availability of a specific room by ID.
*   **PUT /:id**: Update a specific room by ID.

Requires admin privileges.

*   **DELETE /:id/:hotelid**: Delete a specific room by ID and hotel ID.

Requires admin privileges.

Middleware
----------

The `verifyAdmin` middleware is used to ensure that only administrators have access to certain routes.

Controller Functions
--------------------

*   `createRoom`: Controller function to create a new room.
*   `getRooms`: Controller function to get all rooms.
*   `getRoom`: Controller function to get a specific room by ID.
*   `updateRoomAvailability`: Controller function to update availability of a specific room by ID.
*   `updateRoom`: Controller function to update a specific room by ID.
*   `deleteRoom`: Controller function to delete a specific room by ID and hotel ID.

Usage
-----

Ensure you have the necessary controller logic and middleware set up to handle requests to these routes.

Security
--------

Some routes require admin privileges for access. Ensure that proper authentication and authorization mechanisms are in place.

Error Handling
--------------

Implement error handling to deal with various scenarios such as invalid requests, database errors, or unauthorized access.

Feedback and Contributions
--------------------------

Feedback and contributions to improve these routes and documentation are welcome. Feel free to open issues or pull requests in the repository.

Error Handling
--------------

Error handling middleware is implemented to handle any errors that occur during the execution of the routes. If an error occurs, the server responds with an appropriate error message and status code.

Contributing
------------

Feel free to contribute to this project by submitting issues or pull requests.

License
-------

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
