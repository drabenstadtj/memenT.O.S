// src/components/DownloadQueue.jsx
import { useEffect, useState } from 'react';

export default function DownloadQueue({ queue = [], onPause, onUnpause, downloadSpeed = 75 }) {
  const [localQueue, setLocalQueue] = useState(queue);

  // Update local queue when parent queue changes
  useEffect(() => {
    setLocalQueue(queue);
  }, [queue]);

  // Simulate download progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLocalQueue(prevQueue => {
        return prevQueue.map(item => {
          if (item.isPaused || item.progress >= 100) {
            return item;
          }

          // Calculate progress increment based on download speed
          // downloadSpeed is in GB/hour, update every second
          const progressIncrement = (downloadSpeed / item.size / 3600) * 100;
          const newProgress = Math.min(item.progress + progressIncrement, 100);

          return {
            ...item,
            progress: newProgress
          };
        });
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [downloadSpeed]);

  const activeDownloads = localQueue.filter(item => !item.isPaused && item.progress < 100);
  const completedDownloads = localQueue.filter(item => item.progress >= 100);
  const pausedDownloads = localQueue.filter(item => item.isPaused && item.progress < 100);

  return (
    <div className="download-queue">
      <h2>Downloads ({localQueue.length})</h2>

      <div className="download-stats">
        <div>Active: {activeDownloads.length}</div>
        <div>Completed: {completedDownloads.length}</div>
        <div>Paused: {pausedDownloads.length}</div>
      </div>

      <div className="download-speed">
        Current Speed: {downloadSpeed.toFixed(1)} GB/hour
      </div>

      <div className="download-list">
        {localQueue.length === 0 ? (
          <div className="no-downloads">
            <p>No downloads in queue</p>
            <p>Add items from your Library</p>
          </div>
        ) : (
          localQueue.map((item) => (
            <div
              key={item.id}
              className={`download-item ${item.progress >= 100 ? 'completed' : ''} ${item.isPaused ? 'paused' : ''}`}
            >
              <div className="download-header">
                <div className="download-name">{item.title}</div>
                {item.progress >= 100 && <span className="status-badge">✓ Complete</span>}
                {item.isPaused && <span className="status-badge paused-badge">⏸ Paused</span>}
              </div>

              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${item.progress || 0}%` }}
                />
              </div>

              <div className="download-details">
                <div className="download-size">
                  {((item.size * (item.progress || 0)) / 100).toFixed(2)} GB / {item.size} GB
                </div>
                <div className="download-percent">
                  {(item.progress || 0).toFixed(1)}%
                </div>
              </div>

              {item.progress < 100 && (
                <button
                  className="pause-button"
                  onClick={() => item.isPaused ? onUnpause(item.id) : onPause(item.id)}
                >
                  {item.isPaused ? '▶ Resume' : '⏸ Pause'}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}