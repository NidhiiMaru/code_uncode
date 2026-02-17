"use client";

import { useState } from 'react';
import Parallax from '@/components/Parallax.tsx';
import StarterSelection from '@/components/StarterSelection.tsx';
import KantoPokemonQuiz from '@/components/KantoPokemonQuiz.tsx';
import AboutPokedex from '@/components/AboutPokedex.tsx';
import PrizesSection from '@/components/PrizesSection.tsx';

function Home() {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  // Background image mapping based on type
  const getBackgroundImage = () => {
    if (selectedType === 'fire') return '/parallax/parallax_fire/red-bg.png';
    if (selectedType === 'water') return '/parallax/parallax_water/water-bg.png';
    if (selectedType === 'grass') return '/parallax/parallax_grass/grassbg.png';
    return '';
  };

  return (
    <>
      {!selectedType && <StarterSelection onSelect={handleTypeSelect} />}
      {selectedType && (
        <>
          {/* Fixed Pokémon background for entire page */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${getBackgroundImage()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              zIndex: -1,
            }}
          />
          <Parallax type={selectedType} />
          {/* Continuous overlay wrapper for all sections after hero */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.6)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <AboutPokedex />
              <PrizesSection />
              <KantoPokemonQuiz />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;