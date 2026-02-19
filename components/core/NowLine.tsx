'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NowLine() {
    const [topPercentage, setTopPercentage] = useState(0);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            // Calculate percentage of day passed (0-24h)
            // Simple linear mapping for prototype: 00:00 = 0%, 24:00 = 100%
            const totalMinutes = hours * 60 + minutes;
            const percentage = (totalMinutes / 1440) * 100;

            setTopPercentage(percentage);
            setCurrentTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="absolute left-0 w-full flex items-center z-40 pointer-events-none"
            animate={{ top: `${topPercentage}%` }}
            transition={{ duration: 0.5, ease: "linear" }}
        >
            <div className="w-full h-[2px] bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            <div className="absolute left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                {currentTime}
            </div>
        </motion.div>
    );
}
