import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  // This function is required for static export with dynamic routes.
  // We return a dummy param to satisfy the build process.
  return [{ id: '1' }];
}

// This page is obsolete and redirects to the new structure.
export default function ObsoleteUserDetailPage({ params }: { params: { id:string } }) {
    redirect(`/dashboard/admin/users/view?id=${params.id}`);
}
