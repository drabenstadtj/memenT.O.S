// src/components/Library.jsx
import { useState } from 'react';

export default function Library({ items = [], onAddToQueue }) {
  const [selectedCategory, setSelectedCategory] = useState('movies');
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  const categories = [
    { id: 'movies', label: 'Movies', icon: '🎬' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'books', label: 'Books', icon: '📚' },
    { id: 'files', label: 'Files', icon: '📁' }
  ];

  const filteredItems = items
    .filter(item => item.type === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.purchaseDate) - new Date(a.purchaseDate);
      } else if (sortBy === 'size') {
        return b.size - a.size;
      } else if (sortBy === 'lastAccessed') {
        return new Date(b.lastAccessed) - new Date(a.lastAccessed);
      }
      return 0;
    });

  return (
    <div className="vault-digital">
      <div className="vault-header">
        <h1>Vault Digital</h1>
        <input 
          type="text" 
          placeholder="Search" 
          className="vault-search"
        />
        <div className="vault-filters">
          <label>Filter by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date Purchased</option>
            <option value="size">Size</option>
            <option value="lastAccessed">Last Accessed</option>
          </select>
        </div>
      </div>

      <div className="vault-body">
        <div className="vault-sidebar">
          <h2>Media</h2>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-button ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedItem(null);
              }}
            >
              <span className="category-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="vault-grid">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="media-card"
              onClick={() => setSelectedItem(item)}
            >
              <div className="media-thumbnail">
                {item.icon || '📄'}
              </div>
              <div className="media-info">
                <div className="media-title">{item.title}</div>
                <div className="media-creator">by {item.creator}</div>
                <div className="media-date">{item.purchaseDate}</div>
                <div className="media-size">{item.size} GB</div>
              </div>
              <button 
                className="download-button-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToQueue(item);
                }}
              >
                ⬇
              </button>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div className="vault-details">
            <h2>Details</h2>
            <div className="details-content">
              <div className="details-title">{selectedItem.title}</div>
              
              <div className="details-thumbnail">
                {selectedItem.icon || '📄'}
              </div>

              <div className="details-metadata">
                <p><strong>Creator:</strong> {selectedItem.creator}</p>
                <p><strong>Date Purchased:</strong> {selectedItem.purchaseDate}</p>
                <p><strong>Size:</strong> {selectedItem.size} GB</p>
                <p><strong>Last Accessed:</strong> {selectedItem.lastAccessed}</p>
              </div>

              {selectedItem.notes && (
                <div className="details-notes">
                  <strong>Notes:</strong>
                  <p>{selectedItem.notes}</p>
                </div>
              )}

              <button 
                className="add-to-queue-button"
                onClick={() => onAddToQueue(selectedItem)}
              >
                Add to Download Queue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}