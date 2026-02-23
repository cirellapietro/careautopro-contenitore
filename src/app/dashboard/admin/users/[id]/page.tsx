import PageContent from './page-content';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // This generates a placeholder page during the build process for static export.
  return [{ id: '1' }];
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <PageContent params={params} />;
}
