import UserClient from './UserClient';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // Obbligatorio per "output: export". Registriamo un placeholder.
  return [{ id: 'placeholder' }];
}

export default function Page({ params }: { params: { id: string } }) {
  return <UserClient id={params.id} />;
}
