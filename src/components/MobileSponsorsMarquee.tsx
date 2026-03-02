import styles from './MobileSponsorsMarquee.module.css';

interface MobileSponsorsMarqueeProps {
  type: 'fire' | 'water' | 'grass';
}

export default function MobileSponsorsMarquee({ type }: MobileSponsorsMarqueeProps) {
  const titleColor =
    type === 'water' ? '#00ffff' : type === 'grass' ? '#76ff03' : '#ffcc00';

  const logos = [
    { src: '/logos/ramanujan.webp', alt: 'Ramanujan' },
    { src: '/logos/codestars.webp', alt: 'CodeStars' },
    { src: '/logos/sdc.webp', alt: 'SDC' },
    { src: '/logos/ieeespit.webp', alt: 'IEEE SPIT' },
  ];

  return (
    <section className={styles.section}>
      <h3 className={styles.title} style={{ color: titleColor }}>Our Hosting Partners</h3>
      <div className={styles.marqueeViewport}>
        <div className={styles.marqueeTrack}>
          {[...logos, ...logos].map((logo, index) => (
            <div key={`${logo.alt}-${index}`} className={styles.logoItem}>
              <img src={logo.src} alt={logo.alt} className={styles.logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}