import PageContent from './page-content';

export function generateStaticParams() {
  // This generates a placeholder page during the build process for static export.
  return [{ id: '1' }];
}

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  return <PageContent params={params} />;
}
