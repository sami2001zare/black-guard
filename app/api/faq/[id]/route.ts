// app/api/faq/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      questionEn,
      questionFa,
      questionAr,
      answerEn,
      answerFa,
      answerAr,
      category,
      order,
      published,
    } = body;

    const faq = await prisma.faq.update({
      where: { id },
      data: {
        questionEn,
        questionFa,
        questionAr,
        answerEn,
        answerFa,
        answerAr,
        category: category || null,
        order: order || 0,
        published: published !== undefined ? published : true,
      },
    });

    return NextResponse.json({ success: true, faq });
  } catch (error) {
    console.error('Update FAQ error:', error);
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.faq.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete FAQ error:', error);
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}