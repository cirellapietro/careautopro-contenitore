export async function generateStaticParams() {
  // This function is required for static export with dynamic routes.
  // We return a dummy param to satisfy the build process for the 'obsolete' route.
  return [{ vehicleTypeId: '1', checkId: '1' }];
}

// This page is obsolete and should never be rendered.
// It exists only to satisfy the build process for static export.
export default function ObsoleteMaintenanceCheckDetailPage() {
  return null;
}
