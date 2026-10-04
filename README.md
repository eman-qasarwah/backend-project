# Phonebook Backend

A RESTful backend application for managing a phonebook. The project provides an API for creating, reading, updating, and deleting phonebook contacts, with data stored in MongoDB.

This project was developed as part of the **Full Stack Open** course by the University of Helsinki, focusing on backend development with Node.js, Express, MongoDB, and REST APIs.

## Features

* Get all phonebook contacts
* Get a single contact by ID
* Add a new contact
* Update an existing contact
* Delete a contact
* Validate contact data
* Store data persistently using MongoDB
* Handle invalid requests and unknown endpoints
* RESTful API structure
* Automated testing for the backend

## Technologies

* **Node.js**
* **Express**
* **MongoDB**
* **Mongoose**
* **JavaScript**
* **REST API**
* **Node.js Test Runner**
* **Supertest**

## API Endpoints

| Method | Endpoint           | Description                             |
| ------ | ------------------ | --------------------------------------- |
| GET    | `/api/persons`     | Get all contacts                        |
| GET    | `/api/persons/:id` | Get a single contact                    |
| POST   | `/api/persons`     | Add a new contact                       |
| PUT    | `/api/persons/:id` | Update a contact                        |
| DELETE | `/api/persons/:id` | Delete a contact                        |
| GET    | `/info`            | Display information about the phonebook |

### Example Request

To create a new contact:

```json
POST /api/persons

{
  "name": "John Doe",
  "number": "123-456-789"
}
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/eman-qasarwah/phonebook-backend.git
```

### 2. Navigate to the project directory

```bash
cd phonebook-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

### 5. Start the development server

```bash
npm run dev
```

The server will start on:

```text
http://localhost:3001
```

## Testing

The project includes automated tests for the API.

Run the tests with:

```bash
npm test
```

## Project Structure

```text
phonebook-backend/
├── controllers/
├── models/
├── utils/
├── tests/
├── app.js
├── index.js
├── package.json
├── .env
└── README.md
```

## What I Practiced

Through this project, I practiced:

* Building REST APIs with Express
* Structuring a Node.js backend application
* Working with MongoDB and Mongoose
* Implementing CRUD operations
* Request validation and error handling
* Middleware and logging
* Writing automated backend tests
* Using environment variables
* Working with Git and GitHub

## Course

This project is part of the **Full Stack Open** course by the **University of Helsinki**, which covers modern web application development with JavaScript, React, Node.js, Express, MongoDB, testing, and related technologies.
