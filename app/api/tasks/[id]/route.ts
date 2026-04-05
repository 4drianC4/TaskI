import { NextRequest, NextResponse } from 'next/server';
import { getTaskByIdService, deleteTaskService, patchTaskService, replaceTaskService } from '@/src/services/tasks';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    const task = await getTaskByIdService(id);
    if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(task);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    const body = await request.json();
    const { title, description, status, dueDate, userId } = body;

    if (!title || typeof title !== 'string' || title.trim() === '') return NextResponse.json({ error: 'Title required' }, { status: 400 });
    if (typeof userId !== 'number') return NextResponse.json({ error: 'userId required' }, { status: 400 });

    try {
        const updated = await replaceTaskService(id, { title, description: description ?? null, status: status ?? 'pending', dueDate: dueDate ?? null, userId });
        return NextResponse.json(updated);
    } catch (error: any) {
        if (error.code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    const body = await request.json();
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.dueDate !== undefined) updateData.dueDate = body.dueDate;
    if (body.userId !== undefined) updateData.userId = body.userId;

    try {
        const updated = await patchTaskService(id, updateData);
        return NextResponse.json(updated);
    } catch (error: any) {
        if (error.code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    try {
        const deleted = await deleteTaskService(id);
        return NextResponse.json(deleted);
    } catch (error: any) {
        if (error.code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}