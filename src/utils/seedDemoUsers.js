// Demo users seeder
// This script will create demo accounts in localStorage for testing

const demoUsers = [
  {
    id: 1,
    email: 'student@lms.com',
    password: 'password123',
    name: 'John Student',
    role: 'student',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    email: 'instructor@lms.com',
    password: 'password123',
    name: 'Sarah Instructor',
    role: 'instructor',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    email: 'admin@lms.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

export const seedDemoUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem('lms_users') || '[]');
  
  if (existingUsers.length === 0) {
    localStorage.setItem('lms_users', JSON.stringify(demoUsers));
    console.log('Demo users seeded successfully!');
  }
};
