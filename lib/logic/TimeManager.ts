import { Task } from './types';
import { areIntervalsOverlapping, parseISO } from 'date-fns';

export class TimeManager {
    static FLUID_BUFFER_MINUTES = 30;

    static checkConflict(newTask: Partial<Task>, existingTasks: Task[]): Task | null {
        if (!newTask.startTime || !newTask.endTime) return null;

        const newStart = parseISO(newTask.startTime);
        const newEnd = parseISO(newTask.endTime);

        const conflict = existingTasks.find(task =>
            areIntervalsOverlapping(
                { start: parseISO(task.startTime), end: parseISO(task.endTime) },
                { start: newStart, end: newEnd }
            )
        );

        return conflict || null;
    }

    static suggestBuffer(locationChanged: boolean): number {
        return locationChanged ? this.FLUID_BUFFER_MINUTES : 0;
    }
}
