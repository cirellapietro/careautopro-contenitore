"use client";
export const dynamicParams = false;
export const generateStaticParams = () => [];
export const dynamicParams = false;
export const generateStaticParams = () => [];

import { redirect } from 'next/navigation';

export default function DashboardPage() {
  redirect('/dashboard/vehicles');
}
