# Athletiq Event Back

![Jira](https://img.shields.io/badge/Jira-Project%20Link-blue?logo=jira&style=flat-square)  

> **Jira Link:** [Athletiq Jira Project](https://aymane-bisdaoune.atlassian.net/jira/software/projects/AEB/boards/9?atlOrigin=eyJpIjoiOTY5YmJlM2JmZGJkNGY0MzljZDIwM2EyMmNiYjJmZDIiLCJwIjoiaiJ9)

This project is the backend service for managing events and related operations in the Athletiq platform. It is built using **NestJS** and integrates with **MongoDB**.

---

## 🚀 Features

- Event management (Create, Update, Delete)
- Image upload functionality
- MongoDB integration
- Fully containerized for deployment

---

## 🛠️ Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (for local development)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)
- [MongoDB](https://www.mongodb.com/) (if running without Docker)

---

## 🏗️ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-repo/athletiq-event-back.git
cd athletiq-event-back

Install dependencies:

bash
Copier le code
npm install
Set up your environment variables in a .env file:

env
Copier le code
PORT=3000
DATABASE_URL=mongodb://<username>:<password>@localhost:27017/athletiq_events
JWT_SECRET=your-secret-key
Run the application:

bash
Copier le code
npm run start:dev
Usage
Once the application is running, access the following routes:

Events:

POST /events: Create a new event.
GET /events: Retrieve all events.
PUT /events/:id: Update an event.
DELETE /events/:id: Delete an event.
Authentication:

POST /auth/signup: Sign up a new user.
POST /auth/login: Log in a user.
Environment Variables
The application requires the following environment variables:

Key	Description	Example
PORT	Port for the application	3000
DATABASE_URL	MongoDB connection string	mongodb://localhost:27017/db_name
JWT_SECRET	Secret key for JWT generation	your-secret-key
Docker Instructions
To build and run the application in Docker:

Build the Docker image:

bash
Copier le code
docker build -t athletiq-event-back .
Run the container:

bash
Copier le code
docker run -d -p 3000:3000 --env-file .env athletiq-event-back

License
This project is licensed under the MIT License. See the LICENSE file for details.

vbnet
Copier le code
