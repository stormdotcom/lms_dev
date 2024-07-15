# Learning Management System (LMS)

## Overview

This Learning Management System (LMS) is a robust, scalable application built using Node.js, PostgreSQL, and a microservices architecture. The LMS is designed to integrate seamlessly with your organization, providing a comprehensive platform for managing and delivering educational content.

## Features

- **User Management**: Sign up, sign in, password management, and profile updates.
- **Course Management**: Create, update, and manage courses and course content.
- **Enrollment**: Handle student enrollments and track progress.
- **Analytics**: Collect and analyze data on course usage and performance.
- **Microservices Architecture**: Each service is independently deployable and scalable.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **PostgreSQL**: Relational database management system.
- **RabbitMQ**: Message Broker.
- **Docker**: Containerization for microservices.
- **Nginx**: Reverse proxy and load balancing.

## Architecture

The system is divided into several microservices, each responsible for a specific domain:

- **User Service**: Handles user authentication and profile management.
- **Course Service**: Manages courses and related content.
- **Enrollment Service**: Handles enrollments and tracks student progress.
- **Analytics Service**: Collects and processes usage data for reporting.

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- Docker
- RabbitMQ
- Nginx
- win-node-env (windows machine)

[+] ------------------------------------------------------------------- [+]
#### PM2 
- pm2 start npm --name primary -- start
- pm2 start npm --name notifications -- start
- pm2 start npm --name gateway -- start
- pm2 start npm --name analytics -- start

- pm2 save  
- pm2 startup

#### nginx
- tail -f /var/log/nginx/error.log
- tail -f /var/log/nginx/access.log
