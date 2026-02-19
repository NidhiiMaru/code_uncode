"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Timeline.module.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  position: 'left' | 'right';
}

interface TimelineProps {
  type?: 'fire' | 'water' | 'grass';
}

const Timeline: React.FC<TimelineProps> = ({ type = 'fire' }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressLineRef = useRef<SVGPathElement>(null);
  const checkpointsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Theme colors
  const getThemeColors = () => {
    switch (type) {
      case 'water':
        return { hex: '#3b82f6', rgb: '59, 130, 246' };
      case 'grass':
        return { hex: '#22c55e', rgb: '34, 197, 94' };
      case 'fire':
      default:
        return { hex: '#ff4444', rgb: '255, 68, 68' };
    }
  };

  const { hex: themeColor, rgb: themeRgb } = getThemeColors();

  // Timeline events data
  const events: TimelineEvent[] = [
    {
      id: 1,
      date: '16th February (Sunday)',
      title: 'PRELIMS',
      description: 'Online | 5:05 PM - 7:05 PM. The first hurdle in your journey to become a champion.',
      position: 'left'
    },
    {
      id: 2,
      date: '19th February (Wednesday)',
      title: 'REGIONAL - K. J. Somaiya',
      description: 'First Regional Round at K. J. Somaiya School of Engineering (Vidyavihar).',
      position: 'right'
    },
    {
      id: 3,
      date: '20th February (Thursday)',
      title: 'REGIONAL - SPIT',
      description: 'Second Regional Round at Sardar Patel Institute of Technology.',
      position: 'left'
    },
    {
      id: 4,
      date: '21th February (Friday)',
      title: 'REGIONAL - DJ Sanghvi',
      description: 'Third Regional Round at Dwarkadas J. Sanghvi College of Engineering.',
      position: 'right'
    },
    {
      id: 5,
      date: '23rd February (Sunday)',
      title: 'FINALS',
      description: 'The Ultimate Showdown at Dwarkadas J. Sanghvi College of Engineering. Top 30 participants from regionals compete.',
      position: 'left'
    }
  ];

  useLayoutEffect(() => {
    if (!timelineRef.current || !progressLineRef.current || !pathRef.current) return;

    const ctx = gsap.context(() => {
      // Get the total length of the path
      const pathLength = pathRef.current!.getTotalLength();

      // Set initial state of progress line
      gsap.set(progressLineRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Animate the progress line based on scroll
      gsap.to(progressLineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: (self) => {
            // Activate checkpoints as the line progresses
            const progress = self.progress;
            checkpointsRef.current.forEach((checkpoint, index) => {
              if (checkpoint) {
                const checkpointProgress = (index + 1) / events.length;
                if (progress >= checkpointProgress - 0.1) {
                  checkpoint.classList.add(styles.active);
                } else {
                  checkpoint.classList.remove(styles.active);
                }
              }
            });
          }
        }
      });

      // Animate event cards on scroll
      events.forEach((event, index) => {
        const card = document.querySelector(`[data-event-id="${event.id}"]`);
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: event.position === 'left' ? -100 : 100,
              scale: 0.8
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1,
              }
            }
          );
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className={styles.timelineSection}
      ref={timelineRef}
      style={{
        '--theme-color': themeColor,
        '--theme-rgb': themeRgb
      } as React.CSSProperties}
    >
      <div className={styles.timelineContainer}>
        <h2 className={styles.sectionTitle}>THE JOURNEY</h2>
        <p className={styles.sectionSubtitle}>7 Days • 7 Challenges • 1 Ultimate Goal</p>

        <div className={styles.timelineWrapper}>
          {/* SVG Path */}
          <svg className={styles.timelineSvg} viewBox="0 0 100 1000" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Glow filter for the path */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Animated glow for progress line */}
              <filter id="progressGlow">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base curved path */}
            <path
              ref={pathRef}
              d="M 50 0 
                 Q 30 100, 50 200
                 Q 70 300, 50 400
                 Q 30 500, 50 600
                 Q 70 700, 50 800
                 Q 30 900, 50 1000"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="8"
              filter="url(#glow)"
            />

            {/* Animated progress line */}
            <path
              ref={progressLineRef}
              d="M 50 0 
                 Q 30 100, 50 200
                 Q 70 300, 50 400
                 Q 30 500, 50 600
                 Q 70 700, 50 800
                 Q 30 900, 50 1000"
              fill="none"
              stroke="var(--theme-color)"
              strokeWidth="6"
              filter="url(#progressGlow)"
              className={styles.progressLine}
            />
          </svg>

          {/* Timeline Events */}
          <div className={styles.eventsContainer}>
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`${styles.eventRow} ${styles[event.position]}`}
                style={{ top: `${(index + 0.5) * (100 / events.length)}%` }}
              >
                {/* Checkpoint */}
                <div
                  ref={el => { checkpointsRef.current[index] = el; }}
                  className={styles.checkpoint}
                >
                  <div className={styles.checkpointInner}></div>
                </div>

                {/* Event Card */}
                <div
                  className={styles.eventCard}
                  data-event-id={event.id}
                >
                  <div className={styles.cardDate}>{event.date}</div>
                  <h3 className={styles.cardTitle}>{event.title}</h3>
                  <p className={styles.cardDescription}>{event.description}</p>
                  <div className={styles.cardConnector}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
