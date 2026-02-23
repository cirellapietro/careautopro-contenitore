import PageContent from './page-content';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // This generates a placeholder page during the build process for static export.
  return [{ vehicleTypeId: '1' }];
}

export default function VehicleTypeDetailPage({ params }: { params: { vehicleTypeId: string } }) {
  return <PageContent params={params} />;
}
