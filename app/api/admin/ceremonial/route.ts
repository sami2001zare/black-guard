import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    // Authenticate
    const token = getTokenFromRequest(request);
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const payload = verifyToken(token);
    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const services = await prisma.ceremonialService.findMany({
            orderBy: { order: 'asc' },
            include: { imageMedia: true },
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Fetch ceremonial services error:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    // Authenticate
    const token = getTokenFromRequest(request);
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const payload = verifyToken(token);
    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const {
            titleEn,
            titleFa,
            titleAr,
            descriptionEn,
            descriptionFa,
            descriptionAr,
            imageMediaId,
            published,
        } = body;

        if (!titleEn || !descriptionEn) {
            return NextResponse.json(
                { error: 'Title (EN) and Description (EN) are required' },
                { status: 400 }
            );
        }

        // Get max order
        const maxOrder = await prisma.ceremonialService.aggregate({
            _max: { order: true },
        });
        const nextOrder = (maxOrder._max.order ?? 0) + 1;

        const service = await prisma.ceremonialService.create({
            data: {
                titleEn,
                titleFa,
                titleAr,
                descriptionEn,
                descriptionFa,
                descriptionAr,
                imageMediaId: imageMediaId || null,
                order: nextOrder,
                published: published !== undefined ? published : true,
            },
        });

        return NextResponse.json({ success: true, service }, { status: 201 });
    } catch (error) {
        console.error('Create ceremonial service error:', error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
