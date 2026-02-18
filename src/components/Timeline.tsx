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

const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressLineRef = useRef<SVGPathElement>(null);
  const checkpointsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Timeline events data
  const events: TimelineEvent[] = [
    {
      id: 1,
      date: '14th February',
      title: 'CODE IT RALPH',
      description: 'A competitive programming showdown. Tackle algorithmic puzzles inspired by retro gaming logic.',
      position: 'left'
    },
    {
      id: 2,
      date: '15th February',
      title: 'PIXEL PERFECT',
      description: 'A competitive challenge where participants apply core programming and frontend skills to build precise, high-quality solutions.',
      position: 'right'
    },
    {
      id: 3,
      date: '16th February',
      title: 'THE ULTIMATE CIRCUIT',
      description: '7 Days • 7 Challenges. Push your limits through week-long intensive coding challenges.',
      position: 'left'
    },
    {
      id: 4,
      date: '17th February',
      title: 'MYSTERY EVENT',
      description: 'Something exciting is coming. Stay tuned for an unforgettable experience.',
      position: 'right'
    },
    {
      id: 5,
      date: '18th February',
      title: 'GRAND FINALE',
      description: 'The ultimate showdown in Mumbai. Where champions are crowned and legends are born.',
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
    <section className={styles.timelineSection} ref={timelineRef}>
      <div className={styles.timelineContainer}>
        <h2 className={styles.sectionTitle}>THE JOURNEY</h2>
        <p className={styles.sectionSubtitle}>7 Days • 7 Challenges • 1 Ultimate Goal</p>

        <div className={styles.timelineWrapper}>
          {/* SVG Path */}
          <svg className={styles.timelineSvg} viewBox="0 0 100 1000" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Glow filter for the path */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {/* Animated glow for progress line */}
              <filter id="progressGlow">
                <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
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
              stroke="#ff4444"
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
