# Athletiq Event Backend

![Jira](https://img.shields.io/badge/Jira-Project%20Link-blue?logo=jira&style=flat-square)  

> **Jira Link:** [Athletiq Jira Project](https://aymane-bisdaoune.atlassian.net/jira/software/projects/AEB/boards/9?atlOrigin=eyJpIjoiOTY5YmJlM2JmZGJkNGY0MzljZDIwM2EyMmNiYjJmZDIiLCJwIjoiaiJ9)

This project is the backend service for managing events and related operations in the Athletiq platform. It is built using **NestJS** and integrates with **MongoDB**.

## 🚀 Features

- **Events Management**:
  - **POST /events**: Create a new event.
  - **GET /events**: Retrieve all events.
  - **PUT /events/:id**: Update an event.
  - **DELETE /events/:id**: Delete an event.

- **Authentication**:
  - **POST /auth/signup**: Sign up a new user.
  - **POST /auth/login**: Log in a user.


## 🛠️ Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (for local development)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)
- [MongoDB](https://www.mongodb.com/) (if running without Docker)


### Technologies

- **NestJS**: A framework for building efficient, scalable Node.js server-side applications.
- **TypeScript**: A superset of JavaScript that adds static types to improve development experience.
- **MongoDB**: A NoSQL database used for storing event and user data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.
- **Docker**: Platform for developing, shipping, and running applications inside containers.


## 🏗️ Project Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repo/athletiq_event_backend.git
cd athletiq_event_backend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Application

```sh
npm run start:dev
```

## 🗂️ Architecture

The project follows a modular architecture using NestJS. Below is a high-level overview of the main modules and their responsibilities:

- **App Module**: The root module of the application.
- **Events Module**: Handles all operations related to event management.
- **Auth Module**: Manages user authentication and authorization.
- **Users Module**: Manages user data and operations.
- **Database Module**: Configures and provides database connections using Mongoose.

