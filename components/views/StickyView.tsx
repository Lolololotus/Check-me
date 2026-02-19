'use client';

import { Task } from '@/lib/logic/types';
import TaskCard from '@/components/core/TaskCard';

export default function StickyView({ tasks }: { tasks: Task[] }) {
    const currentHour = new Date().getHours();
    // Find current task based on time (mock logic)
    const currentTask = tasks.find(t => {
        const startH = parseInt(t.startTime.split(':')[0]);
        const endH = parseInt(t.endTime.split(':')[0]);
        return currentHour >= startH && currentHour < endH;
    }) || tasks[0]; // Fallback to first

    return (
        <div className="w-[280px] bg-yellow-50 text-gray-900 rounded-lg shadow-xl border border-yellow-200 p-4 transform rotate-1 relative">
            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-sm border border-white/40 rotate-1 shadow-sm"></div>

            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 mt-2">
                Window's Focus
            </h2>

            <div className="space-y-4">
                <div>
                    <span className="text-[10px] bg-black text-white px-1.5 rounded">NOW</span>
                    <div className="mt-2 text-lg font-bold leading-tight">
                        {currentTask?.title || "Free Time"}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        {currentTask?.startTime} - {currentTask?.endTime}
                    </div>
                </div>

                <div className="border-t border-yellow-200 pt-3">
                    <span className="text-[10px] text-red-500 font-bold">NEXT WARNING</span>
                    <p className="text-xs text-gray-600 mt-1">
                        Don't forget to drink water.
                    </p>
                </div>
            </div>
        </div>
    );
}
