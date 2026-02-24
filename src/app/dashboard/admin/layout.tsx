'use client';

import { useUser } from '@/firebase/auth/use-user';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'Amministratore')) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  const adminNavItems = [
    { href: "/dashboard/admin/settings", label: "Impostazioni" },
    { href: "/dashboard/admin/users", label: "Utenti" },
    { href: "/dashboard/admin/vehicle-types", label: "Tipi Veicolo" },
    { href: "/dashboard/admin/roles", label: "Ruoli" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        <aside>
            <nav className="flex flex-col gap-2">
                {adminNavItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            pathname.startsWith(item.href)
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
        <main>{children}</main>
    </div>
  );
}
