'use client';

import React, { useState, useEffect } from 'react';

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a fragment to avoid div nesting issues
  return <>{mounted ? children : null}</>;
};

export default ClientWrapper;
