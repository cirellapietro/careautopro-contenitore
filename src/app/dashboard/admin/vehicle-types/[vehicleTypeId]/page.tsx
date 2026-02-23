
export function generateStaticParams() {
  // This generates a placeholder page during the build process for static export.
  return [{ vehicleTypeId: '1' }];
}

// Re-export the client component with the params.
// This allows the page to be a server component for `generateStaticParams`
// while the content is a client component that receives `params`.
export { default } from './page-content';
