// src/components/Timer.jsx
import { useState, useEffect } from 'react';

export default function Timer({ initialHours = 72, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialHours * 3600); // in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      <div className="timer-display">
        {String(hours).padStart(2, '0')}:
        {String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </div>
      {!isRunning && timeLeft > 0 && (
        <button onClick={() => setIsRunning(true)}>Start Download</button>
      )}
    </div>
  );
}