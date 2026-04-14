
"use client"
import React, { useState } from "react"
import Link from "next/link"
import {
  LogOut,
  Shield,
  Bell,
  Activity,
  PlayCircle,
  Car,
  Pause,
  HelpCircle,
  ChevronDown,
  Settings,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ThemeToggleButton } from "@/components/ui/theme-toggle-button"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useUser } from "@/firebase/auth/use-user"
import { signOut } from "@/firebase/auth/auth"
import { useTracking } from "@/contexts/tracking-context"
import { useLanguage } from "@/contexts/language-context"
import { useFirebase, useCollection } from "@/firebase"
import { collection, query, where } from "firebase/firestore"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Language } from "@/lib/translations"

const languageFlags: Record<Language, string> = {
  it: '🇮🇹',
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  de: '🇩🇪',
};

const UserMenu = () => {
    const { user } = useUser();
    const { t } = useLanguage();
import { useFirebase, useCollection } from "@/firebase"
import { useMemo } from "react"
import { collection, query, where } from "firebase/firestore"
import { Badge } from "@/components/ui/badge"

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
                className="overflow-hidden rounded-full border-2 hover:border-primary transition-all"
                className="overflow-hidden rounded-full"
            >
                <Avatar>
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-black uppercase text-[10px] text-muted-foreground">{user.displayName || user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="cursor-pointer w-full flex items-center gap-2 font-bold uppercase text-xs">
                    <Settings className="h-4 w-4" />
                    <span>{t('profile')}</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/dashboard" className="cursor-pointer w-full flex items-center gap-2 font-black uppercase text-xs text-primary">
                    <Car className="h-4 w-4" />
                    <span>{t('vehicles')}</span>
                </Link>
            </DropdownMenuItem>
            {user.role === 'Amministratore Sistema' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/admin" className="flex items-center gap-2 cursor-pointer w-full font-black uppercase text-xs text-accent">
                    <Shield className="h-4 w-4" />
                    <span>{t('admin')}</span>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.displayName || user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="cursor-pointer w-full">Profilo</Link>
            </DropdownMenuItem>
            {user.role === 'Amministratore' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/admin" className="flex items-center gap-2 cursor-pointer w-full">
                    <Shield className="h-4 w-4" />
                    <span>Pannello Admin</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer text-destructive font-black uppercase text-xs">
                <LogOut className="h-4 w-4" />
                <span>{t('logout')}</span>
            <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Esci</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 px-2 h-9">
          <span className="text-lg">{languageFlags[language]}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {(Object.keys(languageFlags) as Language[]).map((lang) => (
          <DropdownMenuItem 
            key={lang} 
            onClick={() => setLanguage(lang)}
            className={cn("gap-2 cursor-pointer", language === lang && "bg-accent")}
          >
            <span className="text-lg">{languageFlags[lang]}</span>
            <span className="text-xs uppercase font-bold">{lang}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HelpDialog() {
  const { t } = useLanguage();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="uppercase flex items-center gap-2 italic font-black">
            <HelpCircle className="text-accent" /> {t('help')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 text-xs font-bold uppercase leading-relaxed text-muted-foreground">
          <p>{t('help_step_1')}</p>
          <p>{t('help_step_2')}</p>
          <p>{t('help_step_3')}</p>
          <p>{t('help_step_4')}</p>
          <div className="pt-4 border-t">
            <p className="text-primary">{t('tech_support')}</p>
            <p className="text-accent">support@careautopro.it</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TrackingIndicator() {
    const { isTracking, isPaused, isHotspotActive, trackedVehicle, sessionDistance } = useTracking();
    const { t } = useLanguage();
    
    // Mostriamo l'indicatore solo se il tracking è effettivamente attivo
    if (!isTracking || !trackedVehicle) return null;

    return (
        <div className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black text-white transition-all shadow-lg border-2 border-white/20",
            isPaused ? "bg-yellow-500" : "bg-destructive"
        )}>
            {isPaused ? (
                <Pause className="h-3 w-3 fill-current" />
            ) : (
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </div>
            )}
            <div className="flex flex-col items-start leading-none gap-0.5">
                <div className="flex items-center gap-2">
                    <span className="max-w-[80px] sm:max-w-[150px] truncate uppercase tracking-tighter">
                        {trackedVehicle.name}
                    </span>
                </div>
                <span className="text-[8px] font-black uppercase">
                    {isPaused ? t('paused_session') : t('active_session')}
                </span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/30 ml-1 pl-2 hidden sm:flex">
                <span className="flex items-center gap-1 tabular-nums">
                    <Activity className="h-3 w-3" /> {sessionDistance.toFixed(2)} KM
                </span>
            </div>
function TrackingIndicator() {
    const { isTracking, trackedVehicle } = useTracking();
    if (!isTracking || !trackedVehicle) return null;

    return (
        <div className="hidden items-center gap-2 rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground md:flex">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span>Tracciando: {trackedVehicle.name}</span>
        </div>
    );
}

function NotificationBell() {
    const { user } = useUser();
    const { firestore } = useFirebase();

    const alertsQuery = React.useMemo(() => {
    const alertsQuery = useMemo(() => {
        if (!user || !firestore) return null;
        return query(
            collection(firestore, `users/${user.uid}/alerts`),
            where('isRead', '==', false),
            where('dataoraelimina', '==', null)
        );
    }, [user, firestore]);

    const { data: unreadAlerts } = useCollection(alertsQuery);
    const count = unreadAlerts?.length || 0;

    return (
        <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/dashboard/notifications">
                <Bell className="h-5 w-5" />
                {count > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive text-destructive-foreground">
                        {count > 9 ? '9+' : count}
                    </Badge>
                )}
            </Link>
        </Button>
    );
}


export function Header() {
    const { user } = useUser();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
            <div className="flex items-center gap-2">
                <Link href="/dashboard" className="mr-4">
                    <Logo />
                </Link>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
                <TrackingIndicator />
                <NotificationBell />
                
                <div className="hidden sm:flex items-center gap-1">
                  <HelpDialog />
                  <LanguageSwitcher />
                  <ThemeToggleButton />
                </div>

                {user && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleSignOut} 
                        className="text-destructive font-black uppercase text-[10px] gap-2 hover:bg-destructive/10 border border-destructive/20 ml-1"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden lg:inline">ESCI</span>
                    </Button>
                )}

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
            <Link href="/dashboard">
                <Logo />
            </Link>
            <div className="flex items-center gap-4">
                <TrackingIndicator />
                <NotificationBell />
                <ThemeToggleButton />
                <UserMenu />
            </div>
        </header>
    )
}
