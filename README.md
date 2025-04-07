# 📝 To-Do List App – Fullstack Technical Exercise

This is a fullstack to-do list application built as part of a technical exercise.  
It allows users to create, read, and update tasks ("duties") via a web interface, with a PostgreSQL-powered backend API.
[Design document](https://docs.google.com/document/d/1ssYkYtgYd72OzHAKOSPbM5EbvcMeEdAmzca-nm3hDes/edit?usp=sharing)

## 🚀 Getting Started

These instructions will help you set up the project locally using Docker and Docker Compose.

### 1. Create a .env File
Use the provided .env.example as a base:

    cp .env.example .env

The default values in .env.example will work with Docker without needing to modify anything.

### 2. Run the Project
Use Docker Compose to build and run all services:

    docker-compose up --build

This will:

* Launch the PostgreSQL database with preconfigured credentials

* Start the backend server on port 4000

* Start the frontend React app on port 3000

You can now visit the frontend at:
➡️ http://localhost:3000

### 3. Run Tests
To run backend tests (unit + integration):

    cd backend
    npm install
    npm run test

    >ℹ️ The backend tests expect a running PostgreSQL instance with the same credentials as in .env.

## 📂 Project Structure (simplified)
    .
    ├── backend/               # Express API with PostgreSQL
    │   ├── src/
    │   ├── test/
    │   ├── Dockerfile
    ├── frontend/              # React client
    │   ├── src/
    │   ├── public/
    │   ├── Dockerfile
    ├── .env.example           # Example configuration
    ├── docker-compose.yml     # Project orchestration
    └── README.md              # You are here :)
## ✅ Features (So Far)
* ✅ Create a new duty

* ✅ List all duties

* ✅ Update existing duties

* ✅ Optional: Delete a duty
* ✅ Mark as completed

## 📸 Frontend Screenshots
![image](https://github.com/user-attachments/assets/998f548f-3724-41fd-b3da-f98dcc46f9ae)

![image](https://github.com/user-attachments/assets/e158d020-6690-49c2-a230-d28357103176)

![image](https://github.com/user-attachments/assets/c2679795-ee22-4859-9519-146ce6bdc0ae)

![image](https://github.com/user-attachments/assets/05269658-3d91-40ff-8eef-214aa1cc8d70)

![image](https://github.com/user-attachments/assets/49728650-f9dc-453e-b753-dca4397dec93)
