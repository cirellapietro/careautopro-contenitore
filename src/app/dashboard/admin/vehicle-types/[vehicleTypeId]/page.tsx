import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  // This function is required for static export with dynamic routes.
  // We return a dummy param to satisfy the build process.
  return [{ vehicleTypeId: '1' }];
}

// This page is obsolete and redirects to the new structure.
export default function ObsoleteVehicleTypeDetailPage({ params }: { params: { vehicleTypeId: string } }) {
    redirect(`/dashboard/admin/vehicle-types/view?id=${params.vehicleTypeId}`);
}
