"use client";

import { useState } from "react";
import styles from "./StarterSelection.module.css";

interface StarterSelectionProps {
    onSelect: (type: "fire" | "water") => void;
}

export default function StarterSelection({ onSelect }: StarterSelectionProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSelect = (type: "fire" | "water") => {
        setIsAnimating(true);
        setTimeout(() => {
            onSelect(type);
        }, 800); // Delay for animation
    };

    return (
        <div className={`${styles.container} ${isAnimating ? styles.fadeOut : ""}`}>
            <div className={styles.content}>
                <h1 className={styles.title}>Choose Your Starter Pokemon</h1>
                <p className={styles.subtitle}>Select your path to begin your journey</p>

                <div className={styles.buttonContainer}>
                    <button
                        className={`${styles.button} ${styles.fireButton}`}
                        onClick={() => handleSelect("fire")}
                    >
                        <span className={styles.buttonIcon}>🔥</span>
                        <span className={styles.buttonText}>Fire</span>
                        <span className={styles.buttonSubtext}>Moltres & Ho-Oh</span>
                    </button>

                    <button
                        className={`${styles.button} ${styles.waterButton}`}
                        onClick={() => handleSelect("water")}
                    >
                        <span className={styles.buttonIcon}>💧</span>
                        <span className={styles.buttonText}>Water</span>
                        <span className={styles.buttonSubtext}>Kyogre & Lugia</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
