import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const media = await prisma.media.findMany({
      where: { isGallery: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error('Public gallery error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}