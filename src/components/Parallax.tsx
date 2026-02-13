"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./Parallax.module.css";

export default function Parallax() {
  const parallaxOuterRef = useRef<HTMLDivElement>(null);
  const mountains = useRef<HTMLDivElement>(null);
  const trees = useRef<HTMLDivElement>(null);
  const foreground = useRef<HTMLDivElement>(null);
  const hoOh = useRef<HTMLImageElement>(null);
  const moltres = useRef<HTMLImageElement>(null);
  const textContent = useRef<HTMLDivElement>(null);
  const mask = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxOuterRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 0.5, // Reduced for snappier response with Lenis
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Bird Movements
      tl.to(hoOh.current, { x: "-110vw", ease: "none" }, 0)
        .to(hoOh.current, { y: "-50vh", scale: 4, rotate: -15, ease: "power2.out" }, 0);

      tl.to(moltres.current, { x: "150vw", ease: "none" }, 0);
      tl.to(moltres.current, {
        keyframes: [
          { y: "-80vh", scale: 3.5, rotate: 15, ease: "power2.out" },
          { y: "-40vh", scale: 3.5, rotate: 15, ease: "power2.in" }
        ]
      }, 0);

      // 2. Reveal Logic - Mountains, Trees, and Foreground
      tl.to(mountains.current, { y: "-25%", ease: "none" }, 0);
      tl.to(trees.current, { y: "-45%", ease: "none" }, 0);
      tl.to(foreground.current, { y: "-65%", ease: "none" }, 0);

      // 3. Mask Movement - Syncing with the foreground rise
      // Ensure the mask reaches y: 0 by the end of the scroll to cover background
      tl.to(mask.current, { y: "-80vh", ease: "none" }, 0);

    }, parallaxOuterRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={parallaxOuterRef} className={styles.parallaxContainer}>
        <div ref={mountains} className={styles.layer}>
          <img src="/parallax/mountains.png" alt="mountains" />
        </div>
        <div ref={trees} className={styles.layer}>
          <img src="/parallax/trees.png" alt="trees" />
        </div>

        <div ref={textContent} className={styles.copy}>
          <img className={styles.heroLogo} src="/parallax/uncode-logo.png" alt="Logo" />
          <h2 className={styles.heroSubtitle}>India's Premier ICPC-Style Competition</h2>
          <p className={styles.heroDescription}>
            With 1,600+ participants from 370+ institutes in 2025, Code UnCode 2026 is going pan-India!
            Regional qualifiers across major cities will lead to an electrifying grand finale in Mumbai.
          </p>
        </div>

        <img ref={hoOh} src="/parallax/ho-oh.png" className={styles.hoOh} alt="Ho-Oh" />
        <img ref={moltres} src="/parallax/moltres.png" className={styles.moltres} alt="Moltres" />

        <div ref={mask} className={styles.fireMaskLayer} />

        <div ref={foreground} className={`${styles.layer} ${styles.foregroundLayer}`}>
          <img src="/parallax/foreground-layer.png" alt="foreground" />
        </div>
      </div>

      <section className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>Why Code UnCode 2026?</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>1,600+</span>
            <p>Participants</p>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>370+</span>
            <p>Institutes</p>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>Pan-India</span>
            <p>Qualifiers</p>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>₹5L+</span>
            <p>Prize Pool</p>
          </div>
        </div>
      </section>
    </div>
  );
}