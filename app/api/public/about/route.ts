import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const about = await prisma.about.findUnique({
      where: { id: 'about', published: true },
      include: { imageMedia: true },
    });

    if (!about) {
      return NextResponse.json({ error: 'About content not found' }, { status: 404 });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error('Public about error:', error);
    return NextResponse.json({ error: 'Failed to fetch about' }, { status: 500 });
  }
}