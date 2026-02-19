'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Task } from '@/lib/logic/types';
import NowLine from '@/components/core/NowLine';

export default function DynamicTimeline({ tasks }: { tasks: Task[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mock "Current Time" for prototype: 15:00
    const CURRENT_HOUR = 15;
    const WINDOW_START = CURRENT_HOUR - 6; // 09:00
    const WINDOW_END = CURRENT_HOUR + 6;   // 21:00

    // Generate hour slots
    const hours = Array.from({ length: 13 }, (_, i) => WINDOW_START + i);

    return (
        <div className="relative w-full h-full overflow-hidden bg-neutral-950/50 flex flex-col items-center">

            {/* Time Slots */}
            <div className="w-full h-full overflow-y-auto no-scrollbar relative" ref={containerRef}>
                <div className="py-[50vh]"> {/* Padding to allow scrolling */}
                    {hours.map(hour => {
                        const isSleepTime = hour >= 22 || hour < 6;
                        // Find tasks in this hour
                        const hourTasks = tasks.filter(t => {
                            const start = parseInt(t.startTime.split(':')[0]);
                            return start === hour;
                        });

                        return (
                            <div
                                key={hour}
                                className={clsx(
                                    "relative h-24 border-b border-white/5 flex w-full",
                                    isSleepTime && "bg-black/80 grayscale opacity-30" // Sleep visual
                                )}
                            >
                                {/* Time Label */}
                                <div className="w-16 flex-shrink-0 flex items-start justify-center pt-2 text-xs text-gray-500 font-mono">
                                    {hour}:00
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 relative p-1">
                                    {hourTasks.map(task => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: task.status === 'Completed' ? 0.4 : 1, x: 0 }}
                                            className={clsx(
                                                "absolute top-1 left-1 right-1 bottom-1 rounded-lg p-3 text-xs font-bold border-l-4 shadow-sm backdrop-blur-sm",
                                                task.category === 'Deep Work' && "bg-blue-500/20 border-blue-500 text-blue-100",
                                                task.category === 'Meeting' && "bg-orange-500/20 border-orange-500 text-orange-100",
                                                task.category === 'Routine' && "bg-green-500/20 border-green-500 text-green-100",
                                                task.category === 'Quick Task' && "bg-gray-700/40 border-gray-500 text-gray-300"
                                            )}
                                        >
                                            <div className="flex justify-between">
                                                <span>{task.title}</span>
                                                {task.status === 'Completed' && <span className="text-[10px] uppercase tracking-widest text-emerald-400">Done</span>}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isSleepTime && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs text-gray-600 tracking-widest uppercase">Sleep Mode</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Now Line (Fixed Center) */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-20 pointer-events-none">
                <NowLine />
            </div>

        </div>
    );
}
