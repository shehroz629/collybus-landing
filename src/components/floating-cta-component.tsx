'use client';
import React, { useState } from 'react';
import ContactForm from './contact-form';

const FloatingCTAComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className={`
          fixed bottom-8 right-8 
          bg-[#f2c016] hover:bg-[#d9ad14] 
          text-black font-semibold 
          px-6 py-3 
          rounded-full 
          shadow-lg 
          transition-all 
          duration-300 
          ease-in-out 
          flex items-center 
          space-x-2 
          transform hover:scale-105
          z-50
          ${isModalOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}
        `}
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
          />
        </svg>
        <span>Get in Touch</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={handleModalClick}
        >
          <div 
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl 
              shadow-2xl max-w-2xl w-full max-h-[90vh] relative animate-fadeInUp 
              overflow-y-auto scrollbar-thin scrollbar-thumb-[#f2c016] scrollbar-track-transparent
              hover:scrollbar-thumb-[#d9ad14]"
            style={{
              backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0))'
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold z-50
                transition-colors duration-200 ease-in-out hover:scale-110 transform"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="px-6 py-8">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCTAComponent;