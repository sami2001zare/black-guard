// app/api/team/[id]/route.ts
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
      order,
      published,
    } = body;

    const member = await prisma.teamMember.update({
      where: { id },
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
        order: order || 0,
        published: published !== undefined ? published : true,
      },
    });

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Update team error:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete team error:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}