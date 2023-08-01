// Stopwatch.js
import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const pad = (num) => String(num).padStart(2, '0');
    const seconds = pad(Math.floor((time / 1000) % 60));
    const minutes = pad(Math.floor((time / 1000 / 60) % 60));
    const hours = pad(Math.floor(time / 1000 / 3600));
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <div data-testid="time">{formatTime(elapsedTime)}</div>
      {!isRunning && (
        <button data-testid="start" onClick={handleStart}>
          Start
        </button>
      )}
      {isRunning && (
        <button data-testid="pause" onClick={handlePause}>
          Pause
        </button>
      )}
      <button data-testid="reset" onClick={handleReset} disabled={!elapsedTime}>
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;
