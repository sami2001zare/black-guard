// app/api/services/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const {
            titleEn,
            titleFa,
            titleAr,
            descriptionEn,
            descriptionFa,
            descriptionAr,
            imageMediaId,
            order,
            published,
        } = body;

        // Generate slug from English title
        const slug = generateSlug(titleEn);

        const service = await prisma.service.update({
            where: { id },
            data: {
                titleEn,
                titleFa,
                titleAr,
                descriptionEn,
                descriptionFa,
                descriptionAr,
                slug,
                imageMediaId: imageMediaId || null,
                order: order || 0,
                published: published !== undefined ? published : true,
            },
        });

        return NextResponse.json({ success: true, service });
    } catch (error) {
        console.error('Update service error:', error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        await prisma.service.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete service error:', error);
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
