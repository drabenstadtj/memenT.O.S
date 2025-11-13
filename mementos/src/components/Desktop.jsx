// src/components/Desktop.jsx
import { useState, useEffect } from "react";
import Window from "./Window";
import Inbox from "./Inbox";
import Library from "./Library";
import DownloadQueue from "./DownloadQueue";
import { emails } from "../data/emails";
import { libraryItems } from "../data/library";

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState({
    inbox: true,
    library: false,
    downloads: false,
    settings: false,
  });
  const [queue, setQueue] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load saved background and profile picture from localStorage
  useEffect(() => {
    const savedBg = localStorage.getItem("desktopBackground");
    const savedPfp = localStorage.getItem("profilePicture");
    if (savedBg) {
      setBackgroundImage(savedBg);
    }
    if (savedPfp) {
      setProfilePicture(savedPfp);
    }
  }, []);

  const toggleWindow = (name) => {
    setOpenWindows((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const addToQueue = (item) => {
    if (!queue.find((q) => q.id === item.id)) {
      setQueue([...queue, { ...item, progress: 0, isPaused: false }]);
    }
  };

  const pauseDownload = (id) => {
    setQueue(
      queue.map((item) =>
        item.id === id ? { ...item, isPaused: true } : item
      )
    );
  };

  const unpauseDownload = (id) => {
    setQueue(
      queue.map((item) =>
        item.id === id ? { ...item, isPaused: false } : item
      )
    );
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setBackgroundImage(imageUrl);
        localStorage.setItem("desktopBackground", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setProfilePicture(imageUrl);
        localStorage.setItem("profilePicture", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetBackground = () => {
    setBackgroundImage(null);
    localStorage.removeItem("desktopBackground");
  };

  const resetProfilePicture = () => {
    setProfilePicture(null);
    localStorage.removeItem("profilePicture");
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div 
      className="desktop"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <button onClick={() => toggleWindow("inbox")}>Inbox</button>
          <button onClick={() => toggleWindow("library")}>Library</button>
          <button onClick={() => toggleWindow("downloads")}>Downloads</button>
        </div>

        <div className="taskbar-right">
          <button 
            className="settings-button" 
            title="Settings"
            onClick={() => toggleWindow("settings")}
          >
            ⚙️
          </button>
          <div className="time-display">
            <div className="time">{formatTime(currentTime)}</div>
            <div className="date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Windows */}
      {openWindows.inbox && (
        <Window
          title="Qmail"
          width={900}
          height={600}
          defaultPosition={{ x: 50, y: 50 }}
          onClose={() => toggleWindow("inbox")}
        >
          <Inbox emails={emails} profilePicture={profilePicture} />
        </Window>
      )}

      {openWindows.library && (
        <Window
          title="Vault Digital"
          width={1200}
          height={700}
          defaultPosition={{ x: 150, y: 100 }}
          onClose={() => toggleWindow("library")}
        >
          <Library items={libraryItems} onAddToQueue={addToQueue} />
        </Window>
      )}

      {openWindows.downloads && (
        <Window
          title="Download Queue"
          width={800}
          height={500}
          defaultPosition={{ x: 250, y: 150 }}
          onClose={() => toggleWindow("downloads")}
        >
          <DownloadQueue
            queue={queue}
            onPause={pauseDownload}
            onUnpause={unpauseDownload}
          />
        </Window>
      )}

      {openWindows.settings && (
        <Window
          title="Settings"
          width={500}
          height={550}
          defaultPosition={{ x: 300, y: 200 }}
          onClose={() => toggleWindow("settings")}
        >
          <div className="settings-panel">
            <h2>Desktop Settings</h2>
            
            <div className="settings-section">
              <h3>Profile Picture</h3>
              <p>Set your profile picture for Qmail and login:</p>
              
              <div className="profile-picture-preview">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" />
                ) : (
                  <div className="default-avatar">👤</div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="file-input"
                id="pfp-upload"
              />
              <label htmlFor="pfp-upload" className="file-label">
                Choose Profile Picture
              </label>

              {profilePicture && (
                <button 
                  onClick={resetProfilePicture}
                  className="reset-button"
                >
                  Remove Picture
                </button>
              )}
            </div>

            <div className="settings-section">
              <h3>Background Image</h3>
              <p>Choose an image for your desktop background:</p>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundChange}
                className="file-input"
                id="bg-upload"
              />
              <label htmlFor="bg-upload" className="file-label">
                Choose Background
              </label>

              {backgroundImage && (
                <button 
                  onClick={resetBackground}
                  className="reset-button"
                >
                  Reset to Default
                </button>
              )}
            </div>

            <div className="settings-preview">
              {backgroundImage ? (
                <div className="preview-box">
                  <p>Current background:</p>
                  <img src={backgroundImage} alt="Background preview" />
                </div>
              ) : (
                <p className="no-preview">No custom background set</p>
              )}
            </div>
          </div>
        </Window>
      )}
    </div>
  );
}