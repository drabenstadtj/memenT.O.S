// src/context/GameContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { gameConfig, getCurrentDownloadSpeed, getTimeRemaining, getEventsForGameTime } from '../config/gameConfig';

const GameContext = createContext();

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}

export function GameProvider({ children }) {
  // Core game state
  const [gameTime, setGameTime] = useState(0); // Hours elapsed since game start
  const [currentDay, setCurrentDay] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Time acceleration (1 = real-time, 60 = 1 real minute = 1 game hour)
  const [timeScale, setTimeScale] = useState(60); // Default: 1 real minute = 1 game hour

  // Email state
  const [deliveredEmails, setDeliveredEmails] = useState([]);
  const [unreadEmailIds, setUnreadEmailIds] = useState([]);

  // Download state
  const [currentDownloadSpeed, setCurrentDownloadSpeed] = useState(75);
  const [speedInterruptions, setSpeedInterruptions] = useState([]);

  // System messages (popups/notifications)
  const [systemMessages, setSystemMessages] = useState([]);

  // Game statistics
  const [stats, setStats] = useState({
    totalLibrarySize: 0,
    totalDownloaded: 0,
    itemsSaved: 0,
    itemsLost: 0
  });

  // Start the game
  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameTime(0);
    setCurrentDay(1);
    setGameEnded(false);

    // Deliver Day 1 starting emails immediately
    const day1Emails = gameConfig.day1.emails.filter(e => e.deliveryTime === 0);
    setDeliveredEmails(day1Emails);
    setUnreadEmailIds(day1Emails.map(e => e.id));
  }, []);

  // Pause/Resume game
  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Adjust time scale (for testing/gameplay)
  const setGameTimeScale = useCallback((scale) => {
    setTimeScale(scale);
  }, []);

  // Mark email as read
  const markEmailAsRead = useCallback((emailId) => {
    setUnreadEmailIds(prev => prev.filter(id => id !== emailId));
  }, []);

  // Main game loop - runs every second
  useEffect(() => {
    if (!gameStarted || gameEnded || isPaused) return;

    const interval = setInterval(() => {
      setGameTime(prevTime => {
        const newTime = prevTime + (timeScale / 3600); // Convert scale to hours

        // Check if game should end
        if (newTime >= 72) {
          setGameEnded(true);
          return 72;
        }

        // Update current day
        const newDay = Math.floor(newTime / 24) + 1;
        if (newDay !== currentDay) {
          setCurrentDay(newDay);
        }

        // Check for events at this time
        const events = getEventsForGameTime(newTime);

        // Deliver new emails
        if (events.emails.length > 0) {
          setDeliveredEmails(prev => {
            const newEmails = events.emails.filter(
              email => !prev.some(e => e.id === email.id)
            );
            if (newEmails.length > 0) {
              setUnreadEmailIds(prevUnread => [
                ...prevUnread,
                ...newEmails.map(e => e.id)
              ]);
            }
            return [...prev, ...newEmails];
          });
        }

        // Handle download speed changes
        if (events.downloadSpeedChanges.length > 0) {
          const interruption = events.downloadSpeedChanges[0];
          setSpeedInterruptions([interruption]);

          // Show system message for interruption
          if (interruption.reason) {
            setSystemMessages(prev => [...prev, {
              id: `msg_${Date.now()}`,
              message: interruption.reason,
              timestamp: newTime
            }]);
          }
        } else {
          setSpeedInterruptions([]);
        }

        // Update download speed
        const newSpeed = getCurrentDownloadSpeed(newTime);
        setCurrentDownloadSpeed(newSpeed);

        return newTime;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [gameStarted, gameEnded, isPaused, timeScale, currentDay]);

  // Dismiss system message
  const dismissMessage = useCallback((messageId) => {
    setSystemMessages(prev => prev.filter(m => m.id !== messageId));
  }, []);

  // Calculate game statistics
  const updateStats = useCallback((newStats) => {
    setStats(prev => ({ ...prev, ...newStats }));
  }, []);

  // Get formatted time remaining
  const timeRemaining = getTimeRemaining(gameTime);

  // Context value
  const value = {
    // Game state
    gameTime,
    currentDay,
    gameStarted,
    gameEnded,
    isPaused,
    timeScale,

    // Actions
    startGame,
    togglePause,
    setGameTimeScale,

    // Email system
    deliveredEmails,
    unreadEmailIds,
    markEmailAsRead,
    unreadCount: unreadEmailIds.length,

    // Download system
    currentDownloadSpeed,
    speedInterruptions,

    // System messages
    systemMessages,
    dismissMessage,

    // Stats
    stats,
    updateStats,

    // Computed values
    timeRemaining,
    hoursRemaining: timeRemaining.totalHours,

    // Game config access
    gameConfig
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
