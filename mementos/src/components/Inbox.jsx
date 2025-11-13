// src/components/Inbox.jsx
import { useState } from 'react';

export default function Inbox({ emails = [], profilePicture }) {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);

  const folders = ['Inbox', 'Important', 'Sent'];

  const filteredEmails = emails.filter(email => 
    email.folder === selectedFolder.toLowerCase()
  );

  const handleFolderChange = (folder) => {
    setSelectedFolder(folder.toLowerCase());
    setSelectedEmail(null);
  };

  return (
    <div className="qmail">
      <div className="qmail-header">
        <h1>Qmail</h1>
        <input 
          type="text" 
          placeholder="Search" 
          className="qmail-search"
        />
        <button className="qmail-pfp">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" />
          ) : (
            '👤'
          )}
        </button>
      </div>

      <div className="qmail-body">
        <div className="qmail-sidebar">
          {folders.map(folder => (
            <button
              key={folder}
              className={`folder-button ${selectedFolder === folder.toLowerCase() ? 'active' : ''}`}
              onClick={() => handleFolderChange(folder)}
            >
              {folder}
            </button>
          ))}
        </div>

        <div className="qmail-list">
          {selectedEmail ? (
            <div className="email-view">
              <button onClick={() => setSelectedEmail(null)}>← Back</button>
              <h2>{selectedEmail.subject}</h2>
              <div className="email-meta">
                <span>From: {selectedEmail.sender}</span>
                <span>{selectedEmail.date}</span>
              </div>
              <div className="email-body">
                {selectedEmail.body}
              </div>
            </div>
          ) : (
            filteredEmails.map(email => (
              <div 
                key={email.id} 
                className="email-row"
                onClick={() => setSelectedEmail(email)}
              >
                <div className="email-subject">{email.subject}</div>
                <div className="email-sender">{email.sender}</div>
                <div className="email-date">{email.date}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}