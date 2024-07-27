# Job Search and Recruitments

## Project Overview

The Job Search and Recruitments project aims to develop a web application that facilitates job searches and recruitment processes, providing a platform for job seekers and recruiters to connect efficiently.

## Team Members

1. Abhijit Kashyap (Roll No: 220003001)
2. Inaamurrahaman (Roll No: 220003009)
3. Anshul Singh Jaiswal (Roll No: 220003010)
4. Anshul Vijaywargiya (Roll No: 220003011)

## Problem Statement

The project aims to develop a web application that facilitates job searches and recruitment processes, providing a platform for job seekers and recruiters to connect efficiently.

## Initial Approach

- Planned to use Express.js for the backend to manage routes, middleware, and sessions.
- Decided on MySQL for database management due to its robustness and reliability.
- Chose vanilla JavaScript for the frontend to keep the project lightweight and efficient.
- Intended to implement WebSockets for real-time chat functionality between job seekers and recruiters.
- Required a method to handle file uploads for resumes and cover letters as well as a solution for storing images.

## Final Iteration and Amount of Work Done

### Backend

- Set up Express.js to handle all backend operations, including routing and session management.
- Configured MySQL to store and retrieve data, ensuring smooth integration with Express.js.
- Used Multer to handle file uploads for resumes and cover letters.
- Integrated Cloudinary to store and manage images.

### Frontend

- Developed the frontend using vanilla JavaScript, focusing on performance and simplicity.
- Incorporated various animations and transitions to enhance the user experience.
- Ensured the frontend is responsive across different devices and screen sizes.

### Real-Time Communication

- Implemented WebSockets to facilitate real-time communication in the web chat feature.

### Additional Features

- Ensured proper version control using GitHub.
- Implemented functionalities for recruiter-candidate interactions. If the recruiter is interested in a candidate, they can drop a message.
- Provided filtering options for candidates to search jobs based on job role, location, and employment type.
- Enabled candidates to set up profiles where they can add skills, bio, job type desired, etc. The profiles are visible to recruiters.
- Created separate routes and session types for job seekers and recruiters.
- Allowed recruiters to post jobs for any company they work for.
- Added a query posting feature for contacting the website owners.

## Results

- The web application successfully manages user sessions and securely stores user data in MySQL.
- The frontend built with vanilla JavaScript is responsive, user-friendly, and enhanced with animations and transitions.
- The web chat feature powered by WebSockets allows real-time communication between job seekers and recruiters.
- Multer efficiently handles file uploads for resumes and cover letters.
- Cloudinary integration provides a robust solution for storing and managing images.
- Positive feedback was received for the smooth, interactive, and visually appealing user experience.

## Possible Improvements

- Enhance security measures for session management and data storage.
- Optimize the WebSocket implementation to handle a larger number of concurrent users.
- Add more features to the web chat, such as message history and media sharing.
- Improve the file upload process to support larger files and various file formats.
- Further refine animations and transitions for an even better user experience.
- Refactor the frontend code for better maintainability and scalability.

## Conclusion

The project achieved its goals of creating a robust web application with efficient session management, data storage, file uploads, real-time communication, and a responsive, animated frontend. Valuable skills were learned in using Express.js, MySQL, Multer, Cloudinary, and WebSockets. Future improvements can further enhance the application's functionality and user experience.

## Run Locally

Clone the project:

\```bash
git clone https://github.com/deep-yad/JOB_Search_and_Recruitments_IITISOC2024.git
\```

Go to the project directory:

\```bash
cd Job_Search_and_Recruitments
\```

### Client

Go to the client directory:

\```bash
cd client
\```

Install dependencies:

\```bash
npm install
\```

Start the react server:

\```bash
npm start
\```

### Server

Open a new terminal and go to the server directory:

\```bash
cd server
\```

Install dependencies:

\```bash
npm install
\```

Start the server:

\```bash
node server
\```

## Lessons Learned

We learned teamwork, collaboration, and various technologies including Git, GitHub, and the MERN stack. We utilized resources like YouTube, ChatGPT, StackOverflow, and official documentation to build this web application.

## Tech Stack

**Client:** Vanilla JavaScript, CSS

**Server:** Node.js, Express.js, MySQL

## Feedback

If you have any feedback, please reach out to us at your_email@example.com

## Authors

- [Abhijit Kashyap](https://github.com/Abhijitkashyap97)
- [Inaamurrahaman Ansari](https://github.com/ANSARI-INAAMURRAHAMAN)
- [Anshul Singh Jaiswal](https://github.com/AnshulSinghJaiswal)
- [Anshul Vijaywargiya](https://github.com/AnshulVijaywargiya)

## License

[ISC](https://opensource.org/license/isc-license-txt/)
