# Job Search and Recruitments (MERN Stack)

## Project Overview (Web Team 15)

This project is a comprehensive job portal web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It connects job seekers and recruiters efficiently, allowing users to browse job listings, apply for jobs, and manage recruitment processes seamlessly.

---

## Team Members

* Abhijit Kashyap (Roll No: 220003001)
* Inaamurrahaman Ansari (Roll No: 220003009)
* Anshul Singh Jaiswal (Roll No: 220003010)
* Anshul Vijaywargiya (Roll No: 220003011)

---

## Features

* **User Authentication:** Secure login for both job seekers and recruiters using JWT.
* **Job Listings:** Recruiters can post jobs; job seekers can browse and apply.
* **Application Management:** Job seekers manage applications; recruiters view and filter candidates.
* **Real-Time Chat:** WebSocket powered chat between job seekers and recruiters.
* **File Uploads:** Upload resumes, cover letters with Multer.
* **Image Storage:** Cloudinary integration for profile images and company logos.
* **Filtering:** Search jobs by role, location, employment type.
* **Responsive Design:** Works smoothly on all screen sizes.
* **Session Management:** Robust backend with Express.js and MongoDB for data persistence.

---

## Tech Stack

| Layer          | Technology          |
| -------------- | ------------------- |
| Frontend       | React.js, CSS       |
| Backend        | Node.js, Express.js |
| Database       | MongoDB Atlas       |
| Authentication | JWT, Bcrypt         |
| File Uploads   | Multer              |
| Image Storage  | Cloudinary          |
| Real-time Comm | WebSockets          |

---

## Getting Started

### Prerequisites

* Node.js (v22.2.0 or above recommended)
* MongoDB Atlas account (or local MongoDB server)
* Cloudinary account (for image storage)

---

### Installation

```bash
# Clone the repository
git clone https://github.com/deep-yad/JOB_Search_and_Recruitments_IITISOC2024.git

# Go into the backend directory
cd JOB_Search_and_Recruitments_IITISOC2024/server
npm install

# Go into the client directory (frontend)
cd ../client
npm install
```

---

### Configuration

Create a `.env` file in the **server** folder with the following variables:

```
PORT=your_port_here
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
```

---

### Running the App Locally

1. Start the backend server:

```bash
cd server
npm start
```

2. Start the frontend React app:

```bash
cd ../client
npm start
```

3. Open your browser at [http://localhost:3000](http://localhost:3000)

---

## Project Highlights

* Real-time messaging between recruiters and candidates via WebSocket.
* Secure JWT-based authentication for different user roles.
* Robust job posting, searching, and filtering system.
* Resume and cover letter uploads using Multer.
* Profile management for job seekers with skills, bio, and preferences.
* Responsive, animated React frontend for smooth user experience.

---

## Possible Improvements

* Enhance chat with media sharing and message history.
* Optimize WebSocket to support more concurrent users.
* Add file format and size validation for uploads.
* Implement better role-based access control.
* Improve frontend code structure and scalability.

---

## Authors

* [Abhijit Kashyap](https://github.com/Abhijitkashyap97)
* [Inaamurrahaman Ansari](https://github.com/ANSARI-INAAMURRAHAMAN)
* [Anshul Singh Jaiswal](https://github.com/AnshulSinghJaiswal)
* [Anshul Vijaywargiya](https://github.com/AnshulVijaywargiya)

---

## License

[ISC License](https://opensource.org/license/isc-license-txt/)

