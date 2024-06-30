# Project Overview: Lab Management System
## Technologies Used:
1. Backend: Node.js
2. Database: SQLite
3. View Rendering: EJS (Embedded JavaScript)
## Project Structure and Components:
Setup and Configuration


#### Install necessary packages:
1. express: For building the web server.
2. sqlite3: SQLite driver for Node.js.
3. ejs: Embedded JavaScript templates for rendering views.
4. express-session and connect-sqlite3: For managing sessions with SQLite storage.
Database Setup

Use SQLite as the database. SQLite is file-based and doesn't require a separate server process.
Create a database file (data.db) and define tables for:
Users (for professors, assistants, and students).
Labs (for storing lab details like schedule, students enrolled, etc.).
Grades (for storing grades of students).
Viva (for scheduling viva exams).
Backend Development

#### Node server
Routes and Controllers: Implement routes and corresponding controller functions for CRUD operations on entities such as labs, grades, viva scheduling, etc.
Middleware: Use middleware for session management, error handling, authentication (if needed), and serving static files (like CSS, client-side JavaScript).
Views Using EJS

#### EJS templates
Example views might include:
Dashboard for professors/assistants/students.
Forms for scheduling viva exams, submitting grades.
List views for displaying labs, grades, etc.
Authentication (Optional)



### Validate user inputs and handle errors gracefully.
Test the application for edge cases such as concurrent viva scheduling or grade submission.
Deployment

### Deploy the Node.js application on platforms like Heroku, using SQLite as a file-based database.
Ensure environment variables are set for sensitive data (e.g., database file path, session secrets).
