import MaintenanceCheckClient from './MaintenanceCheckClient';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // Per le rotte annidate servono entrambi i parametri
  return [{ vehicleTypeId: 'placeholder', checkId: 'placeholder' }];
}

export default function Page({ params }: { params: { vehicleTypeId: string, checkId: string } }) {
  return <MaintenanceCheckClient p1={params.vehicleTypeId} p2={params.checkId} />;
}
