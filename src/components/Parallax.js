import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./Parallax.module.css";
import extendedStyles from "./ParallaxExtended.module.css";

// Merge both style objects
const allStyles = { ...styles, ...extendedStyles };

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

      // 1. Bird Movements - Parabolic Flight Paths
      // Ho-Oh: Flies from top-right to top-left with upward arc
      // Split x and y animations to create parabolic trajectory

      // Ho-Oh X-axis: Linear movement left
      tl.to(hoOh.current, {
        x: "-110vw",
        ease: "none" // Linear movement for horizontal
      }, 0);

      // Ho-Oh Y-axis: Upward arc with power ease
      tl.to(hoOh.current, {
        y: "-50vh", // Peak height of the arc
        ease: "power2.out" // Creates upward curve
      }, 0);

      // Ho-Oh Scale and Rotation
      tl.to(hoOh.current, {
        scale: 4,
        rotate: -15,
        ease: "power1.out"
      }, 0);

      // Moltres: Flies from bottom-left to top-right with upward arc
      // Split x and y animations to create parabolic trajectory

      // Moltres X-axis: Linear movement right
      tl.to(moltres.current, {
        x: "110vw",
        ease: "none" // Linear movement for horizontal
      }, 0);

      // Moltres Y-axis: Upward arc with power ease
      tl.to(moltres.current, {
        y: "-80vh", // Higher peak for dramatic exit
        ease: "power2.out" // Creates upward curve
      }, 0);

      // Moltres Scale and Rotation
      tl.to(moltres.current, {
        scale: 3,
        rotate: 15,
        ease: "power1.out"
      }, 0);

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

      {/* Battle Arena - Problem Categories */}
      <section className={allStyles.battleArena}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ffcc00' }}>
          ⚔️ Battle Arena
        </h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '60px', opacity: 0.9 }}>
          Face challenges across multiple battle types
        </p>

        <div className={allStyles.arenaGrid}>
          <div className={allStyles.arenaCard}>
            <div className={allStyles.arenaIcon}>🔥</div>
            <h3>Fire Type</h3>
            <p>Dynamic Programming</p>
            <span className={allStyles.difficulty}>Hard</span>
          </div>
          <div className={allStyles.arenaCard}>
            <div className={allStyles.arenaIcon}>💧</div>
            <h3>Water Type</h3>
            <p>Graph Algorithms</p>
            <span className={allStyles.difficulty}>Medium</span>
          </div>
          <div className={allStyles.arenaCard}>
            <div className={allStyles.arenaIcon}>⚡</div>
            <h3>Electric Type</h3>
            <p>Greedy & Optimization</p>
            <span className={allStyles.difficulty}>Hard</span>
          </div>
          <div className={allStyles.arenaCard}>
            <div className={allStyles.arenaIcon}>🌿</div>
            <h3>Grass Type</h3>
            <p>Trees & Recursion</p>
            <span className={allStyles.difficulty}>Medium</span>
          </div>
          <div className={allStyles.arenaCard}>
            <div className={allStyles.arenaIcon}>🧊</div>
            <h3>Ice Type</h3>
            <p>Binary Search & Sorting</p>
            <span className={allStyles.difficulty}>Easy</span>
          </div>
          <div className={allStyles.arenaCard}>
            <div className={allStyles.arenaIcon}>👻</div>
            <h3>Ghost Type</h3>
            <p>Bit Manipulation</p>
            <span className={allStyles.difficulty}>Hard</span>
          </div>
        </div>
      </section>

      {/* Legendary Trainers - Past Winners */}
      <section className={styles.legendarySection}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ffcc00' }}>
          🏆 Legendary Trainers
        </h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '60px', opacity: 0.9 }}>
          Champions who conquered Code UnCode
        </p>

        <div className={allStyles.trainerGrid}>
          <div className={allStyles.trainerCard}>
            <div className={allStyles.trainerBadge}>🥇</div>
            <h3>Team Charizard</h3>
            <p className={allStyles.trainerInstitute}>IIT Bombay</p>
            <p className={allStyles.trainerYear}>Code UnCode 2025</p>
            <div className={allStyles.trainerStats}>
              <span>⚡ 2847 Rating</span>
              <span>🎯 12/12 Solved</span>
            </div>
          </div>
          <div className={allStyles.trainerCard}>
            <div className={allStyles.trainerBadge}>🥈</div>
            <h3>Team Mewtwo</h3>
            <p className={allStyles.trainerInstitute}>BITS Pilani</p>
            <p className={allStyles.trainerYear}>Code UnCode 2025</p>
            <div className={allStyles.trainerStats}>
              <span>⚡ 2756 Rating</span>
              <span>🎯 11/12 Solved</span>
            </div>
          </div>
          <div className={allStyles.trainerCard}>
            <div className={allStyles.trainerBadge}>🥉</div>
            <h3>Team Rayquaza</h3>
            <p className={allStyles.trainerInstitute}>IIT Delhi</p>
            <p className={allStyles.trainerYear}>Code UnCode 2025</p>
            <div className={allStyles.trainerStats}>
              <span>⚡ 2698 Rating</span>
              <span>🎯 11/12 Solved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gym Badges - Achievements */}
      <section className={allStyles.badgesSection}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ffcc00' }}>
          🎖️ Earn Your Badges
        </h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '60px', opacity: 0.9 }}>
          Unlock achievements as you progress through the competition
        </p>

        <div className={allStyles.badgesGrid}>
          <div className={allStyles.badgeItem}>
            <div className={allStyles.badgeIcon}>🔰</div>
            <h4>Boulder Badge</h4>
            <p>Solve your first problem</p>
          </div>
          <div className={allStyles.badgeItem}>
            <div className={allStyles.badgeIcon}>💧</div>
            <h4>Cascade Badge</h4>
            <p>Qualify for regionals</p>
          </div>
          <div className={allStyles.badgeItem}>
            <div className={allStyles.badgeIcon}>⚡</div>
            <h4>Thunder Badge</h4>
            <p>Solve 5 hard problems</p>
          </div>
          <div className={allStyles.badgeItem}>
            <div className={allStyles.badgeIcon}>🌈</div>
            <h4>Rainbow Badge</h4>
            <p>Reach the grand finale</p>
          </div>
          <div className={allStyles.badgeItem}>
            <div className={allStyles.badgeIcon}>🌋</div>
            <h4>Volcano Badge</h4>
            <p>Top 10 finish</p>
          </div>
          <div className={allStyles.badgeItem}>
            <div className={allStyles.badgeIcon}>👁️</div>
            <h4>Marsh Badge</h4>
            <p>Perfect score in a round</p>
          </div>
          <div className={allStyles.badgeItem}>
            <div className={allStyles.badgeIcon}>🌸</div>
            <h4>Soul Badge</h4>
            <p>Help 10 teammates</p>
          </div>
          <div className={allStyles.badgeItem}>
            <div className={allStyles.badgeIcon}>🏆</div>
            <h4>Earth Badge</h4>
            <p>Become the Champion</p>
          </div>
        </div>
      </section>

      {/* Pokemon League - Sponsors/Partners */}
      <section className={allStyles.leagueSection}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ffcc00' }}>
          ⭐ Pokemon League Partners
        </h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '60px', opacity: 0.9 }}>
          Powered by industry leaders
        </p>

        <div className={allStyles.sponsorGrid}>
          <div className={allStyles.sponsorCard}>
            <div className={allStyles.sponsorTier}>Elite Four</div>
            <p>Title Sponsors</p>
          </div>
          <div className={allStyles.sponsorCard}>
            <div className={allStyles.sponsorTier}>Gym Leaders</div>
            <p>Gold Sponsors</p>
          </div>
          <div className={allStyles.sponsorCard}>
            <div className={allStyles.sponsorTier}>Trainers</div>
            <p>Silver Sponsors</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Parallax;
