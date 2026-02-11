"use client"
import Link from "next/link"
import {
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
import { ThemeToggleButton } from "@/components/ui/theme-toggle-button"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useUser } from "@/firebase/auth/use-user"
import { signOut } from "@/firebase/auth/auth"

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
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Amministrazione</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/admin/users">Gestione Utenti</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/admin/vehicle-types">Gestione Tipi Veicolo</Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Esci</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)}


export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
            <Link href="/dashboard">
                <Logo />
            </Link>
            <div className="flex items-center gap-4">
                <ThemeToggleButton />
                <UserMenu />
            </div>
        </header>
    )
}
