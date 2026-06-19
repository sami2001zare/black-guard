import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    //   include: { imageMedia: true },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Fetch services error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titleEn, titleFa, titleAr, descriptionEn, descriptionFa, descriptionAr, imageMediaId, published } = body;

    if (!titleEn || !descriptionEn) {
      return NextResponse.json({ error: 'Title (EN) and Description (EN) are required' }, { status: 400 });
    }

    const slug = generateSlug(titleEn);

    // Check if slug already exists
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'A service with this title already exists' }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        titleEn,
        titleFa,
        titleAr,
        descriptionEn,
        descriptionFa,
        descriptionAr,
        slug,
        imageMediaId: imageMediaId || null,
        published: published !== undefined ? published : true,
      },
    });

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}