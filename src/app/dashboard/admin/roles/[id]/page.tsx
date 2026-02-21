import RoleClient from './RoleClient';

// Con output: export, Next.js DEVE conoscere almeno un ID in fase di build
export async function generateStaticParams() {
  // Restituiamo un segnaposto. In produzione, potresti voler scaricare gli ID reali qui.
  return [{ id: 'placeholder' }];
}

// Forza il rendering statico
export const dynamic = 'force-static';

export default function Page({ params }: { params: { id: string } }) {
  return <RoleClient id={params.id} />;
}
