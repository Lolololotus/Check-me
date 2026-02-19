'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Watch, Monitor, Send, Moon, HeartPulse } from 'lucide-react';
import clsx from 'clsx';

// Components
import PhoneView from '@/components/views/PhoneView';
import WatchView from '@/components/views/WatchView';
import StickyView from '@/components/views/StickyView';
import FloatingJiminy from '@/components/core/FloatingJiminy';

// Logic
import { MOCK_TASKS } from '@/lib/logic/mockData';
import { IntentEngine } from '@/lib/logic/IntentEngine';
import { TimeManager } from '@/lib/logic/TimeManager';
import { HealthManager } from '@/lib/logic/HealthMock';
import { Task } from '@/lib/logic/types';

type ViewMode = 'iPhone' | 'Watch' | 'Sticky';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('iPhone');
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [input, setInput] = useState('');
  const [jiminyMessage, setJiminyMessage] = useState<string | null>(null);
  const [isStressed, setIsStressed] = useState(false);

  // Intent Handling
  const handleSend = () => {
    if (!input.trim()) return;

    // 1. Analyze Intent
    const result = IntentEngine.parse(input);

    // 2. Mock processing
    if (result.action === 'Add') {
      const newTask: Task = {
        id: Math.random().toString(),
        title: result.target,
        category: result.category || 'Quick Task',
        startTime: result.time || '15:00',
        endTime: result.time ? `${parseInt(result.time) + 1}:00` : '16:00', // Mock duration
        priority: 3,
        status: 'Active',
        isFixed: false,
        location: result.detectedLocation
      };

      // Check Conflicts
      const conflict = TimeManager.checkConflict(newTask, tasks);
      if (conflict) {
        setJiminyMessage(`로터스님, ${conflict.title} (${conflict.startTime}) 일정과 겹칩니다. 조정하시겠습니까?`);
        setInput('');
        return;
      }

      setTasks(prev => [...prev, newTask]);

      let msg = `알겠습니다. [${result.category}] 일정을 추가했습니다.`;

      // Routine / Movement Logic
      if (result.category === 'Routine' && result.detectedLocation) {
        const buffer = TimeManager.suggestBuffer(true);
        msg += ` ${result.detectedLocation}까지 이동 시간 ${buffer}분을 버퍼로 확보했습니다.`;
      }

      setJiminyMessage(msg);
    }

    setInput('');
  };

  // Scenario Triggers
  const triggerStress = () => {
    HealthManager.simulateStressSpike();
    setIsStressed(true);
    setJiminyMessage("⚠️ 스트레스 급상승 감지! 1분 심호흡을 시작합니다.");
    // In a real app, this would trigger the 'Breathe' mode overlay
  };

  const triggerSleepCheck = () => {
    const msg = HealthManager.checkSleepHealth(new Date(new Date().setHours(23, 0, 0))); // Mock checking late night work
    if (msg) {
      setJiminyMessage("로터스님, 지금 일정을 추가하면 수면 시간이 6시간 미만입니다. 내일로 미루시겠습니까?");
    }
  };

  return (
    <main className="flex h-screen w-full bg-neutral-950 text-white overflow-hidden relative">

      {/* 1. Left Sidebar: Controls & Scenarios */}
      <div className="w-80 border-r border-white/10 p-6 flex flex-col gap-8 z-20 bg-neutral-900/50 backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Check me
          </h1>
          <p className="text-xs text-gray-500">Logic & UI Prototype v0.1</p>
        </div>

        {/* View Switcher */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Device Mode</h2>
          <div className="flex gap-2">
            <ViewButton mode="iPhone" icon={Smartphone} current={viewMode} set={setViewMode} />
            <ViewButton mode="Watch" icon={Watch} current={viewMode} set={setViewMode} />
            <ViewButton mode="Sticky" icon={Monitor} current={viewMode} set={setViewMode} />
          </div>
        </div>

        {/* Scenario Testing */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Scenario Triggers</h2>
          <div className="flex flex-col gap-2">
            <button
              onClick={triggerStress}
              className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm hover:bg-red-500/20 transition-colors text-left"
            >
              <HeartPulse size={16} />
              <span>Stress Spike (HRV {'>'} 90)</span>
            </button>
            <button
              onClick={triggerSleepCheck}
              className="flex items-center gap-2 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm hover:bg-blue-500/20 transition-colors text-left"
            >
              <Moon size={16} />
              <span>Sleep Debt Warning</span>
            </button>
          </div>
        </div>

        {/* Jiminy Message Log */}
        <div className="flex-1 overflow-hidden flex flex-col justify-end">
          <AnimatePresence>
            {jiminyMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-zinc-800 p-4 rounded-xl border border-white/10 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-bold uppercase">
                  <Smartphone size={12} /> Jiminy
                </div>
                <p className="text-sm leading-relaxed text-gray-200">
                  "{jiminyMessage}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Main Content Area: Device Simulation */}
      <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 to-neutral-950">

        {/* Input Area (Simulating Voice/Text) */}
        <div className="absolute top-8 w-full max-w-xl z-30 px-6">
          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tell Jiminy: '3시에 미팅' or '종각역으로 이동'"
              className="w-full bg-black/50 border border-white/10 rounded-full py-4 pl-6 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md transition-all shadow-xl"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* View Container */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          {viewMode === 'iPhone' && <PhoneView tasks={tasks} />}
          {viewMode === 'Watch' && <WatchView tasks={tasks} />}
          {viewMode === 'Sticky' && <StickyView tasks={tasks} />}
        </motion.div>

      </div>

      <FloatingJiminy />
    </main>
  );
}

function ViewButton({ mode, icon: Icon, current, set }: { mode: ViewMode, icon: any, current: ViewMode, set: (m: ViewMode) => void }) {
  const isActive = current === mode;
  return (
    <button
      onClick={() => set(mode)}
      className={clsx(
        "flex-1 flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300",
        isActive
          ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          : "bg-transparent text-gray-500 border-white/10 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon size={20} className="mb-1" />
      <span className="text-[10px] font-medium">{mode}</span>
    </button>
  )
}
