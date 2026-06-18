import React, { useState } from 'react';
import { Home, Folder, Mic2, Settings, User, Menu, ChevronLeft } from 'lucide-react';
import './Sidebar.css';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <div className="sidebar-top-section">
        <div className="sidebar-brand">
          <div className="brand-mark"></div>
          {isExpanded && <span className="brand-name">VoxCue Pro</span>}
        </div>
        
        <button 
          className="toggle-btn" 
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isExpanded ? <ChevronLeft size={18} /> : <Menu size={18} />}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <a href="#" className="nav-item active" title="Projects">
          <Folder size={20} className="nav-icon" />
          {isExpanded && <span className="nav-label">Projects</span>}
        </a>
        <a href="#" className="nav-item" title="Voice Library">
          <Mic2 size={20} className="nav-icon" />
          {isExpanded && <span className="nav-label">Voice Library</span>}
        </a>
      </nav>

      <div className="sidebar-bottom">
        <a href="#" className="nav-item" title="Settings">
          <Settings size={20} className="nav-icon" />
          {isExpanded && <span className="nav-label">Settings</span>}
        </a>
        <div className="user-profile" title="Dr. Alex Mercer">
          <div className="avatar"><User size={18} /></div>
          {isExpanded && <div className="user-info">
            <span className="user-name">Dr. Alex Mercer</span>
            <span className="user-role">Pro Plan</span>
          </div>}
        </div>
      </div>
    </aside>
  );
}
