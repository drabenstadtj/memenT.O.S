# memenT.O.S Game Manager Documentation

## Overview

The game manager system controls the narrative flow of memenT.O.S, including email delivery timing, download speeds, and the 3-day structure. This system allows you to script the entire game experience through a configuration file.

## Files

- **[src/config/gameConfig.js](src/config/gameConfig.js)** - Main configuration file for the game
- **[src/context/GameContext.jsx](src/context/GameContext.jsx)** - React context managing game state
- **[src/components/Desktop.jsx](src/components/Desktop.jsx)** - Main component using game state
- **[src/components/DownloadQueue.jsx](src/components/DownloadQueue.jsx)** - Download simulation component

## How It Works

### Time System

The game runs on a **time scale** system where real-world time maps to in-game time:

- **Default**: `timeScale = 60` means 1 real-world minute = 1 game hour
- **Real-time**: `timeScale = 1` means 1 real-world second = 1 game second
- **Fast mode**: `timeScale = 3600` means 1 real-world second = 1 game hour (for testing)

You can adjust this in the GameContext:
```javascript
const { setGameTimeScale } = useGame();
setGameTimeScale(3600); // Fast forward for testing
```

### Game Structure

The game is divided into **3 days** (72 hours total):

1. **Day 1: Discovery & Denial** (0-24 hours)
   - High bandwidth (75 GB/hour)
   - Initial shock emails
   - No interruptions

2. **Day 2: Degradation & Reflection** (24-48 hours)
   - Reduced bandwidth (60 GB/hour)
   - Bandwidth interruptions (family member downloading)
   - Grief and reflection emails

3. **Day 3: Acceptance & Defiance** (48-72 hours)
   - Further reduced bandwidth (50 GB/hour)
   - Network congestion
   - Final emails and acceptance

## Configuring Emails

### Email Structure

Each email in `gameConfig.js` has the following properties:

```javascript
{
  id: 'unique_email_id',           // Unique identifier
  deliveryTime: 0,                 // Hours from day start (0-24)
  folder: 'inbox',                 // Which folder ('inbox', 'sent', etc.)
  subject: 'Email Subject',        // Subject line
  sender: 'Sender Name',           // Who sent it
  priority: 'normal',              // 'normal', 'high', 'urgent'
  body: `Email body text...`       // Full email content (use template literals)
}
```

### Adding New Emails

To add a new email to any day:

1. Open `src/config/gameConfig.js`
2. Find the day configuration (e.g., `day1`, `day2`, `day3`)
3. Add a new email object to the `emails` array:

```javascript
day2: {
  // ... other config
  emails: [
    // ... existing emails
    {
      id: 'day2_new_email',
      deliveryTime: 16,  // 4 PM on Day 2
      folder: 'inbox',
      subject: 'Your custom subject',
      sender: 'Custom Sender',
      priority: 'normal',
      body: `Your email content here.

Can use multiple lines and paragraphs.

- Bullet points
- Work too!`
    }
  ]
}
```

### Email Timing

- `deliveryTime: 0` - Start of the day
- `deliveryTime: 0.5` - 30 minutes into the day
- `deliveryTime: 6` - 6 hours into the day
- `deliveryTime: 23.5` - 30 minutes before day ends

The system automatically delivers emails when game time reaches that point.

## Configuring Download Speeds

### Download Speed Structure

Each day has a `downloadSpeed` configuration:

```javascript
downloadSpeed: {
  base: 75,              // Base speed in GB/hour
  fluctuation: 0.1,      // Random variation (10% in this case)
  interruptions: []      // Array of interruption events
}
```

### Base Speed

The `base` value is the primary download speed in **GB/hour**:
- Day 1: 75 GB/hour (fastest)
- Day 2: 60 GB/hour (degraded)
- Day 3: 50 GB/hour (congested network)

### Fluctuation

Random speed variation to simulate network inconsistency:
- `0.1` = ±10% variation
- `0.2` = ±20% variation
- Speed fluctuates every second within this range

### Interruptions

Temporary speed reductions at specific times:

```javascript
interruptions: [
  {
    startHour: 12,                    // Starts at noon
    durationHours: 2,                 // Lasts 2 hours
    speedReduction: 0.4,              // 40% speed reduction
    reason: "Your brother has started a large download.",
    cancellable: false                // Player cannot stop this
  }
]
```

**Example**: Adding a new interruption to Day 3:

```javascript
day3: {
  downloadSpeed: {
    base: 50,
    fluctuation: 0.2,
    interruptions: [
      // Existing interruption...
      {
        startHour: 20,              // 8 PM on Day 3
        durationHours: 1,           // 1 hour duration
        speedReduction: 0.5,        // 50% speed cut
        reason: "ISP throttling detected during peak hours",
        cancellable: false
      }
    ]
  }
}
```

## Download Progress Simulation

Downloads progress automatically based on:
1. **Item size** (in GB)
2. **Current download speed** (GB/hour)
3. **Whether paused** by the player

The formula:
```javascript
progressPerSecond = (downloadSpeed / itemSize / 3600) * 100
```

Example:
- Item size: 5 GB
- Download speed: 75 GB/hour
- Progress per second: (75 / 5 / 3600) * 100 = 0.417% per second
- Time to complete: ~4 minutes real-time (at timeScale=60)

## Testing the Game

### Quick Testing

To test the full game quickly, adjust the time scale in `GameContext.jsx`:

```javascript
// In GameProvider component
const [timeScale, setTimeScale] = useState(3600); // 1 second = 1 hour
```

This makes the entire 72-hour game play out in 72 seconds.

### Debugging Emails

To see all emails immediately (for testing content):

```javascript
// Temporarily set all deliveryTime to 0
day1: {
  emails: [
    { deliveryTime: 0, /* ... */ },  // All show up at start
    { deliveryTime: 0, /* ... */ },
    { deliveryTime: 0, /* ... */ }
  ]
}
```

### Debugging Download Speeds

To test with very high speeds:

```javascript
day1: {
  downloadSpeed: {
    base: 1000,  // 1000 GB/hour = downloads complete instantly
    fluctuation: 0,
    interruptions: []
  }
}
```

## Advanced Customization

### Adding a 4th Day

1. Add `day4` configuration to `gameConfig.js`:
```javascript
day4: {
  dayNumber: 4,
  title: "Aftermath",
  description: "Post-shutdown reality",
  downloadSpeed: { base: 0, fluctuation: 0, interruptions: [] },
  emails: [/* your emails */]
}
```

2. Update `totalDays` in config:
```javascript
export const gameConfig = {
  totalDays: 4,  // Changed from 3
  // ...
}
```

3. Update end game trigger:
```javascript
endGame: {
  triggerTime: 96,  // 4 days * 24 hours
  // ...
}
```

### Dynamic Events

You can add custom events in `gameConfig.js` using the helper functions:

```javascript
// In getEventsForGameTime function
if (currentDay === 2 && hourInDay === 18) {
  events.systemMessages.push({
    message: "Power outage! Downloads paused for 30 minutes.",
    duration: 0.5
  });
}
```

## System Messages

System messages appear as modal dialogs. They're triggered by:
1. Bandwidth interruptions (automatic)
2. Custom events in `getEventsForGameTime()`
3. Manual triggers in components

To add a system message programmatically:
```javascript
const { systemMessages, dismissMessage } = useGame();

// Messages appear automatically from the game config
// User can dismiss them
```

## Game State Access

From any component, you can access game state:

```javascript
import { useGame } from '../context/GameContext';

function MyComponent() {
  const {
    gameTime,              // Current game time in hours (0-72)
    currentDay,            // Current day (1-3)
    deliveredEmails,       // All emails delivered so far
    currentDownloadSpeed,  // Current download speed in GB/hour
    timeRemaining,         // {hours, minutes, totalHours} until shutdown
    unreadCount,           // Number of unread emails
    gameStarted,           // Has game started?
    gameEnded              // Has game ended?
  } = useGame();

  // Use these values in your component
}
```

## Tips for Scriptwriting

1. **Email Pacing**: Space emails at least 1-2 hours apart to avoid overwhelming the player
2. **Narrative Arc**: Use early emails for worldbuilding, middle for emotional beats, late for reflection
3. **Download Strategy**: Make Day 1 feel hopeful (high speed), Day 2 realistic (medium speed), Day 3 desperate (low speed)
4. **Interruptions**: Use sparingly - they're most impactful when unexpected
5. **System Messages**: Reserve for major events that require immediate attention

## Example: Adding a New Narrative Beat

Let's add a sequence where the player's friend sends updates throughout Day 2:

```javascript
day2: {
  // ... existing config
  emails: [
    // ... existing emails
    {
      id: 'day2_friend_morning',
      deliveryTime: 8,
      folder: 'inbox',
      subject: 'Still at it',
      sender: 'Alex Chen',
      priority: 'normal',
      body: `Been downloading all night. My computer is hot to the touch.

Found some old photos in my library. 2018. Happier times.

How are you holding up?`
    },
    {
      id: 'day2_friend_afternoon',
      deliveryTime: 14,
      folder: 'inbox',
      subject: 'Making choices',
      sender: 'Alex Chen',
      priority: 'normal',
      body: `Had to start deleting things from my download queue.

Can't save it all. Not even close.

Decided to focus on irreplaceable stuff. Photos. Videos of family.

The rest is just... stuff. Right?`
    },
    {
      id: 'day2_friend_evening',
      deliveryTime: 20,
      folder: 'inbox',
      subject: 'RE: Making choices',
      sender: 'Alex Chen',
      priority: 'normal',
      body: `Sorry for all the emails. I think I'm processing this by talking to you.

Tomorrow is the last day. Can you believe it?

Get some sleep. Tomorrow we finish this.`
    }
  ]
}
```

This creates a three-beat emotional arc for Day 2, showing the friend's journey from exhaustion to acceptance.

---

## Quick Reference

| Configuration | Location | Purpose |
|--------------|----------|---------|
| Email content | `gameConfig.day[1-3].emails` | Add/edit narrative emails |
| Email timing | `email.deliveryTime` | When email appears (0-24 hours) |
| Download speed | `gameConfig.day[1-3].downloadSpeed.base` | Base download rate (GB/hour) |
| Speed variation | `gameConfig.day[1-3].downloadSpeed.fluctuation` | Random speed changes |
| Interruptions | `gameConfig.day[1-3].downloadSpeed.interruptions` | Temporary speed cuts |
| Time scale | `GameProvider` component | How fast time passes |
| Game duration | `gameConfig.totalDays` | Number of days (default: 3) |

## Need Help?

- Check the existing email configurations for formatting examples
- Use template literals (\`backticks\`) for multi-line email bodies
- Test with fast time scales first (`timeScale = 3600`)
- All times are in hours from the start of each day

Happy scripting! 🎮
