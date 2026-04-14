export default function DashboardLayout({ children }: 
{ children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 border-b border-orange-500">
        <h1 className="text-orange-500 font-bold">CareAutoPro</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}