(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[1954],{

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

/***/ 18332:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fc: () => (/* binding */ Alert),
/* harmony export */   TN: () => (/* binding */ AlertDescription),
/* harmony export */   XL: () => (/* binding */ AlertTitle)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83101);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64269);




const alertVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__/* .cva */ .F)("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
    variants: {
        variant: {
            default: "bg-background text-foreground",
            destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Alert = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, variant, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: ref,
        role: "alert",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(alertVariants({
            variant
        }), className),
        ...props
    });
});
Alert.displayName = "Alert";
const AlertTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h5", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("mb-1 font-medium leading-none tracking-tight", className),
        ...props
    });
});
AlertTitle.displayName = "AlertTitle";
const AlertDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("text-sm [&_p]:leading-relaxed", className),
        ...props
    });
});
AlertDescription.displayName = "AlertDescription";



/***/ }),

/***/ 36349:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 45974));


/***/ }),

/***/ 45974:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ DashboardLayout)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
// EXTERNAL MODULE: ./node_modules/next/dist/api/navigation.js
var navigation = __webpack_require__(20063);
// EXTERNAL MODULE: ./node_modules/next/dist/client/app-dir/link.js
var app_dir_link = __webpack_require__(52619);
var link_default = /*#__PURE__*/__webpack_require__.n(app_dir_link);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/shield.js
var shield = __webpack_require__(11064);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/log-out.js
var log_out = __webpack_require__(98428);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/bell.js
var bell = __webpack_require__(90576);
// EXTERNAL MODULE: ./src/components/ui/button.tsx
var ui_button = __webpack_require__(3998);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs + 2 modules
var dist = __webpack_require__(37738);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/chevron-right.js
var chevron_right = __webpack_require__(63263);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/check.js
var check = __webpack_require__(72251);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle.js
var circle = __webpack_require__(75797);
// EXTERNAL MODULE: ./src/lib/utils.ts
var utils = __webpack_require__(64269);
;// ./src/components/ui/dropdown-menu.tsx
/* __next_internal_client_entry_do_not_use__ DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuCheckboxItem,DropdownMenuRadioItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuGroup,DropdownMenuPortal,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuSubTrigger,DropdownMenuRadioGroup auto */ 




const DropdownMenu = dist/* Root */.bL;
const DropdownMenuTrigger = dist/* Trigger */.l9;
const DropdownMenuGroup = dist/* Group */.YJ;
const DropdownMenuPortal = dist/* Portal */.ZL;
const DropdownMenuSub = dist/* Sub */.Pb;
const DropdownMenuRadioGroup = dist/* RadioGroup */.z6;
const DropdownMenuSubTrigger = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, inset, children, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(dist/* SubTrigger */.ZP, {
        ref: ref,
        className: (0,utils.cn)("flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chevron_right/* default */.A, {
                className: "ml-auto"
            })
        ]
    });
});
DropdownMenuSubTrigger.displayName = dist/* SubTrigger */.ZP.displayName;
const DropdownMenuSubContent = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* SubContent */.G5, {
        ref: ref,
        className: (0,utils.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
        ...props
    });
});
DropdownMenuSubContent.displayName = dist/* SubContent */.G5.displayName;
const DropdownMenuContent = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, sideOffset = 4, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* Portal */.ZL, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* Content */.UC, {
            ref: ref,
            sideOffset: sideOffset,
            className: (0,utils.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
            ...props
        })
    });
});
DropdownMenuContent.displayName = dist/* Content */.UC.displayName;
const DropdownMenuItem = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, inset, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* Item */.q7, {
        ref: ref,
        className: (0,utils.cn)("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
        ...props
    });
});
DropdownMenuItem.displayName = dist/* Item */.q7.displayName;
const DropdownMenuCheckboxItem = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, children, checked, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(dist/* CheckboxItem */.H_, {
        ref: ref,
        className: (0,utils.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* ItemIndicator */.VF, {
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(check/* default */.A, {
                        className: "h-4 w-4"
                    })
                })
            }),
            children
        ]
    });
});
DropdownMenuCheckboxItem.displayName = dist/* CheckboxItem */.H_.displayName;
const DropdownMenuRadioItem = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(dist/* RadioItem */.hN, {
        ref: ref,
        className: (0,utils.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* ItemIndicator */.VF, {
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(circle/* default */.A, {
                        className: "h-2 w-2 fill-current"
                    })
                })
            }),
            children
        ]
    });
});
DropdownMenuRadioItem.displayName = dist/* RadioItem */.hN.displayName;
const DropdownMenuLabel = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, inset, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* Label */.JU, {
        ref: ref,
        className: (0,utils.cn)("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
        ...props
    });
});
DropdownMenuLabel.displayName = dist/* Label */.JU.displayName;
const DropdownMenuSeparator = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dist/* Separator */.wv, {
        ref: ref,
        className: (0,utils.cn)("-mx-1 my-1 h-px bg-muted", className),
        ...props
    });
});
DropdownMenuSeparator.displayName = dist/* Separator */.wv.displayName;
const DropdownMenuShortcut = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
        className: (0,utils.cn)("ml-auto text-xs tracking-widest opacity-60", className),
        ...props
    });
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";


// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/sun.js
var sun = __webpack_require__(85989);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/moon.js
var moon = __webpack_require__(12784);
;// ./src/components/providers/theme-provider.tsx
/* __next_internal_client_entry_do_not_use__ ThemeProvider,useTheme auto */ 

const initialState = {
    theme: "system",
    setTheme: ()=>null
};
const ThemeProviderContext = /*#__PURE__*/ (0,react.createContext)(initialState);
function ThemeProvider(param) {
    let { children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props } = param;
    const [theme, setTheme] = useState(()=> true ? localStorage.getItem(storageKey) || defaultTheme : 0);
    useEffect(()=>{
        if (false) {}
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [
        theme
    ]);
    const value = {
        theme,
        setTheme: (theme)=>{
            if (true) {
                localStorage.setItem(storageKey, theme);
            }
            setTheme(theme);
        }
    };
    return /*#__PURE__*/ _jsx(ThemeProviderContext.Provider, {
        ...props,
        value: value,
        children: children
    });
}
const useTheme = ()=>{
    const context = (0,react.useContext)(ThemeProviderContext);
    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};

;// ./src/components/ui/theme-toggle-button.tsx
/* __next_internal_client_entry_do_not_use__ ThemeToggleButton auto */ 





function ThemeToggleButton() {
    const { setTheme } = useTheme();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(DropdownMenu, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuTrigger, {
                asChild: true,
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
                    variant: "outline",
                    size: "icon",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(sun/* default */.A, {
                            className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(moon/* default */.A, {
                            className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                            className: "sr-only",
                            children: "Toggle theme"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(DropdownMenuContent, {
                align: "end",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuItem, {
                        onClick: ()=>setTheme("light"),
                        children: "Light"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuItem, {
                        onClick: ()=>setTheme("dark"),
                        children: "Dark"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuItem, {
                        onClick: ()=>setTheme("system"),
                        children: "System"
                    })
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./src/components/logo.tsx
var logo = __webpack_require__(76604);
// EXTERNAL MODULE: ./src/components/ui/avatar.tsx
var avatar = __webpack_require__(85897);
// EXTERNAL MODULE: ./src/firebase/auth/use-user.tsx
var use_user = __webpack_require__(12298);
// EXTERNAL MODULE: ./src/firebase/auth/auth.ts
var auth = __webpack_require__(63279);
// EXTERNAL MODULE: ./src/contexts/tracking-context.tsx
var tracking_context = __webpack_require__(92920);
// EXTERNAL MODULE: ./src/firebase/index.ts + 3 modules
var firebase = __webpack_require__(7227);
// EXTERNAL MODULE: ./node_modules/firebase/firestore/dist/esm/index.esm.js
var index_esm = __webpack_require__(19708);
// EXTERNAL MODULE: ./src/components/ui/badge.tsx
var badge = __webpack_require__(11647);
;// ./src/components/layout/header.tsx
/* __next_internal_client_entry_do_not_use__ Header auto */ 















const UserMenu = ()=>{
    const { user } = (0,use_user/* useUser */.J)();
    const router = (0,navigation.useRouter)();
    const handleSignOut = async ()=>{
        await (0,auth/* signOut */.CI)();
        router.push('/login');
    };
    if (!user) return null;
    const userInitial = user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email ? user.email.charAt(0).toUpperCase() : '?';
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(DropdownMenu, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuTrigger, {
                asChild: true,
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
                    variant: "outline",
                    size: "icon",
                    className: "overflow-hidden rounded-full",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(avatar/* Avatar */.eu, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(avatar/* AvatarImage */.BK, {
                                src: user.photoURL || '',
                                alt: user.displayName || ''
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(avatar/* AvatarFallback */.q5, {
                                children: userInitial
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(DropdownMenuContent, {
                align: "end",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuLabel, {
                        children: user.displayName || user.email
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuSeparator, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuItem, {
                        asChild: true,
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                            href: "/dashboard/profile",
                            className: "cursor-pointer w-full",
                            children: "Profilo"
                        })
                    }),
                    user.role === 'Amministratore' && /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuSeparator, {}),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuItem, {
                                asChild: true,
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                                    href: "/dashboard/admin",
                                    className: "flex items-center gap-2 cursor-pointer w-full",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(shield/* default */.A, {
                                            className: "h-4 w-4"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                            children: "Pannello Admin"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(DropdownMenuSeparator, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(DropdownMenuItem, {
                        onClick: handleSignOut,
                        className: "flex items-center gap-2 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(log_out/* default */.A, {
                                className: "h-4 w-4"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                children: "Esci"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
function TrackingIndicator() {
    const { isTracking, trackedVehicle } = (0,tracking_context/* useTracking */.z)();
    if (!isTracking || !trackedVehicle) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "hidden items-center gap-2 rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground md:flex",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "h-2 w-2 rounded-full bg-white animate-pulse"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                children: [
                    "Tracciando: ",
                    trackedVehicle.name
                ]
            })
        ]
    });
}
function NotificationBell() {
    const { user } = (0,use_user/* useUser */.J)();
    const { firestore } = (0,firebase/* useFirebase */.D3)();
    const alertsQuery = (0,react.useMemo)(()=>{
        if (!user || !firestore) return null;
        return (0,index_esm/* query */.P)((0,index_esm/* collection */.rJ)(firestore, "users/".concat(user.uid, "/alerts")), (0,index_esm/* where */._M)('isRead', '==', false), (0,index_esm/* where */._M)('dataoraelimina', '==', null));
    }, [
        user,
        firestore
    ]);
    const { data: unreadAlerts } = (0,firebase/* useCollection */.Ge)(alertsQuery);
    const count = (unreadAlerts === null || unreadAlerts === void 0 ? void 0 : unreadAlerts.length) || 0;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
        variant: "ghost",
        size: "icon",
        className: "relative",
        asChild: true,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
            href: "/dashboard/notifications",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(bell/* default */.A, {
                    className: "h-5 w-5"
                }),
                count > 0 && /*#__PURE__*/ (0,jsx_runtime.jsx)(badge/* Badge */.E, {
                    className: "absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive text-destructive-foreground",
                    children: count > 9 ? '9+' : count
                })
            ]
        })
    });
}
function Header() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("header", {
        className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                href: "/dashboard",
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(logo/* Logo */.g, {})
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(TrackingIndicator, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(NotificationBell, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(ThemeToggleButton, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(UserMenu, {})
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/loader-circle.js
var loader_circle = __webpack_require__(92033);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle-alert.js
var circle_alert = __webpack_require__(78770);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/info.js
var info = __webpack_require__(66065);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/car.js
var car = __webpack_require__(15957);
// EXTERNAL MODULE: ./src/components/ui/alert.tsx
var ui_alert = __webpack_require__(18332);
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var dist_index_esm = __webpack_require__(22544);
// EXTERNAL MODULE: ./node_modules/zod/v3/types.js + 6 modules
var types = __webpack_require__(54879);
// EXTERNAL MODULE: ./node_modules/@hookform/resolvers/zod/dist/zod.mjs + 1 modules
var zod = __webpack_require__(66942);
// EXTERNAL MODULE: ./src/hooks/use-toast.ts
var use_toast = __webpack_require__(15894);
// EXTERNAL MODULE: ./src/components/ui/dialog.tsx
var dialog = __webpack_require__(51834);
// EXTERNAL MODULE: ./src/components/ui/form.tsx
var ui_form = __webpack_require__(41052);
// EXTERNAL MODULE: ./src/components/ui/input.tsx
var input = __webpack_require__(65142);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-scroll-area/dist/index.mjs
var react_scroll_area_dist = __webpack_require__(59034);
;// ./src/components/ui/scroll-area.tsx
/* __next_internal_client_entry_do_not_use__ ScrollArea,ScrollBar auto */ 



const ScrollArea = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(react_scroll_area_dist/* Root */.bL, {
        ref: ref,
        className: (0,utils.cn)("relative overflow-hidden", className),
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(react_scroll_area_dist/* Viewport */.LM, {
                className: "h-full w-full rounded-[inherit]",
                children: children
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ScrollBar, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(react_scroll_area_dist/* Corner */.OK, {})
        ]
    });
});
ScrollArea.displayName = react_scroll_area_dist/* Root */.bL.displayName;
const ScrollBar = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, orientation = "vertical", ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(react_scroll_area_dist/* ScrollAreaScrollbar */.VM, {
        ref: ref,
        orientation: orientation,
        className: (0,utils.cn)("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react_scroll_area_dist/* ScrollAreaThumb */.lr, {
            className: "relative flex-1 rounded-full bg-border"
        })
    });
});
ScrollBar.displayName = react_scroll_area_dist/* ScrollAreaScrollbar */.VM.displayName;


;// ./src/components/dashboard/update-mileage-dialog.tsx
/* __next_internal_client_entry_do_not_use__ UpdateMileageDialog auto */ 














const updateMileageSchema = types/* object */.Ik({
    vehicles: types/* array */.YO(types/* object */.Ik({
        id: types/* string */.Yj(),
        name: types/* string */.Yj(),
        currentMileage: types/* coerce */.au.number().min(0, "Il chilometraggio non può essere negativo.")
    }))
});
function UpdateMileageDialog(param) {
    let { open, onOpenChange, vehicles } = param;
    const { user } = (0,use_user/* useUser */.J)();
    const { firestore } = (0,firebase/* useFirebase */.D3)();
    const { toast } = (0,use_toast/* useToast */.dj)();
    const [isSubmitting, setIsSubmitting] = (0,react.useState)(false);
    const form = (0,dist_index_esm/* useForm */.mN)({
        resolver: (0,zod/* zodResolver */.u)(updateMileageSchema),
        defaultValues: {
            vehicles: []
        }
    });
    (0,react.useEffect)(()=>{
        if (vehicles) {
            form.reset({
                vehicles: vehicles.map((v)=>({
                        id: v.id,
                        name: v.name,
                        currentMileage: v.currentMileage
                    }))
            });
        }
    }, [
        vehicles,
        open,
        form.reset
    ]);
    const { fields } = (0,dist_index_esm/* useFieldArray */.jz)({
        control: form.control,
        name: 'vehicles'
    });
    const onSubmit = (data)=>{
        if (!user || !firestore) return;
        setIsSubmitting(true);
        const batch = (0,index_esm/* writeBatch */.wP)(firestore);
        data.vehicles.forEach((vehicle)=>{
            const vehicleRef = (0,index_esm/* doc */.H9)(firestore, "users/".concat(user.uid, "/vehicles"), vehicle.id);
            batch.update(vehicleRef, {
                currentMileage: vehicle.currentMileage
            });
        });
        batch.commit().then(()=>{
            toast({
                title: 'Successo!',
                description: 'Chilometraggio dei veicoli aggiornato.'
            });
            onOpenChange(false);
        }).catch((serverError)=>{
            const permissionError = new firebase/* FirestorePermissionError */.$9({
                path: "users/".concat(user.uid, "/vehicles"),
                operation: 'update',
                requestResourceData: data.vehicles
            });
            firebase/* errorEmitter */.de.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: 'Errore di Permesso',
                description: 'Impossibile aggiornare il chilometraggio.'
            });
        }).finally(()=>{
            setIsSubmitting(false);
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dialog/* Dialog */.lG, {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(dialog/* DialogContent */.Cf, {
            className: "sm:max-w-md",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(dialog/* DialogHeader */.c7, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(dialog/* DialogTitle */.L3, {
                            children: "Aggiorna Chilometraggio"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(dialog/* DialogDescription */.rr, {
                            children: "Non stai tracciando nessun veicolo. Per fornirti statistiche accurate, per favore inserisci il chilometraggio attuale dei tuoi veicoli."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* Form */.lV, {
                    ...form,
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                        onSubmit: form.handleSubmit(onSubmit),
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(ScrollArea, {
                                className: "h-64 pr-4",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                    className: "space-y-4",
                                    children: fields.map((field, index)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormField */.zB, {
                                            control: form.control,
                                            name: "vehicles.".concat(index, ".currentMileage"),
                                            render: (param)=>{
                                                let { field: formField } = param;
                                                var _formField_value;
                                                return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_form/* FormItem */.eI, {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormLabel */.lR, {
                                                            children: field.name
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormControl */.MJ, {
                                                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(input/* Input */.p, {
                                                                type: "number",
                                                                ...formField,
                                                                value: (_formField_value = formField.value) !== null && _formField_value !== void 0 ? _formField_value : ''
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormMessage */.C5, {})
                                                    ]
                                                });
                                            }
                                        }, field.id))
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(dialog/* DialogFooter */.Es, {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
                                        type: "button",
                                        variant: "outline",
                                        onClick: ()=>onOpenChange(false),
                                        children: "Pi\xf9 Tardi"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
                                        type: "submit",
                                        disabled: isSubmitting,
                                        children: [
                                            isSubmitting && /*#__PURE__*/ (0,jsx_runtime.jsx)(loader_circle/* default */.A, {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }),
                                            "Salva"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
}

;// ./src/components/dashboard/tracking-banner.tsx
/* __next_internal_client_entry_do_not_use__ TrackingBanner auto */ 






function TrackingBanner() {
    const { permissionStatus, vehicles, isTracking } = (0,tracking_context/* useTracking */.z)();
    const [isUpdateDialogOpen, setUpdateDialogOpen] = (0,react.useState)(false);
    // All'accesso, se l'utente ha veicoli e non è in corso un tracciamento, 
    // chiediamo di aggiornare i chilometri reali se non è già stato chiesto oggi.
    (0,react.useEffect)(()=>{
        if (vehicles.length > 0 && !isTracking) {
            const today = new Date().toISOString().split('T')[0];
            const lastPrompt = localStorage.getItem('lastMileagePromptDate');
            if (lastPrompt !== today) {
                setUpdateDialogOpen(true);
                localStorage.setItem('lastMileagePromptDate', today);
            }
        }
    }, [
        vehicles,
        isTracking
    ]);
    if (isTracking) {
        return null;
    }
    if (permissionStatus === 'denied') {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_alert/* Alert */.Fc, {
                    variant: "destructive",
                    className: "mb-6",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(circle_alert/* default */.A, {
                            className: "h-4 w-4"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_alert/* AlertTitle */.XL, {
                            children: "Tracciamento GPS disattivato"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_alert/* AlertDescription */.TN, {
                            className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    children: "Per un calcolo automatico dei chilometri, abilita i permessi di geolocalizzazione. Aggiorna manualmente i dati per mantenere le scadenze corrette."
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
                                    variant: "outline",
                                    size: "sm",
                                    className: "mt-2 md:mt-0 shrink-0 border-white text-white hover:bg-white hover:text-destructive",
                                    onClick: ()=>setUpdateDialogOpen(true),
                                    children: "Aggiorna Chilometraggio"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(UpdateMileageDialog, {
                    open: isUpdateDialogOpen,
                    onOpenChange: setUpdateDialogOpen,
                    vehicles: vehicles
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_alert/* Alert */.Fc, {
                className: "mb-6 bg-primary/5 border-primary/20",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(info/* default */.A, {
                        className: "h-4 w-4 text-primary"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_alert/* AlertTitle */.XL, {
                        className: "text-primary font-bold",
                        children: "Benvenuto in CareAutoPro!"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_alert/* AlertDescription */.TN, {
                        className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                className: "text-muted-foreground",
                                children: "Per avere statistiche e avvisi precisi, ricordati di aggiornare i chilometri reali segnati sul tachimetro dei tuoi veicoli."
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
                                variant: "default",
                                size: "sm",
                                className: "mt-2 md:mt-0 shrink-0",
                                onClick: ()=>setUpdateDialogOpen(true),
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)(car/* default */.A, {
                                        className: "mr-2 h-4 w-4"
                                    }),
                                    " Aggiorna Tachimetro"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(UpdateMileageDialog, {
                open: isUpdateDialogOpen,
                onOpenChange: setUpdateDialogOpen,
                vehicles: vehicles
            })
        ]
    });
}

;// ./src/app/dashboard/layout.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 









function DashboardLayout(param) {
    let { children } = param;
    const { user, loading } = (0,use_user/* useUser */.J)();
    const router = (0,navigation.useRouter)();
    const pathname = (0,navigation.usePathname)();
    (0,react.useEffect)(()=>{
        if (!loading && !user) {
            router.push('/login');
        }
    }, [
        user,
        loading,
        router
    ]);
    if (loading || !user) {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "flex min-h-screen w-full flex-col items-center justify-center bg-background",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(loader_circle/* default */.A, {
                    className: "h-12 w-12 animate-spin text-primary"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                    className: "mt-4 text-muted-foreground",
                    children: "Caricamento..."
                })
            ]
        });
    }
    const navItems = [
        {
            href: "/dashboard/statistics",
            label: "Statistiche"
        },
        {
            href: "/dashboard/vehicles",
            label: "Veicoli"
        },
        {
            href: "/dashboard/interventions",
            label: "Interventi"
        },
        {
            href: "/dashboard/ai-assistant",
            label: "Assistente AI"
        },
        {
            href: "/dashboard/notifications",
            label: "Notifiche"
        }
    ];
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(tracking_context/* TrackingProvider */.J, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "flex min-h-screen w-full flex-col",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(Header, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "border-b",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "container flex-1 items-start md:grid md:gap-6 lg:gap-10",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("nav", {
                            className: "flex gap-4 overflow-x-auto py-4",
                            children: [
                                navItems.map((item)=>/*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                                        href: item.href,
                                        className: (0,utils.cn)('shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors', pathname.startsWith(item.href) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'),
                                        children: item.label
                                    }, item.href)),
                                user.role === 'Amministratore' && /*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                                    href: "/dashboard/admin",
                                    className: (0,utils.cn)("shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname.startsWith('/dashboard/admin') ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"),
                                    children: "Amministrazione"
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
                    className: "flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(TrackingBanner, {}),
                        children
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("footer", {
                    className: "mt-auto border-t bg-secondary py-4",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "container flex items-center justify-end",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                            className: "text-xs text-muted-foreground",
                            children: "Versione: 1.0.0"
                        })
                    })
                })
            ]
        })
    });
}


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

/***/ 63279:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CI: () => (/* binding */ signOut),
/* harmony export */   G6: () => (/* binding */ signInWithGoogle),
/* harmony export */   Ru: () => (/* binding */ signInWithEmail),
/* harmony export */   bk: () => (/* binding */ signUpWithEmail)
/* harmony export */ });
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33885);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19708);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45300);
/* harmony import */ var _error_emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9891);
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86501);
/* __next_internal_client_entry_do_not_use__ signInWithEmail,signUpWithEmail,signInWithGoogle,signOut auto */ 




let auth;
let db;
function getFirebaseAuth() {
    if (auth) return auth;
    const app = (0,_config__WEBPACK_IMPORTED_MODULE_2__/* .getFirebaseApp */ .r)();
    auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__/* .getAuth */ .xI)(app);
    return auth;
}
function getFirebaseDb() {
    if (db) return db;
    const app = (0,_config__WEBPACK_IMPORTED_MODULE_2__/* .getFirebaseApp */ .r)();
    db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .getFirestore */ .aU)(app);
    return db;
}
const googleProvider = new firebase_auth__WEBPACK_IMPORTED_MODULE_0__/* .GoogleAuthProvider */ .HF();
async function createUserDocument(uid, email, displayName, photoURL) {
    const firestore = getFirebaseDb();
    const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .doc */ .H9)(firestore, 'users', uid);
    const userRole = email === 'cirellapietro@gmail.com' ? 'Amministratore' : 'Utente';
    const userData = {
        id: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
        role: userRole,
        notificationChannels: [
            'app',
            'email'
        ],
        notificationReminderTime: 3,
        dataoraelimina: null
    };
    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .setDoc */ .BN)(userRef, userData, {
        merge: true
    }).catch((serverError)=>{
        const permissionError = new _errors__WEBPACK_IMPORTED_MODULE_4__/* .FirestorePermissionError */ .$({
            path: userRef.path,
            operation: 'create',
            requestResourceData: userData
        });
        _error_emitter__WEBPACK_IMPORTED_MODULE_3__/* .errorEmitter */ .d.emit('permission-error', permissionError);
    });
}
async function signInWithEmail(email, password) {
    const authInstance = getFirebaseAuth();
    const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__/* .signInWithEmailAndPassword */ .x9)(authInstance, email, password);
    // After successful sign-in, ensure the user document exists and the role is correct.
    if (userCredential.user && email === 'cirellapietro@gmail.com') {
        const firestore = getFirebaseDb();
        const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .doc */ .H9)(firestore, 'users', userCredential.user.uid);
        try {
            const userDoc = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .getDoc */ .x7)(userRef);
            if (userDoc.exists()) {
                if (userDoc.data().role !== 'Amministratore') {
                    const dataToUpdate = {
                        role: 'Amministratore'
                    };
                    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .updateDoc */ .mZ)(userRef, dataToUpdate).catch((serverError)=>{
                        const permissionError = new _errors__WEBPACK_IMPORTED_MODULE_4__/* .FirestorePermissionError */ .$({
                            path: userRef.path,
                            operation: 'update',
                            requestResourceData: dataToUpdate
                        });
                        _error_emitter__WEBPACK_IMPORTED_MODULE_3__/* .errorEmitter */ .d.emit('permission-error', permissionError);
                    });
                }
            } else {
                await createUserDocument(userCredential.user.uid, userCredential.user.email, userCredential.user.displayName, userCredential.user.photoURL);
            }
        } catch (serverError) {
            const permissionError = new _errors__WEBPACK_IMPORTED_MODULE_4__/* .FirestorePermissionError */ .$({
                path: userRef.path,
                operation: 'get'
            });
            _error_emitter__WEBPACK_IMPORTED_MODULE_3__/* .errorEmitter */ .d.emit('permission-error', permissionError);
        }
    }
}
async function signUpWithEmail(email, password, displayName) {
    const authInstance = getFirebaseAuth();
    const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__/* .createUserWithEmailAndPassword */ .eJ)(authInstance, email, password);
    const user = userCredential.user;
    await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__/* .updateProfile */ .r7)(user, {
        displayName
    });
    await createUserDocument(user.uid, user.email, displayName, user.photoURL);
}
async function signInWithGoogle() {
    const authInstance = getFirebaseAuth();
    const result = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__/* .signInWithPopup */ .df)(authInstance, googleProvider);
    const user = result.user;
    const firestore = getFirebaseDb();
    const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .doc */ .H9)(firestore, 'users', user.uid);
    try {
        const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .getDoc */ .x7)(userRef);
        if (!docSnap.exists()) {
            // New user via Google: createUserDocument will set the role correctly based on email.
            await createUserDocument(user.uid, user.email, user.displayName, user.photoURL);
        } else {
            // Existing user: explicitly check and set admin role if needed.
            if (user.email === 'cirellapietro@gmail.com' && docSnap.data().role !== 'Amministratore') {
                const dataToUpdate = {
                    role: 'Amministratore'
                };
                (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .updateDoc */ .mZ)(userRef, dataToUpdate).catch((serverError)=>{
                    const permissionError = new _errors__WEBPACK_IMPORTED_MODULE_4__/* .FirestorePermissionError */ .$({
                        path: userRef.path,
                        operation: 'update',
                        requestResourceData: dataToUpdate
                    });
                    _error_emitter__WEBPACK_IMPORTED_MODULE_3__/* .errorEmitter */ .d.emit('permission-error', permissionError);
                });
            }
        }
    } catch (serverError) {
        const permissionError = new _errors__WEBPACK_IMPORTED_MODULE_4__/* .FirestorePermissionError */ .$({
            path: userRef.path,
            operation: 'get'
        });
        _error_emitter__WEBPACK_IMPORTED_MODULE_3__/* .errorEmitter */ .d.emit('permission-error', permissionError);
    }
}
async function signOut() {
    const authInstance = getFirebaseAuth();
    await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__/* .signOut */ .CI)(authInstance);
}


/***/ }),

/***/ 76604:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ Logo)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _barrel_optimize_names_Car_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15957);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64269);



function Logo(param) {
    let { className } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.cn)("flex items-center gap-2", className),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Car_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                className: "h-6 w-6 text-accent"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "font-headline text-xl font-bold text-primary dark:text-primary-foreground",
                children: "CareAutoPro"
            })
        ]
    });
}


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



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [7811,2992,3135,5402,176,197,315,446,3409,5367,8470,9427,8441,1255,7358], () => (__webpack_exec__(36349)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);