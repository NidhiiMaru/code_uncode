import React from "react";
import styles from "./PrizesSection.module.css";

interface PrizeItem {
  title: string;
  description: string;
  imagePath: string;
  prizeAmount: string;
}

const prizes: PrizeItem[] = [
  {
    title: "1st Place",
    description: "Grand champion trophy + premium rewards.",
    imagePath: "/prizes/1st.png",
    prizeAmount: "₹ 50,000",
  },
  {
    title: "2nd Place",
    description: "Runner-up trophy + special perks.",
    imagePath: "/prizes/2nd.png",
    prizeAmount: "₹ 30,000",
  },
  {
    title: "3rd Place",
    description: "Top-three trophy + recognition.",
    imagePath: "/prizes/3rd.png",
    prizeAmount: "₹ 20,000",
  },
];

interface PrizesSectionProps {
  type?: 'fire' | 'water' | 'grass';
}

const PrizesSection: React.FC<PrizesSectionProps> = ({ type = 'fire' }) => {
  const getThemeColors = () => {
    switch (type) {
      case 'water': return '#00ffff';
      case 'grass': return '#76ff03';
      case 'fire': default: return '#ffcc00';
    }
  };
  const themeColor = getThemeColors();

  return (
    <section className={styles.prizesSection}>
      <div className={styles.sectionInner}>
        <h2 className={styles.title} style={{ color: themeColor }}>Prizes</h2>
        <br />
        <div className={styles.trophyRow}>
          {prizes.map((prize) => (
            <div key={prize.title} className={styles.trophyItem}>
              <article className={styles.trophyCard}>
                <div className={styles.imageWrap}>
                  <img src={prize.imagePath} alt={prize.title} className={styles.trophyImage} />
                </div>
              </article>
              <div className={styles.labelContainer}>
                <p className={styles.trophyLabel} style={{ color: themeColor }}>{prize.title.split(" ")[0]}</p>
                <p className={styles.prizeAmount} style={{ color: themeColor }}>{prize.prizeAmount}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PrizesSection;
