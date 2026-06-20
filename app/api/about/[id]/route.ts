import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { titleEn, titleFa, titleAr, contentEn, contentFa, contentAr, published } = body;

        const about = await prisma.about.update({
            where: { id },
            data: {
                titleEn,
                titleFa,
                titleAr,
                contentEn,
                contentFa,
                contentAr,
                // imageMediaId: imageMediaId || null,
                published: published !== undefined ? published : true,
            },
            //   include: { imageMedia: true },
        });

        return NextResponse.json({ success: true, about });
    } catch (error) {
        console.error('Update about error:', error);
        return NextResponse.json({ error: 'Failed to update about content' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        await prisma.about.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete about error:', error);
        return NextResponse.json({ error: 'Failed to delete about content' }, { status: 500 });
    }
}
