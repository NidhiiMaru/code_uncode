import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./Parallax.module.css";

export default function Parallax() {
  const parallaxOuterRef = useRef(null);
  const mountains = useRef(null);
  const trees = useRef(null);
  const foreground = useRef(null);
  const hoOh = useRef(null);
  const moltres = useRef(null);
  const textContent = useRef(null);
  const mask = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxOuterRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Bird Movements - Parabolic Arcs
      tl.to(hoOh.current, { x: "-110vw", ease: "none" }, 0)
        .to(hoOh.current, { y: "-50vh", scale: 4, rotate: -15, ease: "power2.out" }, 0);

      // Moltres: Hill-shaped arc (up then down)
      tl.to(moltres.current, { x: "150vw", ease: "none" }, 0); // Horizontal

      // Y-axis hill arc using keyframes
      tl.to(moltres.current, {
        keyframes: [
          { y: "-80vh", scale: 3.5, rotate: 15, ease: "power2.out" }, // UP to peak
          { y: "-40vh", scale: 3.5, rotate: 15, ease: "power2.in" }   // DOWN from peak
        ]
      }, 0);

      // 2. The Reveal - Background Mask & Foreground Sync
      tl.to(mountains.current, { y: "-25%", ease: "none" }, 0);
      tl.to(trees.current, { y: "-45%", ease: "none" }, 0);
      tl.to(foreground.current, { y: "-65%", ease: "none" }, 0);

      // Mask layer rises from the bottom to block out lower layers
      tl.to(mask.current, { y: "-80vh", ease: "none" }, 0);

      // Text stays visible - will be covered by rising mask naturally


    }, parallaxOuterRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={parallaxOuterRef} className={styles.parallaxContainer}>
        <div ref={mountains} className={styles.layer}><img src="/parallax/mountains.png" alt="mountains" /></div>
        <div ref={trees} className={styles.layer}><img src="/parallax/trees.png" alt="trees" /></div>

        <div ref={textContent} className={styles.copy}>
          <img className={styles.heroLogo} src="/parallax/uncode-logo.png" alt="Code UnCode" />
          <h2 className={styles.heroSubtitle}>India's Premier ICPC-Style Competition</h2>
          <p className={styles.heroDescription}>
            With 1,600+ participants from 370+ institutes in 2025, Code UnCode 2026 is going pan-India!
            Regional qualifiers across major cities will lead to an electrifying grand finale in Mumbai.
            Expect tougher problems, deeper mentorship, and big rewards as India’s brightest minds battle for glory.
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
          <div className={styles.statCard}><span className={styles.statNumber}>1,600+</span><p>Participants</p></div>
          <div className={styles.statCard}><span className={styles.statNumber}>370+</span><p>Institutes</p></div>
          <div className={styles.statCard}><span className={styles.statNumber}>Pan-India</span><p>Qualifiers</p></div>
          <div className={styles.statCard}><span className={styles.statNumber}>₹5L+</span><p>Prize Pool</p></div>
        </div>
      </section>

      <section className={styles.timelineSection}>
        <h2 className={styles.sectionTitle}>Competition Timeline</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <h3>Regional Qualifiers</h3>
            <p>March - April 2026</p>
          </div>
          <div className={styles.timelineItem}>
            <h3>Grand Finale</h3>
            <p>June 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}