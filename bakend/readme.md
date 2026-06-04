# Doctor Appointment Booking Website

This is a RESTful API for managing user accounts, doctor appointments, and profiles, built with Express.js and MongoDB. It includes secure endpoints for user authentication, appointment scheduling, profile management.

## Features

- **User Authentication**: Register and login with JWT-based authentication for secure access.
- **Profile Management**: Update or delete user profiles.
- **Doctor Appointment Booking**: Book, view, and cancel appointments with doctors.
- **Department Management**: Retrieve and add departments for various specialties.
- **Secure Access Control**: All protected routes require JWT tokens to ensure secure access to user and appointment information.

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine.
- **MongoDB**: MongoDB for storing user and appointment data.
- **Environment Variables**:
    - `MONGODB_URI`: MongoDB connection URI.
    - `JWT_SECRET`: Secret key for JWT token generation and verification.

## Dependencies

Install the following dependencies:
- `express`: Minimalist web framework for Node.js.
- `dotenv`: Loads environment variables from a `.env` file into `process.env`.
- `bcrypt`: Library for hashing passwords.
- `axios`: HTTP client for Node.js.
- `jsonwebtoken`: JWT implementation for secure token-based authentication.
- `cloudinary`: Media management and cloud storage solution.
- `mongoose`: Elegant MongoDB object modeling for Node.js.

## Project Structure

Config/
controllers/
middleware/
models/
routes/
server.js/


## Installation

1. **Clone the repository**:
   ```bash
   git https://github.com/soniya-malviy/CureConnectFullSatck.git
   cd bakend 
   
2. **Install the required dependencies**:
   ```bash
   npm install 
   
3. **Set up environment variables: Create a .env file in the root directory and add your environment variables as follows:**
   ```bash
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   
4. **Start the server:**
   ```bash
   npm start
   
API Endpoints:

1. Register user:

Endpoint : POST /api/admin/register
Request Body:
{
"name": "JohnDoe",
"email": "johndoe@example.com",
"password": "strongPassword123"
}
Response:
{
"success": true,
"message": "User created Successfully"
}


Request Body:
{
"name": "JohnDoe",
"email": "johndoe@1example.com"
}

Response:
{
"success": false,
"message": "Missing Details"
}

2. user Login

Endpoint : POST /api/admin/login


Request Body:
{
"name": "JohnDoe",
"email": "johndoe@example.com",
"password": "strongPassword123"
}
Response:
{
"success": true,
"message": "User created Successfully"
}


Request Body:
{
"email": "johndoe@example.com",
"password": "strongPassword123"
}

Response:
{
"success": true,
"token": "your.jwt.token"
}

Response Error:If incorrect information

{
"success": false,
"message": "Invalid credentials"
}


3. Get profile:

Endpoint : get /api/admin/get-profile


Request Header:

token:{your_jwt_token}


Response:
{
"success": true,
"userData": {
"_id": "6733a5da3d19cd11facb9680",
"name": "soniya",
"email": "soniyam@01gmail.com",
"image":"image_url"
"address": {
"line1": "",
"line2": ""
},
"gender": "Not Selected",
"dob": "Not Selected",
"phone": "0000000000",
"__v": 0
}
}

Response Error:
{
"success": false,
"message": "Not Authorized login again"
}

3. Update profile:

Endpoint: put /api/user/update-profile

Request header:

token:"your_jwt_token"

Request Body:

Details to update:

{
"name":"john deo",
"phone":"7225072883",
"gender":"male"

}

Response:
{
name: 'john deo',
phone: '7225072883',
gender: 'male',
userId: '6733a5da3d19cd11facb9680'
}


Response error:

{
"success": false,
"message": "Data Missing"
}

If token not provided

{
"success": false,
"message": "Not Authorized login again"
}

4. Delete user

Endpoint: delete api/user/delete-user

Request header:

token:"your_jwt_token"


Response:

{
"success": true,
"message": "User account has been deleted successfully"
}

Response error:

{
"success": false,
"message": "Not Authorized login again"
}


Frontend Setup


**Installation**
 
**Clone the repository**:
   ```bash
   git clone: https://github.com/yourusername/doctor-appointment-frontend.git
   ```
   
   
**Navigate into the frontend directory**:
   ```bash
   cd frontend
   ```

**Install the required dependencies**:
```bash
   npm install
```

**Start the development server**:
```bash
npm run dev
```












    

   
   

   

