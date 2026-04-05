import { NextRequest, NextResponse } from 'next/server';
import { createTaskService, getAllTasksService } from '@/src/services/tasks';
import type { CreateTaskInput } from '@/types/task';

export async function GET() {
    try {
        const tasks = await getAllTasksService();
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, status, dueDate, userId } = body;

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }
        if (!userId || typeof userId !== 'number') {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        const input: CreateTaskInput = { title, description: description ?? null, status: status ?? 'pending', dueDate: dueDate ?? null, userId };
        const newTask = await createTaskService(input);
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}