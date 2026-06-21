import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    //   include: { imageMedia: true },
    });

    if (!about) {
      return NextResponse.json({ error: 'No about content found' }, { status: 404 });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error('Public about error:', error);
    return NextResponse.json({ error: 'Failed to fetch about' }, { status: 500 });
  }
}