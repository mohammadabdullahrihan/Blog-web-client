# Project Name: Blog Website

## Purpose
The Blog Website is a comprehensive full-stack application where users can explore, create, and manage blogs. It aims to provide a seamless blogging experience with features like secure authentication, dynamic content management, and a wishlist system. The platform is responsive and includes modern design elements to enhance user interaction.

### Live URL
[Live Demo](https://writingx-assignment-11.netlify.app/)

## Key Features
- **User Authentication**: Secure JWT-based authentication and cookie management for user sessions.
- **Blog Management**: Full CRUD (Create, Read, Update, Delete) operations for blogs.
- **Search & Filter**: Quickly find blogs using category or title-based search.
- **Wishlist**: Add and manage favorite blogs for easy access later.
- **Comment System**: Interactive commenting for community engagement.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Dark Mode**: Switch between light and dark themes for a customized experience.
- **Protected Routes**: Secure routes accessible only to authenticated users.
- **API Integration**: Smooth backend integration with MongoDB and Firebase.
- **Animations**: Engaging animations for enhanced UX using libraries like Framer Motion and AOS.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Firebase
- **Deployment**: Netlify (frontend), Vercel (backend)

## Dependencies

### Frontend
- **@tanstack/react-router**: For routing and navigation.
- **@tanstack/react-table**: Efficient data table for blog lists.
- **aos**: Adds scroll-based animations.
- **axios**: HTTP client for API interactions.
- **firebase**: Authentication and real-time database.
- **framer-motion**: Modern animation library for React.
- **motion**: Lightweight animation library.
- **react**: Core library for building UI components.
- **react-awesome-reveal**: Simplified reveal animations.
- **react-dom**: For rendering React components.
- **react-icons**: Predefined set of icons.
- **react-router-dom**: For client-side routing.
- **react-simple-typewriter**: Typewriter animation effects.
- **react-slick**: Carousel components for dynamic content.
- **react-toastify**: For user-friendly toast notifications.
- **react-toggle-dark-mode**: Toggle for dark mode.
- **sweetalert2**: Stylish alert dialogs.
- **typewriter-effect**: Lightweight typewriter animations.

### Backend
- **jsonwebtoken**: Secure user authentication.
- **cookie-parser**: Parsing cookies for HTTP requests.
- **dotenv**: Manage environment variables.
- **express**: Framework for API development.
- **mongodb**: Database driver for MongoDB.
- **cors**: Enable cross-origin requests.

## Running the Project Locally

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas or a local MongoDB setup

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/mohammadabdullahrihan/Blog-web-client]
   cd Blog-web-client
   git clone [https://github.com/mohammadabdullahrihan/Blog-web-server]
   cd Blog-web-server
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the backend folder with the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     FIREBASE_API_KEY=your_firebase_api_key
     ```

4. Run the development servers:
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```

5. Open the app in your browser:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

### Additional Links
- [Frontend Repository](https://github.com/mohammadabdullahrihan/Blog-web-client)
- [Backend Repository](https://github.com/mohammadabdullahrihan/Blog-web-server)
- [Live Demo](https://writingx-assignment-11.netlify.app/)

