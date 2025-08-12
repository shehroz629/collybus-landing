"use client";

import Image from "next/image";
import React, { useState } from "react";

interface BioCardProps {
  imageSrc: string;
  altText: string;
  name: string;
  title: string;
  bio: React.ReactNode;
}

const BioCard: React.FC<BioCardProps> = ({
  imageSrc,
  altText,
  name,
  title,
  bio,
}) => {
  const [isBioVisible, setIsBioVisible] = useState(false);

  const toggleBioVisibility = () => {
    setIsBioVisible(!isBioVisible);
  };

  return (
    <div className="bg-black p-6 rounded-lg shadow-lg text-center">
      <Image
        src={imageSrc}
        alt={altText}
        width={128}
        height={128}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-2xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-yellow-400 mb-4">{title}</p>
      <button
        onClick={toggleBioVisibility}
        className="text-yellow-400 hover:text-yellow-300 font-medium mb-4 focus:outline-none cursor-pointer"
      >
        {isBioVisible ? "Hide Bio \u2191" : "Read Bio \u2193"}
      </button>
      {isBioVisible && (
        <div className="text-gray-200 text-sm font-normal text-left">{bio}</div>
      )}
    </div>
  );
};

export default BioCard;
