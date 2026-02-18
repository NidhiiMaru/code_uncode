"use client";

import { useState, useEffect } from "react";
import styles from "./ProfessorOakIntro.module.css";

interface ProfessorOakIntroProps {
    onComplete: () => void;
}

export default function ProfessorOakIntro({ onComplete }: ProfessorOakIntroProps) {
    const [displayText, setDisplayText] = useState("");
    const [completedMessages, setCompletedMessages] = useState<string[]>([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const messages = [
        "Hello, there! My name is Professor Oak",
        "Welcome to Code Uncode 2026!!!"
    ];

    useEffect(() => {
        // Only start typing if we haven't completed all messages
        if (currentMessageIndex < messages.length && !isComplete) {
            setIsTyping(true);
            const currentMessage = messages[currentMessageIndex];
            let currentIndex = 0;

            const typewriterInterval = setInterval(() => {
                if (currentIndex <= currentMessage.length) {
                    setDisplayText(currentMessage.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(typewriterInterval);
                    
                    // Add completed message to the list and clear current display
                    setCompletedMessages(prev => [...prev, currentMessage]);
                    setDisplayText("");
                    setIsTyping(false);
                    
                    // Check if this was the last message (index 1 for second message)
                    if (currentMessageIndex >= 1) {
                        // This was the second and final message
                        setIsComplete(true);
                    } else {
                        // Move to next message after a delay
                        setTimeout(() => {
                            setCurrentMessageIndex(prev => prev + 1);
                        }, 1000);
                    }
                }
            }, 80); // Typing speed

            return () => clearInterval(typewriterInterval);
        }
    }, [currentMessageIndex]);

    const handleContinue = () => {
        onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.professorContainer}>
                <img 
                    src="/loader/professoroak.png" 
                    alt="Professor Oak" 
                    className={styles.professorImage}
                />
            </div>
            
            <div className={styles.textBox}>
                <div className={styles.textContent}>
                    {completedMessages.map((message, index) => (
                        <div key={index} className={styles.completedLine}>
                            {message}
                            {/* Add cursor button after the last completed message */}
                            {index === completedMessages.length - 1 && isComplete && (
                                <span 
                                    className={styles.cursorButton}
                                    onClick={handleContinue}
                                >
                                </span>
                            )}
                        </div>
                    ))}
                    <span className={styles.typewriterText}>
                        {displayText}
                        {!isComplete && isTyping && <span className={styles.cursor}></span>}
                    </span>
                </div>
            </div>
        </div>
    );
}