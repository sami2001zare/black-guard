import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = { published: true };
    if (category) {
      where.category = category;
    }

    const faqs = await prisma.faq.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Public FAQ error:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}