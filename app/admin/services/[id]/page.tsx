import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ServiceForm from '@/components/admin/ServiceForm';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: Props) {
    const { id } = await params;
    const service = await prisma.service.findUnique({
        where: { id },
        include: { imageMedia: true },
    });

    if (!service) {
        notFound();
    }

    const serialized = {
        ...service,
        imageMediaId: service.imageMediaId || undefined,
        createdAt: service.createdAt.toISOString(),
        updatedAt: service.updatedAt.toISOString(),
    };

    return <ServiceForm id={id} initialData={serialized} />;
}
