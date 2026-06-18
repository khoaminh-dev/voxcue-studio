import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Playbar } from './Playbar';
import './Workspace.css';

export function Workspace({ children }) {
  return (
    <div className="workspace-layout">
      <Sidebar />
      <main className="workspace-main">
        <Header />
        <div className="workspace-content">
          {children}
        </div>
      </main>
      <Playbar />
    </div>
  );
}
