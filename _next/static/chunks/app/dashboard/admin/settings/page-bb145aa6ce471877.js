(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[1775],{

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

/***/ 20063:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47260);
/* harmony import */ var _client_components_navigation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_client_components_navigation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_client_components_navigation__WEBPACK_IMPORTED_MODULE_0__, "usePathname")) __webpack_require__.d(__webpack_exports__, { usePathname: function() { return _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__.usePathname; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_client_components_navigation__WEBPACK_IMPORTED_MODULE_0__, "useRouter")) __webpack_require__.d(__webpack_exports__, { useRouter: function() { return _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__.useRouter; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_client_components_navigation__WEBPACK_IMPORTED_MODULE_0__, "useSearchParams")) __webpack_require__.d(__webpack_exports__, { useSearchParams: function() { return _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__.useSearchParams; } });


//# sourceMappingURL=navigation.js.map

/***/ }),

/***/ 32467:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DX: () => (/* binding */ Slot),
/* harmony export */   TL: () => (/* binding */ createSlot)
/* harmony export */ });
/* unused harmony exports Root, Slottable, createSlottable */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(94446);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
// src/slot.tsx



var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (react__WEBPACK_IMPORTED_MODULE_0__.Children.count(newElement) > 1) return react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null);
          return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement) ? react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
        props2.ref = forwardedRef ? (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__/* .composeRefs */ .t)(forwardedRef, childrenRef) : childrenRef;
      }
      return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, props2);
    }
    return react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children) > 1 ? react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
  const Slottable2 = ({ children }) => {
    return /* @__PURE__ */ jsx(Fragment2, { children });
  };
  Slottable2.displayName = `${ownerName}.Slottable`;
  Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
  return Slottable2;
}
var Slottable = /* @__PURE__ */ (/* unused pure expression or super */ null && (createSlottable("Slottable")));
function isSlottable(child) {
  return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 77959:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ AdminSettingsPage)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
// EXTERNAL MODULE: ./src/firebase/index.ts + 3 modules
var firebase = __webpack_require__(7227);
// EXTERNAL MODULE: ./src/firebase/auth/use-user.tsx
var use_user = __webpack_require__(12298);
// EXTERNAL MODULE: ./src/components/ui/button.tsx
var ui_button = __webpack_require__(3998);
// EXTERNAL MODULE: ./src/components/ui/card.tsx
var card = __webpack_require__(86948);
// EXTERNAL MODULE: ./src/hooks/use-toast.ts
var use_toast = __webpack_require__(15894);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/loader-circle.js
var loader_circle = __webpack_require__(92033);
// EXTERNAL MODULE: ./node_modules/firebase/firestore/dist/esm/index.esm.js
var index_esm = __webpack_require__(19708);
;// ./src/lib/seed.ts
/* __next_internal_client_entry_do_not_use__ seedGlobalData auto */ 
// Data for global collections
const vehicleTypeData = [
    {
        name: 'Elettrica',
        averageAnnualMileage: 10000
    },
    {
        name: 'Ibrida',
        averageAnnualMileage: 12000
    },
    {
        name: 'GPL',
        averageAnnualMileage: 15000
    },
    {
        name: 'Metano',
        averageAnnualMileage: 15000
    }
];
const roleData = [
    {
        name: 'Amministratore',
        description: 'Accesso completo a tutte le funzionalità dell\'applicazione.'
    },
    {
        name: 'Utente',
        description: 'Accesso limitato alla gestione dei propri veicoli e dati.'
    }
];
// Common checks for all vehicle types
const commonChecks = [
    {
        description: 'Revisione ministeriale',
        intervalTime: 24
    },
    {
        description: 'Pagamento assicurazione annuale',
        intervalTime: 12
    },
    {
        description: 'Scadenza patente di guida',
        intervalTime: 120
    }
];
const maintenanceCheckData = {
    Ibrida: [
        {
            description: 'Cambio olio e filtro olio (motore termico)',
            intervalMileage: 15000,
            intervalTime: 12
        },
        {
            description: 'Controllo stato batteria ad alta tensione',
            intervalMileage: 20000,
            intervalTime: 12
        },
        {
            description: 'Controllo sistema frenante (frenata rigenerativa)',
            intervalMileage: 30000,
            intervalTime: 24
        },
        {
            description: 'Sostituzione liquido raffreddamento inverter',
            intervalMileage: 80000,
            intervalTime: 60
        },
        ...commonChecks
    ],
    Elettrica: [
        {
            description: 'Controllo stato batteria ad alta tensione',
            intervalMileage: 25000,
            intervalTime: 12
        },
        {
            description: 'Sostituzione liquido freni',
            intervalMileage: 50000,
            intervalTime: 24
        },
        {
            description: 'Sostituzione filtro abitacolo',
            intervalMileage: 25000,
            intervalTime: 12
        },
        {
            description: 'Controllo usura pneumatici',
            intervalMileage: 15000,
            intervalTime: 12
        },
        ...commonChecks
    ],
    GPL: [
        {
            description: 'Cambio olio e filtro olio',
            intervalMileage: 15000,
            intervalTime: 12
        },
        {
            description: 'Controllo e sostituzione filtro aria',
            intervalMileage: 30000,
            intervalTime: 24
        },
        {
            description: 'Sostituzione candele',
            intervalMileage: 60000,
            intervalTime: 48
        },
        {
            description: 'Controllo liquido freni',
            intervalMileage: 30000,
            intervalTime: 24
        },
        {
            description: 'Revisione bombola GPL',
            intervalTime: 120
        },
        ...commonChecks
    ],
    Metano: [
        {
            description: 'Cambio olio e filtro olio',
            intervalMileage: 15000,
            intervalTime: 12
        },
        {
            description: 'Controllo e sostituzione filtro aria',
            intervalMileage: 30000,
            intervalTime: 24
        },
        {
            description: 'Sostituzione candele',
            intervalMileage: 60000,
            intervalTime: 48
        },
        {
            description: 'Controllo liquido freni',
            intervalMileage: 30000,
            intervalTime: 24
        },
        {
            description: 'Revisione bombole Metano',
            intervalTime: 48
        },
        ...commonChecks
    ]
};
/**
 * Seeds the global collections like 'vehicleTypes' and 'roles'.
 * It checks if data already exists to avoid overwriting.
 * This function is designed to be safe to run by an admin; it will only write data
 * if the user has appropriate permissions.
 * It returns an object indicating success or failure.
 */ const seedGlobalData = async (firestore)=>{
    const batch = (0,index_esm/* writeBatch */.wP)(firestore);
    let needsSeeding = false;
    let vtSeeded = false;
    let rolesSeeded = false;
    // --- Seed Vehicle Types and Maintenance Checks ---
    try {
        const vehicleTypesRef = (0,index_esm/* collection */.rJ)(firestore, 'vehicleTypes');
        const vtSnapshot = await (0,index_esm/* getDocs */.GG)((0,index_esm/* query */.P)(vehicleTypesRef, (0,index_esm/* limit */.AB)(1)));
        if (vtSnapshot.empty) {
            needsSeeding = true;
            vtSeeded = true;
            vehicleTypeData.forEach((vt)=>{
                const vtId = vt.name.toLowerCase();
                const vtRef = (0,index_esm/* doc */.H9)(firestore, 'vehicleTypes', vtId);
                batch.set(vtRef, {
                    id: vtId,
                    name: vt.name,
                    averageAnnualMileage: vt.averageAnnualMileage,
                    dataoraelimina: null
                });
                const checks = maintenanceCheckData[vt.name];
                if (checks) {
                    checks.forEach((check)=>{
                        const checkRef = (0,index_esm/* doc */.H9)((0,index_esm/* collection */.rJ)(vtRef, 'maintenanceChecks'));
                        batch.set(checkRef, {
                            ...check,
                            id: checkRef.id,
                            vehicleTypeId: vtId,
                            dataoraelimina: null
                        });
                    });
                }
            });
        }
    } catch (error) {
        return {
            success: false,
            message: "Errore durante il controllo dei tipi veicolo: ".concat(error.message)
        };
    }
    // --- Seed Roles ---
    try {
        const rolesRef = (0,index_esm/* collection */.rJ)(firestore, 'roles');
        const rolesSnapshot = await (0,index_esm/* getDocs */.GG)((0,index_esm/* query */.P)(rolesRef, (0,index_esm/* limit */.AB)(1)));
        if (rolesSnapshot.empty) {
            needsSeeding = true;
            rolesSeeded = true;
            roleData.forEach((role)=>{
                const roleId = role.name.toLowerCase();
                const roleRef = (0,index_esm/* doc */.H9)(firestore, 'roles', roleId);
                batch.set(roleRef, {
                    id: roleId,
                    ...role,
                    dataoraelimina: null
                });
            });
        }
    } catch (error) {
        if (error.code === 'permission-denied') {
            return {
                success: false,
                message: "Permesso negato durante il controllo dei ruoli. Solo gli amministratori possono eseguire questa azione."
            };
        }
        return {
            success: false,
            message: "Errore durante il controllo dei ruoli: ".concat(error.message)
        };
    }
    // --- Commit if needed ---
    if (!needsSeeding) {
        return {
            success: true,
            message: 'Dati globali già presenti. Nessuna operazione eseguita.'
        };
    }
    try {
        await batch.commit();
        const seededParts = [];
        if (vtSeeded) seededParts.push('Tipi veicolo');
        if (rolesSeeded) seededParts.push('Ruoli');
        return {
            success: true,
            message: "".concat(seededParts.join(' e '), " creati con successo!")
        };
    } catch (error) {
        if (error.code === 'permission-denied') {
            return {
                success: false,
                message: 'Permesso negato. Solo gli amministratori possono creare i dati globali.'
            };
        }
        return {
            success: false,
            message: "Errore durante il salvataggio dei dati: ".concat(error.message)
        };
    }
};

// EXTERNAL MODULE: ./node_modules/next/dist/api/navigation.js
var navigation = __webpack_require__(20063);
;// ./src/app/dashboard/admin/settings/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 










function AdminSettingsPage() {
    const { user, loading: userLoading } = (0,use_user/* useUser */.J)();
    const { firestore } = (0,firebase/* useFirebase */.D3)();
    const router = (0,navigation.useRouter)();
    const { toast } = (0,use_toast/* useToast */.dj)();
    const [isSeeding, setIsSeeding] = (0,react.useState)(false);
    (0,react.useEffect)(()=>{
        if (!userLoading && (!user || user.role !== 'Amministratore')) {
            router.push('/dashboard');
        }
    }, [
        user,
        userLoading,
        router
    ]);
    const handleSeedData = async ()=>{
        if (!firestore) return;
        setIsSeeding(true);
        const result = await seedGlobalData(firestore);
        setIsSeeding(false);
        if (result.success) {
            toast({
                title: 'Successo!',
                description: result.message
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Errore',
                description: result.message
            });
        }
    };
    if (userLoading) {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "flex h-full items-center justify-center",
            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(loader_circle/* default */.A, {
                className: "h-8 w-8 animate-spin"
            })
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                        className: "font-headline text-3xl font-bold",
                        children: "Impostazioni Amministrazione"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "text-muted-foreground",
                        children: "Azioni di manutenzione per l'applicazione."
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardHeader */.aR, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardTitle */.ZB, {
                                children: "Dati Iniziali"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardDescription */.BT, {
                                children: 'Se i dati globali come "Tipi Veicolo" o "Ruoli" non sono presenti, puoi usare questo pulsante per crearli. Questa operazione \xe8 sicura da eseguire pi\xf9 volte e non sovrascriver\xe0 i dati esistenti.'
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardContent */.Wu, {
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
                            onClick: handleSeedData,
                            disabled: isSeeding,
                            children: [
                                isSeeding && /*#__PURE__*/ (0,jsx_runtime.jsx)(loader_circle/* default */.A, {
                                    className: "mr-2 h-4 w-4 animate-spin"
                                }),
                                "Popola Dati Globali"
                            ]
                        })
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 83101:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ cva)
/* harmony export */ });
/* unused harmony export cx */
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2821);
/**
 * Copyright 2022 Joe Bell. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ 
const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx__WEBPACK_IMPORTED_MODULE_0__/* .clsx */ .$;
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };



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

/***/ 88455:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 77959));


/***/ }),

/***/ 94446:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ useComposedRefs),
/* harmony export */   t: () => (/* binding */ composeRefs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
// packages/react/compose-refs/src/compose-refs.tsx

function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(composeRefs(...refs), refs);
}

//# sourceMappingURL=index.mjs.map


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [7811,2992,3135,5402,8470,8441,1255,7358], () => (__webpack_exec__(88455)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);