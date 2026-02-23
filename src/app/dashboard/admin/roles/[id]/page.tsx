import RoleClient from './RoleClient';

export const dynamic = 'force-dynamic';

export default function Page({ params }: { params: { id: string } }) {
  return <RoleClient id={params.id} />;
}
