// src/components/Desktop.jsx
import { useState, useEffect } from "react";
import Window from "./Window";
import Inbox from "./Inbox";
import Library from "./Library";
import DownloadQueue from "./DownloadQueue";
import { libraryItems } from "../data/library";
import { useGame } from "../context/GameContext";

export default function Desktop() {
  // Game state from context
  const {
    gameStarted,
    gameEnded,
    startGame,
    deliveredEmails,
    currentDownloadSpeed,
    currentDay,
    systemMessages,
    dismissMessage,
    unreadCount
  } = useGame();

  const [openWindows, setOpenWindows] = useState({
    inbox: false,
    library: false,
    downloads: false,
    settings: false,
  });
  const [queue, setQueue] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  // Auto-open inbox when game starts
  useEffect(() => {
    if (gameStarted && !openWindows.inbox) {
      setOpenWindows(prev => ({ ...prev, inbox: true }));
    }
  }, [gameStarted]);

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

  // Track last seen day for transitions
  const [lastSeenDay, setLastSeenDay] = useState(0);
  const [showDayTransition, setShowDayTransition] = useState(false);

  // Show day transition when day changes
  useEffect(() => {
    if (gameStarted && currentDay > lastSeenDay) {
      setShowDayTransition(true);
      setLastSeenDay(currentDay);
    }
  }, [currentDay, gameStarted, lastSeenDay]);

  const dismissDayTransition = () => {
    setShowDayTransition(false);
  };

  // Show start screen if game hasn't started
  if (!gameStarted) {
    return (
      <div className="desktop game-start-screen">
        <div className="login-container">
          <div className="login-avatar">
            {profilePicture ? (
              <img src={profilePicture} alt="User" />
            ) : (
              '👤'
            )}
          </div>
          <div className="login-username">Player</div>
          <button className="login-button" onClick={startGame}>
            Log In
          </button>
          <div className="login-footer">
            November 10, 2025 • 9:00 AM
          </div>
        </div>
      </div>
    );
  }

  // Show end screen if game has ended
  if (gameEnded) {
    return (
      <div className="desktop game-end-screen">
        <div className="end-screen-content">
          <h1>Vault Digital has shut down.</h1>
          <p className="end-message">Your downloads are all that remain.</p>
          <div className="end-stats">
            <h2>Final Statistics</h2>
            {/* Stats will be displayed here */}
          </div>
        </div>
      </div>
    );
  }

  // Day transition data
  const getDayTransitionData = (day) => {
    const shutdownDate = "November 13, 2025 at 11:59 PM";
    const hoursLeft = 72 - ((day - 1) * 24);

    switch(day) {
      case 1:
        return {
          title: "Day 1: Discovery",
          subtitle: "November 10, 2025",
          info: [
            `Service shutdown: ${shutdownDate}`,
            `Time remaining: ${hoursLeft} hours`,
            "Download speed: High (75 GB/hour)",
            "This is your best chance to save everything."
          ],
          warning: null
        };
      case 2:
        return {
          title: "Day 2: Degradation",
          subtitle: "November 11, 2025",
          info: [
            `Service shutdown: ${shutdownDate}`,
            `Time remaining: ${hoursLeft} hours`,
            "Download speed: Reduced (60 GB/hour)",
            "Network conditions are worsening."
          ],
          warning: "You won't be able to save everything."
        };
      case 3:
        return {
          title: "Day 3: Final Hours",
          subtitle: "November 12, 2025",
          info: [
            `Service shutdown: ${shutdownDate}`,
            `Time remaining: ${hoursLeft} hours`,
            "Download speed: Congested (50 GB/hour)",
            "Choose what matters most."
          ],
          warning: "This is your last chance."
        };
      default:
        return null;
    }
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
      {/* Day Transition Screen */}
      {showDayTransition && (
        <div className="day-transition-screen">
          <div className="day-transition-content">
            {(() => {
              const data = getDayTransitionData(currentDay);
              return data ? (
                <>
                  <h1>{data.title}</h1>
                  <div className="day-transition-subtitle">{data.subtitle}</div>
                  <div className="day-transition-info">
                    {data.info.map((line, i) => (
                      <p key={i}>
                        {line.includes(':') ? (
                          <>
                            <strong>{line.split(':')[0]}:</strong> {line.split(':').slice(1).join(':')}
                          </>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                  {data.warning && (
                    <div className="day-transition-warning">{data.warning}</div>
                  )}
                  <button className="continue-button" onClick={dismissDayTransition}>
                    Continue
                  </button>
                </>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {/* System messages overlay */}
      {systemMessages.length > 0 && (
        <div className="system-messages">
          {systemMessages.map(msg => (
            <div key={msg.id} className="system-message">
              <p>{msg.message}</p>
              <button onClick={() => dismissMessage(msg.id)}>OK</button>
            </div>
          ))}
        </div>
      )}

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <button onClick={() => toggleWindow("inbox")}>
            Inbox {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>
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
          <Inbox emails={deliveredEmails} profilePicture={profilePicture} />
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
            downloadSpeed={currentDownloadSpeed}
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