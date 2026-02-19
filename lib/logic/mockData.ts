import { Task } from './types';

export const MOCK_TASKS: Task[] = [
    {
        id: '1',
        title: 'Q3 마케팅 전략 기획',
        category: 'Deep Work',
        startTime: '09:00',
        endTime: '11:00',
        priority: 1,
        status: 'Active',
        isFixed: false,
        location: 'Office'
    },
    {
        id: '2',
        title: '점심 약속 (기획팀)',
        category: 'Meeting',
        startTime: '12:00',
        endTime: '13:00',
        priority: 2,
        status: 'Active',
        isFixed: true,
        location: '을지로 평양냉면'
    },
    {
        id: '3',
        title: '주간 업무 보고',
        category: 'Meeting',
        startTime: '14:00',
        endTime: '15:00',
        priority: 2,
        status: 'Active',
        isFixed: true,
        location: 'Conference Room A'
    },
    {
        id: '4',
        title: '헬스장 이동',
        category: 'Routine',
        startTime: '18:30',
        endTime: '19:00',
        priority: 3,
        status: 'Active',
        isFixed: false,
        location: 'Transit',
        bufferDuration: 30
    },
    {
        id: '5',
        title: 'PT 수업',
        category: 'Routine',
        startTime: '19:00',
        endTime: '20:00',
        priority: 3,
        status: 'Active',
        isFixed: true,
        location: 'Gym'
    }
];
