import React from 'react';
import { UploadCloud, FileAudio } from 'lucide-react';
import { Card } from '../atoms/Card';
import './UploadZone.css';

export function UploadZone() {
  return (
    <Card className="upload-zone">
      <div className="upload-content">
        <div className="upload-icon-wrapper">
          <UploadCloud size={32} />
        </div>
        <h3>Upload Media</h3>
        <p>Drag and drop your video or audio file here, or click to browse.</p>
        
        <div className="upload-formats">
          <span>MP4, MOV, MP3, WAV</span>
          <span>Max 2GB</span>
        </div>
      </div>
    </Card>
  );
}
