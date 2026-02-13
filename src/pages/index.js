"use client";

import { useState } from 'react';
import Parallax from '@/components/Parallax.tsx';
import StarterSelection from '@/components/StarterSelection.tsx';

function Home() {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <>
      {!selectedType && <StarterSelection onSelect={handleTypeSelect} />}
      {selectedType && <Parallax type={selectedType} />}
    </>
  );
}

export default Home;