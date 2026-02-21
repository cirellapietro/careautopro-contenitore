import VehicleClient from './VehicleClient';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // Placeholder necessario per il build statico
  return [{ id: 'placeholder' }];
}

export default function Page({ params }: { params: { id: string } }) {
  return <VehicleClient id={params.id} />;
}
