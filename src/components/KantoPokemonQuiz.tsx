"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PokemonData {
    id: number;
    name: string;
    image: string;
}

export default function KantoPokemonQuiz() {
    const [questions, setQuestions] = useState<number[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [userInput, setUserInput] = useState('');
    const [isRevealed, setIsRevealed] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => { startNewGame(); }, []);

    const startNewGame = () => {
        const ids = Array.from({ length: 5 }, () => Math.floor(Math.random() * 151) + 1);
        setQuestions(ids);
        setScore(0);
        setCurrentIdx(0);
        setGameOver(false);
        fetchPokemon(ids[0]);
    };

    const fetchPokemon = async (id: number) => {
        setUserInput('');
        setIsRevealed(false);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon({
            id: data.id,
            name: data.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isRevealed || !pokemon) return;

        const actual = pokemon.name.toLowerCase().replace(/-/g, ' ');
        const input = userInput.toLowerCase().trim();

        if (input === actual) setScore(s => s + 1);
        setIsRevealed(true);

        setTimeout(() => {
            if (currentIdx < 4) {
                setCurrentIdx(prev => prev + 1);
                fetchPokemon(questions[currentIdx + 1]);
            } else {
                setGameOver(true);
            }
        }, 1500);
    };

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center bg-transparent text-white relative px-4">

            {/* Progress Indicator */}
            <div className="absolute top-20 text-[10px] tracking-[0.5em] uppercase text-white/30 font-mono">
                Sequence {currentIdx + 1} / 5 — Score: {score}
            </div>

            <div className="w-full max-w-lg flex flex-col items-center gap-12">

                {/* The Sprite: Clean, No Borders */}
                <div className="relative h-64 w-64 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {pokemon && (
                            <motion.img
                                key={pokemon.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: isRevealed ? 'brightness(1)' : 'brightness(0)'
                                }}
                                exit={{ opacity: 0, y: -20 }}
                                src={pokemon.image}
                                className="w-full h-full object-contain transition-all duration-700 ease-in-out"
                                alt="target"
                            />
                        )}
                    </AnimatePresence>
                    {/* Subtle Scanning Glow */}
                    <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full -z-10" />
                </div>

                {/* Minimal Input */}
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={isRevealed}
                        placeholder={isRevealed ? pokemon?.name.toUpperCase() : "IDENTIFY..."}
                        className={`w-full bg-transparent border-b border-white/10 py-2 text-center text-2xl font-light tracking-[0.2em] uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/5 ${isRevealed ? 'text-cyan-400' : 'text-white'}`}
                        autoComplete="off"
                    />
                </form>
            </div>

            {/* Modern Game Over Overlay */}
            <AnimatePresence>
                {gameOver && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
                    >
                        <div className="text-center space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-6xl font-thin tracking-tighter uppercase italic">Done.</h2>
                                <p className="text-white/40 font-mono text-sm tracking-widest">ANALYSIS RATIO: {score}/5</p>
                            </div>
                            <button
                                onClick={startNewGame}
                                className="px-8 py-2 border border-white/20 hover:bg-white hover:text-black transition-all text-xs uppercase tracking-[0.3em]"
                            >
                                Reinitialize
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}