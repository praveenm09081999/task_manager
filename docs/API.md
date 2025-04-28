# Task Manager API Documentation

## Base URL
`/api`

## Endpoints

### 1. Get All Tasks
`GET /tasks/getAll`

**Description:**  
Retrieve all tasks sorted by due date.

**Response:**
- Success: `200 OK`
- Error: `500 Internal Server Error`

**Response Body (Success):**
```json
[
  {
    "id": "number",
    "title": "string",
    "status": "string",
    "dueDate": "string"
  }
]
```

### 2. Create a Task
`GET /tasks/addTask`

**Description:**  
Create a new task with a unique ID.

**Response:**
- Success: `201 OK`
- ValidationError: `400 VALIDATION FAILED`
- Error: `500 Internal Server Error`

**Response Body (Success):**
```json
[
  {
    "id": "number",
  }
]
```

### 3. Update a Task
`PUT /tasks/updateTask`

**Description:**  
Update an existing Task.

**Resquest Body:**
```json
{
  "id": "number (required)",
  "title": "string (required)",
  "status": "string (required)",
  "dueDate": "string (required, ISO 8601 format)"
}
```

**Response:**
- Success: `200 OK`
- ValidationError: `400 VALIDATION FAILED`
- NotFound: `404 NOT FOUND`
- Error: `500 Internal Server Error`

**Response Body (Success):**
```json
[
  {
  "success": "boolean",
  "message": "string",
  "updatedId": "number"
  }
]
```

### 4. Delete a Task
`PUT /tasks/deleteTask`

**Description:**  
Delete an existing task.

**Resquest Body:**
```json
{
  "id": "number (required)",
}
```

**Response:**
- Success: `200 OK`
- ValidationError: `400 VALIDATION FAILED`
- NotFound: `404 NOT FOUND`
- Error: `500 Internal Server Error`

**Response Body (Success):**
```json
[
{
  "success": "boolean",
  "message": "string",
  "updatedId": "number"
}
]
```