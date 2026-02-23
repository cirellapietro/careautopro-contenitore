import MaintenanceCheckClient from './MaintenanceCheckClient';

export const dynamic = 'force-dynamic';

export default function Page({ params }: { params: { vehicleTypeId: string, checkId: string } }) {
  return <MaintenanceCheckClient p1={params.vehicleTypeId} p2={params.checkId} />;
}
