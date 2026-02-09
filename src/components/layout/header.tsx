"use client"
import Link from "next/link"
import {
  LayoutDashboard,
  Car,
  BarChart3,
  PanelLeft,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { ThemeToggleButton } from "@/components/ui/theme-toggle-button"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname, useRouter } from "next/navigation"
import { useUser } from "@/firebase"
import { signOut } from "@/firebase/auth/auth"

const navItems = [
    { href: "/dashboard/vehicles", icon: Car, label: "Veicoli" },
    { href: "/dashboard/statistics", icon: BarChart3, label: "Statistiche" },
]

const MobileNav = () => (
    <nav className="grid gap-6 text-lg font-medium">
        <Logo className="mb-4" />
         <Link
            href="/dashboard"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
        </Link>
        {navItems.map((item) => (
            <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
                <item.icon className="h-5 w-5" />
                {item.label}
            </Link>
        ))}
    </nav>
)

const UserMenu = () => {
    const { user } = useUser();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    }

    if (!user) return null;

    const userInitial = user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : '?');

    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
            >
                <Avatar>
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.displayName || user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profilo</Link>
            </DropdownMenuItem>
            {user.role === 'Amministratore' && (
              <DropdownMenuItem asChild>
                  <Link href="/dashboard/admin/users">Admin Utenti</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Esci</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)}

const DesktopNav = () => {
    const pathname = usePathname();
    const isDashboardHome = pathname === '/dashboard';
    
    return (
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Logo />
             <Link
                href="/dashboard"
                className={`transition-colors hover:text-foreground ${isDashboardHome ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}
            >
                Dashboard
            </Link>
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={`transition-colors hover:text-foreground ${pathname.startsWith(item.href) ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <DesktopNav />
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <MobileNav />
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <ThemeToggleButton />
                <UserMenu />
            </div>
        </header>
    )
}
