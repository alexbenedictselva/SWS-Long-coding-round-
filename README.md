# Document Management System

A full-stack MERN application that allows users to upload and manage PDF documents with real-time notifications. The system supports single and bulk file uploads, upload progress tracking, document management, and a persistent notification center powered by Socket.IO.

---

# Features

## File Upload

* Upload single PDF files
* Upload multiple PDF files simultaneously
* Drag-and-drop file upload support
* Individual progress tracking for each file
* Upload status tracking:

  * Pending
  * Uploading
  * Complete
  * Failed

## Smart Bulk Uploads

* Normal upload flow for 3 or fewer files
* Background processing workflow for more than 3 files
* Bulk upload banner
* Collapsible upload progress details
* Real-time completion notifications

## Document Management

* Store uploaded PDF files
* Store file metadata in MongoDB
* View uploaded documents
* Download uploaded documents
* Display:

  * File Name
  * File Size
  * File Type
  * Upload Date
  * Upload Status

## Notification Center

* Persistent notification storage
* Notification history
* Unread notification badge
* Mark individual notifications as read
* Mark all notifications as read
* Notifications persist after page refresh

## Real-Time Notifications

* Socket.IO integration
* Instant notification delivery
* Real-time unread count updates
* Real-time notification panel updates
* Toast notifications
* Works across application pages

---

# Technologies Used

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Socket.IO Client
* React Hot Toast
* React Dropzone

## Backend

* Node.js
* Express.js
* Socket.IO
* Multer

## Database

* MongoDB Atlas
* Mongoose

## Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

# Project Structure

## Backend

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   ├── app.js
│   └── server.js
```

## Frontend

```text
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
```

---

# Project Setup Instructions

## Clone the Repository

```bash
git clone <repository-url>
cd project
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend server:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# Run / Build Commands

## Backend

Start development server:

```bash
npm run dev
```

Start production server:

```bash
npm start
```

---

## Frontend

Start development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# API Endpoints

## File APIs

### Upload Files

```http
POST /api/files/upload
```

### Get All Files

```http
GET /api/files
```

---

## Notification APIs

### Get Notifications

```http
GET /api/notifications
```

### Mark Notification as Read

```http
PATCH /api/notifications/:id/read
```

### Mark All Notifications as Read

```http
PATCH /api/notifications/read-all
```

---

# Database Schema

## File Collection

```js
{
  fileName: String,
  fileSize: Number,
  fileType: String,
  fileUrl: String,
  uploadStatus: String,
  createdAt: Date
}
```

## Notification Collection

```js
{
  message: String,
  type: String,
  read: Boolean,
  createdAt: Date
}
```

---

# Real-Time Notification Flow

1. User uploads files.
2. Backend processes files.
3. Notification is saved in MongoDB.
4. Socket.IO emits a notification event.
5. Frontend receives the event instantly.
6. Notification badge updates.
7. Toast notification appears.
8. Notification panel updates automatically.

---

# Assumptions & Notes

* Only PDF files are allowed for upload.
* File uploads are handled using Multer.
* Uploaded files are stored on the server.
* Notifications are stored in MongoDB.
* Real-time notifications are implemented using Socket.IO.
* Uploading more than 3 files triggers the bulk upload workflow.
* Notification history persists across page refreshes.
* Notifications are fetched from MongoDB and not stored in localStorage.
* Socket connection is maintained globally to ensure notifications are received across pages.
* Local file storage is used for development and assessment purposes.

---

# Future Improvements

* AWS S3 integration
* Cloudinary integration
* User authentication
* Role-based access control
* Search and filtering
* Pagination
* Unit testing
* File categorization

---

# Deployment

## Frontend

Hosted on Vercel.

## Backend

Hosted on Render.

## Database

Hosted on MongoDB Atlas.

---

# Author

Alex

Built as part of a Full Stack Development Assessment Project.
