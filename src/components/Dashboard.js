import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import SearchBar from './SearchBar';
import SubjectGrid from './SubjectGrid';
import VideoPlayer from './VideoPlayer';
import { subjectsData } from '../data/coursesData';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Filter subjects based on search term
  const filteredSubjects = useMemo(() => {
    if (!searchTerm.trim()) {
      return subjectsData;
    }

    const searchLower = searchTerm.toLowerCase();
    
    return subjectsData.filter((subject) => {
      const nameMatch = subject.name.toLowerCase().includes(searchLower);
      const descriptionMatch = subject.description.toLowerCase().includes(searchLower);
      const videoMatch = subject.videos.some((video) =>
        video.title.toLowerCase().includes(searchLower)
      );
      return nameMatch || descriptionMatch || videoMatch;
    });
  }, [searchTerm]);

  // Handle subject selection
  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setTimeout(() => {
      const videoSection = document.querySelector('.video-player-container');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <span className="user-name">Welcome, {user.name}</span>
          <span className={`user-role role-${user.role}`}>{user.role}</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <Header />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      {user.role === 'admin' && (
        <div className="admin-panel">
          <h3>📊 Admin Panel</h3>
          <div className="admin-stats">
            <div className="stat-card">
              <h4>Total Courses</h4>
              <p>{subjectsData.length}</p>
            </div>
            <div className="stat-card">
              <h4>Total Videos</h4>
              <p>{subjectsData.reduce((sum, subject) => sum + subject.videos.length, 0)}</p>
            </div>
            <div className="stat-card">
              <h4>Your Role</h4>
              <p>Administrator</p>
            </div>
          </div>
        </div>
      )}

      {user.role === 'instructor' && (
        <div className="instructor-panel">
          <h3>👨‍🏫 Instructor Dashboard</h3>
          <div className="instructor-info">
            <p>You have access to manage course content and track student progress.</p>
          </div>
        </div>
      )}

      <SubjectGrid
        subjects={filteredSubjects}
        onSelectSubject={handleSelectSubject}
        selectedSubjectId={selectedSubject?.id}
      />
      
      {selectedSubject && <VideoPlayer subject={selectedSubject} />}
    </div>
  );
};

export default Dashboard;
