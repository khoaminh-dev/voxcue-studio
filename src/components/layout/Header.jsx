import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-title">
        <h1>Vietnamese Research Pitch</h1>
        <Badge variant="default">Draft</Badge>
      </div>
      
      <div className="header-actions">
        <Button variant="ghost" icon={Share2}>Share</Button>
        <Button variant="primary" icon={Download}>Export</Button>
      </div>
    </header>
  );
}
