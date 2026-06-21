import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AboutForm from '@/components/admin/AboutForm';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditAboutPage({ params }: Props) {
    const { id } = await params;
    const about = await prisma.about.findUnique({
        where: { id },
        // include: { imageMedia: true },
    });

    if (!about) {
        notFound();
    }

    const serialized = {
        ...about,
        // imageMediaId: about.imageMediaId || undefined,
        createdAt: about.createdAt.toISOString(),
        updatedAt: about.updatedAt.toISOString(),
    };

    return <AboutForm id={id} initialData={serialized} />;
}
