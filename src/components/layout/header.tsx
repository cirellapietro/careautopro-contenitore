"use client"
import Link from "next/link"
import {
  LayoutDashboard,
  Car,
  BarChart3,
  Wrench,
  User,
  Users,
  PanelLeft,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ThemeToggleButton } from "@/components/ui/theme-toggle-button"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/vehicles", icon: Car, label: "Veicoli" },
    { href: "/dashboard/statistics", icon: BarChart3, label: "Statistiche" },
]

const MobileNav = () => (
    <nav className="grid gap-6 text-lg font-medium">
        <Logo className="mb-4" />
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

const UserMenu = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
            >
                <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/5/100/100" alt="Avatar" />
                    <AvatarFallback>MR</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link href="/dashboard/profile" className="w-full">Profilo</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href="/dashboard/admin/users" className="w-full">Admin Utenti</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Esci</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)

const DesktopNav = () => {
    const pathname = usePathname();
    return (
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Logo />
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={`transition-colors hover:text-foreground ${pathname.startsWith(item.href) ? 'text-foreground' : 'text-muted-foreground'}`}
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
