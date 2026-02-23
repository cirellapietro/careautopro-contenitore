import PageContent from './page-content';

export async function generateStaticParams() {
  return [{ id: 'view' }];
}

export default function RoleDetailPage() {
  return <PageContent />;
}
