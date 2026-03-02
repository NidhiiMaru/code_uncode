import styles from './MobileHero.module.css';

interface MobileHeroProps {
  type: 'fire' | 'water' | 'grass';
}

export default function MobileHero({ type }: MobileHeroProps) {
  const folder =
    type === 'water'
      ? 'parallax/parallax_water'
      : type === 'grass'
        ? 'parallax/parallax_grass'
        : 'parallax/parallax_fire';

  const bgImage =
    type === 'water'
      ? 'water-bg.png'
      : type === 'grass'
        ? 'grassbg.png'
        : 'red-bg.png';

  const mountainImage =
    type === 'water'
      ? 'sun.png'
      : type === 'grass'
        ? 'mountains.png'
        : 'mountains.png';

  const treeImage =
    type === 'water'
      ? 'water-layer.png'
      : type === 'grass'
        ? 'trees.png'
        : 'trees.png';

  const logoImage =
    type === 'water'
      ? 'uncode-logoblue.png'
      : type === 'grass'
        ? 'uncodelogo-green.svg'
        : 'uncode-logo.png';

  const pokemonLeft =
    type === 'water'
      ? 'lugia.png'
      : type === 'grass'
        ? 'ho-oh.png'
        : 'ho-oh.png';

  const pokemonRight =
    type === 'water'
      ? 'kyogre.png'
      : type === 'grass'
        ? 'moltres.png'
        : 'moltres.png';

  const foregroundImage = 'foreground-layer.webp';

  const subtitle =
    type === 'water'
      ? "Mumbai's Premier ICPC-Style Competition"
      : type === 'grass'
        ? "Mumbai's Premier ICPC-Style Competition"
        : "Mumbai's Premier ICPC-Style Competition";

  return (
    <>
      <section className={`${styles.hero} ${styles[`hero${type}`]}`}>
        <div className={styles.bgWrap}>
          <img src={`/${folder}/${bgImage}`} alt="hero background" className={styles.bg} />
          <img src={`/${folder}/${mountainImage}`} alt="mountains" className={styles.mountains} />
          <img src={`/${folder}/${treeImage}`} alt="landscape" className={styles.trees} />

          <img src={`/${folder}/${pokemonLeft}`} alt="Pokemon left" className={`${styles.pokemon} ${styles.skyPokemonLeft}`} />
          <img src={`/${folder}/${pokemonRight}`} alt="Pokemon right" className={`${styles.pokemon} ${styles.skyPokemonRight}`} />

          <img src={`/${folder}/${foregroundImage}`} alt="foreground" className={styles.foreground} />
          <div className={styles.topFade} />
        </div>

        <div className={styles.centerContent}>
          <img src={`/${folder}/${logoImage}`} alt="Code UnCode" className={styles.logo} />
          <h2 className={styles.subtitle}>{subtitle}</h2>
          <div className={styles.descriptionCard}>
            <p className={styles.description}>
              With 1,600+ participants from 370+ institutes in 2025, Code UnCode 2026 is going pan-India.
              Regional qualifiers across major cities will lead to an electrifying grand finale in Mumbai.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.partnersSection}>
        <div className={styles.partnersWrap}>
          <h3 className={styles.partnersTitle}>Hosting Partners</h3>
          <div className={styles.partnersTrack}>
            <img src="/logos/ramanujan.webp" alt="Ramanujan" className={styles.partnerLogo} />
            <img src="/logos/codestars.webp" alt="CodeStars" className={styles.partnerLogo} />
            <img src="/logos/sdc.webp" alt="SDC" className={styles.partnerLogo} />
            <img src="/logos/ieeespit.webp" alt="IEEE SPIT" className={styles.partnerLogo} />
          </div>
        </div>
      </section>
    </>
  );
}