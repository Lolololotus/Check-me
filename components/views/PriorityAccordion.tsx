'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { Task } from '@/lib/logic/types';

interface Section {
    id: 'daily' | 'weekly' | 'monthly';
    title: string;
}

export default function PriorityAccordion({ dailyTasks, onToggleTask }: { dailyTasks: Task[], onToggleTask: (id: string) => void }) {
    const [expanded, setExpanded] = useState<'daily' | 'weekly' | 'monthly' | null>('daily');

    const SECTIONS: Section[] = [
        { id: 'monthly', title: 'Monthly Goal' },
        { id: 'weekly', title: 'Weekly Focus' },
        { id: 'daily', title: 'Daily Actions' }
    ];

    const getItems = (id: Section['id']) => {
        if (id === 'daily') return dailyTasks.filter(t => t.priority <= 2).slice(0, 3);
        if (id === 'weekly') return [{ id: 'w1', title: '기획안 초안 완성' }, { id: 'w2', title: '주간 회의 준비' }];
        if (id === 'monthly') return [{ id: 'm1', title: 'Q3 마케팅 전략 수립' }, { id: 'm2', title: '운동 습관 정착' }];
        return [];
    };

    const toggleSection = (id: Section['id']) => {
        setExpanded(prev => prev === id ? null : id);
    };

    return (
        <div className="flex flex-col gap-2 p-4">
            {SECTIONS.map((section) => {
                const isOpen = expanded === section.id;
                const items = getItems(section.id);

                return (
                    <motion.div
                        key={section.id}
                        className="bg-neutral-900/50 border border-white/5 rounded-xl overflow-hidden"
                        initial={false}
                    >
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <span className={clsx(
                                "text-sm font-bold uppercase tracking-wider transition-colors",
                                isOpen ? "text-white" : "text-gray-500"
                            )}>
                                {section.title}
                            </span>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown size={16} className="text-gray-500" />
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    key="content"
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                        open: { opacity: 1, height: "auto" },
                                        collapsed: { opacity: 0, height: 0 }
                                    }}
                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                >
                                    <div className="px-4 pb-4 space-y-3">
                                        {items.length > 0 ? items.map((item: any) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-3 group cursor-pointer"
                                                onClick={() => section.id === 'daily' && onToggleTask(item.id)}
                                            >
                                                <div className={clsx(
                                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                                                    item.status === 'Completed' ? "bg-blue-500 border-blue-500" : "border-gray-600 group-hover:border-blue-500"
                                                )}>
                                                    {item.status === 'Completed' && <CheckCircle2 size={12} className="text-black" />}
                                                </div>
                                                <span className={clsx(
                                                    "text-sm transition-colors",
                                                    item.status === 'Completed' ? "text-gray-500 line-through" : "text-gray-300 group-hover:text-white"
                                                )}>
                                                    {item.title}
                                                </span>
                                            </div>
                                        )) : (
                                            <p className="text-xs text-gray-600 italic">No priority tasks.</p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}
