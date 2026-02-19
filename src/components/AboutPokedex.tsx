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
    title: "Guidelines",
    description: "This is an individual event for students. Rounds: Prelims (Online, 16th Feb), Regionals (Offline, 19th-21st Feb at Somaiya, SPIT, DJ Sanghvi), Finals (23rd Feb at DJ Sanghvi). Each participant can register for up to 2 regionals.",
    stats: [
      { label: "EVENT TYPE", value: "SOLO" },
      { label: "ELIGIBILITY", value: "STUDENTS" },
      { label: "ROUNDS", value: "3" },
      { label: "MODE", value: "HYBRID" },
      { label: "FINALS", value: "MUMBAI" }
    ],
    imageUrl: "/pokedex/guide_image.png"
  });

  // Dummy images for interaction
  const dummyImages = [
    "/prizes/1st.png",
    "/prizes/2nd.png",
    "/prizes/3rd.png",
    "/logos/csispit.png",
    "/logos/codestars.png",
    "/logos/sdc.png",
    "/logos/ieeespit.png",
    "/parallax/parallax_fire/ho-oh.png",
    "/parallax/parallax_water/lugia.png",
    "/parallax/parallax_grass/celebi.png"
  ];

  const [currentImage, setCurrentImage] = useState(content.imageUrl);

  const handleBlueKeyClick = (index: number) => {
    // Use modulus to cycle through images if index > length
    const imgIndex = index % dummyImages.length;
    setCurrentImage(dummyImages[imgIndex]);
  };

  const [showMobileModal, setShowMobileModal] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h2 style={{
        fontSize: '3rem',
        color: '#ffcc00',
        marginBottom: '40px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: '4px 4px 0px #000000'
      }}>GUIDELINES/FAQs</h2>
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
                src={currentImage}
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
            <div className={styles.greenScreenContent}>
              <span>{content.title}</span>
              <button
                className={styles.infoButton}
                onClick={() => setShowMobileModal(!showMobileModal)}
                title="Show Details"
              >
                ⓘ
              </button>
            </div>
          </div>

          {/* MOBILE MODAL OVERLAY */}
          {showMobileModal && (
            <div className={styles.mobileModalOverlay} onClick={() => setShowMobileModal(false)}>
              <div className={styles.mobileModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h3>DETAILS</h3>
                  <button
                    className={styles.closeButton}
                    onClick={() => setShowMobileModal(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className={styles.modalStats}>
                  {content.stats.map((stat, index) => (
                    <div key={index} className={styles.modalStatLine}>
                      <span className={styles.modalLabel}>{stat.label}:</span>
                      <span className={styles.modalValue}>{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.modalDescription}>
                  {content.description}
                </div>
              </div>
            </div>
          )}
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
              <div
                key={i}
                className={styles.blueKey}
                onClick={() => handleBlueKeyClick(i)}
              />
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
    </div>
  );
};

export default Pokedex;