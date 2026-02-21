import VehicleTypeClient from './VehicleTypeClient';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // Obbligatorio per "output: export". Registriamo un placeholder.
  return [{ vehicleTypeId: 'placeholder' }];
}

export default function Page({ params }: { params: { vehicleTypeId: string } }) {
  return <VehicleTypeClient id={params.vehicleTypeId} />;
}
