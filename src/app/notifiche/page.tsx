'use client';
import { redirect } from 'next/navigation';

/**
 * Reindirizzamento alla rotta corretta della dashboard.
 * Il vecchio file .jsx è stato sostituito con questo .tsx per consistenza.
 */
export default function LegacyNotificationsPage() {
  redirect('/dashboard/notifications');
}
