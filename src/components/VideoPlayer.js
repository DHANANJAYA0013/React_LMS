import React, { useState, useEffect, useRef } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ subject }) => {
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoDurations, setVideoDurations] = useState({});

  const currentVideo = subject.videos[currentVideoIndex];

  // Load all video durations on mount
  useEffect(() => {
    const loadVideoDurations = async () => {
      const durations = {};
      
      for (const video of subject.videos) {
        try {
          const videoElement = document.createElement('video');
          videoElement.src = video.url;
          
          await new Promise((resolve) => {
            videoElement.addEventListener('loadedmetadata', () => {
              durations[video.id] = videoElement.duration;
              resolve();
            });
            videoElement.addEventListener('error', () => {
              durations[video.id] = video.duration; // fallback to data duration
              resolve();
            });
          });
        } catch (error) {
          durations[video.id] = video.duration; // fallback to data duration
        }
      }
      
      setVideoDurations(durations);
    };

    loadVideoDurations();
  }, [subject.videos]);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`video_${currentVideo.id}_progress`);
    if (savedProgress && videoRef.current) {
      const savedTime = parseFloat(savedProgress);
      videoRef.current.currentTime = savedTime;
      setProgress((savedTime / videoRef.current.duration) * 100);
    }
  }, [currentVideo.id]);

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      const progressPercent = (time / dur) * 100;
      
      setCurrentTime(time);
      setDuration(dur);
      setProgress(progressPercent);
      
      // Save progress to localStorage
      localStorage.setItem(`video_${currentVideo.id}_progress`, time.toString());
    }
  };

  // Handle video play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Handle video selection
  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
    setProgress(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  // Format time in MM:SS
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-player-container">
      <h2 className="video-section-title">📺 {subject.name} - Course Videos</h2>
      
      <div className="video-player-wrapper">
        <div className="video-main">
          <video
            ref={videoRef}
            className="video-element"
            src={currentVideo.url}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls
          >
            Your browser does not support the video tag.
          </video>

          <div className="video-info">
            <h3 className="video-title">{currentVideo.title}</h3>
            
            <div className="progress-container">
              <div className="progress-bar-wrapper">
                <div 
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="progress-details">
                <span className="progress-percent">{progress.toFixed(1)}% Complete</span>
                <span className="progress-time">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>

            <button className="play-button" onClick={togglePlayPause}>
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
          </div>
        </div>

        <div className="playlist">
          <h4 className="playlist-title">Course Playlist ({subject.videos.length})</h4>
          <div className="playlist-items">
            {subject.videos.map((video, index) => (
              <div
                key={video.id}
                className={`playlist-item ${index === currentVideoIndex ? 'active' : ''}`}
                onClick={() => handleVideoSelect(index)}
              >
                <span className="playlist-number">{index + 1}</span>
                <div className="playlist-info">
                  <span className="playlist-item-title">{video.title}</span>
                  <span className="playlist-duration">
                    {formatTime(videoDurations[video.id] || video.duration)}
                  </span>
                </div>
                {index === currentVideoIndex && (
                  <span className="playing-indicator">▶</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
