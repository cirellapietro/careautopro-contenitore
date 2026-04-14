'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase } from '@/firebase';
import { doc, updateDoc, collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { useLanguage } from '@/contexts/language-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ShieldCheck, FileText, Info } from 'lucide-react';
import type { Vehicle } from '@/lib/types';

export function PostSignupPrompts() {
    const { user } = useUser();
    const { firestore } = useFirebase();
    const { t } = useLanguage();

    const [showLicensePrompt, setShowLicensePrompt] = useState(false);
    const [showVehicleDocsPrompt, setShowVehicleDocsPrompt] = useState(false);
    const [targetVehicle, setTargetVehicle] = useState<Vehicle | null>(null);
    
    // Flags per sessione per evitare loop
    const [licenseSkipped, setLicenseSkipped] = useState(false);
    const [docsSkipped, setDocsSkipped] = useState(false);

    const [licenseDate, setLicenseDate] = useState('');
    const [insuranceDate, setInsuranceDate] = useState('');
    const [inspectionDate, setInspectionDate] = useState('');
    const [dontAskLicense, setDontAskLicense] = useState(false);
    const [dontAskVehicle, setDontAskVehicle] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!user || !firestore) return;

        // 1. Controllo Patente
        const hideLicense = localStorage.getItem('hideLicensePrompt') === 'true';
        if (!hideLicense && !user.licenseExpirationDate && !licenseSkipped) {
            setShowLicensePrompt(true);
        } else {
            setShowLicensePrompt(false);
        }

        // 2. Controllo Documenti Veicolo
        if (!showLicensePrompt) {
            const q = query(collection(firestore, `users/${user.uid}/vehicles`), where('dataoraelimina', '==', null));
            const unsubscribe = onSnapshot(q, (snap) => {
                if (snap.empty) {
                    setShowVehicleDocsPrompt(false);
                    return;
                }
                
                const userVehicles = snap.docs.map(d => ({ ...d.data(), id: d.id } as Vehicle));
                const lastVehicle = userVehicles.sort((a, b) => {
                    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                    return dateB - dateA;
                })[0];

                const hideVehicle = localStorage.getItem(`hideVehicleDocsPrompt_${lastVehicle.id}`) === 'true';
                if (!hideVehicle && (!lastVehicle.insuranceExpirationDate || !lastVehicle.inspectionExpirationDate) && !docsSkipped) {
                    setTargetVehicle(lastVehicle);
                    setShowVehicleDocsPrompt(true);
                } else {
                    setShowVehicleDocsPrompt(false);
                }
            });
            return () => unsubscribe();
        }
    }, [user, firestore, showLicensePrompt, licenseSkipped, docsSkipped]);

    const handleSaveLicense = async () => {
        if (!user || !firestore || !licenseDate) return;
        setIsSaving(true);
        try {
            await updateDoc(doc(firestore, 'users', user.uid), { licenseExpirationDate: licenseDate });
            if (dontAskLicense) localStorage.setItem('hideLicensePrompt', 'true');
            setShowLicensePrompt(false);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSkipLicense = () => {
        if (dontAskLicense) localStorage.setItem('hideLicensePrompt', 'true');
        setLicenseSkipped(true);
        setShowLicensePrompt(false);
    };

    const handleSaveVehicleDocs = async () => {
        if (!user || !firestore || !targetVehicle) return;
        setIsSaving(true);
        try {
            await updateDoc(doc(firestore, `users/${user.uid}/vehicles`, targetVehicle.id), {
                insuranceExpirationDate: insuranceDate || targetVehicle.insuranceExpirationDate || null,
                inspectionExpirationDate: inspectionDate || targetVehicle.inspectionExpirationDate || null,
                updatedAt: new Date().toISOString()
            });
            if (dontAskVehicle) localStorage.setItem(`hideVehicleDocsPrompt_${targetVehicle.id}`, 'true');
            setShowVehicleDocsPrompt(false);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSkipVehicleDocs = () => {
        if (dontAskVehicle && targetVehicle) localStorage.setItem(`hideVehicleDocsPrompt_${targetVehicle.id}`, 'true');
        setDocsSkipped(true);
        setShowVehicleDocsPrompt(false);
    };

    return (
        <>
            <Dialog open={showLicensePrompt} onOpenChange={(open) => { if(!open) handleSkipLicense(); }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="uppercase italic font-black flex items-center gap-2">
                            <ShieldCheck className="text-accent" /> {t('license_prompt_title')}
                        </DialogTitle>
                        <DialogDescription className="uppercase text-[10px] font-bold">
                            {t('license_prompt_desc')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Input type="date" value={licenseDate} onChange={(e) => setLicenseDate(e.target.value)} className="font-bold" />
                        <div className="flex items-center space-x-2 bg-muted/20 p-3 rounded-md border">
                            <Checkbox id="dontAskLic" checked={dontAskLicense} onCheckedChange={(val) => setDontAskLicense(!!val)} />
                            <label htmlFor="dontAskLic" className="text-[10px] font-black uppercase cursor-pointer">{t('dont_ask_again')}</label>
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col gap-2">
                        <Button className="w-full font-black uppercase h-12 shadow-lg bg-accent hover:bg-accent/90" onClick={handleSaveLicense} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} SALVA
                        </Button>
                        <Button className="w-full font-black uppercase h-12 shadow-lg bg-accent hover:bg-accent/90" onClick={handleSkipLicense}>
                            LO FARÒ PIÙ TARDI
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showVehicleDocsPrompt} onOpenChange={(open) => { if(!open) handleSkipVehicleDocs(); }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="uppercase italic font-black flex items-center gap-2">
                            <FileText className="text-accent" /> {t('vehicle_docs_prompt_title')}
                        </DialogTitle>
                        <DialogDescription className="uppercase text-[10px] font-bold">
                            DOCUMENTI PER: <strong>{targetVehicle?.name}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase">{t('insurance_label')}</Label>
                            <Input type="date" value={insuranceDate} onChange={(e) => setInsuranceDate(e.target.value)} className="font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase">{t('inspection_label')}</Label>
                            <Input type="date" value={inspectionDate} onChange={(e) => setInspectionDate(e.target.value)} className="font-bold" />
                        </div>
                        <div className="flex items-center space-x-2 bg-muted/20 p-3 rounded-md border">
                            <Checkbox id="dontAskVeh" checked={dontAskVehicle} onCheckedChange={(val) => setDontAskVehicle(!!val)} />
                            <label htmlFor="dontAskVeh" className="text-[10px] font-black uppercase cursor-pointer">{t('dont_ask_again')}</label>
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col gap-2">
                        <Button className="w-full font-black uppercase h-12 shadow-lg bg-accent hover:bg-accent/90" onClick={handleSaveVehicleDocs} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} SALVA
                        </Button>
                        <Button className="w-full font-black uppercase h-12 shadow-lg bg-accent hover:bg-accent/90" onClick={handleSkipVehicleDocs}>
                            LO FARÒ PIÙ TARDI
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}