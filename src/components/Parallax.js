import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function Parallax() {
    const parallaxRef = useRef(null);

    const mountain3 = useRef(null);
    const mountain2 = useRef(null);
    const mountain1 = useRef(null);
    const sun = useRef(null);
    const cloudsBottom = useRef(null);
    const cloudsLeft = useRef(null);
    const cloudsRight = useRef(null);
    const stars = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: parallaxRef.current,
                    start: "top top",
                    end: "5000 bottom",
                    scrub: true,
                    pin: true,
                },
            });

            tl.to(mountain3.current, { y: "-=80" }, 0);
            tl.to(mountain2.current, { y: "-=30" }, 0);
            tl.to(mountain1.current, { y: "+=50" }, 0);

            tl.to(cloudsLeft.current, {
                x: "-20%",
                opacity: 0,
            }, 0);

            tl.to(cloudsRight.current, {
                x: "20%",
                opacity: 0,
            }, 0);

            tl.to(sun.current, {
                y: "+=210",
            }, 0);
        }, parallaxRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="parallax-outer">
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

            <div ref={parallaxRef} className="parallax">
                <img ref={mountain3} className="mountain-3" src="/parallax/mountain-3.svg" alt="" />
                <img ref={mountain2} className="mountain-2" src="/parallax/mountain-2.svg" alt="" />
                <img ref={mountain1} className="mountain-1" src="/parallax/mountain-1.svg" alt="" />
                {/* <img ref={sun} className="sun" src="/parallax/sun.svg" alt="" /> */}
                <img ref={cloudsBottom} className="clouds-bottom" src="/parallax/cloud-bottom.svg" alt="" />
                <img ref={cloudsLeft} className="clouds-left" src="/parallax/clouds-left.svg" alt="" />
                <img ref={cloudsRight} className="clouds-right" src="/parallax/clouds-right.svg" alt="" />
                <img ref={stars} className="stars" src="/parallax/stars.svg" alt="" />
            </div>
        </div>
    );
}

export default Parallax;
