import RoleClient from './RoleClient';

export async function generateStaticParams() {
  // Necessario per evitare l'errore di build in Next.js 15+
  return [];
}

export default function Page({ params }: { params: { id: string } }) {
  return <RoleClient id={params.id} />;
}
