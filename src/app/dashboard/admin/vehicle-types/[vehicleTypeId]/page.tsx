import PageContent from './page-content';

export async function generateStaticParams() {
  return [{ vehicleTypeId: 'view' }];
}

export default function VehicleTypeDetailPage() {
  return <PageContent />;
}
