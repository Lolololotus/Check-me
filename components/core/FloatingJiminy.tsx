'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
// import { useHealth } from '@/hooks/useHealth'; // We'll wire this later

export default function FloatingJiminy() {
    const [isHovered, setIsHovered] = useState(false);
    const [isStressed, setIsStressed] = useState(false); // Mock state for now

    return (
        <motion.button
            className={clsx(
                "fixed bottom-8 right-8 z-50 flex items-center justify-center",
                "w-16 h-16 rounded-full shadow-2xl backdrop-blur-md",
                isStressed ? "bg-red-500/80" : "bg-white/10 border border-white/20"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
                y: [0, -5, 0],
                boxShadow: isStressed
                    ? "0 0 20px rgba(239, 68, 68, 0.6)"
                    : "0 0 10px rgba(255, 255, 255, 0.1)"
            }}
            transition={{
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 1, repeat: Infinity, repeatType: "mirror" } // Pulse effect
            }}
        >
            <AnimatePresence mode='wait'>
                {isHovered ? (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <MessageSquare className="w-8 h-8 text-white" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="logo"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 1, pathLength: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Organic Check Mark Logo */}
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <motion.path
                                d="M20 6L9 17l-5-5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
