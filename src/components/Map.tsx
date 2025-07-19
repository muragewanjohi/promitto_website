'use client';
import React from 'react';

interface MapProps {
  location: string;
  title: string;
}

const Map: React.FC<MapProps> = ({ location, title }) => (
  <div className="relative h-64 rounded-xl overflow-hidden">
    <iframe
      src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="absolute inset-0 w-full h-full"
      title={title}
    ></iframe>
  </div>
);

export default Map; 