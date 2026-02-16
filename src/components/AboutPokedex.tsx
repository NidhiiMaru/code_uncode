import React, { useState } from 'react';
import styles from './AboutPokedex.module.css';

// Define the shape of your custom content
interface CustomDexContent {
  title: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
}

const Pokedex: React.FC = () => {
  // 1. Set your custom text here
  const [content] = useState<CustomDexContent>({
    title: "CODE UNCODE",
    description: "Join us for an immersive competitive programming experience featuring 1,600+ participants from 370+ institutes across India, with an electrifying grand finale in Mumbai.",
    stats: [
      { label: "RANK", value: "CHAMPION" },
      { label: "ORIGIN", value: "KANTO" },
      { label: "BADGES", value: "8/8" },
      { label: "LEVEL", value: "100" },
      { label: "EXP", value: "MAX" }
    ],
    imageUrl: "https://via.placeholder.com/150" // Replace with your image link
  });

  return (
    <section className={styles.pokedexWrapper}>
      {/* LEFT PANEL */}
      <div className={`${styles.panel} ${styles.leftPanel}`}>
        <div className={styles.topLights}>
          <div className={styles.bigBlueLight}><div className={styles.innerReflection} /></div>
          <div className={`${styles.smallLight} ${styles.red}`} />
          <div className={`${styles.smallLight} ${styles.yellow}`} />
          <div className={`${styles.smallLight} ${styles.green}`} />
        </div>

        {/* MAIN SCREEN (Left side) */}
        <div className={styles.screenBorder}>
          <div className={styles.screenGlass}>
            <img 
              src={content.imageUrl} 
              alt="Custom Visual" 
              className={styles.displayImage} 
            />
          </div>
          <div className={styles.screenFooter}>
             <div className={styles.redButtonSmall} />
             <div className={styles.speakerGrill} />
          </div>
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.blackCircleBtn} />
          <div className={styles.pillBtns}>
            <div className={`${styles.pill} ${styles.red}`} />
            <div className={`${styles.pill} ${styles.blue}`} />
          </div>
          <div className={styles.dPad}>
             <div className={styles.dPadCross} />
          </div>
        </div>
        
        {/* GREEN BOX (Left side) */}
        <div className={styles.greenScreenLeft}>
           {content.title}
        </div>
      </div>

      <div className={styles.hinge} />

      {/* RIGHT PANEL (The "Blanks") */}
      <div className={`${styles.panel} ${styles.rightPanel}`}>
        
        {/* TOP BLACK/GREEN SCREEN */}
        <div className={styles.infoDisplay}>
          {content.stats.map((stat, index) => (
            <div key={index} className={styles.statLine}>
              <span className={styles.label}>{stat.label}:</span>
              <span className={styles.value}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* THE BLUE GRID BUTTONS */}
        <div className={styles.blueGrid}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={styles.blueKey} />
          ))}
        </div>

        {/* BOTTOM SECTION */}
        <div className={styles.bottomControlsRight}>
          <div className={styles.whiteInputBlanks}>
            <div className={styles.whiteBox}>LEVEL 100</div>
            <div className={styles.whiteBox}>EXP: MAX</div>
          </div>
          
          {/* DESCRIPTION AREA */}
          <div className={styles.descBox}>
            {content.description}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pokedex;