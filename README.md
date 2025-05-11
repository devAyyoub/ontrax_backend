# OnTrax Backend

OnTrax is a RESTful API backend system for project and task management built with Express.js, MongoDB, and TypeScript.

## Purpose

OnTrax enables users to manage projects and tasks within a structured system, providing the following core functionalities:

- Creating, retrieving, updating, and deleting projects  
- Managing tasks within projects with different status workflows  
- Validating incoming requests through middleware  
- Storing data persistently in MongoDB

## System Architecture

OnTrax follows a layered architecture pattern with clear separation of concerns:

- **API Layer**: Handles HTTP requests and routes  
- **Middleware Layer**: Validates input and enforces business rules  
- **Controller Layer**: Contains business logic  
- **Data Layer**: Manages data persistence using Mongoose models

## Technologies Used

- **Express.js**: Web framework for routing and HTTP handling  
- **MongoDB**: NoSQL database for data persistence  
- **Mongoose**: ODM library for MongoDB interaction  
- **TypeScript**: Typed JavaScript for improved development  
- **Express Validator**: Request validation middleware  
- **dotenv**: Environment variable management

## Data Models

The system has two primary data entities with a parent-child relationship:

### Project Model

- `projectName` (String, required)  
- `clientName` (String, required)  
- `description` (String, required)  
- `tasks` (Array of Task ObjectIds)  
- `timestamps` (`createdAt`, `updatedAt`)  

### Task Model

- `name` (String, required)  
- `description` (String, required)  
- `project` (ObjectId reference to Project)  
- `status` (Enum: `pending`, `onHold`, `inProgress`, `under_review`, `completed`)  
- `timestamps` (`createdAt`, `updatedAt`)  

## API Endpoints

### Project Endpoints

```http
POST   /api/projects               # Create a new project
GET    /api/projects               # Retrieve all projects
GET    /api/projects/:id          # Retrieve a single project
PUT    /api/projects/:id          # Update a project
DELETE /api/projects/:id          # Delete a project
```

### Task Endpoints

```http
POST   /api/projects/:projectId/tasks                 # Create a new task in a project
GET    /api/projects/:projectId/tasks                 # Get all tasks in a project
GET    /api/projects/:projectId/tasks/:taskId         # Get a specific task
PUT    /api/projects/:projectId/tasks/:taskId         # Update a task
DELETE /api/projects/:projectId/tasks/:taskId         # Delete a task
POST   /api/projects/:projectId/tasks/:taskId/status  # Update task status
```

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/devAyyoub/ontrax_backend.git
cd ontrax_backend

# 2. Install dependencies
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

4. Start the development server:

```bash
npm run dev
```

## Usage

Once the server is running, you can interact with the API using tools like Postman or curl. The API accepts and returns JSON data.

### Example request to create a project:

```http
POST /api/projects
Content-Type: application/json
```

```json
{
  "projectName": "Website Redesign",
  "clientName": "Acme Corp",
  "description": "Complete redesign of company website"
}
```
