import React from "react";
import styles from "./SponsorsSection.module.css";

interface SponsorsSectionProps {
    type?: "fire" | "water" | "grass";
}

const SponsorsSection: React.FC<SponsorsSectionProps> = ({ type = "fire" }) => {
    const themeColor =
        type === "water" ? "#00ffff" : type === "grass" ? "#76ff03" : "#ffcc00";

    return (
        <section className={styles.sponsorsSection}>
            <div className={styles.sectionInner}>
                <h2 className={styles.title} style={{ color: themeColor }}>
                    Sponsors
                </h2>

                <div className={styles.logosRow}>
                    {/* Boot logo — dark blue glow */}
                    <div className={styles.logoItem}>
                        <div className={styles.logoWrap}>
                            <img
                                src="/logos/boot.webp"
                                alt="Boot"
                                className={`${styles.logo} ${styles.logoBoot}`}
                            />
                        </div>
                    </div>

                    {/* Nataraj logo — red glow */}
                    <div className={styles.logoItem}>
                        <div className={styles.logoWrap}>
                            <img
                                src="/logos/nataraj.webp"
                                alt="Nataraj"
                                className={`${styles.logo} ${styles.logoNataraj}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SponsorsSection;
