import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const alt = formData.get('alt') as string | null;
        const title = formData.get('title') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type (optional)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only JPEG, PNG, WebP, GIF allowed.' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const ext = path.extname(file.name);
        const baseName = path.basename(file.name, ext);
        const uniqueName = `${baseName}-${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;

        // Define path
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, uniqueName);
        const relativePath = `/uploads/${uniqueName}`;

        // Ensure upload directory exists
        await mkdir(uploadDir, { recursive: true });

        // Convert File to Buffer and write
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // Save to database
        const media = await prisma.media.create({
            data: {
                filename: file.name,
                path: relativePath,
                mimeType: file.type,
                size: file.size,
                alt: alt || null,
                title: title || null,
            },
        });

        return NextResponse.json({ success: true, media }, { status: 201 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
