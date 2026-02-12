import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function Parallax() {
  const parallaxOuterRef = useRef(null);

  const middleMountain = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxOuterRef.current,
          start: "top top",
          end: "+=100vh",
          scrub: true,
          pin: parallaxOuterRef.current,
          invalidateOnRefresh: true,
        },
      });

      tl.to(middleMountain.current, { y: -120, ease: "none" }, 0);
    }, parallaxOuterRef);

    return () => ctx.revert();
  }, []);


  return (
    <>
      <div ref={parallaxOuterRef} className="parallax-outer">
        <div className="copy">
          <img
            className="hero-logo"
            src="/parallax/uncode.png"
            alt="Code UnCode"
          />
          <p className="hero-subtitle">
            Mumbai's Premier ICPC-Style Competition
          </p>
          <p className="hero-description">
            With 1,600+ participants from 370+ institutes in 2025,
            Code UnCode 2026 is going pan-India! Regional qualifiers
            across major cities will lead to an electrifying grand
            finale in Mumbai. Expect tougher problems, deeper
            mentorship, and big rewards as India's brightest minds
            battle for glory.
          </p>
          <span className="hero-cta">Discover more</span>
        </div>

        <div className="parallax">
          <img
            ref={middleMountain}
            className="middle-mountain"
            src="/parallax/middle-mountain.png"
            alt=""
          />
        </div>
      </div>

      {/* Scrollable section after hero */}
      <section className="about">
        <h2>About Code UnCode</h2>
        <p>
          Code UnCode is Mumbai’s premier ICPC-style programming competition,
          bringing together the brightest coders across India.
        </p>
      </section>
    </>
  );
}

export default Parallax;
