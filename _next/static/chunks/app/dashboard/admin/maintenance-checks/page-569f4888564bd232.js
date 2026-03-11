(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[6801],{

/***/ 2982:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AllMaintenanceChecksPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12298);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7227);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19708);
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86948);
/* harmony import */ var _components_ui_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(87270);
/* harmony import */ var _barrel_optimize_names_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(92033);
/* harmony import */ var _barrel_optimize_names_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(22452);
/* harmony import */ var _barrel_optimize_names_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(74640);
/* harmony import */ var _barrel_optimize_names_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(13630);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20063);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12115);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3998);
/* harmony import */ var _components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(98053);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(51834);
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(11186);
/* harmony import */ var _hooks_use_toast__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(15894);
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(11647);
/* __next_internal_client_entry_do_not_use__ default auto */ 














function AllMaintenanceChecksPage() {
    const { user: currentUser, loading: userLoading } = (0,_firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_1__/* .useUser */ .J)();
    const { firestore } = (0,_firebase__WEBPACK_IMPORTED_MODULE_2__/* .useFirebase */ .D3)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const { toast } = (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_12__/* .useToast */ .dj)();
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(true);
    const [allChecks, setAllChecks] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)([]);
    const [checkToDelete, setCheckToDelete] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const [vehicleTypes, setVehicleTypes] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)([]);
    const [selectedVehicleTypeForNewCheck, setSelectedVehicleTypeForNewCheck] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(()=>{
        if (!userLoading && (!currentUser || currentUser.role !== 'Amministratore')) {
            router.push('/dashboard');
            return;
        }
    }, [
        currentUser,
        userLoading,
        router
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(()=>{
        if (!firestore || !currentUser || currentUser.role !== 'Amministratore') return;
        const fetchAllData = async ()=>{
            setLoading(true);
            try {
                const vtQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__/* .query */ .P)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__/* .collection */ .rJ)(firestore, 'vehicleTypes'), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__/* .where */ ._M)('dataoraelimina', '==', null));
                const vtSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__/* .getDocs */ .GG)(vtQuery);
                const fetchedVehicleTypes = vtSnap.docs.map((doc)=>doc.data());
                setVehicleTypes(fetchedVehicleTypes);
                const checksPromises = fetchedVehicleTypes.map(async (vt)=>{
                    const checksQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__/* .query */ .P)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__/* .collection */ .rJ)(firestore, "vehicleTypes/".concat(vt.id, "/maintenanceChecks")), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__/* .where */ ._M)('dataoraelimina', '==', null));
                    const checksSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__/* .getDocs */ .GG)(checksQuery);
                    return checksSnap.docs.map((doc)=>({
                            ...doc.data(),
                            vehicleTypeName: vt.name
                        }));
                });
                const checksByVehicleType = await Promise.all(checksPromises);
                const flattenedChecks = checksByVehicleType.flat();
                setAllChecks(flattenedChecks);
            } catch (err) {
                toast({
                    variant: 'destructive',
                    title: 'Errore',
                    description: 'Impossibile caricare i controlli periodici.'
                });
                const permissionError = new _firebase__WEBPACK_IMPORTED_MODULE_2__/* .FirestorePermissionError */ .$9({
                    path: 'vehicleTypes',
                    operation: 'list',
                    requestResourceData: {
                        context: 'Fetching all maintenance checks for admin view.'
                    }
                });
                _firebase__WEBPACK_IMPORTED_MODULE_2__/* .errorEmitter */ .de.emit('permission-error', permissionError);
            } finally{
                setLoading(false);
            }
        };
        fetchAllData();
    }, [
        firestore,
        currentUser,
        toast
    ]);
    const handleDelete = ()=>{
        if (!checkToDelete || !firestore) return;
        const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__/* .doc */ .H9)(firestore, "vehicleTypes/".concat(checkToDelete.vehicleTypeId, "/maintenanceChecks"), checkToDelete.id);
        const dataToUpdate = {
            dataoraelimina: new Date().toISOString()
        };
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__/* .updateDoc */ .mZ)(docRef, dataToUpdate).then(()=>{
            toast({
                title: "Controllo eliminato"
            });
            setAllChecks((prev)=>prev.filter((c)=>c.id !== checkToDelete.id));
        }).catch((serverError)=>{
            const permissionError = new _firebase__WEBPACK_IMPORTED_MODULE_2__/* .FirestorePermissionError */ .$9({
                path: docRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate
            });
            _firebase__WEBPACK_IMPORTED_MODULE_2__/* .errorEmitter */ .de.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: "Errore di Permesso",
                description: "Non disponi dei permessi per eliminare questo controllo."
            });
        }).finally(()=>{
            setCheckToDelete(null);
        });
    };
    const handleAddCheck = ()=>{
        if (!selectedVehicleTypeForNewCheck) {
            toast({
                variant: 'destructive',
                title: 'Errore',
                description: 'Seleziona un tipo di veicolo.'
            });
            return;
        }
        router.push("/dashboard/admin/vehicle-types/maintenance-checks/view?vehicleTypeId=".concat(selectedVehicleTypeForNewCheck, "&checkId=new"));
        setIsAddDialogOpen(false);
    };
    if (userLoading || loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex h-full items-center justify-center",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                className: "h-8 w-8 animate-spin"
            })
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                                        className: "font-headline text-3xl font-bold",
                                        children: "Controlli Periodici"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-muted-foreground",
                                        children: "Gestisci tutti i controlli di manutenzione standard per ogni tipo di veicolo."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .$, {
                                onClick: ()=>setIsAddDialogOpen(true),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                        className: "mr-2 h-4 w-4"
                                    }),
                                    " Aggiungi Controllo"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .aR, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ZB, {
                                        children: "Elenco Controlli"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .BT, {
                                        children: "Visualizza, modifica o elimina i controlli di manutenzione standard."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .Wu, {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .Table */ .XI, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableHeader */ .A0, {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableRow */ .Hj, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableHead */ .nd, {
                                                        children: "Descrizione"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableHead */ .nd, {
                                                        children: "Tipo Veicolo"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableHead */ .nd, {
                                                        children: "Intervallo Km"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableHead */ .nd, {
                                                        children: "Intervallo Mesi"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableHead */ .nd, {
                                                        className: "text-right",
                                                        children: "Azioni"
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableBody */ .BF, {
                                            children: allChecks.length > 0 ? allChecks.map((check)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableRow */ .Hj, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableCell */ .nA, {
                                                            className: "font-medium",
                                                            children: check.description
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableCell */ .nA, {
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_13__/* .Badge */ .E, {
                                                                variant: "secondary",
                                                                children: check.vehicleTypeName
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableCell */ .nA, {
                                                            children: check.intervalMileage ? "".concat(check.intervalMileage.toLocaleString('it-IT'), " km") : 'N/A'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableCell */ .nA, {
                                                            children: check.intervalTime ? "".concat(check.intervalTime, " mesi") : 'N/A'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableCell */ .nA, {
                                                            className: "text-right",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .$, {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    onClick: ()=>router.push("/dashboard/admin/vehicle-types/maintenance-checks/view?vehicleTypeId=".concat(check.vehicleTypeId, "&checkId=").concat(check.id)),
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                                        className: "h-4 w-4"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .$, {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    className: "text-destructive hover:text-destructive",
                                                                    onClick: ()=>setCheckToDelete(check),
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                                        className: "h-4 w-4"
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, check.id)) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableRow */ .Hj, {
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_5__/* .TableCell */ .nA, {
                                                    colSpan: 5,
                                                    className: "text-center",
                                                    children: "Nessun controllo trovato."
                                                })
                                            })
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialog */ .Lt, {
                open: !!checkToDelete,
                onOpenChange: ()=>setCheckToDelete(null),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogContent */ .EO, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogTitle */ .r7, {
                                    children: "Sei sicuro?"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogDescription */ .$v, {
                                    children: [
                                        "Questa azione contrassegner\xe0 il controllo ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "font-bold",
                                            children: checkToDelete === null || checkToDelete === void 0 ? void 0 : checkToDelete.description
                                        }),
                                        " come eliminato."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogCancel */ .Zr, {
                                    children: "Annulla"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDelete,
                                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                                    children: "Elimina"
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_10__/* .Dialog */ .lG, {
                open: isAddDialogOpen,
                onOpenChange: setIsAddDialogOpen,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_10__/* .DialogContent */ .Cf, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_10__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_10__/* .DialogTitle */ .L3, {
                                    children: "Aggiungi Nuovo Controllo"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_10__/* .DialogDescription */ .rr, {
                                    children: "Seleziona il tipo di veicolo a cui vuoi aggiungere un nuovo controllo di manutenzione standard."
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "py-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_11__/* .Select */ .l6, {
                                onValueChange: setSelectedVehicleTypeForNewCheck,
                                value: selectedVehicleTypeForNewCheck,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_11__/* .SelectTrigger */ .bq, {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_11__/* .SelectValue */ .yv, {
                                            placeholder: "Seleziona un tipo di veicolo"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_11__/* .SelectContent */ .gC, {
                                        children: vehicleTypes.map((vt)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_11__/* .SelectItem */ .eb, {
                                                value: vt.id,
                                                children: vt.name
                                            }, vt.id))
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_10__/* .DialogFooter */ .Es, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .$, {
                                    variant: "outline",
                                    onClick: ()=>setIsAddDialogOpen(false),
                                    children: "Annulla"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .$, {
                                    onClick: handleAddCheck,
                                    children: "Continua"
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

/***/ 3998:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Button),
/* harmony export */   r: () => (/* binding */ buttonVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32467);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83101);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(64269);





const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__/* .cva */ .F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, variant, size, asChild = false, ...props } = param;
    const Comp = asChild ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__/* .Slot */ .DX : "button";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Comp, {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    });
});
Button.displayName = "Button";



/***/ }),

/***/ 11186:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bq: () => (/* binding */ SelectTrigger),
/* harmony export */   eb: () => (/* binding */ SelectItem),
/* harmony export */   gC: () => (/* binding */ SelectContent),
/* harmony export */   l6: () => (/* binding */ Select),
/* harmony export */   yv: () => (/* binding */ SelectValue)
/* harmony export */ });
/* unused harmony exports SelectGroup, SelectLabel, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14744);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_ChevronUp_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(59007);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_ChevronUp_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42614);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_ChevronUp_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(72251);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64269);
/* __next_internal_client_entry_do_not_use__ Select,SelectGroup,SelectValue,SelectTrigger,SelectContent,SelectLabel,SelectItem,SelectSeparator,SelectScrollUpButton,SelectScrollDownButton auto */ 




const Select = _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL;
const SelectGroup = _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ;
const SelectValue = _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Value */ .WT;
const SelectTrigger = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Trigger */ .l9, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Icon */ .In, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_ChevronUp_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                    className: "h-4 w-4 opacity-50"
                })
            })
        ]
    });
});
SelectTrigger.displayName = _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Trigger */ .l9.displayName;
const SelectScrollUpButton = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .ScrollUpButton */ .PP, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_ChevronUp_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
            className: "h-4 w-4"
        })
    });
});
SelectScrollUpButton.displayName = _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .ScrollUpButton */ .PP.displayName;
const SelectScrollDownButton = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .ScrollDownButton */ .wn, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_ChevronUp_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
            className: "h-4 w-4"
        })
    });
});
SelectScrollDownButton.displayName = _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .ScrollDownButton */ .wn.displayName;
const SelectContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, children, position = "popper", ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Portal */ .ZL, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .UC, {
            ref: ref,
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectScrollUpButton, {}),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Viewport */ .LM, {
                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
                    children: children
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectScrollDownButton, {})
            ]
        })
    });
});
SelectContent.displayName = _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .UC.displayName;
const SelectLabel = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .JU, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
        ...props
    });
});
SelectLabel.displayName = _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .JU.displayName;
const SelectItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Item */ .q7, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        ...props,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .ItemIndicator */ .VF, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_ChevronUp_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                        className: "h-4 w-4"
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .ItemText */ .p4, {
                children: children
            })
        ]
    });
});
SelectItem.displayName = _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Item */ .q7.displayName;
const SelectSeparator = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Separator */ .wv, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("-mx-1 my-1 h-px bg-muted", className),
        ...props
    });
});
SelectSeparator.displayName = _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .Separator */ .wv.displayName;



/***/ }),

/***/ 11647:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ Badge)
/* harmony export */ });
/* unused harmony export badgeVariants */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83101);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64269);




const badgeVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__/* .cva */ .F)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge(param) {
    let { className, variant, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(badgeVariants({
            variant
        }), className),
        ...props
    });
}



/***/ }),

/***/ 15894:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dj: () => (/* binding */ useToast)
/* harmony export */ });
/* unused harmony exports reducer, toast */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ reducer,useToast,toast auto */ // Inspired by react-hot-toast library

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast(param) {
    let { ...props } = param;
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(memoryState);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        listeners.push(setState);
        return ()=>{
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}



/***/ }),

/***/ 29854:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 2982));


/***/ }),

/***/ 51834:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cf: () => (/* binding */ DialogContent),
/* harmony export */   Es: () => (/* binding */ DialogFooter),
/* harmony export */   L3: () => (/* binding */ DialogTitle),
/* harmony export */   c7: () => (/* binding */ DialogHeader),
/* harmony export */   lG: () => (/* binding */ Dialog),
/* harmony export */   rr: () => (/* binding */ DialogDescription)
/* harmony export */ });
/* unused harmony exports DialogPortal, DialogOverlay, DialogClose, DialogTrigger */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93409);
/* harmony import */ var _barrel_optimize_names_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26615);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64269);
/* __next_internal_client_entry_do_not_use__ Dialog,DialogPortal,DialogOverlay,DialogClose,DialogTrigger,DialogContent,DialogHeader,DialogFooter,DialogTitle,DialogDescription auto */ 




const Dialog = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL;
const DialogTrigger = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Trigger */ .l9;
const DialogPortal = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Portal */ .ZL;
const DialogClose = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Close */ .bm;
const DialogOverlay = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Overlay */ .hJ, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props
    });
});
DialogOverlay.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Overlay */ .hJ.displayName;
const DialogContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DialogPortal, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DialogOverlay, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .UC, {
                ref: ref,
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Close */ .bm, {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "h-4 w-4"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "sr-only",
                                children: "Close"
                            })
                        ]
                    })
                ]
            })
        ]
    });
});
DialogContent.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .UC.displayName;
const DialogHeader = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex flex-col space-y-1.5 text-center sm:text-left", className),
        ...props
    });
};
DialogHeader.displayName = "DialogHeader";
const DialogFooter = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    });
};
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Title */ .hE, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("text-lg font-semibold leading-none tracking-tight", className),
        ...props
    });
});
DialogTitle.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Title */ .hE.displayName;
const DialogDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Description */ .VY, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("text-sm text-muted-foreground", className),
        ...props
    });
});
DialogDescription.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Description */ .VY.displayName;



/***/ }),

/***/ 86948:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BT: () => (/* binding */ CardDescription),
/* harmony export */   Wu: () => (/* binding */ CardContent),
/* harmony export */   ZB: () => (/* binding */ CardTitle),
/* harmony export */   Zp: () => (/* binding */ Card),
/* harmony export */   aR: () => (/* binding */ CardHeader),
/* harmony export */   wL: () => (/* binding */ CardFooter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64269);



const Card = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    });
});
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex flex-col space-y-1.5 p-6", className),
        ...props
    });
});
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    });
});
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("text-sm text-muted-foreground", className),
        ...props
    });
});
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("p-6 pt-0", className),
        ...props
    });
});
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex items-center p-6 pt-0", className),
        ...props
    });
});
CardFooter.displayName = "CardFooter";



/***/ }),

/***/ 87270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A0: () => (/* binding */ TableHeader),
/* harmony export */   BF: () => (/* binding */ TableBody),
/* harmony export */   Hj: () => (/* binding */ TableRow),
/* harmony export */   XI: () => (/* binding */ Table),
/* harmony export */   nA: () => (/* binding */ TableCell),
/* harmony export */   nd: () => (/* binding */ TableHead)
/* harmony export */ });
/* unused harmony exports TableFooter, TableCaption */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64269);



const Table = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "relative w-full overflow-auto",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("table", {
            ref: ref,
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("w-full caption-bottom text-sm", className),
            ...props
        })
    });
});
Table.displayName = "Table";
const TableHeader = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("[&_tr]:border-b", className),
        ...props
    });
});
TableHeader.displayName = "TableHeader";
const TableBody = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("[&_tr:last-child]:border-0", className),
        ...props
    });
});
TableBody.displayName = "TableBody";
const TableFooter = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tfoot", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
        ...props
    });
});
TableFooter.displayName = "TableFooter";
const TableRow = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
        ...props
    });
});
TableRow.displayName = "TableRow";
const TableHead = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className),
        ...props
    });
});
TableHead.displayName = "TableHead";
const TableCell = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
        ...props
    });
});
TableCell.displayName = "TableCell";
const TableCaption = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("caption", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("mt-4 text-sm text-muted-foreground", className),
        ...props
    });
});
TableCaption.displayName = "TableCaption";



/***/ }),

/***/ 98053:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $v: () => (/* binding */ AlertDialogDescription),
/* harmony export */   EO: () => (/* binding */ AlertDialogContent),
/* harmony export */   Lt: () => (/* binding */ AlertDialog),
/* harmony export */   Rx: () => (/* binding */ AlertDialogAction),
/* harmony export */   Zr: () => (/* binding */ AlertDialogCancel),
/* harmony export */   ck: () => (/* binding */ AlertDialogFooter),
/* harmony export */   r7: () => (/* binding */ AlertDialogTitle),
/* harmony export */   wd: () => (/* binding */ AlertDialogHeader)
/* harmony export */ });
/* unused harmony exports AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52498);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(64269);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3998);
/* __next_internal_client_entry_do_not_use__ AlertDialog,AlertDialogPortal,AlertDialogOverlay,AlertDialogTrigger,AlertDialogContent,AlertDialogHeader,AlertDialogFooter,AlertDialogTitle,AlertDialogDescription,AlertDialogAction,AlertDialogCancel auto */ 




const AlertDialog = _radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Root */ .bL;
const AlertDialogTrigger = _radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Trigger */ .l9;
const AlertDialogPortal = _radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Portal */ .ZL;
const AlertDialogOverlay = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Overlay */ .hJ, {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props,
        ref: ref
    });
});
AlertDialogOverlay.displayName = _radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Overlay */ .hJ.displayName;
const AlertDialogContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(AlertDialogPortal, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AlertDialogOverlay, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Content */ .UC, {
                ref: ref,
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
                ...props
            })
        ]
    });
});
AlertDialogContent.displayName = _radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Content */ .UC.displayName;
const AlertDialogHeader = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex flex-col space-y-2 text-center sm:text-left", className),
        ...props
    });
};
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    });
};
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Title */ .hE, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("text-lg font-semibold", className),
        ...props
    });
});
AlertDialogTitle.displayName = _radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Title */ .hE.displayName;
const AlertDialogDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .VY, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("text-sm text-muted-foreground", className),
        ...props
    });
});
AlertDialogDescription.displayName = _radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .VY.displayName;
const AlertDialogAction = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Action */ .rc, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)((0,_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .buttonVariants */ .r)(), className),
        ...props
    });
});
AlertDialogAction.displayName = _radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Action */ .rc.displayName;
const AlertDialogCancel = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Cancel */ .ZD, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)((0,_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .buttonVariants */ .r)({
            variant: "outline"
        }), "mt-2 sm:mt-0", className),
        ...props
    });
});
AlertDialogCancel.displayName = _radix_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Cancel */ .ZD.displayName;



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [7811,2992,3135,5402,315,446,3409,2777,8702,8470,8441,1255,7358], () => (__webpack_exec__(29854)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);