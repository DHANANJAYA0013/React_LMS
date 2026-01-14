# Authentication System Documentation

## Overview
This LMS application now includes a complete role-based authentication system with three user roles:
- **Student** - Can view and access course materials
- **Instructor** - Has access to course management features
- **Admin** - Full administrative access with system statistics

## Features

### Authentication
- User registration with role selection
- Secure login system
- Protected routes (requires authentication)
- Persistent sessions using localStorage
- Automatic logout functionality

### User Roles
1. **Student**
   - Access to all courses and videos
   - Track learning progress
   - Search and filter courses

2. **Instructor**
   - All student features
   - Instructor dashboard with special panel
   - Course management access

3. **Admin**
   - All features
   - Admin panel with system statistics
   - View total courses and videos
   - User management capabilities

## Demo Accounts

The system comes pre-loaded with demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Student | student@lms.com | password123 |
| Instructor | instructor@lms.com | password123 |
| Admin | admin@lms.com | password123 |

## How to Use

1. **Starting the Application**
   - Run `npm start` from the react_lms directory
   - The app will open at `http://localhost:3000`
   - You'll be redirected to the login page

2. **Login**
   - Use one of the demo accounts above
   - Or create a new account via the Sign Up page

3. **Sign Up**
   - Enter your name, email, and password
   - Select your role (Student, Instructor, or Admin)
   - Click Sign Up to create your account

4. **Dashboard Access**
   - After login, you'll be redirected to the dashboard
   - Your name and role will be displayed in the header
   - Different roles see different panels

5. **Logout**
   - Click the Logout button in the dashboard header
   - You'll be redirected back to the login page

## File Structure

```
src/
├── contexts/
│   └── AuthContext.js          # Authentication context and logic
├── components/
│   ├── Login.js                # Login page component
│   ├── SignUp.js               # Registration page component
│   ├── Dashboard.js            # Main dashboard (role-based)
│   ├── ProtectedRoute.js       # Route protection wrapper
│   ├── Auth.css                # Authentication pages styling
│   └── Dashboard.css           # Dashboard styling
├── utils/
│   └── seedDemoUsers.js        # Demo user seeder
└── App.js                      # Main app with routing
```

## Technical Details

- **Storage**: User data is stored in localStorage
- **Routing**: React Router v6
- **State Management**: React Context API
- **Authentication**: Session-based with localStorage persistence
- **Password Security**: In production, passwords should be hashed

## Security Notes

⚠️ **Important**: This is a demo implementation suitable for learning purposes.

For production use, implement:
- Server-side authentication
- Password hashing (bcrypt)
- JWT tokens or session cookies
- HTTPS/SSL
- Input validation and sanitization
- Rate limiting
- CSRF protection

## Customization

### Adding New Roles
Edit `AuthContext.js` to add role checks:
```javascript
isCustomRole: user?.role === 'customrole'
```

### Modifying Role Access
Update `ProtectedRoute.js` with custom role requirements:
```javascript
<ProtectedRoute allowedRoles={['admin', 'instructor']}>
  <YourComponent />
</ProtectedRoute>
```
