// This file is obsolete. Its logic has been moved to /src/app/dashboard/admin/vehicle-types/view/page.tsx

export async function generateStaticParams() {
  // This function is required for static export with dynamic routes.
  // We return a dummy param to satisfy the build process. The actual data is fetched client-side on the /view page.
  return [{ vehicleTypeId: '1' }];
}

export default function ObsoleteVehicleTypeDetailPage() {
  return null;
}
