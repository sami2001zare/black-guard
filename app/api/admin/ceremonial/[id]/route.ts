import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { id } = await params;
    const body = await request.json();
    const { titleEn, titleFa, titleAr, descriptionEn, descriptionFa, descriptionAr, imageMediaId, published } = body;

    const service = await prisma.ceremonialService.update({
      where: { id },
      data: {
        titleEn,
        titleFa,
        titleAr,
        descriptionEn,
        descriptionFa,
        descriptionAr,
        imageMediaId: imageMediaId || null,
        published: published !== undefined ? published : true,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Update ceremonial service error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { id } = await params;
    await prisma.ceremonialService.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete ceremonial service error:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}