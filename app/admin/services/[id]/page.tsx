import { prisma } from '@/lib/prisma';
import ServiceForm from '@/components/admin/ServiceForm';
import { notFound } from 'next/navigation';

interface Props {
    params: { id: string };
}

export default async function EditServicePage({ params }: Props) {
    const { id } = await params;
    const service = await prisma.service.findUnique({
        where: { id },
        // include: { imageMedia: true },
    });

    if (!service) {
        notFound();
    }

    return <ServiceForm id={id} initialData={service} />;
}
