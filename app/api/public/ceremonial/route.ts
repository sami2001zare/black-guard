import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.ceremonialService.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      include: { imageMedia: true },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Public ceremonial services error:', error);
    return NextResponse.json({ error: 'Failed to fetch ceremonial services' }, { status: 500 });
  }
}