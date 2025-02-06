# User System Management Project

This project is a **User System Management** application built with **Node.js** and **Express.js**. It implements **access tokens** and **refresh tokens** for authentication and authorization. The system includes user roles (Admin and User) and various endpoints for managing user data.

---

## Table of Contents

- [Features](#features)
- [Built With](#built-with)
- [Prerequisites](#prerequisites)
- [Installation and Usage](#installation-and-usage)
- [Environment Variables](#environment-variables)
- [API Endpoints and Postman Testing](#api-endpoints-and-postman-testing)
- [Contact](#contact)

---

## Features

- **Authentication**:
  - Access token with a 15-minute validity.
  - Refresh token with a 7-day validity.

- **Roles**:
  - User and Admin roles for access control.

- **User Operations**:
  - Register, login, logout, view profile, request password change, reset password, and update password.

- **Admin Operations**:
  - View all users, view a specific user, add a user, edit a user, and delete a user.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Built With

* ![Node.js](https://img.shields.io/badge/-Node.js-green)
* ![Express.js](https://img.shields.io/badge/-Express-lightgrey)
* ![MongoDB](https://img.shields.io/badge/-MongoDB-brightgreen)
* ![JWT](https://img.shields.io/badge/-JWT-orange)

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local or cloud instance)

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Installation and Usage

### Step 1: Clone the repository

```bash
git clone https://github.com/AmirrezaAhmadi/User-Management-System-with-Node-Express.git
cd User-Management-System-with-Node-Express
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Set up environment variables

1. Rename the `.env.example` file to `.env`:

```bash
mv .env.example .env
```

2. Open the `.env` file and set the following variables:

```bash
PORT=your_port_number
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### Step 4: Run the application

```bash
npm start
```

### Step 5: Access the application

Open your browser or API testing tool (e.g., Postman) and use the available routes.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Environment Variables

The `.env` file should contain the following:

```bash
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## API Endpoints and Postman Testing

### User Routes

1. **Register**
   - **POST** `/register`
   - Body:
     ```json
     {
       "name": "example",
       "email": "example@example.com",
       "password": "password123"
     }
     ```

2. **Login**
   - **POST** `/login`
   - Body:
     ```json
     {
       "email": "example@example.com",
       "password": "password123"
     }
     ```

3. **Logout**
   - **POST** `/logout`
   - Header: `Authorization: Bearer <access_token>`

4. **View Profile**
   - **GET** `/profile`
   - Header: `Authorization: Bearer <access_token>`

5. **Request Password Change**
   - **POST** `/request-password-change`
   - Body:
     ```json
     {
       "email": "example@example.com"
     }
     ```

6. **Reset Password**
   - **POST** `/reset-password`
   - Body:
     ```json
     {
       "token": "reset_token",
       "newPassword": "newpassword123"
     }
     ```

7. **Update Password**
   - **PUT** `/update-password`
   - Header: `Authorization: Bearer <access_token>`
   - Body:
     ```json
     {
       "currentPassword": "password123",
       "newPassword": "newpassword123"
     }
     ```

### Admin Routes

1. **View All Users**
   - **GET** `/admin/getUsers`
   - Header: `Authorization: Bearer <admin_access_token>`

2. **Get Single User**
   - **GET** `/admin/getUser/:id`
   - Header: `Authorization: Bearer <admin_access_token>`

3. **Add New User**
   - **POST** `/admin/addUser`
   - Header: `Authorization: Bearer <admin_access_token>`
   - Body:
     ```json
     {
       "name": "newuser",
       "email": "newuser@example.com",
       "password": "password123",
       "role": "User"
     }
     ```

4. **Edit User**
   - **PUT** `/admin/editUser/:id`
   - Header: `Authorization: Bearer <admin_access_token>`
   - Body:
     ```json
     {
       "name": "updateduser",
       "email": "updateduser@example.com"
     }
     ```

5. **Delete User**
   - **DELETE** `/admin/users/:id`
   - Header: `Authorization: Bearer <admin_access_token>`

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

---

## Contact

You can reach me through the following:

* Email: AmirrezaAhmadi.GH@Gmail.com
* Telegram: https://t.me/AmirrezaDevelop
* Instagram: https://www.instagram.com/codewithamirreza
* Project Link: https://github.com/AmirrezaAhmadi/Notepad-With-NodeJs.git

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

