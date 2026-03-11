(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[6610],{

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

/***/ 13929:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserDetailPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20063);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52619);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19708);
/* harmony import */ var _firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12298);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7227);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(54879);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(22544);
/* harmony import */ var _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(66942);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3998);
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(86948);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(92033);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(36204);
/* harmony import */ var _components_ui_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(41052);
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11186);
/* harmony import */ var _hooks_use_toast__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(15894);
/* harmony import */ var _components_ui_avatar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(85897);
/* __next_internal_client_entry_do_not_use__ default auto */ 
















const userSchema = zod__WEBPACK_IMPORTED_MODULE_13__/* .object */ .Ik({
    role: zod__WEBPACK_IMPORTED_MODULE_13__/* .string */ .Yj().min(1, 'Il ruolo è obbligatorio.')
});
function UserDetailContent() {
    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();
    const userId = searchParams.get('id');
    const { user: adminUser, loading: adminUserLoading } = (0,_firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_5__/* .useUser */ .J)();
    const { firestore } = (0,_firebase__WEBPACK_IMPORTED_MODULE_6__/* .useFirebase */ .D3)();
    const { toast } = (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_11__/* .useToast */ .dj)();
    const [isSubmitting, setIsSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const userRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!firestore || !userId) return null;
        return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .doc */ .H9)(firestore, 'users', userId);
    }, [
        firestore,
        userId
    ]);
    const { data: user, isLoading: userLoading } = (0,_firebase__WEBPACK_IMPORTED_MODULE_6__/* .useDoc */ .uN)(userRef);
    const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_14__/* .useForm */ .mN)({
        resolver: (0,_hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_15__/* .zodResolver */ .u)(userSchema),
        defaultValues: {
            role: 'Utente'
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user === null || user === void 0 ? void 0 : user.role) {
            form.reset({
                role: user.role
            });
        }
    }, [
        user,
        form.reset
    ]);
    const onSubmit = (values)=>{
        if (!firestore || !userRef) return;
        setIsSubmitting(true);
        const dataToUpdate = {
            role: values.role
        };
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .updateDoc */ .mZ)(userRef, dataToUpdate).then(()=>{
            toast({
                title: 'Successo',
                description: 'Ruolo utente aggiornato.'
            });
        }).catch((serverError)=>{
            const permissionError = new _firebase__WEBPACK_IMPORTED_MODULE_6__/* .FirestorePermissionError */ .$9({
                path: userRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate
            });
            _firebase__WEBPACK_IMPORTED_MODULE_6__/* .errorEmitter */ .de.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: 'Errore',
                description: "Impossibile aggiornare il ruolo dell'utente."
            });
        }).finally(()=>{
            setIsSubmitting(false);
        });
    };
    if (adminUserLoading || userLoading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex h-full items-center justify-center p-8",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                className: "h-8 w-8 animate-spin"
            })
        });
    }
    if (!user && !userLoading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "p-6",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                children: "Utente non trovato."
            })
        });
    }
    const userInitial = (user === null || user === void 0 ? void 0 : user.displayName) ? user.displayName.charAt(0).toUpperCase() : (user === null || user === void 0 ? void 0 : user.email) ? user.email.charAt(0).toUpperCase() : '?';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .$, {
                variant: "outline",
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                    href: "/dashboard/admin/users",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                            className: "mr-2 h-4 w-4"
                        }),
                        " Torna agli utenti"
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .Card */ .Zp, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardHeader */ .aR, {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_avatar__WEBPACK_IMPORTED_MODULE_12__/* .Avatar */ .eu, {
                                    className: "h-16 w-16",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_avatar__WEBPACK_IMPORTED_MODULE_12__/* .AvatarImage */ .BK, {
                                            src: (user === null || user === void 0 ? void 0 : user.photoURL) || '',
                                            alt: (user === null || user === void 0 ? void 0 : user.displayName) || ''
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_avatar__WEBPACK_IMPORTED_MODULE_12__/* .AvatarFallback */ .q5, {
                                            children: userInitial
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardTitle */ .ZB, {
                                            children: (user === null || user === void 0 ? void 0 : user.displayName) || 'Utente'
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardDescription */ .BT, {
                                            children: user === null || user === void 0 ? void 0 : user.email
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardContent */ .Wu, {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .Form */ .lV, {
                            ...form,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                onSubmit: form.handleSubmit(onSubmit),
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormField */ .zB, {
                                        control: form.control,
                                        name: "role",
                                        render: (param)=>{
                                            let { field } = param;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormItem */ .eI, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormLabel */ .lR, {
                                                        children: "Ruolo"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_10__/* .Select */ .l6, {
                                                        onValueChange: field.onChange,
                                                        value: field.value,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormControl */ .MJ, {
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_10__/* .SelectTrigger */ .bq, {
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_10__/* .SelectValue */ .yv, {
                                                                        placeholder: "Seleziona un ruolo"
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_10__/* .SelectContent */ .gC, {
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_10__/* .SelectItem */ .eb, {
                                                                        value: "Utente",
                                                                        children: "Utente"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_10__/* .SelectItem */ .eb, {
                                                                        value: "Amministratore",
                                                                        children: "Amministratore"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormMessage */ .C5, {})
                                                ]
                                            });
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .$, {
                                        type: "submit",
                                        disabled: isSubmitting,
                                        children: [
                                            isSubmitting && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }),
                                            "Aggiorna Ruolo"
                                        ]
                                    })
                                ]
                            })
                        })
                    })
                ]
            })
        ]
    });
}
function UserDetailPage() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
        fallback: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex h-full items-center justify-center p-8",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                className: "h-8 w-8 animate-spin"
            })
        }),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserDetailContent, {})
    });
}


/***/ }),

/***/ 14806:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(30125);
} else {}


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

/***/ 30125:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var React = __webpack_require__(12115);
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  useState = React.useState,
  useEffect = React.useEffect,
  useLayoutEffect = React.useLayoutEffect,
  useDebugValue = React.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(),
    _useState = useState({ inst: { value: value, getSnapshot: getSnapshot } }),
    inst = _useState[0].inst,
    forceUpdate = _useState[1];
  useLayoutEffect(
    function () {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect(
    function () {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      return subscribe(function () {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      });
    },
    [subscribe]
  );
  useDebugValue(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(inst, nextValue);
  } catch (error) {
    return !0;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim =
  "undefined" === typeof window ||
  "undefined" === typeof window.document ||
  "undefined" === typeof window.document.createElement
    ? useSyncExternalStore$1
    : useSyncExternalStore$2;
exports.useSyncExternalStore =
  void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;


/***/ }),

/***/ 36204:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowLeft)
/* harmony export */ });
/* unused harmony export __iconNode */
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14294);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconNode = [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
];
const ArrowLeft = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("ArrowLeft", __iconNode);
 //# sourceMappingURL=arrow-left.js.map


/***/ }),

/***/ 41052:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C5: () => (/* binding */ FormMessage),
/* harmony export */   MJ: () => (/* binding */ FormControl),
/* harmony export */   Rr: () => (/* binding */ FormDescription),
/* harmony export */   eI: () => (/* binding */ FormItem),
/* harmony export */   lR: () => (/* binding */ FormLabel),
/* harmony export */   lV: () => (/* binding */ Form),
/* harmony export */   zB: () => (/* binding */ FormField)
/* harmony export */ });
/* unused harmony export useFormField */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32467);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22544);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(64269);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76444);
/* __next_internal_client_entry_do_not_use__ useFormField,Form,FormItem,FormLabel,FormControl,FormDescription,FormMessage,FormField auto */ 





const Form = react_hook_form__WEBPACK_IMPORTED_MODULE_3__/* .FormProvider */ .Op;
const FormFieldContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createContext({});
const FormField = (param)=>{
    let { ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FormFieldContext.Provider, {
        value: {
            name: props.name
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_3__/* .Controller */ .xI, {
            ...props
        })
    });
};
const useFormField = ()=>{
    const fieldContext = react__WEBPACK_IMPORTED_MODULE_1__.useContext(FormFieldContext);
    const itemContext = react__WEBPACK_IMPORTED_MODULE_1__.useContext(FormItemContext);
    const { getFieldState, formState } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__/* .useFormContext */ .xW)();
    const fieldState = getFieldState(fieldContext.name, formState);
    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }
    const { id } = itemContext;
    return {
        id,
        name: fieldContext.name,
        formItemId: "".concat(id, "-form-item"),
        formDescriptionId: "".concat(id, "-form-item-description"),
        formMessageId: "".concat(id, "-form-item-message"),
        ...fieldState
    };
};
const FormItemContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createContext({});
const FormItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    const id = react__WEBPACK_IMPORTED_MODULE_1__.useId();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FormItemContext.Provider, {
        value: {
            id
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            ref: ref,
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("space-y-2", className),
            ...props
        })
    });
});
FormItem.displayName = "FormItem";
const FormLabel = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    const { error, formItemId } = useFormField();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(error && "text-destructive", className),
        htmlFor: formItemId,
        ...props
    });
});
FormLabel.displayName = "FormLabel";
const FormControl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { ...props } = param;
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_5__/* .Slot */ .DX, {
        ref: ref,
        id: formItemId,
        "aria-describedby": !error ? "".concat(formDescriptionId) : "".concat(formDescriptionId, " ").concat(formMessageId),
        "aria-invalid": !!error,
        ...props
    });
});
FormControl.displayName = "FormControl";
const FormDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    const { formDescriptionId } = useFormField();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        ref: ref,
        id: formDescriptionId,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("text-sm text-muted-foreground", className),
        ...props
    });
});
FormDescription.displayName = "FormDescription";
const FormMessage = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, children, ...props } = param;
    const { error, formMessageId } = useFormField();
    var _error_message;
    const body = error ? String((_error_message = error === null || error === void 0 ? void 0 : error.message) !== null && _error_message !== void 0 ? _error_message : "") : children;
    if (!body) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        ref: ref,
        id: formMessageId,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("text-sm font-medium text-destructive", className),
        ...props,
        children: body
    });
});
FormMessage.displayName = "FormMessage";



/***/ }),

/***/ 63366:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  H4: () => (/* binding */ Fallback),
  _V: () => (/* binding */ Image),
  bL: () => (/* binding */ dist_Root)
});

// UNUSED EXPORTS: Avatar, AvatarFallback, AvatarImage, createAvatarScope

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
;// ./node_modules/@radix-ui/react-avatar/node_modules/@radix-ui/react-context/dist/index.mjs
// src/create-context.tsx


function createContext2(rootComponentName, defaultContext) {
  const Context = React.createContext(defaultContext);
  Context.displayName = rootComponentName + "Context";
  const Provider = (props) => {
    const { children, ...context } = props;
    const value = React.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ jsx(Context.Provider, { value, children });
  };
  Provider.displayName = rootComponentName + "Provider";
  function useContext2(consumerName) {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  return [Provider, useContext2];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = react.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = react.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ (0,jsx_runtime.jsx)(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = react.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return react.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return react.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return react.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

//# sourceMappingURL=index.mjs.map

// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var dist = __webpack_require__(70222);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var react_use_layout_effect_dist = __webpack_require__(4129);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react-dom/index.js
var react_dom = __webpack_require__(47650);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-slot/dist/index.mjs
var react_slot_dist = __webpack_require__(32467);
;// ./node_modules/@radix-ui/react-avatar/node_modules/@radix-ui/react-primitive/dist/index.mjs
// src/primitive.tsx




var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = (0,react_slot_dist/* createSlot */.TL)(`Primitive.${node}`);
  const Node = react.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
}
var Root = (/* unused pure expression or super */ null && (Primitive));

//# sourceMappingURL=index.mjs.map

// EXTERNAL MODULE: ./node_modules/use-sync-external-store/shim/index.js
var shim = __webpack_require__(14806);
;// ./node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
// src/use-is-hydrated.tsx

function useIsHydrated() {
  return (0,shim.useSyncExternalStore)(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}

//# sourceMappingURL=index.mjs.map

;// ./node_modules/@radix-ui/react-avatar/dist/index.mjs
/* __next_internal_client_entry_do_not_use__ Avatar,AvatarFallback,AvatarImage,Fallback,Image,Root,createAvatarScope auto */ // src/avatar.tsx







var AVATAR_NAME = "Avatar";
var [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = react.useState("idle");
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(AvatarProvider, {
        scope: __scopeAvatar,
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Primitive.span, {
            ...avatarProps,
            ref: forwardedRef
        })
    });
});
Avatar.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar, src, onLoadingStatusChange = ()=>{}, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
    const handleLoadingStatusChange = (0,dist/* useCallbackRef */.c)((status)=>{
        onLoadingStatusChange(status);
        context.onImageLoadingStatusChange(status);
    });
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>{
        if (imageLoadingStatus !== "idle") {
            handleLoadingStatusChange(imageLoadingStatus);
        }
    }, [
        imageLoadingStatus,
        handleLoadingStatusChange
    ]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ (0,jsx_runtime.jsx)(Primitive.img, {
        ...imageProps,
        ref: forwardedRef,
        src
    }) : null;
});
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = react.useState(delayMs === void 0);
    react.useEffect(()=>{
        if (delayMs !== void 0) {
            const timerId = window.setTimeout(()=>setCanRender(true), delayMs);
            return ()=>window.clearTimeout(timerId);
        }
    }, [
        delayMs
    ]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ (0,jsx_runtime.jsx)(Primitive.span, {
        ...fallbackProps,
        ref: forwardedRef
    }) : null;
});
AvatarFallback.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
    if (!image) {
        return "idle";
    }
    if (!src) {
        return "error";
    }
    if (image.src !== src) {
        image.src = src;
    }
    return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, param) {
    let { referrerPolicy, crossOrigin } = param;
    const isHydrated = useIsHydrated();
    const imageRef = react.useRef(null);
    const image = (()=>{
        if (!isHydrated) return null;
        if (!imageRef.current) {
            imageRef.current = new window.Image();
        }
        return imageRef.current;
    })();
    const [loadingStatus, setLoadingStatus] = react.useState(()=>resolveLoadingStatus(image, src));
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>{
        setLoadingStatus(resolveLoadingStatus(image, src));
    }, [
        image,
        src
    ]);
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>{
        const updateStatus = (status)=>()=>{
                setLoadingStatus(status);
            };
        if (!image) return;
        const handleLoad = updateStatus("loaded");
        const handleError = updateStatus("error");
        image.addEventListener("load", handleLoad);
        image.addEventListener("error", handleError);
        if (referrerPolicy) {
            image.referrerPolicy = referrerPolicy;
        }
        if (typeof crossOrigin === "string") {
            image.crossOrigin = crossOrigin;
        }
        return ()=>{
            image.removeEventListener("load", handleLoad);
            image.removeEventListener("error", handleError);
        };
    }, [
        image,
        crossOrigin,
        referrerPolicy
    ]);
    return loadingStatus;
}
var dist_Root = Avatar;
var Image = AvatarImage;
var Fallback = AvatarFallback;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 76444:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ Label)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32894);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83101);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(64269);
/* __next_internal_client_entry_do_not_use__ Label auto */ 




const labelVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__/* .cva */ .F)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_label__WEBPACK_IMPORTED_MODULE_3__/* .Root */ .b, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(labelVariants(), className),
        ...props
    });
});
Label.displayName = _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_3__/* .Root */ .b.displayName;



/***/ }),

/***/ 83841:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 13929));


/***/ }),

/***/ 85897:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BK: () => (/* binding */ AvatarImage),
/* harmony export */   eu: () => (/* binding */ Avatar),
/* harmony export */   q5: () => (/* binding */ AvatarFallback)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63366);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64269);
/* __next_internal_client_entry_do_not_use__ Avatar,AvatarImage,AvatarFallback auto */ 



const Avatar = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
        ...props
    });
});
Avatar.displayName = _radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL.displayName;
const AvatarImage = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Image */ ._V, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("aspect-square h-full w-full", className),
        ...props
    });
});
AvatarImage.displayName = _radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Image */ ._V.displayName;
const AvatarFallback = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Fallback */ .H4, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
        ...props
    });
});
AvatarFallback.displayName = _radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Fallback */ .H4.displayName;



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



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [7811,2992,3135,5402,176,197,315,446,2777,8470,8441,1255,7358], () => (__webpack_exec__(83841)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);