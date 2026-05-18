# Paisa Patrol

A comprehensive expense tracking and management application with AI-powered insights, user authentication, and real-time financial analytics.

## Overview

Paisa Patrol is a full-stack web application designed to help users track, manage, and analyze their expenses efficiently. The application features Google OAuth integration, expense categorization, contact management, and an AI assistant powered by Claude Anthropic AI for personalized financial insights.

## Key Features

**Authentication & User Management**
- Google OAuth 2.0 authentication
- Email and password-based signup and login
- Password reset functionality via email
- User profile management

**Expense Management**
- Create, read, update, and delete expenses
- Categorize expenses for better organization
- Add descriptions to track spending details
- View expense history with timestamps
- Image upload support for receipts and documentation

**Contact Management**
- Maintain a list of contacts
- Store contact details and information
- Link contacts to expenses for better tracking

**Dashboard & Analytics**
- Visual dashboard with expense overview
- Interactive charts and graphs powered by Chart.js
- Real-time expense statistics
- Expense history view with detailed information

**AI-Powered Assistant**
- Claude Anthropic AI integration
- Get personalized financial advice and insights
- Smart expense analysis and recommendations

**Additional Features**
- Responsive UI built with React and Tailwind CSS
- Real-time data synchronization
- File upload functionality with Multer
- Email notifications via Nodemailer
- CORS-enabled API for cross-origin requests

## Tech Stack

**Frontend**
- React 18.3.1
- React Router DOM 6.23.0
- Tailwind CSS 3.4.3
- Chart.js and react-chartjs-2 for data visualization
- Axios for HTTP requests
- Formspree for contact form handling

**Backend**
- Node.js with Express.js 4.19.2
- MongoDB with Mongoose ODM
- Passport.js for authentication
- JSON Web Tokens (JWT) for session management
- Bcryptjs for password hashing
- Multer for file uploads
- Nodemailer for email services
- Claude Anthropic AI SDK 0.22.0

**Database**
- MongoDB for data persistence

## Project Structure

```
Paisa-Patrol/
├── client/                          # React frontend application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── Context/                 # Context API for state management
│   │   ├── charts/                  # Chart components
│   │   ├── assets/                  # Images and static files
│   │   ├── App.js                   # Main App component
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
│
└── server/                          # Express backend application
    ├── controller/                  # Request handlers
    ├── models/                      # MongoDB schemas (User, Expense, Contact)
    ├── routes/                      # API endpoints
    ├── middlewares/                 # Authentication and custom middlewares
    ├── service/                     # Business logic and utilities
    ├── upload/                      # File upload directory
    ├── index.js                     # Main server file
    ├── connection.js                # MongoDB connection
    ├── passport.js                  # Passport.js configuration
    ├── package.json
    └── .gitignore
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB database (local or Atlas)
- Google OAuth credentials
- Anthropic API key (for AI features)

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret_key
ANTHROPIC_API_KEY=your_anthropic_api_key
FAILURE_REDIRECT_URI=http://localhost:3000/login
EXPENSE_PAGE_REDIRECT_URI=http://localhost:3000/dashboard
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The client will run on `http://localhost:3000` and automatically open in your browser.

## Usage

### User Authentication
1. Visit the home page and click on "Sign Up" or "Login"
2. You can either create an account with email/password or use Google OAuth
3. For password reset, click "Forgot Password" and follow the email instructions

### Managing Expenses
1. After login, navigate to the Dashboard
2. Click "Add Expense" to create a new expense entry
3. Fill in the amount, description, and category
4. Optionally upload a receipt image
5. View all expenses in the History section

### Using AI Assistant
1. Go to the Dashboard and select "Assistant"
2. Describe your financial situation or ask for advice
3. The Claude AI will provide personalized insights and recommendations

### Managing Contacts
1. Navigate to "Contacts" from the dashboard
2. Add new contacts with their information
3. View contact details and manage your contact list

## API Endpoints

### Authentication Routes
- POST `/user/signup` - Register a new user
- POST `/user/login` - Login with email and password
- GET `/auth/google` - Google OAuth redirect
- GET `/auth/google/callback` - Google OAuth callback
- GET `/login/success` - Check login status
- POST `/user/logout` - Logout user

### Expense Routes
- POST `/expense/add` - Create a new expense
- GET `/user/expenses` - Get all user expenses
- PUT `/expense/update/:id` - Update an expense
- DELETE `/expense/delete/:id` - Delete an expense

### Contact Routes
- POST `/contact/add` - Create a new contact
- GET `/user/contacts` - Get all user contacts
- GET `/contact/:id` - Get contact details
- DELETE `/contact/delete/:id` - Delete a contact

### AI Routes
- POST `/api/anthropic/chat` - Send message to AI assistant
- GET `/api/anthropic/suggestions` - Get AI financial suggestions

### File Upload
- POST `/upload/image` - Upload image file
- GET `/images/:filename` - Retrieve uploaded image

### Email Routes
- POST `/password-reset` - Request password reset
- POST `/password-reset/:token` - Reset password with token

## Database Models

### User Schema
```javascript
{
  userName: String (required, unique),
  email: String (required, unique),
  password: String (required),
  image_url: String,
  contacts: [ObjectId],
  expenses: [ObjectId],
  timestamps: true
}
```

### Expense Schema
```javascript
{
  Amount: Number (required),
  Description: String,
  Category: String (required),
  timestamps: true
}
```

### Contact Schema
```javascript
{
  name: String (required),
  email: String,
  phone: String,
  address: String,
  timestamps: true
}
```

## Environment Variables

Create a `.env` file in the server directory with the following configuration:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
PORT=3000
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
JWT_SECRET=your_secret_key_for_jwt
ANTHROPIC_API_KEY=your_anthropic_api_key
FAILURE_REDIRECT_URI=http://localhost:3000/login
EXPENSE_PAGE_REDIRECT_URI=http://localhost:3000/dashboard/dashcontent
SMTP_USER=your_gmail_address
SMTP_PASSWORD=your_gmail_app_password
```

## Deployment

**Frontend:**
- Deploy on Vercel: `https://paisapatrol.vercel.app`
- Configure environment variables in Vercel dashboard

**Backend:**
- Deploy on Vercel or Heroku: `https://paisa-patrol-backend.vercel.app`
- Ensure all environment variables are configured
- MongoDB Atlas for cloud database

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- HTTP-only cookies for session management
- CORS configuration for authorized origins
- Email verification for password resets
- Google OAuth for secure authentication

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

Please follow the existing code style and add comments for complex logic.

## License

This project is licensed under the ISC License.

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Visit the deployed application at https://paisapatrol.vercel.app

## Acknowledgments

- React and React Router for frontend framework
- Express.js for backend server
- MongoDB for database
- Claude Anthropic AI for AI insights
- Tailwind CSS for styling
- Chart.js for data visualization
