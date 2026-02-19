import { HealthState } from './types';

export class HealthManager {
    private static state: HealthState = {
        currentSleep: 5, // Simulation: User slept 5 hours
        sleepDebt: 2,    // 7 - 5 = 2h debt
        currentStress: 40,
        isStressed: false
    };

    static getStatus(): HealthState {
        return this.state;
    }

    static simulateStressSpike() {
        this.state.currentStress = 95; // Spike
        this.state.isStressed = true;
        return this.state;
    }

    static checkSleepHealth(newEndTime: Date): string | null {
        // If working past 11PM and sleep < 6h total prediction
        const hour = newEndTime.getHours();
        if (hour >= 23 && this.state.currentSleep < 6) {
            return "Sleep Debt Warning";
        }
        return null;
    }

    static breathe() {
        this.state.currentStress = 40; // Reset
        this.state.isStressed = false;
    }
}
