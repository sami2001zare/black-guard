import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      include: { imageMedia: true },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error('Public team error:', error);
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}