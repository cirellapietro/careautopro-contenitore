import PageContent from './page-content';

export async function generateStaticParams() {
  return [{ id: '1' }];
}

export default function RoleDetailPage({ params }: { params: { id: string } }) {
  return <PageContent params={params} />;
}
