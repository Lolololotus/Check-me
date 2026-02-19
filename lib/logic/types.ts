export type Category = 'Deep Work' | 'Routine' | 'Meeting' | 'Quick Task';
export type Priority = 1 | 2 | 3 | 4;
export type TaskStatus = 'Active' | 'Completed' | 'Deleted';

export interface Task {
    id: string;
    title: string;
    category: Category;
    startTime: string; // ISO 8601
    endTime: string;
    priority: Priority;
    status: TaskStatus;
    isFixed: boolean; // Synced metadata
    location?: string;
    bufferDuration?: number; // Minutes
}

export interface IntentResult {
    action: 'Add' | 'Delete' | 'Modify' | 'Check' | 'Unknown';
    target: string;
    time?: string;
    category?: Category;
    detectedLocation?: string;
    isLongDistance?: boolean;
}

export interface HealthState {
    currentSleep: number; // Hours
    sleepDebt: number; // Hours
    currentStress: number; // 0-100 (HRV based)
    isStressed: boolean;
}
