import PageContent from './page-content';

export async function generateStaticParams() {
  // We need to generate a placeholder page for the build process.
  // The actual ID will be read from query params on the client side.
  return [{ id: 'view' }];
}

export default function VehicleDetailPage() {
  return <PageContent />;
}
