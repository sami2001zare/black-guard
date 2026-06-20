import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import CeremonialForm from '@/components/admin/CeremonialForm';

interface Props {
    params: { id: string };
}

export default async function EditCeremonialPage({ params }: Props) {
    const { id } = await params;
    const service = await prisma.ceremonialService.findUnique({
        where: { id },
        include: { imageMedia: true },
    });

    if (!service) {
        notFound();
    }

    const serialized = {
        ...service,
        createdAt: service.createdAt.toISOString(),
        updatedAt: service.updatedAt.toISOString(),
    };

    return <CeremonialForm id={id} initialData={serialized} />;
}
