import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./Parallax.module.css";

function Parallax() {
  const parallaxOuterRef = useRef(null);
  const mountains = useRef(null);
  const trees = useRef(null);
  const foreground = useRef(null);
  const hoOh = useRef(null);
  const moltres = useRef(null);
  const textContent = useRef(null);
  const textWrapper = useRef(null);

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

      // 1. Bird Movements - Start immediately
      tl.to(hoOh.current, { x: "-110vw", y: "-40vh", scale: 4, rotate: -15, ease: "power1.out" }, 0);
      tl.to(moltres.current, { x: "110vw", y: "-80vh", scale: 3, rotate: 15, ease: "power1.out" }, 0);

      // 2. Scenery Rising - Start immediately with ease: "none" for linear movement
      tl.to(mountains.current, { y: "-25%", ease: "none" }, 0);
      tl.to(trees.current, { y: "-45%", ease: "none" }, 0);
      tl.to(foreground.current, { y: "-65%", ease: "none" }, 0);

      // 3. Text Animation - Move UPWARD while fading out
      // Start after 30% of scroll to keep text visible initially
      tl.fromTo(textContent.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1
        },
        {
          y: "-30vh", // Move UPWARD (negative value)
          opacity: 0,
          filter: "blur(10px)",
          scale: 1.1,
          ease: "power2.in"
        },
        0.3  // Start at 30% of the timeline
      );

      // 4. Dynamic Clipping - The "Invisible Boundary"
      // This creates the effect of text disappearing as it meets the rising tape
      // Using inset() for stability: inset(top right bottom left)
      // We animate ONLY the bottom value from 0% to 100%
      tl.fromTo(textWrapper.current,
        {
          clipPath: "inset(0% 0% 0% 0%)" // Fully visible
        },
        {
          clipPath: "inset(0% 0% 100% 0%)", // Hidden from bottom up
          ease: "none" // CRITICAL: Must match foreground's ease for sync
        },
        0  // Start at the SAME time as foreground (position 0)
      );

    }, parallaxOuterRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={parallaxOuterRef} className={styles.parallaxContainer}>

        <div ref={mountains} className={styles.layer}>
          <img src="/parallax/mountains.png" alt="" />
        </div>

        <div ref={trees} className={styles.layer}>
          <img src="/parallax/trees.png" alt="" />
        </div>

        {/* Text is inside a wrapper that handles the clipping/invisible boundary */}
        <div ref={textWrapper} className={styles.textWrapper}>
          <div ref={textContent} className={styles.copy}>
            <img className={styles.heroLogo} src="/parallax/uncode-logo.png" alt="Code UnCode" />
            <h2 className={styles.heroSubtitle}>India's Premier ICPC-Style Competition</h2>
            <p className={styles.heroDescription}>
              With 1,600+ participants from 370+ institutes in 2025, Code UnCode 2026 is going pan-India!
              Regional qualifiers across major cities will lead to an electrifying grand finale in Mumbai.
              Expect tougher problems, deeper mentorship, and big rewards as India’s brightest minds battle for glory.
            </p>
          </div>
        </div>

        <img ref={hoOh} src="/parallax/ho-oh.png" className={styles.hoOh} alt="" />
        <img ref={moltres} src="/parallax/moltres.png" className={styles.moltres} alt="" />

        <div ref={foreground} className={`${styles.layer} ${styles.foregroundLayer}`}>
          <img src="/parallax/foreground-layer.png" alt="" />
        </div>

      </div>

      <section className={styles.infoSection}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ffcc00', textAlign: 'center' }}>
          Why Code UnCode 2026?
        </h2>
        <p style={{ fontSize: '1.3rem', maxWidth: '800px', textAlign: 'center', marginBottom: '60px', opacity: 0.9 }}>
          India's most prestigious ICPC-style competitive programming championship is back, bigger and better than ever.
        </p>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>1,600+</span>
            <p>Participants in 2025</p>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>370+</span>
            <p>Institutes Represented</p>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>Pan-India</span>
            <p>Regional Qualifiers</p>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>₹5L+</span>
            <p>Prize Pool</p>
          </div>
        </div>
      </section>

      <section className={styles.timelineSection}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#ffcc00' }}>
          Competition Timeline
        </h2>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineMarker}>1</div>
            <div className={styles.timelineContent}>
              <h3>Regional Qualifiers</h3>
              <p>Compete in your city. Top teams advance to the grand finale.</p>
              <span className={styles.timelineDate}>March - April 2026</span>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineMarker}>2</div>
            <div className={styles.timelineContent}>
              <h3>Online Rounds</h3>
              <p>Solve challenging algorithmic problems. Prove your skills.</p>
              <span className={styles.timelineDate}>May 2026</span>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineMarker}>3</div>
            <div className={styles.timelineContent}>
              <h3>Grand Finale - Mumbai</h3>
              <p>The ultimate showdown. Battle for glory and massive prizes.</p>
              <span className={styles.timelineDate}>June 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#ffcc00' }}>
          Ready to Compete?
        </h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '2.5rem', maxWidth: '700px', textAlign: 'center' }}>
          Join thousands of India's brightest minds. Showcase your algorithmic prowess. Win big.
        </p>
        <button className={styles.ctaButton}>
          Register Now
        </button>
        <p style={{ fontSize: '1rem', marginTop: '1.5rem', opacity: 0.7 }}>
          Registration opens February 2026
        </p>
      </section>
    </div>
  );
}

export default Parallax;