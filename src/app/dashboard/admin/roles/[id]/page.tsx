import PageContent from './page-content';

export async function generateStaticParams() {
  // This generates a placeholder page during the build process.
  // Client-side navigation will still work for other IDs.
  return [{ id: '1' }];
}

export default function RoleDetailPage({ params }: { params: { id: string } }) {
  return <PageContent roleId={params.id} />;
}
