// app/api/team/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const members = await prisma.teamMember.findMany({
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
            include: { imageMedia: true },
        });
        return NextResponse.json(members);
    } catch (error) {
        console.error('Fetch team error:', error);
        return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            nameEn,
            nameFa,
            nameAr,
            roleEn,
            roleFa,
            roleAr,
            credEn,
            credFa,
            credAr,
            imageMediaId,
            published,
        } = body;

        if (!nameEn || !roleEn) {
            return NextResponse.json(
                { error: 'Name (EN) and Role (EN) are required' },
                { status: 400 }
            );
        }

        // Get max order
        const maxOrder = await prisma.teamMember.aggregate({
            _max: { order: true },
        });
        const nextOrder = (maxOrder._max.order ?? 0) + 1;

        const member = await prisma.teamMember.create({
            data: {
                nameEn,
                nameFa,
                nameAr,
                roleEn,
                roleFa,
                roleAr,
                credEn,
                credFa,
                credAr,
                imageMediaId: imageMediaId || null,
                order: nextOrder,
                published: published !== undefined ? published : true,
            },
        });

        return NextResponse.json({ success: true, member }, { status: 201 });
    } catch (error) {
        console.error('Create team error:', error);
        return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
    }
}
