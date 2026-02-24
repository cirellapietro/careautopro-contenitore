"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useCollection } from "@/firebase/firestore/use-collection";
import { MaintenanceCheck } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { addDoc } from "firebase/firestore";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROLES } from "@/lib/types";

const FormSchema = z.object({
  name: z.string(),
  description: z.string(),
  interval_km: z.coerce.number(),
  interval_days: z.coerce.number(),
});

const AddMaintenanceCheckDialog = ({ vehicleTypeId }: { vehicleTypeId: string }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      interval_km: 0,
      interval_days: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const vehicleTypeRef = collection(
        db,
        `vehicle-types/${vehicleTypeId}/maintenance-checks`
      );
      await addDoc(vehicleTypeRef, {
        ...data,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });

      toast({ title: "Maintenance check added successfully" });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({ title: "Error adding document", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Maintenance Check
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Maintenance Check</DialogTitle>
          <DialogDescription>
            Add a new maintenance check to this vehicle type.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Oil Change" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Engine oil and filter change"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interval_km"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interval (km)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interval_days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interval (days)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Maintenance Check</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default function PageContent({ vehicleTypeId }: { vehicleTypeId: string }) {
  const { data: maintenanceChecks, loading } = useCollection<MaintenanceCheck>(
    `vehicle-types/${vehicleTypeId}/maintenance-checks`
  );

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <AddMaintenanceCheckDialog vehicleTypeId={vehicleTypeId} />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Interval (km)</TableHead>
            <TableHead>Interval (days)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceChecks.map((check) => (
            <TableRow key={check.id}>
              <TableCell>
                <Link
                  href={`/dashboard/admin/vehicle-types/${vehicleTypeId}/maintenance-checks/${check.id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {check.name}
                </Link>
              </TableCell>
              <TableCell>{check.description}</TableCell>
              <TableCell>{check.interval_km}</TableCell>
              <TableCell>{check.interval_days}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
