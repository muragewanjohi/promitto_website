'use client';
import React from 'react';

const Map: React.FC = () => (
  <div className="relative h-64 rounded-xl overflow-hidden">
    <iframe
      src="https://www.google.com/maps?q=Pension+Towers,+Loita+St,+Nairobi&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="absolute inset-0 w-full h-full"
      title="Pension Towers Map"
    ></iframe>
  </div>
);

export default Map; 