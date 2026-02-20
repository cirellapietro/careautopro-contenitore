import RoleClient from './RoleClient';

export async function generateStaticParams() {
  // Array vuoto per supportare la generazione dinamica on-demand
  return [];
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <RoleClient id={id} />;
}
