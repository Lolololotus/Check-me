'use client';

import { Task } from '@/lib/logic/types';
import PriorityAccordion from './PriorityAccordion';
import DynamicTimeline from './DynamicTimeline';
import { motion } from 'framer-motion';

export default function PhoneView({ tasks, onToggleTask }: { tasks: Task[], onToggleTask: (id: string) => void }) {

    return (
        <div className="flex flex-col h-[800px] w-[390px] bg-black/90 rounded-[40px] border-[8px] border-neutral-800 overflow-hidden shadow-2xl relative">
            {/* [A] Top Status Bar */}
            <div className="h-14 bg-neutral-900/50 backdrop-blur-md flex items-center justify-between px-6 z-20 border-b border-white/5">
                <span className="text-xs font-medium text-gray-400">Feb 19</span>
                <span className="text-xs font-bold text-blue-400 animate-pulse">
                    수면 빚 1.5h
                </span>
            </div>

            {/* Split View */}
            <div className="flex-1 flex flex-col relative">

                {/* [B] Top Half: Priority List (Accordion) */}
                <div className="flex-1 overflow-visible z-10 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-transparent">
                    <PriorityAccordion dailyTasks={tasks} onToggleTask={onToggleTask} />
                </div>

                {/* [C] Bottom Half (Background-like): Dynamic Timeline */}
                <div className="flex-1 relative border-t border-white/10">
                    <div className="absolute inset-0">
                        <DynamicTimeline tasks={tasks} />
                    </div>
                    {/* Gradient Overlay to blend with Accordion */}
                    <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-neutral-900 to-transparent pointer-events-none" />
                </div>

            </div>

            {/* [D] Bottom Interaction Layer (Placeholder) */}
            <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
        </div>
    );
}
