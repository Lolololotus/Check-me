'use client';

import { Task } from '@/lib/logic/types';
import TaskCard from '@/components/core/TaskCard';
import NowLine from '@/components/core/NowLine';
import { motion } from 'framer-motion';

export default function PhoneView({ tasks }: { tasks: Task[] }) {
    const topPriority = tasks.find(t => t.priority === 1);
    const sortedTasks = [...tasks].sort((a, b) => a.startTime.localeCompare(b.startTime));

    // Generate 24h Grid
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
        <div className="w-[375px] h-[812px] bg-black border-8 border-gray-900 rounded-[3rem] overflow-hidden relative flex flex-col shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-50"></div>

            {/* 1. Priority Section (Top Fixed) */}
            <div className="p-6 pt-12 bg-gradient-to-b from-gray-900 to-black z-10 shrink-0">
                <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Top Priority</h2>
                {topPriority && <TaskCard task={topPriority} />}
            </div>

            {/* 2. Timeline Section (Scrollable) */}
            <div className="flex-1 overflow-y-auto relative no-scrollbar">
                <NowLine />

                <div className="relative py-4">
                    {hours.map(h => (
                        <div key={h} className="group flex items-start h-[80px] border-b border-white/5 px-4 relative">
                            {/* Time Label */}
                            <span className="text-gray-600 text-xs font-mono w-12 pt-2">
                                {h.toString().padStart(2, '0')}:00
                            </span>

                            {/* Task Rendering */}
                            <div className="flex-1 relative h-full">
                                {sortedTasks.filter(t => parseInt(t.startTime.split(':')[0]) === h).map(task => (
                                    <div key={task.id} className="absolute w-full z-10 top-2">
                                        <TaskCard task={task} compact />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
