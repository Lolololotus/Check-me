import { Task, Category } from '@/lib/logic/types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface TaskCardProps {
    task: Task;
    compact?: boolean; // For "Windows Sticky Mode"
}

const CATEGORY_COLORS: Record<Category, string> = {
    'Deep Work': 'bg-[hsl(var(--deep-work))]/20 border-[hsl(var(--deep-work))]/50 text-blue-100',
    'Routine': 'bg-[hsl(var(--routine))]/20 border-[hsl(var(--routine))]/50 text-green-100',
    'Meeting': 'bg-[hsl(var(--meeting))]/20 border-[hsl(var(--meeting))]/50 text-orange-100',
    'Quick Task': 'bg-white/5 border-white/10 text-gray-300'
};

export default function TaskCard({ task, compact = false }: TaskCardProps) {
    return (
        <motion.div
            layoutId={task.id}
            className={clsx(
                "relative rounded-xl border backdrop-blur-sm overflow-hidden",
                CATEGORY_COLORS[task.category],
                compact ? "p-3" : "p-4"
            )}
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className={clsx("font-semibold leading-tight", compact ? "text-base" : "text-lg")}>
                        {task.title}
                    </h3>
                    <p className="text-xs opacity-70 mt-1">
                        {task.startTime} - {task.endTime}
                    </p>
                </div>
                {!compact && (
                    <span className="text-[10px] uppercase tracking-wider opacity-50 border border-white/20 px-1.5 py-0.5 rounded">
                        {task.category}
                    </span>
                )}
            </div>

            {/* Location / Meta */}
            {task.location && (
                <div className="mt-2 text-xs flex items-center opacity-60">
                    📍 {task.location}
                </div>
            )}
        </motion.div>
    );
}
