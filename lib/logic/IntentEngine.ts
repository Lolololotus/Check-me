import { Category, IntentResult } from './types';

export class IntentEngine {
    private static KEYWORDS: Record<Category, string[]> = {
        'Deep Work': ['기획', '보고서', '분석', '코딩', '작성', '연구', '공부', '집중'],
        'Meeting': ['회의', '미팅', '약속', '식사', '통화', '인터뷰'],
        'Routine': ['운동', '명상', '약', '수면', '출근', '퇴근', '이동', '샤워'],
        'Quick Task': ['확인', '전송', '구매', '예약', '입금', '체크', '메일']
    };

    static parse(input: string): IntentResult {
        // Simple mock parser for prototype
        const action = input.includes('취소') || input.includes('삭제') ? 'Delete'
            : input.includes('수정') || input.includes('변경') ? 'Modify'
                : 'Add'; // Default to Add

        // Extract Potential Time (Simple Regex for HH:MM or N시)
        const timeMatch = input.match(/(\d{1,2})시\s*(\d{0,2})분?/);
        const time = timeMatch ? `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]?.padStart(2, '0') || '00'}` : undefined;

        // Detect Location / Movement
        const locationMatch = input.match(/(.+)에서|(.+)으로 이동/);
        const detectedLocation = locationMatch ? (locationMatch[1] || locationMatch[2]) : undefined;

        // Classify
        const category = this.classify(input, time, !!detectedLocation);

        return {
            action,
            target: input, // In a real NLP, this would be the extracted entity
            time,
            category,
            detectedLocation
        };
    }

    private static classify(input: string, time?: string, hasLocation?: boolean): Category {
        // Rule: Movement or Location -> Routine
        if (hasLocation || input.includes('이동')) return 'Routine';

        // Keyword Matching
        let maxScore = 0;
        let bestCategory: Category = 'Quick Task'; // Default

        const weights: Record<Category, number> = {
            'Meeting': 5, // Very High
            'Deep Work': 4, // High
            'Routine': 3, // Medium
            'Quick Task': 1 // Low
        };

        (Object.keys(this.KEYWORDS) as Category[]).forEach(cat => {
            const keywords = this.KEYWORDS[cat];
            const matchCount = keywords.filter(k => input.includes(k)).length;
            if (matchCount > 0) {
                const score = matchCount * weights[cat];
                if (score > maxScore) {
                    maxScore = score;
                    bestCategory = cat;
                }
            }
        });

        // Rule: 9-6 Ambiguous -> Deep Work
        if (time && maxScore === 0) {
            const hour = parseInt(time.split(':')[0]);
            if (hour >= 9 && hour <= 18) return 'Deep Work';
        }

        return bestCategory;
    }
}
