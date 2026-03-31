# Virtual Queuing System

The Virtual Queuing System is a full-stack MERN-based smart queue management application designed to reduce physical waiting lines and improve customer service efficiency through digital token management.

This project allows users to register, log in, and join a queue online without having to stand in physical lines. Once a user joins, a unique token number is generated automatically and displayed along with their queue status.

The system also provides real-time queue updates where users can track the current token being served, estimated waiting time, and their position in the queue.

A major feature of this project is the **Urgent Request Management System**, where users can raise urgent service requests by submitting a proper reason and supporting document. These requests are sent instantly to the admin dashboard using Socket.io real-time notifications.

The admin has complete control over the queue through a dedicated dashboard. The admin can:
- call the next token
- skip a token
- mark a token as completed
- reset the queue for the next day
- view all waiting and served tokens
- approve or reject urgent requests

When an urgent request is approved, the corresponding token is automatically moved to the current serving position without disturbing the remaining queue order. After completion, the system resumes normal queue flow.

The project is developed using the following technologies:

## Tech Stack
- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-time Communication:** Socket.io
- **Version Control:** Git & GitHub

## Key Features
- User Registration and Login
- Admin Login
- Automatic Token Generation
- Real-time Queue Status
- Urgent Request Submission
- Admin Approval Workflow
- Priority Token Handling
- Queue Reset Functionality
- Modern Responsive UI
- Full MERN Architecture

This system is useful for hospitals, banks, government offices, customer support centers, and service counters where managing large queues efficiently is important.

The main goal of this project is to improve user convenience, reduce crowding, and provide a smarter digital queuing experience.
