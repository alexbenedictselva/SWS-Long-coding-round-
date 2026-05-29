# Document Management System

A full-stack Document Management System built using the MERN stack that supports PDF uploads, real-time upload notifications, bulk upload handling, and a persistent notification center.

---

## Features

### File Upload

* Upload single PDF files
* Upload multiple PDF files simultaneously
* Drag and drop support
* Individual upload progress tracking
* Upload status tracking

  * Pending
  * Uploading
  * Complete
  * Failed

### Document Management

* Store uploaded PDF files on the server
* Store file metadata in MongoDB
* View uploaded documents
* Download uploaded documents
* Display:

  * File Name
  * File Size
  * File Type
  * Upload Date
  * Upload Status

### Smart Bulk Uploads

* Normal upload flow for 3 or fewer files
* Background processing UI for more than 3 files
* Collapsible upload details panel
* Real-time completion updates

### Notification Center

* Persistent notification storage
* Notification history
* Unread notification badge
* Mark notification as read
* Mark all notifications as read
* Notifications persist after page refresh

### Real-Time Notifications

* Socket.IO integration
* Instant notification delivery
* Real-time notification badge updates
* Real-time toast messages
* Works across application pages

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Socket.IO Client
* React Hot Toast

### Backend

* Node.js
* Express.js
* Socket.IO
* Multer

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Architecture

```text
Frontend (React)
        │
        ▼
Backend API (Express)
        │
        ├──────────► MongoDB Atlas
        │
        └──────────► Socket.IO
```

---

## Folder Structure

### Backend

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

### Frontend

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

## Database Schema

### File Collection

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

### Notification Collection

```js
{
  message: String,
  type: String,
  read: Boolean,
  createdAt: Date
}
```

---

## API Endpoints

### File APIs

| Method | Endpoint          | Description   |
| ------ | ----------------- | ------------- |
| POST   | /api/files/upload | Upload files  |
| GET    | /api/files        | Get all files |

### Notification APIs

| Method | Endpoint                    | Description                    |
| ------ | --------------------------- | ------------------------------ |
| GET    | /api/notifications          | Get notifications              |
| PATCH  | /api/notifications/:id/read | Mark notification as read      |
| PATCH  | /api/notifications/read-all | Mark all notifications as read |

---

## Real-Time Notification Flow

1. User uploads files.
2. Backend processes files.
3. Notification is saved in MongoDB.
4. Socket.IO emits a notification event.
5. Frontend receives the event instantly.
6. Notification bell updates.
7. Toast notification appears.
8. Notification panel updates automatically.

---

## Local Setup

### Clone Repository

```bash
git clone <repository-url>
cd project
```

### Backend Setup

```bash
cd backend

npm install
```

Create:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install
```

Create:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

---

## Deployment

### Frontend

Deployed on Vercel.

### Backend

Deployed on Render.

### Database

Hosted on MongoDB Atlas.

---

## Future Improvements

* AWS S3 integration
* Cloudinary file storage
* User authentication
* Role-based access control
* Search and filtering
* Pagination
* Unit and integration tests

---

## Author

Alex

Built as part of a Full Stack Development assessment project.
