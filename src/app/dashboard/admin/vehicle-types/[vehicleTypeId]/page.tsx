import VehicleTypeClient from './VehicleTypeClient';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // Placeholder necessario per il build statico
  return [{ vehicleTypeId: 'placeholder' }];
}

export default function Page({ params }: { params: { vehicleTypeId: string } }) {
  return <VehicleTypeClient id={params.vehicleTypeId} />;
}
