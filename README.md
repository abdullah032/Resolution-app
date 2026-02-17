🎯 Goal Tracker App (New Year Resolutions)

A backend-focused Goal & Resolution Tracking Application built with Node.js and MongoDB, designed to help users track long-term goals,
daily progress, and habits such as New Year resolutions.

This project demonstrates clean backend architecture, authentication, REST APIs, and real-world backend concepts.

🚀 Features

👤 User authentication (session-based)

🎯 Create and manage goals / resolutions

📆 Track daily progress toward long-term targets

📊 Automatic progress calculation

🕒 Activity history (achieved / missed days)

🔔 Optional reminders

🗂 Category-based goals (Health, Education, Career, Savings, etc.)

🔐 Secure cookies and session handling

🌐 CORS-enabled API for frontend integration

🧠 What This Project Demonstrates

This project is built to showcase backend fundamentals, not just CRUD:

Layered architecture (Controller → Service → Model)

Separation of concerns

Asynchronous programming

Session-based authentication

RESTful API design

MongoDB with Mongoose

Clean, scalable folder structure

Ready to integrate with React frontend

🏗 Tech Stack

Backend

Node.js (HTTP module)

MongoDB

Mongoose ODM

Authentication

Session tokens stored in HTTP-only cookies

Architecture

MVC-inspired layered design

📁 Project Structure
src/
 ├── controllers/   # Handle HTTP requests & responses
 ├── services/      # Business logic (rules, validations, workflows)
 ├── models/        # Database schemas & data access
 ├── routes/        # API route definitions
 ├── utils/         # Helpers (errors, tokens, cookies, etc.)
 ├── middlewares/   # Auth, CORS, validation
 ├── config/        # Database & environment config
 └── app.js         # App entry point

🗄 Data Models
Goal / Resolution Schema

title – Goal title

description – Detailed explanation

goalValue – Long-term target (e.g., 300 hours)

dailyTarget – Daily task (e.g., 5 minutes)

progress – Auto-calculated progress

status – In Progress / Completed

type – Resolution / Daily Task

category – Health, Education, Career, etc.

activityLog – History of completed & missed days

remindMe – Reminder flag

createdAt – Creation date

🔐 Authentication Flow

User logs in

Server generates a session token

Token stored in HTTP-only cookie

Protected routes validate session

Logout destroys session

This approach protects against:

XSS attacks

Token theft from JavaScript

🌐 API Example Routes
POST   /auth/signup
POST   /auth/login
POST   /auth/logout

GET    /goals
GET    /goals/:id
POST   /goals
PATCH  /goals/:id
DELETE /goals/:id

🔄 Frontend Integration

This API is designed to work seamlessly with:

React.js

Fetch / Axios

Cookie-based authentication (credentials: "include")

⚠️ Current Status

✅ Core backend functionality completed
🟡 Frontend integration in progress
🟡 Additional security hardening planned

🛣 Roadmap

 ◼ React frontend (Dashboard + Charts)
 ◼ Input validation (Zod/Joi)
 ◼ Rate limiting
 ◼ CSRF protection
 ◼ Unit & integration tests
 ◼ Production deployment

📌 Why This Project?

This project was built to:

Strengthen backend fundamentals

Practice real-world architecture

Prepare for full-stack development

Build a strong GitHub portfolio

👨‍💻 Author

Abdullah
Aspiring Full-Stack & Backend Developer
Focused on Node.js, MongoDB, and scalable system design.
