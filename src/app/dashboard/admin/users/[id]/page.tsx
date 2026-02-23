import UserClient from './UserClient';

export const dynamic = 'force-dynamic';

export default function Page({ params }: { params: { id: string } }) {
  return <UserClient id={params.id} />;
}
