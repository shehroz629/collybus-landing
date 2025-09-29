'use client';

import dynamic from 'next/dynamic';

const FloatingCTAComponent = dynamic(() => import('./floating-cta-component'), {
  ssr: false
});

const FloatingCTA = () => {
  return <FloatingCTAComponent />;
};

export default FloatingCTA;