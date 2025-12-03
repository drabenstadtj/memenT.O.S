// src/config/gameConfig.js
// Game Manager Configuration for memenT.O.S
// Controls the 3-day narrative structure, email delivery, and download speeds

export const gameConfig = {
  // Game duration settings
  totalDays: 3,
  hoursPerDay: 24, // Real-time hours per game day (or set lower for faster gameplay)

  // Day 1: Discovery & Denial
  day1: {
    dayNumber: 1,
    title: "Discovery & Denial",
    description: "Initial shock and hope that everything can be saved",

    // Download speed configuration (in GB/hour)
    downloadSpeed: {
      base: 75, // Highest bandwidth day
      fluctuation: 0.1, // 10% variation
      interruptions: [] // No interruptions on Day 1
    },

    // Email delivery schedule (in hours from day start)
    emails: [
      {
        id: 'day1_shutdown_notice',
        deliveryTime: 0, // Arrives immediately at start
        folder: 'inbox',
        subject: 'URGENT: Vault Digital Service Termination Notice',
        sender: 'Vault Digital Support',
        priority: 'high',
        body: `Dear Valued Customer,

We regret to inform you that Vault Digital will be discontinuing its services effective November 13, 2025 at 11:59 PM.

Due to restructuring and changing market conditions, we will be ceasing all platform operations. All user accounts and associated content licenses will be terminated after this date.

IMPORTANT INFORMATION:
• Service termination: November 13, 2025 at 11:59 PM (72 hours from now)
• All content access will be permanently revoked
• No refunds will be issued for unused subscriptions or content licenses
• As per Section 12.7 of the Terms of Service, all purchases constitute non-exclusive, revocable licenses
• Downloaded content may be subject to DRM restrictions

For more information, please see our FAQ at vault-digital.com/shutdown-faq

We appreciate your business over the years.

Vault Digital Service Team

---
Sent: November 10, 2025 at 9:00 AM`
      },
      {
        id: 'day1_tos_retrieval',
        deliveryTime: 0.5, // 30 minutes after start
        folder: 'inbox',
        subject: 'RE: Your Vault Digital Terms of Service Agreement (2015)',
        sender: 'Vault Digital Legal Automated System',
        priority: 'normal',
        body: `This is an automated retrieval of your original Terms of Service agreement.

Date Accepted: January 15, 2015
IP Address: [REDACTED]
Agreement Version: 2.4.1

KEY SECTIONS (Auto-highlighted):

Section 7.2: License Grant
"Vault Digital grants you a non-exclusive, non-transferable, REVOCABLE license to access purchased content..."

Section 12.7: Service Termination
"Vault Digital reserves the right to terminate service at any time, with or without notice, for any reason..."

Section 18.3: Refund Policy
"No refunds will be issued for unused subscription periods, purchased licenses, or content access..."

Section 23.1: Ownership
"All content remains the property of Vault Digital and/or its licensors. Users do not acquire ownership rights through purchase..."

[Full Terms of Service document attached - 47 pages of legal text]

This message was automatically generated. Do not reply.`
      },
      {
        id: 'day1_alex_panic',
        deliveryTime: 1, // 1 hour after start
        folder: 'inbox',
        subject: 'Are you seeing this shit???',
        sender: 'Alex Chen',
        priority: 'normal',
        body: `Holy crap, did you get the email from Vault Digital?

I've spent THOUSANDS of dollars on this platform over the past ten years. Movies, games, music, everything. And they're just... shutting down? In 72 hours???

How is this even legal? I thought when I bought stuff it was MINE. Apparently not.

I'm downloading everything I can right now. You should too. I'm trying to get all the Criterion Collection films before they're gone - those alone cost me like $800.

This is insane. Let me know what you're able to save.

- Alex

P.S. - I checked, I've spent $4,783.32 on Vault Digital since 2015. For nothing.`
      }
    ]
  },

  // Day 2: Degradation & Reflection
  day2: {
    dayNumber: 2,
    title: "Degradation & Reflection",
    description: "Bandwidth degrades, forced prioritization, grief sets in",

    downloadSpeed: {
      base: 60, // 75% of Day 1 speed
      fluctuation: 0.15, // 15% variation
      interruptions: [
        {
          startHour: 12, // Noon on Day 2
          durationHours: 2,
          speedReduction: 0.4, // 40% reduction
          reason: "Your brother has started a large download. Bandwidth reduced.",
          cancellable: false
        }
      ]
    },

    emails: [
      {
        id: 'day2_faq_automated',
        deliveryTime: 0, // Start of Day 2
        folder: 'inbox',
        subject: 'Frequently Asked Questions: Service Termination',
        sender: 'Vault Digital Support (Automated)',
        priority: 'normal',
        body: `VAULT DIGITAL SERVICE TERMINATION - FAQ

Time Remaining: 48 Hours

Q: Will I receive a refund for my purchases?
A: No. As outlined in Section 18.3 of the Terms of Service, all sales are final. Digital licenses are non-refundable.

Q: Can I transfer my licenses to another platform?
A: No. Licenses are non-transferable as per Section 7.2 of the Terms of Service.

Q: Why wasn't there more advance notice?
A: Section 12.7 of the Terms of Service grants Vault Digital the right to terminate services at any time. We provided 72 hours notice, which exceeds our contractual obligation.

Q: What happens to my downloaded content?
A: Downloaded content may continue to function if DRM-free. DRM-protected content will cease to function after license verification fails.

Q: Can I sue for compensation?
A: Section 24.8 requires binding arbitration and waives class action rights.

Q: Who do I contact for additional support?
A: All support channels will close 24 hours before service termination. This FAQ contains all available information.

This is an automated message. Do not reply.`
      },
      {
        id: 'day2_alex_grief',
        deliveryTime: 8, // Morning of Day 2
        folder: 'inbox',
        subject: 'I can\'t save it all',
        sender: 'Alex Chen',
        priority: 'normal',
        body: `I've been up all night trying to download everything.

I'm only halfway through my music library. I haven't even started on games yet. There's no way I'm going to get it all.

I started looking at my purchase history. Every single thing I bought. $4,783.32 since 2015. For nothing.

Remember that documentary series we watched together? The one about the ocean? I bought the whole thing - $60. Never finished it. Thought I'd "get to it eventually."

Found all these games I bought on sale and never played. What was the point of collecting all this stuff if I never even used it?

I'm trying to decide what to save. Photos first, obviously. Then what? The music I actually listen to? Or the rare stuff I might never find again?

What are you prioritizing?

I don't know what the lesson is here. Maybe we were just hoarding instead of owning. Or maybe the lesson is simpler: never trust a corporation with your memories.

- Alex`
      },
      {
        id: 'day2_old_receipt',
        deliveryTime: 14, // Afternoon of Day 2
        folder: 'inbox',
        subject: 'Your purchase of "Criterion Collection Bundle" is complete!',
        sender: 'Vault Digital (2016)',
        priority: 'normal',
        body: `Thank you for your purchase!

Order #VD-2016-847392
Date: March 15, 2016
Amount: $799.99

YOU NOW OWN:
• Criterion Collection Ultimate Bundle (127 films)
• Lifetime access to your library
• Yours to enjoy forever

These timeless classics are now part of YOUR permanent collection. Stream or download anytime, anywhere.

Your library. Your memories. Forever.

Thank you for choosing Vault Digital!

---
[This email was automatically resurfaced from your archives]`
      }
    ]
  },

  // Day 3: Acceptance & Defiance
  day3: {
    dayNumber: 3,
    title: "Acceptance & Defiance",
    description: "Final hours, strategic curation, the end",

    downloadSpeed: {
      base: 50, // Further reduced due to network congestion
      fluctuation: 0.2, // 20% variation
      interruptions: [
        {
          startHour: 18, // 6 PM - final hours
          durationHours: 2,
          speedReduction: 0.3,
          reason: "Network congestion: Millions of users downloading simultaneously",
          cancellable: false
        }
      ]
    },

    emails: [
      {
        id: 'day3_final_warning',
        deliveryTime: 0, // Start of Day 3
        folder: 'inbox',
        subject: 'Final Reminder: Service Termination in 24 Hours',
        sender: 'Vault Digital',
        priority: 'urgent',
        body: `FINAL NOTICE

Vault Digital services will terminate in 24 hours.

Service End Time: November 13, 2025 at 11:59 PM

After this time:
• All accounts will be permanently deleted
• All content licenses will be revoked
• All remaining content will be permanently deleted
• No further access will be possible
• No exceptions will be made

Thank you for being a valued customer.

This is the final communication you will receive from Vault Digital.

Vault Digital Service Team

---
Sent: November 12, 2025 at 9:00 AM`
      },
      {
        id: 'day3_alex_acceptance',
        deliveryTime: 6, // Morning of Day 3
        folder: 'inbox',
        subject: '...',
        sender: 'Alex Chen',
        priority: 'normal',
        body: `I gave up trying to save everything around 3 AM.

It's impossible. There's not enough time. Not enough bandwidth. Even if I had a week, I don't think I could save it all.

So I focused on what actually matters:
• Photos - memories of people I love
• A few albums that got me through hard times
• That one game we used to play together
• Some movies I actually rewatch

Everything else? I'm letting it go.

Maybe this is the lesson. We were hoarding, not owning. Building a pile of "someday I'll watch/play/read this" that was never going to happen.

Or maybe the lesson is simpler: never trust a corporation with your memories. Never mistake a license for ownership. Never believe the words "forever" and "yours" in marketing copy.

I don't know. I'm too tired to be philosophical.

Good luck with your last few hours. Let me know what you managed to save when this is all over.

Maybe we can share files. At least save something.

- Alex`
      },
      {
        id: 'day3_system_congestion',
        deliveryTime: 18, // 6 PM - near the end
        folder: 'inbox',
        subject: 'Network Status: High Congestion Detected',
        sender: 'Vault Digital System Monitor',
        priority: 'high',
        body: `AUTOMATED SYSTEM ALERT

Bandwidth congestion detected across Vault Digital content delivery network.

Current active users: 4,283,921
Concurrent downloads: 28,392,847
Network capacity: 147% of maximum

Download speeds have been reduced due to unprecedented demand.

You are not alone.

---
This is an automated system message.`
      }
    ]
  },

  // Game end configuration
  endGame: {
    triggerTime: 72, // 72 hours (3 days) from start

    // Stats to calculate
    stats: [
      'totalLibrarySize',
      'totalDownloaded',
      'percentageSaved',
      'itemsInLibrary',
      'itemsSaved',
      'itemsLost'
    ],

    // End screen messages
    epilogue: {
      title: "Vault Digital has shut down.",
      message: "Your downloads are all that remain.",
      creditsDelay: 3000 // ms before showing credits
    }
  }
};

// Helper function to calculate time-based events
export function getEventsForGameTime(currentGameTime) {
  const events = {
    emails: [],
    downloadSpeedChanges: [],
    systemMessages: []
  };

  // Determine current day
  const currentDay = Math.floor(currentGameTime / 24) + 1;
  const hourInDay = currentGameTime % 24;

  if (currentDay > 3) {
    return { ...events, gameEnded: true };
  }

  const dayConfig = gameConfig[`day${currentDay}`];

  // Check for emails to deliver
  dayConfig.emails.forEach(email => {
    if (Math.abs(hourInDay - email.deliveryTime) < 0.1) { // Within 6 minutes
      events.emails.push(email);
    }
  });

  // Check for speed interruptions
  dayConfig.downloadSpeed.interruptions.forEach(interruption => {
    const interruptionEnd = interruption.startHour + interruption.durationHours;
    if (hourInDay >= interruption.startHour && hourInDay < interruptionEnd) {
      events.downloadSpeedChanges.push({
        type: 'interruption',
        speedMultiplier: 1 - interruption.speedReduction,
        reason: interruption.reason
      });
    }
  });

  return events;
}

// Calculate current download speed based on game time
export function getCurrentDownloadSpeed(currentGameTime) {
  const currentDay = Math.floor(currentGameTime / 24) + 1;
  if (currentDay > 3) return 0;

  const hourInDay = currentGameTime % 24;
  const dayConfig = gameConfig[`day${currentDay}`];

  let speed = dayConfig.downloadSpeed.base;

  // Apply random fluctuation
  const fluctuation = 1 + (Math.random() - 0.5) * 2 * dayConfig.downloadSpeed.fluctuation;
  speed *= fluctuation;

  // Check for interruptions
  dayConfig.downloadSpeed.interruptions.forEach(interruption => {
    const interruptionEnd = interruption.startHour + interruption.durationHours;
    if (hourInDay >= interruption.startHour && hourInDay < interruptionEnd) {
      speed *= (1 - interruption.speedReduction);
    }
  });

  return Math.round(speed * 10) / 10; // Round to 1 decimal
}

// Get time remaining until shutdown
export function getTimeRemaining(currentGameTime) {
  const hoursRemaining = 72 - currentGameTime;
  return {
    hours: Math.floor(hoursRemaining),
    minutes: Math.floor((hoursRemaining % 1) * 60),
    totalHours: hoursRemaining
  };
}
