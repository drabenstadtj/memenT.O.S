// src/components/DownloadQueue.jsx
export default function DownloadQueue({ queue = [], onPause, onUnpause, downloadSpeed = 5.2 }) {
  return (
    <div className="download-queue">
      <h2>Downloads ({queue.length})</h2>
      
      <div className="download-list">
        {queue.map((item) => (
          <div key={item.id} className="download-item">
            <div className="download-name">{item.title}</div>
            
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${item.progress || 0}%` }}
              />
            </div>
            
            <div className="download-size">
              {((item.size * (item.progress || 0)) / 100).toFixed(2)} GB / {item.size} GB
            </div>
            
            <button 
              className="pause-button"
              onClick={() => item.isPaused ? onUnpause(item.id) : onPause(item.id)}
            >
              {item.isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        ))}
      </div>
      
      <div className="download-speed">
        Download Speed: {downloadSpeed} Mbps
      </div>
    </div>
  );
}