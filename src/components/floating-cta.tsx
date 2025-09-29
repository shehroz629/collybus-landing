'use client';

import dynamic from 'next/dynamic';
import ContactForm from './contact-form';

const FloatingCTAComponent = dynamic(() => import('./floating-cta-component'), {
  ssr: false, // This disables server-side rendering for this component
});

const FloatingCTA = () => {
  return <FloatingCTAComponent />;
};

export default FloatingCTA;
