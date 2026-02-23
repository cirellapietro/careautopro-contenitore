import VehicleTypeClient from './VehicleTypeClient';

export const dynamic = 'force-dynamic';

export default function Page({ params }: { params: { vehicleTypeId: string } }) {
  return <VehicleTypeClient id={params.vehicleTypeId} />;
}
