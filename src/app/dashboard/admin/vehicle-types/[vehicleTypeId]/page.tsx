import PageContent from './page-content';

export async function generateStaticParams() {
  return [{ vehicleTypeId: '1' }];
}

export default function VehicleTypeDetailPage({ params }: { params: { vehicleTypeId: string } }) {
  return <PageContent params={params} />;
}
