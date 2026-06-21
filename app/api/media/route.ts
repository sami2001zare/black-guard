import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function GET() {
    try {
        const media = await prisma.media.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(media);
    } catch (error) {
        console.error('Fetch media error:', error);
        return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
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
        const { id, isGallery } = body;

        if (!id || typeof isGallery !== 'boolean') {
            return NextResponse.json({ error: 'Missing id or isGallery' }, { status: 400 });
        }

        const media = await prisma.media.update({
            where: { id },
            data: { isGallery },
        });

        return NextResponse.json({ success: true, media });
    } catch (error) {
        console.error('Toggle gallery error:', error);
        return NextResponse.json({ error: 'Failed to update media' }, { status: 500 });
    }
}
