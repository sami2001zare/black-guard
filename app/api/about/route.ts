import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const about = await prisma.about.findFirst({
            orderBy: { createdAt: 'desc' },
            //   include: { imageMedia: true },
        });
        return NextResponse.json(about);
    } catch (error) {
        console.error('Fetch about error:', error);
        return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { titleEn, titleFa, titleAr, contentEn, contentFa, contentAr, published } = body;

        if (!titleEn || !contentEn) {
            return NextResponse.json(
                { error: 'Title (EN) and Content (EN) are required' },
                { status: 400 }
            );
        }

        const about = await prisma.about.create({
            data: {
                titleEn,
                titleFa,
                titleAr,
                contentEn,
                contentFa,
                contentAr,
                published: published !== undefined ? published : true,
            },
            //   include: { imageMedia: true },
        });

        return NextResponse.json({ success: true, about }, { status: 201 });
    } catch (error) {
        console.error('Create about error:', error);
        return NextResponse.json({ error: 'Failed to create about content' }, { status: 500 });
    }
}
