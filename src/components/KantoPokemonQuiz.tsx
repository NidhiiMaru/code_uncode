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

    const [imageLoaded, setImageLoaded] = useState(false);

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
        setImageLoaded(false); // Reset image load state
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

    const isCorrect = isRevealed && pokemon && userInput.toLowerCase().trim() === pokemon.name.toLowerCase().replace(/-/g, ' ');

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-20">

            {/* Glass Card Container */}
            <div className="relative w-full max-w-3xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-14 shadow-2xl flex flex-col items-center gap-10 overflow-hidden z-10">

                {/* Header: Progress & Score */}
                <div className="w-full flex justify-between items-center border-b border-white/10 pb-6">
                    <span className="text-white/60 font-mono tracking-[0.2em] text-sm md:text-base uppercase">
                        Question {currentIdx + 1} / 5
                    </span>
                    <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/5">
                        <span className="text-emerald-400 font-black text-xl md:text-2xl">{score}</span>
                        <span className="text-white/40 text-xs font-bold tracking-wider uppercase">Points</span>
                    </div>
                </div>

                {/* Pokemon Display */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center my-2 group">
                    <AnimatePresence mode="wait">
                        {pokemon && (
                            <motion.img
                                key={pokemon.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: imageLoaded ? 1 : 0, // Only show when loaded
                                    scale: 1,
                                    filter: isRevealed ? 'brightness(1) drop-shadow(0 0 30px rgba(255,255,255,0.4))' : 'brightness(0) invert(0)'
                                }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                src={pokemon.image}
                                onLoad={() => setImageLoaded(true)}
                                className="w-full h-full object-contain z-10"
                                alt="Who's that Pokemon?"
                            />
                        )}
                    </AnimatePresence>

                    {/* Loading Spinner if image not ready */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        </div>
                    )}

                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 blur-[60px] rounded-full -z-10" />
                    <div className={`absolute inset-0 border-2 border-white/5 rounded-full scale-110 transition-all duration-700 ${isRevealed ? 'scale-125 opacity-0' : 'animate-pulse'}`} />
                </div>

                {/* Answer Reveal Text */}
                <div className="h-8 flex items-center justify-center">
                    {isRevealed && pokemon && (
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-3xl md:text-4xl font-black uppercase tracking-widest ${isCorrect ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]' : 'text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.6)]'}`}
                        >
                            {pokemon.name.replace(/-/g, ' ')}
                        </motion.h3>
                    )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6 relative z-20">
                    <div className="relative group w-full max-w-sm">
                        {/* Dynamic Background Glow on Focus */}
                        <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-0 group-focus-within:opacity-50 blur transition duration-500 ${isRevealed ? 'hidden' : ''}`} />

                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            disabled={isRevealed}
                            placeholder={isRevealed ? "" : "WHO'S THAT POKEMON?"}
                            className={`relative w-full h-24 bg-black/50 border-2 rounded-xl text-center text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 focus:bg-black/70 transition-all duration-300
                                ${isRevealed
                                    ? (isCorrect ? 'border-emerald-500/50 text-emerald-400 bg-emerald-950/20' : 'border-red-500/50 text-red-400 bg-red-950/20')
                                    : 'border-white/10 hover:border-white/30'
                                }`}
                            autoComplete="off"
                        />

                        {/* Status Icon */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl">
                            {isRevealed && (
                                isCorrect
                                    ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400">✓</motion.span>
                                    : <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-red-400">✗</motion.span>
                            )}
                        </div>
                    </div>
                </form>

                {/* Instructions */}
                {!isRevealed && !gameOver && (
                    <p className="text-white/30 text-xs tracking-[0.3em] font-medium animate-pulse mt-[-10px]">PRESS ENTER TO SUBMIT</p>
                )}
            </div>

            {/* Game Over Modal Overlay */}
            <AnimatePresence>
                {gameOver && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-gray-900 border border-white/10 p-12 rounded-[2.5rem] text-center max-w-md w-full shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />

                            <h2 className="text-6xl font-black text-white mb-2 uppercase italic tracking-tighter relative z-10">
                                Result
                            </h2>
                            <div className="my-8 relative z-10">
                                <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 filter drop-shadow-lg">{score}</span>
                                <span className="text-4xl text-white/40 font-thin ml-2">/5</span>
                            </div>

                            <button
                                onClick={startNewGame}
                                className="relative z-10 w-full py-5 bg-white text-black font-black text-sm tracking-[0.3em] uppercase rounded-xl hover:scale-[1.02] hover:bg-cyan-300 transition-all duration-300 shadow-xl shadow-cyan-500/10"
                            >
                                Play Again
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}