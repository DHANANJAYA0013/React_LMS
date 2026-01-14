import React from 'react';
import SubjectCard from './SubjectCard';
import './SubjectGrid.css';

const SubjectGrid = ({ subjects, onSelectSubject, selectedSubjectId }) => {
  if (subjects.length === 0) {
    return (
      <div className="no-results">
        <span className="no-results-icon">😕</span>
        <p>No subjects found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="subject-grid-container">
      <h2 className="section-title">Available Subjects</h2>
      <div className="subject-grid">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onSelectSubject={onSelectSubject}
            isSelected={subject.id === selectedSubjectId}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectGrid;
