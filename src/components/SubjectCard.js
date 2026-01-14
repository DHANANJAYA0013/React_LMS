import React from 'react';
import './SubjectCard.css';

const SubjectCard = ({ subject, onSelectSubject, isSelected }) => {
  return (
    <div 
      className={`subject-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelectSubject(subject)}
    >
      <div className="subject-icon">{subject.icon}</div>
      <h3 className="subject-name">{subject.name}</h3>
      <p className="subject-description">{subject.description}</p>
      <div className="subject-footer">
        <span className="video-count">
          🎥 {subject.videos.length} videos
        </span>
      </div>
    </div>
  );
};

export default SubjectCard;
