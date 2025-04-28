# Task Manager

A Next.js application for managing tasks with full CRUD functionality.

## Features

- **Create tasks** - Add new tasks to your list  
- **Retrieve tasks** - View all your tasks  
- **Update tasks** - Modify task details  
- **Delete tasks** - Remove completed or unwanted tasks  
- **Server-side rendering** - Fast initial page loads  

## Tech Stack

- Next.js (with SSR)  
- SQLite database  
- RESTful API endpoints (Next.js)
- Unit Testing (Jest)

## Task Structure

Each task follows this format:

```typescript
interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  dueDate: string; // ISO format (YYYY-MM-DD)
}
```
## API Documentation
See docs/API.md for complete API documentation.

## Development
Running the App
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser.

## Testing
Before running tests:

- Change import/export to require/module.exports in getAll.js

- Then run tests:

```bash
npm run test
```
- Building for Production
```bash
npm run build
```
- Deploying
```bash
npm run start
```

## Notes
- The application uses Next.js API routes for backend functionality

- Both frontend and backend are served through Next.js with SSR

- SQLite database is used for persistent storage

### Thank you for checking out Task Manager! Happy testing!