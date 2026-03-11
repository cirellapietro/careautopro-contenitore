(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[6309],{

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

/***/ 14152:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 87703));


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

/***/ 87703:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ StatisticsPage)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
// EXTERNAL MODULE: ./src/components/ui/card.tsx
var card = __webpack_require__(86948);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/car.js
var car = __webpack_require__(15957);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/clock.js
var clock = __webpack_require__(62593);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/wrench.js
var wrench = __webpack_require__(60272);
;// ./src/components/dashboard/stats-cards.tsx



function StatsCards(param) {
    let { totalKm, totalHours, pendingInterventions } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "grid gap-4 md:grid-cols-3",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardHeader */.aR, {
                        className: "flex flex-row items-center justify-between space-y-0 pb-2",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardTitle */.ZB, {
                                className: "text-sm font-medium",
                                children: "Km totali (ultimi 30gg)"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(car/* default */.A, {
                                className: "h-4 w-4 text-muted-foreground"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardContent */.Wu, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "text-2xl font-bold",
                                children: [
                                    totalKm.toLocaleString('it-IT'),
                                    " km"
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Dati aggregati dai tuoi veicoli"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardHeader */.aR, {
                        className: "flex flex-row items-center justify-between space-y-0 pb-2",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardTitle */.ZB, {
                                className: "text-sm font-medium",
                                children: "Ore di guida (ultimi 30gg)"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(clock/* default */.A, {
                                className: "h-4 w-4 text-muted-foreground"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardContent */.Wu, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "text-2xl font-bold",
                                children: [
                                    totalHours.toFixed(1),
                                    " ore"
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Tempo totale trascorso alla guida"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardHeader */.aR, {
                        className: "flex flex-row items-center justify-between space-y-0 pb-2",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardTitle */.ZB, {
                                className: "text-sm font-medium",
                                children: "Interventi Richiesti"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(wrench/* default */.A, {
                                className: "h-4 w-4 text-muted-foreground"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardContent */.Wu, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: pendingInterventions
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Manutenzioni da effettuare"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/recharts/es6/chart/BarChart.js
var BarChart = __webpack_require__(98128);
// EXTERNAL MODULE: ./node_modules/recharts/es6/cartesian/CartesianGrid.js
var CartesianGrid = __webpack_require__(68425);
// EXTERNAL MODULE: ./node_modules/recharts/es6/cartesian/XAxis.js
var XAxis = __webpack_require__(47734);
// EXTERNAL MODULE: ./node_modules/recharts/es6/cartesian/YAxis.js
var YAxis = __webpack_require__(73697);
// EXTERNAL MODULE: ./node_modules/recharts/es6/cartesian/Bar.js + 1 modules
var Bar = __webpack_require__(16533);
// EXTERNAL MODULE: ./node_modules/recharts/es6/component/ResponsiveContainer.js
var ResponsiveContainer = __webpack_require__(26991);
// EXTERNAL MODULE: ./node_modules/recharts/es6/component/Tooltip.js + 3 modules
var Tooltip = __webpack_require__(23508);
// EXTERNAL MODULE: ./node_modules/recharts/es6/component/Legend.js + 1 modules
var Legend = __webpack_require__(7620);
// EXTERNAL MODULE: ./src/lib/utils.ts
var utils = __webpack_require__(64269);
;// ./src/components/ui/chart.tsx
/* __next_internal_client_entry_do_not_use__ ChartContainer,ChartTooltip,ChartTooltipContent,ChartLegend,ChartLegendContent,ChartStyle auto */ 



// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = {
    light: "",
    dark: ".dark"
};
const ChartContext = /*#__PURE__*/ react.createContext(null);
function useChart() {
    const context = react.useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    return context;
}
const ChartContainer = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { id, className, children, config, ...props } = param;
    const uniqueId = react.useId();
    const chartId = "chart-".concat(id || uniqueId.replace(/:/g, ""));
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(ChartContext.Provider, {
        value: {
            config
        },
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            "data-chart": chartId,
            ref: ref,
            className: (0,utils.cn)("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none", className),
            ...props,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(ChartStyle, {
                    id: chartId,
                    config: config
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(ResponsiveContainer/* ResponsiveContainer */.u, {
                    children: children
                })
            ]
        })
    });
});
ChartContainer.displayName = "Chart";
const ChartStyle = (param)=>{
    let { id, config } = param;
    const colorConfig = Object.entries(config).filter((param)=>{
        let [, config] = param;
        return config.theme || config.color;
    });
    if (!colorConfig.length) {
        return null;
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("style", {
        dangerouslySetInnerHTML: {
            __html: Object.entries(THEMES).map((param)=>{
                let [theme, prefix] = param;
                return "\n".concat(prefix, " [data-chart=").concat(id, "] {\n").concat(colorConfig.map((param)=>{
                    let [key, itemConfig] = param;
                    var _itemConfig_theme;
                    const color = ((_itemConfig_theme = itemConfig.theme) === null || _itemConfig_theme === void 0 ? void 0 : _itemConfig_theme[theme]) || itemConfig.color;
                    return color ? "  --color-".concat(key, ": ").concat(color, ";") : null;
                }).join("\n"), "\n}\n");
            }).join("\n")
        }
    });
};
const ChartTooltip = Tooltip/* Tooltip */.m;
const ChartTooltipContent = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey } = param;
    const { config } = useChart();
    const tooltipLabel = react.useMemo(()=>{
        var _config_label;
        if (hideLabel || !(payload === null || payload === void 0 ? void 0 : payload.length)) {
            return null;
        }
        const [item] = payload;
        const key = "".concat(labelKey || item.dataKey || item.name || "value");
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const value = !labelKey && typeof label === "string" ? ((_config_label = config[label]) === null || _config_label === void 0 ? void 0 : _config_label.label) || label : itemConfig === null || itemConfig === void 0 ? void 0 : itemConfig.label;
        if (labelFormatter) {
            return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: (0,utils.cn)("font-medium", labelClassName),
                children: labelFormatter(value, payload)
            });
        }
        if (!value) {
            return null;
        }
        return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: (0,utils.cn)("font-medium", labelClassName),
            children: value
        });
    }, [
        label,
        labelFormatter,
        payload,
        hideLabel,
        labelClassName,
        config,
        labelKey
    ]);
    if (!active || !(payload === null || payload === void 0 ? void 0 : payload.length)) {
        return null;
    }
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        ref: ref,
        className: (0,utils.cn)("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className),
        children: [
            !nestLabel ? tooltipLabel : null,
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "grid gap-1.5",
                children: payload.map((item, index)=>{
                    const key = "".concat(nameKey || item.name || item.dataKey || "value");
                    const itemConfig = getPayloadConfigFromPayload(config, item, key);
                    const indicatorColor = color || item.payload.fill || item.color;
                    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: (0,utils.cn)("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center"),
                        children: formatter && (item === null || item === void 0 ? void 0 : item.value) !== undefined && item.name ? formatter(item.value, item.name, item, index, item.payload) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                            children: [
                                (itemConfig === null || itemConfig === void 0 ? void 0 : itemConfig.icon) ? /*#__PURE__*/ (0,jsx_runtime.jsx)(itemConfig.icon, {}) : !hideIndicator && /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                    className: (0,utils.cn)("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                                        "h-2.5 w-2.5": indicator === "dot",
                                        "w-1": indicator === "line",
                                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                                        "my-0.5": nestLabel && indicator === "dashed"
                                    }),
                                    style: {
                                        "--color-bg": indicatorColor,
                                        "--color-border": indicatorColor
                                    }
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: (0,utils.cn)("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"),
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            className: "grid gap-1.5",
                                            children: [
                                                nestLabel ? tooltipLabel : null,
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                    className: "text-muted-foreground",
                                                    children: (itemConfig === null || itemConfig === void 0 ? void 0 : itemConfig.label) || item.name
                                                })
                                            ]
                                        }),
                                        item.value && /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                            className: "font-mono font-medium tabular-nums text-foreground",
                                            children: item.value.toLocaleString()
                                        })
                                    ]
                                })
                            ]
                        })
                    }, item.dataKey);
                })
            })
        ]
    });
});
ChartTooltipContent.displayName = "ChartTooltip";
const ChartLegend = Legend/* Legend */.s;
const ChartLegendContent = /*#__PURE__*/ react.forwardRef((param, ref)=>{
    let { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey } = param;
    const { config } = useChart();
    if (!(payload === null || payload === void 0 ? void 0 : payload.length)) {
        return null;
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        ref: ref,
        className: (0,utils.cn)("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className),
        children: payload.map((item)=>{
            const key = "".concat(nameKey || item.dataKey || "value");
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: (0,utils.cn)("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"),
                children: [
                    (itemConfig === null || itemConfig === void 0 ? void 0 : itemConfig.icon) && !hideIcon ? /*#__PURE__*/ (0,jsx_runtime.jsx)(itemConfig.icon, {}) : /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "h-2 w-2 shrink-0 rounded-[2px]",
                        style: {
                            backgroundColor: item.color
                        }
                    }),
                    itemConfig === null || itemConfig === void 0 ? void 0 : itemConfig.label
                ]
            }, item.value);
        })
    });
});
ChartLegendContent.displayName = "ChartLegend";
// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config, payload, key) {
    if (typeof payload !== "object" || payload === null) {
        return undefined;
    }
    const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : undefined;
    let configLabelKey = key;
    if (key in payload && typeof payload[key] === "string") {
        configLabelKey = payload[key];
    } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
        configLabelKey = payloadPayload[key];
    }
    return configLabelKey in config ? config[configLabelKey] : config[key];
}


;// ./src/components/dashboard/daily-usage-chart.tsx
/* __next_internal_client_entry_do_not_use__ DailyUsageChart auto */ 



const chartConfig = {
    distance: {
        label: "Distanza (km)",
        color: "hsl(var(--accent))"
    }
};
function DailyUsageChart(param) {
    let { data } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardHeader */.aR, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardTitle */.ZB, {
                        className: "font-headline",
                        children: "Utilizzo Giornaliero (ultimi 30gg)"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardDescription */.BT, {
                        children: "Distanza percorsa ogni giorno."
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardContent */.Wu, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ChartContainer, {
                    config: chartConfig,
                    className: "h-[250px] w-full",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(BarChart/* BarChart */.E, {
                        accessibilityLayer: true,
                        data: data,
                        margin: {
                            top: 20
                        },
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(CartesianGrid/* CartesianGrid */.d, {
                                vertical: false
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(XAxis/* XAxis */.W, {
                                dataKey: "date",
                                tickLine: false,
                                tickMargin: 10,
                                axisLine: false,
                                tickFormatter: (value)=>new Date(value).toLocaleDateString("it-IT", {
                                        day: 'numeric',
                                        month: 'short'
                                    })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(YAxis/* YAxis */.h, {
                                stroke: "#888888",
                                fontSize: 12,
                                tickLine: false,
                                axisLine: false,
                                tickFormatter: (value)=>"".concat(value, " km")
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(ChartTooltip, {
                                cursor: false,
                                content: /*#__PURE__*/ (0,jsx_runtime.jsx)(ChartTooltipContent, {
                                    indicator: "dot"
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(Bar/* Bar */.y, {
                                dataKey: "distance",
                                fill: "var(--color-distance)",
                                radius: 4
                            })
                        ]
                    })
                })
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/recharts/es6/chart/PieChart.js + 3 modules
var PieChart = __webpack_require__(78765);
// EXTERNAL MODULE: ./node_modules/recharts/es6/polar/Pie.js
var Pie = __webpack_require__(12235);
// EXTERNAL MODULE: ./node_modules/recharts/es6/component/Label.js
var Label = __webpack_require__(63296);
;// ./src/components/dashboard/hourly-breakdown-chart.tsx
/* __next_internal_client_entry_do_not_use__ HourlyBreakdownChart auto */ 




const hourly_breakdown_chart_chartConfig = {
    minutes: {
        label: "Minuti"
    },
    '00-03': {
        label: '00-03',
        color: 'hsl(var(--chart-1))'
    },
    '03-06': {
        label: '03-06',
        color: 'hsl(var(--chart-2))'
    },
    '06-09': {
        label: '06-09',
        color: 'hsl(var(--chart-3))'
    },
    '09-12': {
        label: '09-12',
        color: 'hsl(var(--chart-4))'
    },
    '12-15': {
        label: '12-15',
        color: 'hsl(var(--chart-5))'
    },
    '15-18': {
        label: '15-18',
        color: 'hsl(var(--chart-1))'
    },
    '18-21': {
        label: '18-21',
        color: 'hsl(var(--chart-2))'
    },
    '21-24': {
        label: '21-24',
        color: 'hsl(var(--chart-3))'
    }
};
function HourlyBreakdownChart(param) {
    let { data } = param;
    const totalMinutes = react.useMemo(()=>{
        return data.reduce((acc, curr)=>acc + curr.minutes, 0);
    }, [
        data
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
        className: "flex flex-col",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardHeader */.aR, {
                className: "items-center pb-0",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardTitle */.ZB, {
                        className: "font-headline",
                        children: "Ripartizione Oraria"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardDescription */.BT, {
                        children: "Analisi delle fasce orarie di guida"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardContent */.Wu, {
                className: "flex-1 pb-0",
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ChartContainer, {
                    config: hourly_breakdown_chart_chartConfig,
                    className: "mx-auto aspect-square max-h-[250px]",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(PieChart/* PieChart */.r, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(ChartTooltip, {
                                cursor: false,
                                content: /*#__PURE__*/ (0,jsx_runtime.jsx)(ChartTooltipContent, {
                                    hideLabel: true
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(Pie/* Pie */.F, {
                                data: data,
                                dataKey: "minutes",
                                nameKey: "hour",
                                innerRadius: 60,
                                strokeWidth: 5,
                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(Label/* Label */.J, {
                                    content: (param)=>{
                                        let { viewBox } = param;
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return /*#__PURE__*/ (0,jsx_runtime.jsxs)("text", {
                                                x: viewBox.cx,
                                                y: viewBox.cy,
                                                textAnchor: "middle",
                                                dominantBaseline: "middle",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("tspan", {
                                                        x: viewBox.cx,
                                                        y: viewBox.cy,
                                                        className: "fill-foreground text-3xl font-bold",
                                                        children: totalMinutes.toLocaleString()
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("tspan", {
                                                        x: viewBox.cx,
                                                        y: (viewBox.cy || 0) + 24,
                                                        className: "fill-muted-foreground",
                                                        children: "Minuti"
                                                    })
                                                ]
                                            });
                                        }
                                    }
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
}

;// ./src/lib/mock-data.ts
const mockVehicles = [
    {
        id: '1',
        userId: '1',
        name: 'Berlina Blu',
        make: 'Fiat',
        model: 'Tipo',
        registrationDate: '2021-03-12',
        vin: 'ABC123XYZ456',
        licensePlate: 'AB123CD',
        imageUrl: 'https://picsum.photos/seed/2/600/400',
        imageHint: 'blue sedan',
        type: 'Diesel',
        vehicleTypeId: 'diesel',
        currentMileage: 45000,
        lastMaintenanceDate: '2023-11-15'
    },
    {
        id: '2',
        userId: '1',
        name: 'SUV Bianco',
        make: 'Jeep',
        model: 'Renegade',
        registrationDate: '2022-07-20',
        vin: 'DEF456ABC789',
        licensePlate: 'EF456GH',
        imageUrl: 'https://picsum.photos/seed/3/600/400',
        imageHint: 'white suv',
        type: 'Ibrida',
        vehicleTypeId: 'hybrid',
        currentMileage: 22000,
        lastMaintenanceDate: '2024-01-20'
    },
    {
        id: '3',
        userId: '1',
        name: 'Elettrica Nera',
        make: 'Tesla',
        model: 'Model 3',
        registrationDate: '2023-01-30',
        vin: 'GHI789DEF123',
        licensePlate: 'IJ789LM',
        imageUrl: 'https://picsum.photos/seed/4/600/400',
        imageHint: 'electric car',
        type: 'Elettrica',
        vehicleTypeId: 'electric',
        currentMileage: 8500,
        lastMaintenanceDate: '2024-03-10'
    }
];
const mockInterventions = [
    {
        id: '1',
        vehicleId: '1',
        description: 'Cambio olio e filtro',
        status: 'Completato',
        completionDate: '2023-11-15',
        cost: 150,
        urgency: 'Media'
    },
    {
        id: '2',
        vehicleId: '1',
        description: 'Controllo pneumatici',
        status: 'Richiesto',
        scheduledDate: '2024-08-01',
        urgency: 'Media'
    },
    {
        id: '3',
        vehicleId: '2',
        description: 'Tagliando annuale',
        status: 'Richiesto',
        scheduledDate: '2024-09-15',
        urgency: 'Alta'
    },
    {
        id: '4',
        vehicleId: '3',
        description: 'Controllo batteria',
        status: 'Pianificato',
        scheduledDate: '2024-10-01',
        urgency: 'Bassa'
    }
];
const mockDrivingSessions = [
    {
        id: '1',
        vehicleId: '1',
        startTime: '2024-07-15T08:00:00Z',
        endTime: '2024-07-15T08:45:00Z',
        distance: 35,
        duration: 45
    },
    {
        id: '2',
        vehicleId: '2',
        startTime: '2024-07-15T09:15:00Z',
        endTime: '2024-07-15T09:30:00Z',
        distance: 12,
        duration: 15
    },
    {
        id: '3',
        vehicleId: '1',
        startTime: '2024-07-14T18:30:00Z',
        endTime: '2024-07-14T19:15:00Z',
        distance: 50,
        duration: 45
    }
];
const mockHourlyBreakdown = [
    {
        hour: '00-03',
        minutes: 15
    },
    {
        hour: '03-06',
        minutes: 5
    },
    {
        hour: '06-09',
        minutes: 180
    },
    {
        hour: '09-12',
        minutes: 90
    },
    {
        hour: '12-15',
        minutes: 60
    },
    {
        hour: '15-18',
        minutes: 45
    },
    {
        hour: '18-21',
        minutes: 210
    },
    {
        hour: '21-24',
        minutes: 30
    }
];

// EXTERNAL MODULE: ./src/components/ui/table.tsx
var table = __webpack_require__(87270);
// EXTERNAL MODULE: ./src/components/ui/select.tsx
var ui_select = __webpack_require__(11186);
// EXTERNAL MODULE: ./src/components/ui/badge.tsx
var badge = __webpack_require__(11647);
// EXTERNAL MODULE: ./src/firebase/auth/use-user.tsx
var use_user = __webpack_require__(12298);
// EXTERNAL MODULE: ./src/firebase/index.ts + 3 modules
var firebase = __webpack_require__(7227);
// EXTERNAL MODULE: ./node_modules/firebase/firestore/dist/esm/index.esm.js
var index_esm = __webpack_require__(19708);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/loader-circle.js
var loader_circle = __webpack_require__(92033);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/triangle-alert.js
var triangle_alert = __webpack_require__(60406);
;// ./src/app/dashboard/statistics/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 













function StatisticsPage() {
    const { user } = (0,use_user/* useUser */.J)();
    const { firestore } = (0,firebase/* useFirebase */.D3)();
    const [loading, setLoading] = (0,react.useState)(true);
    const [error, setError] = (0,react.useState)(null);
    const [selectedVehicleId, setSelectedVehicleId] = (0,react.useState)('all');
    const [vehicles, setVehicles] = (0,react.useState)([]);
    const [totalKm, setTotalKm] = (0,react.useState)(0);
    const [totalHours, setTotalHours] = (0,react.useState)(0);
    const [pendingInterventions, setPendingInterventions] = (0,react.useState)(0);
    const [dailyStats, setDailyStats] = (0,react.useState)([]);
    const [drivingSessions, setDrivingSessions] = (0,react.useState)([]);
    const [vehicleMap, setVehicleMap] = (0,react.useState)(new Map());
    (0,react.useEffect)(()=>{
        if (!user || !firestore) return;
        const fetchData = async ()=>{
            setLoading(true);
            setError(null);
            try {
                const vehiclesQuery = (0,index_esm/* query */.P)((0,index_esm/* collection */.rJ)(firestore, "users/".concat(user.uid, "/vehicles")), (0,index_esm/* where */._M)('dataoraelimina', '==', null));
                const vehiclesSnap = await (0,index_esm/* getDocs */.GG)(vehiclesQuery);
                const allUserVehicles = vehiclesSnap.docs.map((doc)=>({
                        id: doc.id,
                        ...doc.data()
                    }));
                setVehicles(allUserVehicles);
                const newVehicleMap = new Map(allUserVehicles.map((v)=>[
                        v.id,
                        v.name || v.licensePlate || 'Sconosciuto'
                    ]));
                setVehicleMap(newVehicleMap);
                const vehiclesToProcess = selectedVehicleId === 'all' ? allUserVehicles : allUserVehicles.filter((v)=>v.id === selectedVehicleId);
                if (vehiclesToProcess.length === 0) {
                    setDailyStats([]);
                    setTotalKm(0);
                    setTotalHours(0);
                    setPendingInterventions(0);
                    setDrivingSessions([]);
                    setLoading(false);
                    return;
                }
                const promises = vehiclesToProcess.map(async (vehicle)=>{
                    const dailyStatsQuery = (0,index_esm/* query */.P)((0,index_esm/* collection */.rJ)(firestore, "users/".concat(user.uid, "/vehicles/").concat(vehicle.id, "/dailyStatistics")), (0,index_esm/* where */._M)('dataoraelimina', '==', null));
                    const interventionsQuery = (0,index_esm/* query */.P)((0,index_esm/* collection */.rJ)(firestore, "users/".concat(user.uid, "/vehicles/").concat(vehicle.id, "/maintenanceInterventions")), (0,index_esm/* where */._M)('dataoraelimina', '==', null));
                    const sessionsQuery = (0,index_esm/* query */.P)((0,index_esm/* collection */.rJ)(firestore, "users/".concat(user.uid, "/vehicles/").concat(vehicle.id, "/trackingSessions")), (0,index_esm/* where */._M)('dataoraelimina', '==', null));
                    const [dailyStatsSnap, interventionsSnap, sessionsSnap] = await Promise.all([
                        (0,index_esm/* getDocs */.GG)(dailyStatsQuery),
                        (0,index_esm/* getDocs */.GG)(interventionsQuery),
                        (0,index_esm/* getDocs */.GG)(sessionsQuery)
                    ]);
                    return {
                        dailyStats: dailyStatsSnap.docs.map((doc)=>doc.data()),
                        interventions: interventionsSnap.docs.map((doc)=>({
                                id: doc.id,
                                ...doc.data()
                            })),
                        sessions: sessionsSnap.docs.map((doc)=>({
                                id: doc.id,
                                ...doc.data()
                            }))
                    };
                });
                const results = await Promise.allSettled(promises);
                let rawDailyStats = [];
                let rawInterventions = [];
                let rawDrivingSessions = [];
                results.forEach((result, index)=>{
                    if (result.status === 'fulfilled') {
                        rawDailyStats.push(...result.value.dailyStats);
                        rawInterventions.push(...result.value.interventions);
                        rawDrivingSessions.push(...result.value.sessions);
                    } else {
                        var _vehiclesToProcess_index;
                        const vehicleId = ((_vehiclesToProcess_index = vehiclesToProcess[index]) === null || _vehiclesToProcess_index === void 0 ? void 0 : _vehiclesToProcess_index.id) || 'unknown';
                        console.error("Failed to fetch statistics for vehicle ".concat(vehicleId, ":"), result.reason);
                        const permissionError = new firebase/* FirestorePermissionError */.$9({
                            path: "users/".concat(user.uid, "/vehicles/").concat(vehicleId),
                            operation: 'list',
                            requestResourceData: {
                                context: "Failed to fetch sub-collection data for vehicle."
                            }
                        });
                        firebase/* errorEmitter */.de.emit('permission-error', permissionError);
                    }
                });
                const sanitizedDailyStats = rawDailyStats.map((stat)=>({
                        date: stat === null || stat === void 0 ? void 0 : stat.date,
                        distance: Number(stat === null || stat === void 0 ? void 0 : stat.distance) || 0,
                        duration: Number(stat === null || stat === void 0 ? void 0 : stat.duration) || 0,
                        vehicleId: stat === null || stat === void 0 ? void 0 : stat.vehicleId
                    })).filter((stat)=>stat.date && !isNaN(new Date(stat.date).getTime()));
                const sanitizedInterventions = rawInterventions.filter((i)=>i && i.status);
                const sanitizedSessions = rawDrivingSessions.map((s)=>({
                        id: s === null || s === void 0 ? void 0 : s.id,
                        vehicleId: s === null || s === void 0 ? void 0 : s.vehicleId,
                        startTime: s === null || s === void 0 ? void 0 : s.startTime,
                        distance: Number(s === null || s === void 0 ? void 0 : s.distance) || 0,
                        duration: Number(s === null || s === void 0 ? void 0 : s.duration) || 0,
                        dataoraelimina: s === null || s === void 0 ? void 0 : s.dataoraelimina
                    })).filter((s)=>s.id && s.vehicleId && s.startTime && !isNaN(new Date(s.startTime).getTime()));
                const aggregatedDailyStats = selectedVehicleId === 'all' ? Array.from(sanitizedDailyStats.reduce((map, stat)=>{
                    const dateKey = new Date(stat.date).toISOString().split('T')[0];
                    const existing = map.get(dateKey);
                    if (existing) {
                        existing.distance += stat.distance;
                        existing.duration += stat.duration;
                    } else {
                        map.set(dateKey, {
                            ...stat,
                            date: dateKey
                        });
                    }
                    return map;
                }, new Map()).values()) : sanitizedDailyStats;
                const sortedAggregatedStats = aggregatedDailyStats.sort((a, b)=>new Date(a.date).getTime() - new Date(b.date).getTime());
                const last30DaysStats = sortedAggregatedStats.slice(-30);
                setDailyStats(last30DaysStats);
                const totalKm = last30DaysStats.reduce((acc, stat)=>acc + stat.distance, 0);
                const totalMinutes = last30DaysStats.reduce((acc, stat)=>acc + stat.duration, 0);
                setTotalKm(totalKm);
                setTotalHours(totalMinutes / 60);
                setPendingInterventions(sanitizedInterventions.filter((i)=>i.status === 'Richiesto').length);
                const sortedSessions = sanitizedSessions.sort((a, b)=>new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
                setDrivingSessions(sortedSessions.slice(0, 5));
            } catch (e) {
                console.error("An unexpected error occurred while fetching statistics:", e);
                setError("Si è verificato un errore imprevisto durante il caricamento delle statistiche. Riprova più tardi.");
                const permissionError = new firebase/* FirestorePermissionError */.$9({
                    path: "users/".concat(user.uid, "/vehicles"),
                    operation: 'list',
                    requestResourceData: {
                        context: "Statistics page failed with error: ".concat(e.message)
                    }
                });
                firebase/* errorEmitter */.de.emit('permission-error', permissionError);
            } finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [
        user,
        firestore,
        selectedVehicleId
    ]);
    if (loading) {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "flex h-[60vh] w-full flex-col items-center justify-center",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(loader_circle/* default */.A, {
                    className: "h-12 w-12 animate-spin text-primary"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                    className: "mt-4 text-muted-foreground",
                    children: "Caricamento statistiche..."
                })
            ]
        });
    }
    if (error) {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                                className: "font-headline text-3xl font-bold",
                                children: "Statistiche"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-muted-foreground",
                                children: "Panoramica del tuo utilizzo e dei tuoi veicoli."
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                    className: "border-destructive",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardHeader */.aR, {
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardTitle */.ZB, {
                                className: "flex items-center gap-2 text-destructive",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)(triangle_alert/* default */.A, {}),
                                    "Errore nel Caricamento"
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardContent */.Wu, {
                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                children: error
                            })
                        })
                    ]
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                                className: "font-headline text-3xl font-bold",
                                children: "Statistiche"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                className: "text-muted-foreground",
                                children: "Panoramica del tuo utilizzo e dei tuoi veicoli."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "flex items-center gap-2",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                            className: "w-full md:w-64",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_select/* Select */.l6, {
                                onValueChange: setSelectedVehicleId,
                                defaultValue: "all",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectTrigger */.bq, {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectValue */.yv, {
                                            placeholder: "Seleziona un veicolo"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_select/* SelectContent */.gC, {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectItem */.eb, {
                                                value: "all",
                                                children: "Tutti i veicoli"
                                            }),
                                            vehicles.map((vehicle)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectItem */.eb, {
                                                    value: vehicle.id,
                                                    children: vehicle.name || vehicle.licensePlate || 'Sconosciuto'
                                                }, vehicle.id))
                                        ]
                                    })
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(StatsCards, {
                totalKm: totalKm,
                totalHours: totalHours,
                pendingInterventions: pendingInterventions
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "grid gap-6 md:grid-cols-2 lg:grid-cols-7",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "lg:col-span-4",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(DailyUsageChart, {
                            data: dailyStats
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "lg:col-span-3",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(HourlyBreakdownChart, {
                            data: mockHourlyBreakdown
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardHeader */.aR, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardTitle */.ZB, {
                                className: "font-headline",
                                children: "Ultime Sessioni di Guida"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardDescription */.BT, {
                                children: "Dettaglio degli ultimi viaggi effettuati."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardContent */.Wu, {
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(table/* Table */.XI, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHeader */.A0, {
                                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(table/* TableRow */.Hj, {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHead */.nd, {
                                                children: "Veicolo"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHead */.nd, {
                                                children: "Data"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHead */.nd, {
                                                children: "Distanza"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableHead */.nd, {
                                                children: "Durata"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableBody */.BF, {
                                    children: drivingSessions.length > 0 ? drivingSessions.map((session)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(table/* TableRow */.Hj, {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableCell */.nA, {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(badge/* Badge */.E, {
                                                        variant: "outline",
                                                        children: vehicleMap.get(session.vehicleId) || 'Sconosciuto'
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableCell */.nA, {
                                                    children: session.startTime ? new Date(session.startTime).toLocaleString('it-IT') : 'N/D'
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(table/* TableCell */.nA, {
                                                    children: [
                                                        session.distance,
                                                        " km"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(table/* TableCell */.nA, {
                                                    children: [
                                                        session.duration,
                                                        " min"
                                                    ]
                                                })
                                            ]
                                        }, session.id)) : /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableRow */.Hj, {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(table/* TableCell */.nA, {
                                            colSpan: 4,
                                            className: "text-center",
                                            children: "Nessuna sessione di guida trovata."
                                        })
                                    })
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [7811,2992,3135,5402,315,446,2777,3759,8470,8441,1255,7358], () => (__webpack_exec__(14152)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);