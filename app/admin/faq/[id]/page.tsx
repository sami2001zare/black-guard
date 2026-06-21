import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import FaqForm from '@/components/admin/FaqForm';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditFaqPage({ params }: Props) {
    const { id } = await params;
    const faq = await prisma.faq.findUnique({
        where: { id },
    });

    if (!faq) {
        notFound();
    }

    const serialized = {
        ...faq,
        createdAt: faq.createdAt.toISOString(),
        updatedAt: faq.updatedAt.toISOString(),
    };

    return <FaqForm id={id} initialData={serialized} />;
}