(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[4568],{

/***/ 23779:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ InterventionsPage)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
// EXTERNAL MODULE: ./src/firebase/auth/use-user.tsx
var use_user = __webpack_require__(12298);
// EXTERNAL MODULE: ./src/firebase/index.ts + 3 modules
var firebase = __webpack_require__(7227);
// EXTERNAL MODULE: ./node_modules/firebase/firestore/dist/esm/index.esm.js
var index_esm = __webpack_require__(19708);
// EXTERNAL MODULE: ./src/components/ui/card.tsx
var card = __webpack_require__(86948);
// EXTERNAL MODULE: ./src/components/ui/table.tsx
var table = __webpack_require__(87270);
// EXTERNAL MODULE: ./src/components/ui/badge.tsx
var badge = __webpack_require__(11647);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle-check.js
var circle_check = __webpack_require__(50984);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/pencil.js
var pencil = __webpack_require__(74640);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/trash-2.js
var trash_2 = __webpack_require__(13630);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/loader-circle.js
var loader_circle = __webpack_require__(92033);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/triangle-alert.js
var triangle_alert = __webpack_require__(60406);
// EXTERNAL MODULE: ./node_modules/date-fns/format.mjs + 27 modules
var format = __webpack_require__(71152);
// EXTERNAL MODULE: ./node_modules/date-fns/locale/it.mjs + 6 modules
var it = __webpack_require__(84668);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-tabs/dist/index.mjs
var dist = __webpack_require__(25667);
// EXTERNAL MODULE: ./src/lib/utils.ts
var utils = __webpack_require__(64269);
;// ./src/components/ui/tabs.tsx
/* __next_internal_client_entry_do_not_use__ Tabs,TabsList,TabsTrigger,TabsContent auto */ 



const Tabs = dist/* Root */.bL;
const TabsList = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* List */.B8, {
        ref: ref,
        className: (0,utils.cn)("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className),
        ...props
    });
});
TabsList.displayName = dist/* List */.B8.displayName;
const TabsTrigger = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* Trigger */.l9, {
        ref: ref,
        className: (0,utils.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className),
        ...props
    });
});
TabsTrigger.displayName = dist/* Trigger */.l9.displayName;
const TabsContent = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* Content */.UC, {
        ref: ref,
        className: (0,utils.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
        ...props
    });
});
TabsContent.displayName = dist/* Content */.UC.displayName;


// EXTERNAL MODULE: ./src/components/ui/button.tsx
var ui_button = __webpack_require__(3998);
// EXTERNAL MODULE: ./src/components/dashboard/intervention-dialog.tsx
var intervention_dialog = __webpack_require__(53190);
// EXTERNAL MODULE: ./src/hooks/use-toast.ts
var use_toast = __webpack_require__(15894);
// EXTERNAL MODULE: ./src/components/ui/alert-dialog.tsx
var alert_dialog = __webpack_require__(98053);
;// ./src/app/dashboard/interventions/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 















function InterventionsPage() {
    const { user } = (0,use_user/* useUser */.J)();
    const { firestore } = (0,firebase/* useFirebase */.D3)();
    const { toast } = (0,use_toast/* useToast */.dj)();
    const [loading, setLoading] = (0,react.useState)(true);
    const [allInterventions, setAllInterventions] = (0,react.useState)([]);
    const [vehicles, setVehicles] = (0,react.useState)([]);
    const [selectedIntervention, setSelectedIntervention] = (0,react.useState)(null);
    const [isDialogOpen, setIsDialogOpen] = (0,react.useState)(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = (0,react.useState)(false);
    const [interventionToDelete, setInterventionToDelete] = (0,react.useState)(null);
    const fetchAllInterventions = async ()=>{
        if (!user || !firestore) return;
        setLoading(true);
        try {
            // 1. Fetch vehicles
            const vehiclesQuery = (0,index_esm/* query */.P)((0,index_esm/* collection */.rJ)(firestore, "users/".concat(user.uid, "/vehicles")), (0,index_esm/* where */._M)('dataoraelimina', '==', null));
            const vehiclesSnap = await (0,index_esm/* getDocs */.GG)(vehiclesQuery);
            const userVehicles = vehiclesSnap.docs.map((doc)=>({
                    ...doc.data(),
                    id: doc.id
                }));
            setVehicles(userVehicles);
            // 2. Fetch interventions for each vehicle
            const promises = userVehicles.map(async (v)=>{
                const interventionsQuery = (0,index_esm/* query */.P)((0,index_esm/* collection */.rJ)(firestore, "users/".concat(user.uid, "/vehicles/").concat(v.id, "/maintenanceInterventions")), (0,index_esm/* where */._M)('dataoraelimina', '==', null));
                const interventionsSnap = await (0,index_esm/* getDocs */.GG)(interventionsQuery);
                return interventionsSnap.docs.map((doc)=>({
                        ...doc.data(),
                        id: doc.id,
                        vehicleName: v.name
                    }));
            });
            const results = await Promise.all(promises);
            setAllInterventions(results.flat().sort((a, b)=>{
                const dateA = new Date(a.scheduledDate || 0).getTime();
                const dateB = new Date(b.scheduledDate || 0).getTime();
                return dateB - dateA;
            }));
        } catch (e) {
            console.error(e);
            const permissionError = new firebase/* FirestorePermissionError */.$9({
                path: "users/".concat(user.uid, "/vehicles"),
                operation: 'list',
                requestResourceData: {
                    context: 'Fetching all interventions for the summary page.'
                }
            });
            firebase/* errorEmitter */.de.emit('permission-error', permissionError);
        } finally{
            setLoading(false);
        }
    };
    (0,react.useEffect)(()=>{
        fetchAllInterventions();
    }, [
        user,
        firestore,
        isDialogOpen
    ]); // Refresh when dialog closes
    const handleDelete = ()=>{
        if (!user || !firestore || !interventionToDelete) return;
        const docRef = (0,index_esm/* doc */.H9)(firestore, "users/".concat(user.uid, "/vehicles/").concat(interventionToDelete.vehicleId, "/maintenanceInterventions"), interventionToDelete.id);
        const dataToUpdate = {
            dataoraelimina: new Date().toISOString()
        };
        (0,index_esm/* updateDoc */.mZ)(docRef, dataToUpdate).then(()=>{
            toast({
                title: 'Intervento eliminato'
            });
            setAllInterventions((prev)=>prev.filter((i)=>i.id !== interventionToDelete.id));
        }).catch((serverError)=>{
            const permissionError = new firebase/* FirestorePermissionError */.$9({
                path: docRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate
            });
            firebase/* errorEmitter */.de.emit('permission-error', permissionError);
        }).finally(()=>{
            setIsDeleteDialogOpen(false);
            setInterventionToDelete(null);
        });
    };
    const handleComplete = (intervention)=>{
        if (!user || !firestore) return;
        const docRef = (0,index_esm/* doc */.H9)(firestore, "users/".concat(user.uid, "/vehicles/").concat(intervention.vehicleId, "/maintenanceInterventions"), intervention.id);
        const dataToUpdate = {
            status: 'Completato',
            completionDate: new Date().toISOString().split('T')[0]
        };
        (0,index_esm/* updateDoc */.mZ)(docRef, dataToUpdate).then(()=>{
            toast({
                title: 'Intervento completato!'
            });
            setAllInterventions((prev)=>prev.map((i)=>i.id === intervention.id ? {
                        ...i,
                        ...dataToUpdate
                    } : i));
        }).catch((serverError)=>{
            const permissionError = new firebase/* FirestorePermissionError */.$9({
                path: docRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate
            });
            firebase/* errorEmitter */.de.emit('permission-error', permissionError);
        });
    };
    const getUrgencyColor = (urgency)=>{
        switch(urgency){
            case 'Alta':
                return 'text-destructive font-bold';
            case 'Media':
                return 'text-yellow-600 font-bold';
            case 'Bassa':
                return 'text-green-600 font-bold';
            default:
                return 'text-muted-foreground';
        }
    };
    const renderTable = (interventions)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(table/* Table */.XI, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHeader */.A0, {
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(table/* TableRow */.Hj, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHead */.nd, {
                                children: "Veicolo"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHead */.nd, {
                                children: "Intervento"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHead */.nd, {
                                children: "Urgenza"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHead */.nd, {
                                children: "Data"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHead */.nd, {
                                className: "text-right",
                                children: "Azioni"
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableBody */.BF, {
                    children: interventions.length === 0 ? /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableRow */.Hj, {
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableCell */.nA, {
                            colSpan: 5,
                            className: "text-center py-12 text-muted-foreground",
                            children: "Nessun intervento trovato in questa categoria."
                        })
                    }) : interventions.map((i)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(table/* TableRow */.Hj, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableCell */.nA, {
                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(badge/* Badge */.E, {
                                        variant: "outline",
                                        children: i.vehicleName
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableCell */.nA, {
                                    className: "font-medium",
                                    children: i.description
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableCell */.nA, {
                                    className: getUrgencyColor(i.urgency || ''),
                                    children: i.urgency
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableCell */.nA, {
                                    children: i.status === 'Completato' ? i.completionDate ? (0,format/* format */.GP)(new Date(i.completionDate), 'dd/MM/yyyy', {
                                        locale: it.it
                                    }) : 'N/D' : i.scheduledDate ? (0,format/* format */.GP)(new Date(i.scheduledDate), 'dd/MM/yyyy', {
                                        locale: it.it
                                    }) : 'N/D'
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableCell */.nA, {
                                    className: "text-right",
                                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "flex justify-end gap-1",
                                        children: [
                                            i.status !== 'Completato' && /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
                                                variant: "ghost",
                                                size: "icon",
                                                title: "Completa",
                                                onClick: ()=>handleComplete(i),
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(circle_check/* default */.A, {
                                                    className: "h-4 w-4 text-green-600"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
                                                variant: "ghost",
                                                size: "icon",
                                                onClick: ()=>{
                                                    setSelectedIntervention(i);
                                                    setIsDialogOpen(true);
                                                },
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(pencil/* default */.A, {
                                                    className: "h-4 w-4"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
                                                variant: "ghost",
                                                size: "icon",
                                                className: "text-destructive",
                                                onClick: ()=>{
                                                    setInterventionToDelete(i);
                                                    setIsDeleteDialogOpen(true);
                                                },
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(trash_2/* default */.A, {
                                                    className: "h-4 w-4"
                                                })
                                            })
                                        ]
                                    })
                                })
                            ]
                        }, i.id))
                })
            ]
        });
    if (loading) {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "flex h-[60vh] flex-col items-center justify-center",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(loader_circle/* default */.A, {
                    className: "h-12 w-12 animate-spin text-primary"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                    className: "mt-4 text-muted-foreground",
                    children: "Caricamento interventi..."
                })
            ]
        });
    }
    const pending = allInterventions.filter((i)=>i.status !== 'Completato');
    const completed = allInterventions.filter((i)=>i.status === 'Completato');
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                                className: "font-headline text-3xl font-bold",
                                children: "Gestione Interventi"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-muted-foreground",
                                children: "Tutti gli interventi di manutenzione per i tuoi veicoli."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "flex gap-4",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                                className: "px-4 py-2 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                        className: "bg-destructive/10 p-2 rounded-full",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(triangle_alert/* default */.A, {
                                            className: "h-4 w-4 text-destructive"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                className: "text-xs text-muted-foreground font-bold uppercase tracking-tight",
                                                children: "Da Fare"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                className: "text-xl font-black",
                                                children: pending.length
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                                className: "px-4 py-2 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                        className: "bg-green-100 p-2 rounded-full",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(circle_check/* default */.A, {
                                            className: "h-4 w-4 text-green-600"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                className: "text-xs text-muted-foreground font-bold uppercase tracking-tight",
                                                children: "Completati"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                className: "text-xl font-black",
                                                children: completed.length
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(Tabs, {
                defaultValue: "pending",
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(TabsList, {
                        className: "grid w-full max-w-[400px] grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(TabsTrigger, {
                                value: "pending",
                                children: [
                                    "Da Completare (",
                                    pending.length,
                                    ")"
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(TabsTrigger, {
                                value: "completed",
                                children: [
                                    "Storico (",
                                    completed.length,
                                    ")"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(TabsContent, {
                                value: "pending",
                                className: "m-0",
                                children: renderTable(pending)
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(TabsContent, {
                                value: "completed",
                                className: "m-0",
                                children: renderTable(completed)
                            })
                        ]
                    })
                ]
            }),
            selectedIntervention && /*#__PURE__*/ (0,jsx_runtime.jsx)(intervention_dialog/* InterventionDialog */.U, {
                open: isDialogOpen,
                onOpenChange: (open)=>{
                    setIsDialogOpen(open);
                    if (!open) setSelectedIntervention(null);
                },
                vehicleId: selectedIntervention.vehicleId,
                intervention: selectedIntervention
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(alert_dialog/* AlertDialog */.Lt, {
                open: isDeleteDialogOpen,
                onOpenChange: setIsDeleteDialogOpen,
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(alert_dialog/* AlertDialogContent */.EO, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(alert_dialog/* AlertDialogHeader */.wd, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(alert_dialog/* AlertDialogTitle */.r7, {
                                    children: "Sei sicuro?"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(alert_dialog/* AlertDialogDescription */.$v, {
                                    children: "Questa azione eliminer\xe0 l'intervento selezionato. Non potrai annullare questa operazione."
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(alert_dialog/* AlertDialogFooter */.ck, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(alert_dialog/* AlertDialogCancel */.Zr, {
                                    children: "Annulla"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(alert_dialog/* AlertDialogAction */.Rx, {
                                    onClick: handleDelete,
                                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                                    children: "Elimina"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 44757:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 23779));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [7811,2992,3135,5402,197,315,446,3409,2777,8506,9387,8470,8252,8441,1255,7358], () => (__webpack_exec__(44757)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);