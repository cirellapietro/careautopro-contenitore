import PageContent from "./page-content";

export default function Page({
  params,
}: {
  params: { vehicleTypeId: string };
}) {
  return <PageContent vehicleTypeId={params.vehicleTypeId} />;
}
