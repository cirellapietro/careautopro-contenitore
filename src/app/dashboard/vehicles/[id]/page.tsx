import VehicleClient from './VehicleClient';

export const dynamic = 'force-dynamic';

export default function Page({ params }: { params: { id: string } }) {
  return <VehicleClient id={params.id} />;
}
