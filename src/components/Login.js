import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      <div className="auth-card">
        <div className="auth-header">
          <h1>🎓✨</h1>
          <h2>Welcome Back!</h2>
          <p>Login to continue your learning journey</p>
        </div>

        <div className="role-tabs">
          <div
            className={`role-tab ${selectedRole === 'student' ? 'active' : ''}`}
            onClick={() => setSelectedRole('student')}
          >
            <span className="icon">🎒</span>
            <div>Student</div>
          </div>
          <div
            className={`role-tab ${selectedRole === 'teacher' ? 'active' : ''}`}
            onClick={() => setSelectedRole('teacher')}
          >
            <span className="icon">👨‍🏫</span>
            <div>Teacher</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">❌ {error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">
              <span className="emoji">📧</span>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span className="emoji">🔒</span>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <>
                Logging In...
                <span className="loading-spinner"></span>
              </>
            ) : (
              '🚀 Login'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link> 🎉
          </p>
        </div>

        <div className="demo-credentials">
          <h4>🎮 Try Demo Accounts:</h4>
          <div className="demo-list">
            <div><strong>👨‍🎓 Student:</strong> student@lms.com / password123</div>
            <div><strong>👩‍🏫 Teacher:</strong> instructor@lms.com / password123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
