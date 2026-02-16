import React from "react";
import styles from "./PrizesSection.module.css";

interface PrizeItem {
  title: string;
  description: string;
  imagePath: string;
}

const prizes: PrizeItem[] = [
  {
    title: "1st Place",
    description: "Grand champion trophy + premium rewards.",
    imagePath: "/prizes/1st.png",
  },
  {
    title: "2nd Place",
    description: "Runner-up trophy + special perks.",
    imagePath: "/prizes/2nd.png",
  },
  {
    title: "3rd Place",
    description: "Top-three trophy + recognition.",
    imagePath: "/prizes/3rd.png",
  },
];

const PrizesSection: React.FC = () => {
  return (
    <section className={styles.prizesSection}>
      <div className={styles.sectionInner}>
        <h2 className={styles.title}>Prizes</h2>
        <p className={styles.subtitle}>Trophies worthy of legendary competitors.</p>

        <div className={styles.trophyRow}>
          {prizes.map((prize) => (
            <div key={prize.title} className={styles.trophyItem}>
              <article className={styles.trophyCard}>
                <div className={styles.imageWrap}>
                  <img src={prize.imagePath} alt={prize.title} className={styles.trophyImage} />
                </div>
              </article>
              <p className={styles.trophyLabel}>{prize.title.split(" ")[0]}</p>
            </div>
          ))}
        </div>

        <div className={styles.podium} aria-hidden="true" />
      </div>
    </section>
  );
};

export default PrizesSection;
