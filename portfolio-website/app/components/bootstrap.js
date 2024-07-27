"use client";

import { useEffect } from 'react';

const Bootstrap = () => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return null;
};

export default Bootstrap;
