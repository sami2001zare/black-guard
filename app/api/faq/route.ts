// app/api/faq/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const faqs = await prisma.faq.findMany({
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        });
        return NextResponse.json(faqs);
    } catch (error) {
        console.error('Fetch FAQs error:', error);
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            questionEn,
            questionFa,
            questionAr,
            answerEn,
            answerFa,
            answerAr,
            category,
            published,
        } = body;

        if (!questionEn || !answerEn) {
            return NextResponse.json(
                { error: 'Question (EN) and Answer (EN) are required' },
                { status: 400 }
            );
        }

        // Get max order
        const maxOrder = await prisma.faq.aggregate({
            _max: { order: true },
        });
        const nextOrder = (maxOrder._max.order ?? 0) + 1;

        const faq = await prisma.faq.create({
            data: {
                questionEn,
                questionFa,
                questionAr,
                answerEn,
                answerFa,
                answerAr,
                category: category || null,
                order: nextOrder,
                published: published !== undefined ? published : true,
            },
        });

        return NextResponse.json({ success: true, faq }, { status: 201 });
    } catch (error) {
        console.error('Create FAQ error:', error);
        return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
    }
}
