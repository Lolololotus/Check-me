'use client';

import { Task } from '@/lib/logic/types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function WatchView({ tasks }: { tasks: Task[] }) {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const update = () => {
            const now = new Date();
            // 24-hour rotation: (hours + minutes/60) / 24 * 360
            const deg = ((now.getHours() + now.getMinutes() / 60) / 24) * 360;
            setRotation(deg);
        }
        update();
        const interval = setInterval(update, 60000);
        return () => clearInterval(interval);
    }, []);

    // Helper to calculate arc path for a task
    // This is a simplified 24h clock visualization
    const getTaskArc = (start: string, end: string, index: number) => {
        const startH = parseInt(start.split(':')[0]);
        const endH = parseInt(end.split(':')[0]);
        // Map 0-24h to 0-360 deg
        const startDeg = (startH / 24) * 360;
        const endDeg = (endH / 24) * 360;
        const length = endDeg - startDeg;

        return { startDeg, length };
    };

    return (
        <div className="w-[300px] h-[300px] bg-black border-4 border-gray-800 rounded-full shadow-2xl overflow-hidden relative flex items-center justify-center">
            {/* Dial Markings */}
            {[0, 6, 12, 18].map(h => (
                <div key={h}
                    className="absolute text-gray-500 text-xs font-bold"
                    style={{
                        transform: `rotate(${h * 15}deg) translate(0, -130px) rotate(-${h * 15}deg)`
                    }}
                >
                    {h}
                </div>
            ))}

            {/* Task Arcs */}
            <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="150" cy="150" r="100" stroke="#333" strokeWidth="20" fill="none" />
                {tasks.map((task, i) => {
                    const { startDeg, length } = getTaskArc(task.startTime, task.endTime, i);
                    const circumference = 2 * Math.PI * 100;
                    const strokeDasharray = `${(length / 360) * circumference} ${circumference}`;
                    const strokeDashoffset = -((startDeg / 360) * circumference);

                    const color = task.category === 'Deep Work' ? '#3B82F6' :
                        task.category === 'Routine' ? '#22C55E' :
                            task.category === 'Meeting' ? '#F97316' : '#9CA3AF';

                    return (
                        <circle
                            key={task.id}
                            cx="150" cy="150" r="100"
                            stroke={color}
                            strokeWidth="20"
                            fill="none"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="opacity-80"
                        />
                    );
                })}
            </svg>

            {/* Now Hand */}
            <motion.div
                className="absolute w-1 h-[140px] bg-red-500 origin-bottom bottom-[150px] z-20 rounded-full"
                animate={{ rotate: rotation }}
                transition={{ ease: "linear" }}
            />
            <div className="absolute w-4 h-4 bg-red-500 rounded-full z-30" />
        </div>
    );
}
