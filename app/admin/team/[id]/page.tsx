import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import TeamMemberForm from '@/components/admin/TeamMemberForm';

interface Props {
  params: { id: string };
}

export default async function EditTeamPage({ params }: Props) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({
    where: { id },
    include: { imageMedia: true },
  });

  if (!member) {
    notFound();
  }

  const serialized = {
    ...member,
    createdAt: member.createdAt.toISOString(),
    updatedAt: member.updatedAt.toISOString(),
  };

  return <TeamMemberForm id={id} initialData={serialized} />;
}