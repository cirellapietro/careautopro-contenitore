(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[9979],{

/***/ 849:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ai: () => (/* binding */ ai)
/* harmony export */ });
/* harmony import */ var genkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95101);
/* harmony import */ var genkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(genkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _genkit_ai_google_genai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14596);


let ai;
try {
    ai = (0,genkit__WEBPACK_IMPORTED_MODULE_0__.genkit)({
        plugins: [
            (0,_genkit_ai_google_genai__WEBPACK_IMPORTED_MODULE_1__/* .googleAI */ .Y)()
        ],
        model: 'googleai/gemini-2.5-flash'
    });
} catch (e) {
    console.warn('CRITICAL: Genkit initialization failed. AI features will be disabled. Error: ' + (e.message || e));
    // Create a mock 'ai' object that allows the app to build and run
    // but throws a user-friendly error at runtime if an AI feature is called.
    const mockRunner = (config)=>{
        return async (input)=>{
            console.warn("AI flow '".concat(config.name, "' was called, but AI is disabled due to an initialization error."));
            // This error will be caught by the try/catch blocks in the UI components
            throw new Error("AI feature is disabled. The 'Generative Language API' may not be enabled in your Google Cloud project.");
        };
    };
    ai = {
        defineFlow: (config, flowLogic)=>{
            // Return a function that will throw a controlled error when executed
            return mockRunner(config);
        },
        definePrompt: (config)=>{
            // definePrompt returns a function that can be called. We return our runner.
            return mockRunner(config);
        }
    };
}



/***/ }),

/***/ 8508:
/***/ ((module) => {

"use strict";
module.exports = node:url;

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

/***/ 13150:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 15617:
/***/ ((module) => {

"use strict";
module.exports = node:buffer;

/***/ }),

/***/ 15957:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Car)
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
            d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
            key: "5owen"
        }
    ],
    [
        "circle",
        {
            cx: "7",
            cy: "17",
            r: "2",
            key: "u2ysq9"
        }
    ],
    [
        "path",
        {
            d: "M9 17h6",
            key: "r8uit2"
        }
    ],
    [
        "circle",
        {
            cx: "17",
            cy: "17",
            r: "2",
            key: "axvx0g"
        }
    ]
];
const Car = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Car", __iconNode);
 //# sourceMappingURL=car.js.map


/***/ }),

/***/ 16193:
/***/ (() => {

/* (ignored) */

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

/***/ 22452:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CirclePlus)
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
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M8 12h8",
            key: "1wcyev"
        }
    ],
    [
        "path",
        {
            d: "M12 8v8",
            key: "napkw2"
        }
    ]
];
const CirclePlus = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("CirclePlus", __iconNode);
 //# sourceMappingURL=circle-plus.js.map


/***/ }),

/***/ 24888:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 26615:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ X)
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
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
];
const X = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("X", __iconNode);
 //# sourceMappingURL=x.js.map


/***/ }),

/***/ 29561:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ VehiclesPage)
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
// EXTERNAL MODULE: ./src/components/ui/badge.tsx
var badge = __webpack_require__(11647);
// EXTERNAL MODULE: ./src/components/ui/button.tsx
var ui_button = __webpack_require__(3998);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/createLucideIcon.js + 3 modules
var createLucideIcon = __webpack_require__(14294);
;// ./node_modules/lucide-react/dist/esm/icons/zap.js
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
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
            key: "1xq2db"
        }
    ]
];
const Zap = (0,createLucideIcon/* default */.A)("Zap", __iconNode);
 //# sourceMappingURL=zap.js.map

;// ./node_modules/lucide-react/dist/esm/icons/leaf.js
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const leaf_iconNode = [
    [
        "path",
        {
            d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
            key: "nnexq3"
        }
    ],
    [
        "path",
        {
            d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
            key: "mt58a7"
        }
    ]
];
const Leaf = (0,createLucideIcon/* default */.A)("Leaf", leaf_iconNode);
 //# sourceMappingURL=leaf.js.map

;// ./node_modules/lucide-react/dist/esm/icons/flame.js
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const flame_iconNode = [
    [
        "path",
        {
            d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
            key: "96xj49"
        }
    ]
];
const Flame = (0,createLucideIcon/* default */.A)("Flame", flame_iconNode);
 //# sourceMappingURL=flame.js.map

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/car.js
var car = __webpack_require__(15957);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/loader-circle.js
var loader_circle = __webpack_require__(92033);
;// ./node_modules/lucide-react/dist/esm/icons/circle-stop.js
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const circle_stop_iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "rect",
        {
            x: "9",
            y: "9",
            width: "6",
            height: "6",
            rx: "1",
            key: "1ssd4o"
        }
    ]
];
const CircleStop = (0,createLucideIcon/* default */.A)("CircleStop", circle_stop_iconNode);
 //# sourceMappingURL=circle-stop.js.map

;// ./node_modules/lucide-react/dist/esm/icons/circle-play.js
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const circle_play_iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "polygon",
        {
            points: "10 8 16 12 10 16 10 8",
            key: "1cimsy"
        }
    ]
];
const CirclePlay = (0,createLucideIcon/* default */.A)("CirclePlay", circle_play_iconNode);
 //# sourceMappingURL=circle-play.js.map

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle-check.js
var circle_check = __webpack_require__(50984);
;// ./node_modules/lucide-react/dist/esm/icons/gauge.js
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const gauge_iconNode = [
    [
        "path",
        {
            d: "m12 14 4-4",
            key: "9kzdfg"
        }
    ],
    [
        "path",
        {
            d: "M3.34 19a10 10 0 1 1 17.32 0",
            key: "19p75a"
        }
    ]
];
const Gauge = (0,createLucideIcon/* default */.A)("Gauge", gauge_iconNode);
 //# sourceMappingURL=gauge.js.map

;// ./node_modules/lucide-react/dist/esm/icons/timer.js
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const timer_iconNode = [
    [
        "line",
        {
            x1: "10",
            x2: "14",
            y1: "2",
            y2: "2",
            key: "14vaq8"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "15",
            y1: "14",
            y2: "11",
            key: "17fdiu"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "14",
            r: "8",
            key: "1e1u0o"
        }
    ]
];
const Timer = (0,createLucideIcon/* default */.A)("Timer", timer_iconNode);
 //# sourceMappingURL=timer.js.map

// EXTERNAL MODULE: ./src/contexts/tracking-context.tsx
var tracking_context = __webpack_require__(92920);
// EXTERNAL MODULE: ./src/lib/utils.ts
var utils = __webpack_require__(64269);
// EXTERNAL MODULE: ./node_modules/next/dist/api/navigation.js
var navigation = __webpack_require__(20063);
;// ./src/components/dashboard/vehicle-card.tsx
/* __next_internal_client_entry_do_not_use__ VehicleCard auto */ 








const VehicleIcon = (param)=>{
    let { type, className } = param;
    const vehicleType = (type === null || type === void 0 ? void 0 : type.toLowerCase()) || '';
    switch(vehicleType){
        case 'elettrica':
            return /*#__PURE__*/ (0,jsx_runtime.jsx)(Zap, {
                className: className
            });
        case 'ibrida':
            return /*#__PURE__*/ (0,jsx_runtime.jsx)(Leaf, {
                className: className
            });
        case 'gpl':
        case 'metano':
            return /*#__PURE__*/ (0,jsx_runtime.jsx)(Flame, {
                className: className
            });
        default:
            return /*#__PURE__*/ (0,jsx_runtime.jsx)(car/* default */.A, {
                className: className
            });
    }
};
function VehicleCard(param) {
    let { vehicle } = param;
    const router = (0,navigation.useRouter)();
    const { trackedVehicleId, setTrackedVehicleId, isTracking, startTracking, stopTracking, isStopping, permissionStatus, switchTrackingTo, liveSessionDistance, sessionDuration } = (0,tracking_context/* useTracking */.z)();
    const isThisVehicleSelected = trackedVehicleId === vehicle.id;
    const isThisVehicleBeingTracked = isThisVehicleSelected && isTracking;
    const canStartTracking = permissionStatus === 'granted';
    const registrationYear = vehicle.registrationDate && !isNaN(new Date(vehicle.registrationDate).getTime()) ? new Date(vehicle.registrationDate).getFullYear() : 'N/D';
    const lastMaintenance = vehicle.lastMaintenanceDate && !isNaN(new Date(vehicle.lastMaintenanceDate).getTime()) ? new Date(vehicle.lastMaintenanceDate).toLocaleDateString('it-IT') : 'N/D';
    const baseMileage = typeof vehicle.currentMileage === 'number' ? vehicle.currentMileage : 0;
    // Usiamo liveSessionDistance (distanza percorsa non ancora sincronizzata nel DB)
    // Questo evita il doppio conteggio quando il DB viene aggiornato ma la sessione è ancora attiva.
    const displayMileage = isThisVehicleBeingTracked ? baseMileage + liveSessionDistance : baseMileage;
    const handleCardClick = ()=>{
        router.push("/dashboard/vehicles/view?id=".concat(vehicle.id));
    };
    const handleButtonClick = (e, action)=>{
        e.stopPropagation();
        action();
    };
    const formatDuration = (totalSeconds)=>{
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor(totalSeconds % 3600 / 60);
        const seconds = totalSeconds % 60;
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0');
        if (hours > 0) {
            const paddedHours = String(hours).padStart(2, '0');
            return "".concat(paddedHours, ":").concat(paddedMinutes, ":").concat(paddedSeconds);
        }
        return "".concat(paddedMinutes, ":").concat(paddedSeconds);
    };
    const renderFooter = ()=>{
        if (isThisVehicleBeingTracked) {
            return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
                onClick: (e)=>handleButtonClick(e, stopTracking),
                variant: "destructive",
                className: "w-full",
                disabled: isStopping,
                children: [
                    isStopping ? /*#__PURE__*/ (0,jsx_runtime.jsx)(loader_circle/* default */.A, {
                        className: "animate-spin mr-2 h-4 w-4"
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsx)(CircleStop, {
                        className: "mr-2 h-4 w-4"
                    }),
                    "Ferma Tracciamento"
                ]
            });
        }
        if (isThisVehicleSelected) {
            return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "w-full flex flex-col items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
                        onClick: (e)=>handleButtonClick(e, startTracking),
                        className: "w-full",
                        disabled: !canStartTracking || isTracking,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(CirclePlay, {
                                className: "mr-2 h-4 w-4"
                            }),
                            " Attiva Tracking KM/Tempo"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "text-xs text-muted-foreground text-center px-2",
                        children: "Il tracking aggiorna i chilometri nel database ogni 500 metri."
                    })
                ]
            });
        }
        if (isTracking) {
            return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
                onClick: (e)=>handleButtonClick(e, ()=>switchTrackingTo(vehicle.id)),
                variant: "outline",
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(CirclePlay, {
                        className: "mr-2 h-4 w-4"
                    }),
                    " Passa a questo veicolo"
                ]
            });
        }
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
            onClick: (e)=>handleButtonClick(e, ()=>setTrackedVehicleId(vehicle.id)),
            variant: "outline",
            className: "w-full",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(circle_check/* default */.A, {
                    className: "mr-2 h-4 w-4"
                }),
                " Seleziona per tracciare"
            ]
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
        className: (0,utils.cn)("flex flex-col transition-all cursor-pointer hover:bg-muted/50", isThisVehicleSelected && "ring-2 ring-primary"),
        onClick: handleCardClick,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardHeader */.aR, {
                className: "flex flex-col items-center justify-center p-6 text-center",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-secondary",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(VehicleIcon, {
                            type: vehicle.type,
                            className: "h-12 w-12 text-accent"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(badge/* Badge */.E, {
                        variant: "outline",
                        children: vehicle.type
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardTitle */.ZB, {
                        className: "font-headline text-2xl mt-2",
                        children: vehicle.name
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardDescription */.BT, {
                        children: [
                            vehicle.make,
                            " ",
                            vehicle.model,
                            " - ",
                            registrationYear
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardContent */.Wu, {
                className: "flex-1 p-6 pt-0",
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "border-t pt-4 text-sm text-muted-foreground",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    children: "Chilometraggio:"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                    className: (0,utils.cn)("font-bold text-lg", isThisVehicleBeingTracked ? "text-primary animate-pulse" : "text-foreground"),
                                    children: [
                                        displayMileage.toLocaleString('it-IT', {
                                            maximumFractionDigits: 2
                                        }),
                                        " km"
                                    ]
                                })
                            ]
                        }),
                        isThisVehicleBeingTracked ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "mt-2 space-y-1 text-xs",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(Gauge, {
                                            className: "h-3 w-3 text-primary"
                                        }),
                                        "Sessione: ",
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                            className: "font-semibold text-foreground",
                                            children: [
                                                (liveSessionDistance + (isThisVehicleBeingTracked ? vehicle.currentMileage - baseMileage : 0)).toFixed(2),
                                                " km"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(Timer, {
                                            className: "h-3 w-3 text-primary"
                                        }),
                                        "Tempo: ",
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                            className: "font-semibold text-foreground",
                                            children: formatDuration(sessionDuration)
                                        })
                                    ]
                                })
                            ]
                        }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                            className: "mt-1",
                            children: [
                                "Ultima manutenzione: ",
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    className: "font-semibold text-foreground",
                                    children: lastMaintenance
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardFooter */.wL, {
                className: "p-4 pt-0",
                children: renderFooter()
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var dist_index_esm = __webpack_require__(22544);
// EXTERNAL MODULE: ./node_modules/@hookform/resolvers/zod/dist/zod.mjs + 1 modules
var zod = __webpack_require__(66942);
// EXTERNAL MODULE: ./node_modules/zod/v3/types.js + 6 modules
var types = __webpack_require__(54879);
// EXTERNAL MODULE: ./src/hooks/use-toast.ts
var use_toast = __webpack_require__(15894);
// EXTERNAL MODULE: ./src/components/ui/dialog.tsx
var dialog = __webpack_require__(51834);
// EXTERNAL MODULE: ./src/components/ui/form.tsx
var ui_form = __webpack_require__(41052);
// EXTERNAL MODULE: ./src/components/ui/input.tsx
var input = __webpack_require__(65142);
// EXTERNAL MODULE: ./src/components/ui/select.tsx
var ui_select = __webpack_require__(11186);
// EXTERNAL MODULE: ./src/ai/genkit.ts
var genkit = __webpack_require__(849);
// EXTERNAL MODULE: external "genkit"
var external_genkit_ = __webpack_require__(95101);
;// ./src/ai/flows/fetch-maintenance-plan.ts
/**
 * @fileOverview An AI-powered flow to fetch standard maintenance plans for a vehicle model.
 *
 * - fetchMaintenancePlan - A function that returns a list of maintenance checks.
 * - MaintenancePlanInput - The input type for the fetchMaintenancePlan function.
 * - MaintenancePlanOutput - The return type for the fetchMaintenancePlan function.
 */ 

const MaintenancePlanInputSchema = external_genkit_.z.object({
    make: external_genkit_.z.string().describe('The make of the vehicle (e.g., Fiat).'),
    model: external_genkit_.z.string().describe('The model of the vehicle (e.g., Panda).')
});
const MaintenanceCheckSchema = external_genkit_.z.object({
    description: external_genkit_.z.string().describe("Description of the maintenance check."),
    intervalMileage: external_genkit_.z.number().optional().describe("Mileage interval in km for the check."),
    intervalTime: external_genkit_.z.number().optional().describe("Time interval in months for the check.")
});
const MaintenancePlanOutputSchema = external_genkit_.z.array(MaintenanceCheckSchema);
async function fetchMaintenancePlan(input) {
    try {
        return await fetchMaintenancePlanFlow(input);
    } catch (e) {
        var _e_message;
        console.error("Genkit flow 'fetchMaintenancePlan' failed: ".concat(e.message));
        if ((_e_message = e.message) === null || _e_message === void 0 ? void 0 : _e_message.includes('Generative Language API has not been used')) {
            return {
                error: "L'API per l'IA generativa non è attiva. Abilitala nella console Google Cloud."
            };
        }
        return {
            error: "Impossibile recuperare il piano di manutenzione AI."
        };
    }
}
const fetch_maintenance_plan_prompt = genkit.ai.definePrompt({
    name: 'fetchMaintenancePlanPrompt',
    input: {
        schema: MaintenancePlanInputSchema
    },
    output: {
        schema: MaintenancePlanOutputSchema
    },
    prompt: 'You are an expert car mechanic. For a \'{{make}} {{model}}\', provide a standard maintenance plan based on general automotive knowledge.\nList the most common and important maintenance checks.\nRespond in Italian.\nProvide ONLY a JSON array of objects with the keys "description", "intervalMileage", and "intervalTime".\nIf an interval is not applicable, omit the key. Do not include any other text, explanation, or markdown formatting.\n\nExample for a generic car:\n[\n  {\n    "description": "Cambio olio e filtro olio",\n    "intervalMileage": 15000,\n    "intervalTime": 12\n  },\n  {\n    "description": "Controllo pneumatici e pressione",\n    "intervalTime": 3\n  },\n  {\n    "description": "Sostituzione cinghia di distribuzione",\n    "intervalMileage": 120000,\n    "intervalTime": 72\n  }\n]\n'
});
const fetchMaintenancePlanFlow = genkit.ai.defineFlow({
    name: 'fetchMaintenancePlanFlow',
    inputSchema: MaintenancePlanInputSchema,
    outputSchema: MaintenancePlanOutputSchema
}, async (input)=>{
    const { output } = await fetch_maintenance_plan_prompt(input);
    return output || [];
});

// EXTERNAL MODULE: ./src/components/ui/checkbox.tsx
var ui_checkbox = __webpack_require__(73457);
// EXTERNAL MODULE: ./src/ai/flows/reverse-geocode.ts
var reverse_geocode = __webpack_require__(62912);
// EXTERNAL MODULE: ./src/ai/flows/fetch-average-mileage.ts
var fetch_average_mileage = __webpack_require__(35428);
;// ./src/components/dashboard/add-vehicle-form.tsx
/* __next_internal_client_entry_do_not_use__ AddVehicleForm auto */ 




















const addVehicleSchema = types/* object */.Ik({
    name: types/* string */.Yj().min(2, {
        message: 'Il nome è obbligatorio.'
    }),
    registrationDate: types/* string */.Yj({
        required_error: 'La data di immatricolazione è obbligatoria.'
    }).min(1, {
        message: 'La data di immatricolazione è obbligatoria.'
    }),
    licensePlate: types/* string */.Yj().min(5, {
        message: 'Targa non valida.'
    }).max(10, {
        message: 'Targa non valida.'
    }),
    vehicleTypeId: types/* string */.Yj({
        required_error: 'Seleziona un tipo.'
    }),
    currentMileage: types/* coerce */.au.number().optional(),
    isTaxi: types/* boolean */.zM().default(false)
});
function AddVehicleForm(param) {
    let { open, onOpenChange } = param;
    const { user } = (0,use_user/* useUser */.J)();
    const { firestore } = (0,firebase/* useFirebase */.D3)();
    const { toast } = (0,use_toast/* useToast */.dj)();
    const router = (0,navigation.useRouter)();
    const { permissionStatus } = (0,tracking_context/* useTracking */.z)();
    const [isSubmitting, setIsSubmitting] = (0,react.useState)(false);
    const [newVehicleId, setNewVehicleId] = (0,react.useState)(null);
    const [year, setYear] = (0,react.useState)('');
    const [month, setMonth] = (0,react.useState)('');
    const [day, setDay] = (0,react.useState)('');
    const [vehicleTypes, setVehicleTypes] = (0,react.useState)([]);
    const [loadingTypes, setLoadingTypes] = (0,react.useState)(true);
    const [cityAverageMileage, setCityAverageMileage] = (0,react.useState)(null);
    const [isFetchingSuggestion, setIsFetchingSuggestion] = (0,react.useState)(false);
    const form = (0,dist_index_esm/* useForm */.mN)({
        resolver: (0,zod/* zodResolver */.u)(addVehicleSchema),
        defaultValues: {
            name: '',
            licensePlate: '',
            registrationDate: '',
            currentMileage: undefined,
            isTaxi: false
        }
    });
    const registrationDate = form.watch('registrationDate');
    (0,react.useEffect)(()=>{
        if (!firestore || !open) return;
        const fetchVehicleTypes = async ()=>{
            setLoadingTypes(true);
            try {
                const vehicleTypesQuery = (0,index_esm/* query */.P)((0,index_esm/* collection */.rJ)(firestore, 'vehicleTypes'), (0,index_esm/* where */._M)('dataoraelimina', '==', null));
                const querySnapshot = await (0,index_esm/* getDocs */.GG)(vehicleTypesQuery);
                const types = querySnapshot.docs.map((doc)=>({
                        ...doc.data()
                    }));
                setVehicleTypes(types);
            } catch (serverError) {
                const permissionError = new firebase/* FirestorePermissionError */.$9({
                    path: 'vehicleTypes',
                    operation: 'list',
                    requestResourceData: {
                        context: 'Fetching vehicle types for add vehicle form.'
                    }
                });
                firebase/* errorEmitter */.de.emit('permission-error', permissionError);
            } finally{
                setLoadingTypes(false);
            }
        };
        fetchVehicleTypes();
    }, [
        firestore,
        open
    ]);
    (0,react.useEffect)(()=>{
        if (open) {
            form.reset({
                name: '',
                licensePlate: '',
                registrationDate: '',
                vehicleTypeId: undefined,
                currentMileage: undefined,
                isTaxi: false
            });
            setYear('');
            setMonth('');
            setDay('');
            setCityAverageMileage(null);
        }
    }, [
        open,
        form
    ]);
    (0,react.useEffect)(()=>{
        if (year && month && day) {
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            if (date.getFullYear() === parseInt(year) && date.getMonth() === parseInt(month) - 1 && date.getDate() === parseInt(day)) {
                const combinedDate = "".concat(year, "-").concat(month.padStart(2, '0'), "-").concat(day.padStart(2, '0'));
                form.setValue('registrationDate', combinedDate, {
                    shouldValidate: true
                });
            } else {
                form.setValue('registrationDate', '', {
                    shouldValidate: true
                });
            }
        } else {
            form.setValue('registrationDate', '', {
                shouldValidate: true
            });
        }
    }, [
        year,
        month,
        day,
        form
    ]);
    (0,react.useEffect)(()=>{
        if (open && navigator.geolocation && permissionStatus === 'granted' && !cityAverageMileage) {
            const getSuggestion = async (position)=>{
                setIsFetchingSuggestion(true);
                const { latitude, longitude } = position.coords;
                const locationResult = await (0,reverse_geocode/* reverseGeocode */.R)({
                    latitude,
                    longitude
                });
                if ('error' in locationResult) {
                    if (locationResult.error.includes('IA generativa non è attiva')) {
                        toast({
                            variant: 'destructive',
                            title: 'Funzione AI disabilitata',
                            description: "Abilita l'API Generative Language nella console Google Cloud per ricevere suggerimenti automatici.",
                            duration: 10000
                        });
                    }
                } else if (locationResult.city) {
                    const mileageResult = await (0,fetch_average_mileage/* fetchAverageMileage */.s)({
                        city: locationResult.city,
                        country: locationResult.country
                    });
                    if (!('error' in mileageResult) && mileageResult.averageMileage) {
                        setCityAverageMileage(mileageResult.averageMileage);
                    }
                }
                setIsFetchingSuggestion(false);
            };
            navigator.geolocation.getCurrentPosition(getSuggestion, ()=>setIsFetchingSuggestion(false), {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 1000 * 60 * 60
            });
        }
    }, [
        open,
        permissionStatus,
        cityAverageMileage,
        toast
    ]);
    const suggestedCurrentMileage = (0,react.useMemo)(()=>{
        if (!cityAverageMileage || !registrationDate) return null;
        try {
            const regDate = new Date(registrationDate);
            const today = new Date();
            const daysSinceRegistration = (today.getTime() - regDate.getTime()) / (1000 * 3600 * 24);
            if (daysSinceRegistration < 0) return null;
            const dailyAverage = cityAverageMileage / 365;
            const estimatedMileage = Math.round(dailyAverage * daysSinceRegistration);
            return estimatedMileage > 0 ? estimatedMileage : null;
        } catch (e) {
            return null;
        }
    }, [
        cityAverageMileage,
        registrationDate
    ]);
    const selectedTypeId = form.watch('vehicleTypeId');
    const selectedVehicleType = vehicleTypes.find((vt)=>vt.id === selectedTypeId);
    const handleClose = ()=>{
        onOpenChange(false);
        setTimeout(()=>{
            setNewVehicleId(null);
            setIsSubmitting(false);
        }, 300);
    };
    const onSubmit = async (values)=>{
        if (!user || !firestore || !selectedVehicleType) return;
        setIsSubmitting(true);
        const nameParts = values.name.split(' ');
        const make = nameParts[0] || '';
        const model = nameParts.slice(1).join(' ').replace(/\(.*?\)/g, '').trim() || '';
        try {
            var _values_currentMileage, _ref;
            const mileage = (_ref = (_values_currentMileage = values.currentMileage) !== null && _values_currentMileage !== void 0 ? _values_currentMileage : suggestedCurrentMileage) !== null && _ref !== void 0 ? _ref : selectedVehicleType.averageAnnualMileage;
            const newVehicleData = {
                ...values,
                userId: user.uid,
                make,
                model,
                type: selectedVehicleType.name,
                currentMileage: mileage,
                lastMaintenanceDate: new Date().toISOString().split('T')[0],
                createdAt: new Date().toISOString(),
                dataoraelimina: null
            };
            const newVehicleRef = await (0,index_esm/* addDoc */.gS)((0,index_esm/* collection */.rJ)(firestore, "users/".concat(user.uid, "/vehicles")), newVehicleData);
            await (0,index_esm/* updateDoc */.mZ)(newVehicleRef, {
                id: newVehicleRef.id
            });
            const firstBatch = (0,index_esm/* writeBatch */.wP)(firestore);
            const checksCollectionRef = (0,index_esm/* collection */.rJ)(firestore, "vehicleTypes/".concat(values.vehicleTypeId, "/maintenanceChecks"));
            const checksQuery = (0,index_esm/* query */.P)(checksCollectionRef, (0,index_esm/* where */._M)('dataoraelimina', '==', null));
            const checksSnap = await (0,index_esm/* getDocs */.GG)(checksQuery);
            const genericChecks = checksSnap.docs.map((d)=>d.data());
            for (const check of genericChecks){
                const newInterventionRef = (0,index_esm/* doc */.H9)((0,index_esm/* collection */.rJ)(newVehicleRef, 'maintenanceInterventions'));
                firstBatch.set(newInterventionRef, {
                    id: newInterventionRef.id,
                    vehicleId: newVehicleRef.id,
                    description: check.description,
                    status: 'Richiesto',
                    urgency: 'Media',
                    notes: "Intervento generato automaticamente.",
                    scheduledDate: new Date().toISOString(),
                    dataoraelimina: null
                });
            }
            await firstBatch.commit();
            toast({
                title: 'Veicolo creato!',
                description: 'Ricerca interventi specifici in corso...'
            });
            const aiChecksResult = await fetchMaintenancePlan({
                make,
                model
            });
            if (!('error' in aiChecksResult) && aiChecksResult.length > 0) {
                const aiBatch = (0,index_esm/* writeBatch */.wP)(firestore);
                const existingDescriptions = new Set(genericChecks.map((c)=>c.description.toLowerCase()));
                for (const check of aiChecksResult){
                    if (existingDescriptions.has(check.description.toLowerCase())) continue;
                    const newInterventionRef = (0,index_esm/* doc */.H9)((0,index_esm/* collection */.rJ)(newVehicleRef, 'maintenanceInterventions'));
                    aiBatch.set(newInterventionRef, {
                        id: newInterventionRef.id,
                        vehicleId: newVehicleRef.id,
                        description: check.description,
                        status: 'Pianificato',
                        urgency: 'Media',
                        notes: "Suggerito dall'AI per ".concat(make, " ").concat(model, "."),
                        dataoraelimina: null
                    });
                }
                await aiBatch.commit();
                toast({
                    title: 'Suggerimenti AI aggiunti!'
                });
            } else if ('error' in aiChecksResult && aiChecksResult.error.includes('IA generativa non è attiva')) {
                toast({
                    variant: 'destructive',
                    title: 'AI Non Disponibile',
                    description: "Abilita l'API nel cloud per ricevere suggerimenti specifici per il modello."
                });
            }
            setNewVehicleId(newVehicleRef.id);
        } catch (serverError) {
            const permissionError = new firebase/* FirestorePermissionError */.$9({
                path: "users/".concat(user.uid, "/vehicles"),
                operation: 'create',
                requestResourceData: {
                    vehicleData: values
                }
            });
            firebase/* errorEmitter */.de.emit('permission-error', permissionError);
        } finally{
            setIsSubmitting(false);
        }
    };
    const { years, months, days } = (0,react.useMemo)(()=>{
        const currentYear = new Date().getFullYear();
        const years = Array.from({
            length: 80
        }, (_, i)=>currentYear - i);
        const months = Array.from({
            length: 12
        }, (_, i)=>({
                value: i + 1,
                label: new Date(0, i).toLocaleString('it-IT', {
                    month: 'long'
                })
            }));
        const days = Array.from({
            length: 31
        }, (_, i)=>i + 1);
        return {
            years,
            months,
            days
        };
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(dialog/* Dialog */.lG, {
        open: open,
        onOpenChange: (isOpen)=>!isOpen ? handleClose() : onOpenChange(true),
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(dialog/* DialogContent */.Cf, {
            className: "sm:max-w-md",
            children: newVehicleId ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(dialog/* DialogHeader */.c7, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(dialog/* DialogTitle */.L3, {
                                children: "Veicolo Aggiunto!"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(dialog/* DialogDescription */.rr, {
                                children: "Abbiamo generato gli interventi di base. Aggiorna le date reali per una precisione maggiore."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(dialog/* DialogFooter */.Es, {
                        className: "sm:justify-start gap-2 pt-4",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
                                onClick: ()=>{
                                    router.push("/dashboard/vehicles/view?id=".concat(newVehicleId));
                                    handleClose();
                                },
                                children: "Vai al Veicolo"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
                                variant: "outline",
                                onClick: handleClose,
                                children: "Chiudi"
                            })
                        ]
                    })
                ]
            }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(dialog/* DialogHeader */.c7, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(dialog/* DialogTitle */.L3, {
                                children: "Aggiungi Nuovo Veicolo"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(dialog/* DialogDescription */.rr, {
                                children: "Inserisci i dettagli del veicolo per generare il piano di manutenzione."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* Form */.lV, {
                        ...form,
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                            onSubmit: form.handleSubmit(onSubmit),
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormField */.zB, {
                                    control: form.control,
                                    name: "name",
                                    render: (param)=>{
                                        let { field } = param;
                                        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_form/* FormItem */.eI, {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormLabel */.lR, {
                                                    children: "Marca e modello"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormControl */.MJ, {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(input/* Input */.p, {
                                                        placeholder: "Es. Fiat Panda",
                                                        ...field
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormMessage */.C5, {})
                                            ]
                                        });
                                    }
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormField */.zB, {
                                    control: form.control,
                                    name: "licensePlate",
                                    render: (param)=>{
                                        let { field } = param;
                                        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_form/* FormItem */.eI, {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormLabel */.lR, {
                                                    children: "Targa"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormControl */.MJ, {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(input/* Input */.p, {
                                                        placeholder: "ES. AB123CD",
                                                        ...field,
                                                        onChange: (e)=>field.onChange(e.target.value.toUpperCase())
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormMessage */.C5, {})
                                            ]
                                        });
                                    }
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormField */.zB, {
                                    control: form.control,
                                    name: "isTaxi",
                                    render: (param)=>{
                                        let { field } = param;
                                        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_form/* FormItem */.eI, {
                                            className: "flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormControl */.MJ, {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_checkbox/* Checkbox */.S, {
                                                        checked: field.value,
                                                        onCheckedChange: field.onChange
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                                    className: "space-y-1 leading-none",
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormLabel */.lR, {
                                                        children: "\xc8 un taxi?"
                                                    })
                                                })
                                            ]
                                        });
                                    }
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormField */.zB, {
                                    control: form.control,
                                    name: "registrationDate",
                                    render: ()=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_form/* FormItem */.eI, {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormLabel */.lR, {
                                                    children: "Data di immatricolazione"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                    className: "grid grid-cols-3 gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_select/* Select */.l6, {
                                                            onValueChange: setDay,
                                                            value: day,
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectTrigger */.bq, {
                                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectValue */.yv, {
                                                                        placeholder: "GG"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectContent */.gC, {
                                                                    children: days.map((d)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectItem */.eb, {
                                                                            value: String(d),
                                                                            children: d
                                                                        }, d))
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_select/* Select */.l6, {
                                                            onValueChange: setMonth,
                                                            value: month,
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectTrigger */.bq, {
                                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectValue */.yv, {
                                                                        placeholder: "MM"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectContent */.gC, {
                                                                    children: months.map((m)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectItem */.eb, {
                                                                            value: String(m.value),
                                                                            children: m.label
                                                                        }, m.value))
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_select/* Select */.l6, {
                                                            onValueChange: setYear,
                                                            value: year,
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectTrigger */.bq, {
                                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectValue */.yv, {
                                                                        placeholder: "AAAA"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectContent */.gC, {
                                                                    children: years.map((y)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectItem */.eb, {
                                                                            value: String(y),
                                                                            children: y
                                                                        }, y))
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormMessage */.C5, {})
                                            ]
                                        })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormField */.zB, {
                                    control: form.control,
                                    name: "vehicleTypeId",
                                    render: (param)=>{
                                        let { field } = param;
                                        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_form/* FormItem */.eI, {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormLabel */.lR, {
                                                    children: "Tipo di veicolo"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_select/* Select */.l6, {
                                                    onValueChange: field.onChange,
                                                    defaultValue: field.value,
                                                    disabled: loadingTypes,
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormControl */.MJ, {
                                                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectTrigger */.bq, {
                                                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectValue */.yv, {
                                                                    placeholder: loadingTypes ? "Caricamento..." : "Seleziona tipo"
                                                                })
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectContent */.gC, {
                                                            children: vehicleTypes.map((vt)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectItem */.eb, {
                                                                    value: vt.id,
                                                                    children: vt.name
                                                                }, vt.id))
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormMessage */.C5, {})
                                            ]
                                        });
                                    }
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormField */.zB, {
                                    control: form.control,
                                    name: "currentMileage",
                                    render: (param)=>{
                                        let { field } = param;
                                        var _field_value;
                                        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_form/* FormItem */.eI, {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormLabel */.lR, {
                                                    children: "Chilometraggio attuale"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormControl */.MJ, {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(input/* Input */.p, {
                                                        type: "number",
                                                        placeholder: isFetchingSuggestion ? "Calcolando..." : suggestedCurrentMileage ? String(suggestedCurrentMileage) : "Es. 45000",
                                                        ...field,
                                                        value: (_field_value = field.value) !== null && _field_value !== void 0 ? _field_value : ''
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormDescription */.Rr, {
                                                    children: isFetchingSuggestion ? 'Ricerca chilometraggio medio zona...' : suggestedCurrentMileage ? "Stima basata sulla zona: ".concat(suggestedCurrentMileage.toLocaleString('it-IT'), " km.") : 'Inserisci i km per maggiore precisione.'
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormMessage */.C5, {})
                                            ]
                                        });
                                    }
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(dialog/* DialogFooter */.Es, {
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
                                            type: "button",
                                            variant: "outline",
                                            onClick: handleClose,
                                            disabled: isSubmitting,
                                            children: "Annulla"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
                                            type: "submit",
                                            disabled: isSubmitting || loadingTypes,
                                            children: [
                                                isSubmitting && /*#__PURE__*/ (0,jsx_runtime.jsx)(loader_circle/* default */.A, {
                                                    className: "mr-2 h-4 w-4 animate-spin"
                                                }),
                                                "Aggiungi Veicolo"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            })
        })
    });
}

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle-plus.js
var circle_plus = __webpack_require__(22452);
;// ./src/app/dashboard/vehicles/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 









function VehiclesPage() {
    const { user } = (0,use_user/* useUser */.J)();
    const { firestore } = (0,firebase/* useFirebase */.D3)();
    const [isAddVehicleFormOpen, setAddVehicleFormOpen] = (0,react.useState)(false);
    const vehiclesQuery = (0,react.useMemo)(()=>{
        if (!user || !firestore) return null;
        return (0,index_esm/* query */.P)((0,index_esm/* collection */.rJ)(firestore, "users/".concat(user.uid, "/vehicles")), (0,index_esm/* where */._M)('dataoraelimina', '==', null));
    }, [
        user,
        firestore
    ]);
    const { data: vehicles, isLoading } = (0,firebase/* useCollection */.Ge)(vehiclesQuery);
    if (isLoading) {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "flex h-full items-center justify-center p-8",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(loader_circle/* default */.A, {
                    className: "h-8 w-8 animate-spin"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                    className: "ml-2",
                    children: "Caricamento dati..."
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                                        className: "font-headline text-3xl font-bold",
                                        children: "I Miei Veicoli"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                        className: "text-muted-foreground",
                                        children: "Gestisci tutti i tuoi veicoli in un unico posto."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
                                onClick: ()=>setAddVehicleFormOpen(true),
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)(circle_plus/* default */.A, {
                                        className: "mr-2 h-4 w-4"
                                    }),
                                    "Aggiungi Veicolo"
                                ]
                            })
                        ]
                    }),
                    vehicles && vehicles.length > 0 ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
                        children: vehicles.map((vehicle)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(VehicleCard, {
                                vehicle: vehicle
                            }, vehicle.id))
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                        className: "flex h-64 flex-col items-center justify-center text-center",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardHeader */.aR, {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardTitle */.ZB, {
                                        children: "Nessun veicolo trovato"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardDescription */.BT, {
                                        children: "Non hai ancora aggiunto nessun veicolo. Inizia ora!"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardContent */.Wu, {
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_button/* Button */.$, {
                                    onClick: ()=>setAddVehicleFormOpen(true),
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(circle_plus/* default */.A, {
                                            className: "mr-2 h-4 w-4"
                                        }),
                                        "Aggiungi il tuo primo veicolo"
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(AddVehicleForm, {
                open: isAddVehicleFormOpen,
                onOpenChange: setAddVehicleFormOpen
            })
        ]
    });
}


/***/ }),

/***/ 30058:
/***/ ((module) => {

"use strict";
module.exports = node:net;

/***/ }),

/***/ 30538:
/***/ ((module) => {

"use strict";
if(typeof node:stream/web === 'undefined') { var e = new Error("Cannot find module 'node:stream/web'"); e.code = 'MODULE_NOT_FOUND'; throw e; }

module.exports = node:stream/web;

/***/ }),

/***/ 35428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ fetchAverageMileage)
/* harmony export */ });
/* harmony import */ var _ai_genkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(849);
/* harmony import */ var genkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95101);
/* harmony import */ var genkit__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(genkit__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @fileOverview An AI-powered flow to fetch the average annual vehicle mileage for a city.
 *
 * - fetchAverageMileage - A function that returns the average mileage.
 * - FetchAverageMileageInput - The input type for the fetchAverageMileage function.
 * - FetchAverageMileageOutput - The return type for the fetchAverageMileage function.
 */ 

const FetchAverageMileageInputSchema = genkit__WEBPACK_IMPORTED_MODULE_1__.z.object({
    city: genkit__WEBPACK_IMPORTED_MODULE_1__.z.string().describe('The city name.'),
    country: genkit__WEBPACK_IMPORTED_MODULE_1__.z.string().describe('The country name.')
});
const FetchAverageMileageOutputSchema = genkit__WEBPACK_IMPORTED_MODULE_1__.z.object({
    averageMileage: genkit__WEBPACK_IMPORTED_MODULE_1__.z.number().describe('The average annual mileage in kilometers.')
});
async function fetchAverageMileage(input) {
    try {
        return await fetchAverageMileageFlow(input);
    } catch (e) {
        var _e_message;
        console.error("Genkit flow 'fetchAverageMileage' failed: ".concat(e.message));
        if ((_e_message = e.message) === null || _e_message === void 0 ? void 0 : _e_message.includes('Generative Language API has not been used')) {
            return {
                error: "L'API per l'IA generativa non è attiva. Abilitala nella console Google Cloud."
            };
        }
        return {
            error: "Impossibile recuperare il chilometraggio medio."
        };
    }
}
const prompt = _ai_genkit__WEBPACK_IMPORTED_MODULE_0__.ai.definePrompt({
    name: 'fetchAverageMileagePrompt',
    input: {
        schema: FetchAverageMileageInputSchema
    },
    output: {
        schema: FetchAverageMileageOutputSchema
    },
    prompt: 'Qual \xe8 la stima del chilometraggio medio annuo per un\'auto a {{city}}, {{country}}?\n  Fornisci la risposta in chilometri.\n  Rispondi SOLO con un oggetto JSON con la chiave "averageMileage".\n  Non includere altro testo, spiegazioni o formattazione markdown.\n  Esempio:\n  {\n    "averageMileage": 11500\n  }\n  '
});
const fetchAverageMileageFlow = _ai_genkit__WEBPACK_IMPORTED_MODULE_0__.ai.defineFlow({
    name: 'fetchAverageMileageFlow',
    inputSchema: FetchAverageMileageInputSchema,
    outputSchema: FetchAverageMileageOutputSchema
}, async (input)=>{
    const { output } = await prompt(input);
    return output;
});


/***/ }),

/***/ 36618:
/***/ ((module) => {

"use strict";
module.exports = @genkit-ai/core;

/***/ }),

/***/ 38162:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C1: () => (/* binding */ CheckboxIndicator),
/* harmony export */   bL: () => (/* binding */ Checkbox)
/* harmony export */ });
/* unused harmony exports Checkbox, CheckboxIndicator, createCheckboxScope, unstable_BubbleInput, unstable_CheckboxBubbleInput, unstable_CheckboxProvider, unstable_CheckboxTrigger, unstable_Provider, unstable_Trigger */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(94446);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3468);
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92556);
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23558);
/* harmony import */ var _radix_ui_react_use_previous__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(78108);
/* harmony import */ var _radix_ui_react_use_size__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(84288);
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(76842);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88142);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Checkbox,CheckboxIndicator,Indicator,Root,createCheckboxScope,unstable_BubbleInput,unstable_CheckboxBubbleInput,unstable_CheckboxProvider,unstable_CheckboxTrigger,unstable_Provider,unstable_Trigger auto */ // src/checkbox.tsx










var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__/* .createContextScope */ .A)(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
    const { __scopeCheckbox, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", // @ts-expect-error
    internal_do_not_use_render } = props;
    const [checked, setChecked] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_3__/* .useControllableState */ .i)({
        prop: checkedProp,
        defaultProp: defaultChecked !== null && defaultChecked !== void 0 ? defaultChecked : false,
        onChange: onCheckedChange,
        caller: CHECKBOX_NAME
    });
    const [control, setControl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [bubbleInput, setBubbleInput] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const hasConsumerStoppedPropagationRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const isFormControl = control ? !!form || !!control.closest("form") : // We set this to true by default so that events bubble to forms without JS (SSR)
    true;
    const context = {
        checked,
        disabled,
        setChecked,
        control,
        setControl,
        name,
        form,
        value,
        hasConsumerStoppedPropagationRef,
        required,
        defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
        isFormControl,
        bubbleInput,
        setBubbleInput
    };
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CheckboxProviderImpl, {
        scope: __scopeCheckbox,
        ...context,
        children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    });
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((param, forwardedRef)=>{
    let { __scopeCheckbox, onKeyDown, onClick, ...checkboxProps } = param;
    const { control, value, disabled, checked, required, setControl, setChecked, hasConsumerStoppedPropagationRef, isFormControl, bubbleInput } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, setControl);
    const initialCheckedStateRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(checked);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const form = control === null || control === void 0 ? void 0 : control.form;
        if (form) {
            const reset = ()=>setChecked(initialCheckedStateRef.current);
            form.addEventListener("reset", reset);
            return ()=>form.removeEventListener("reset", reset);
        }
    }, [
        control,
        setChecked
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.button, {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_6__/* .composeEventHandlers */ .mK)(onKeyDown, (event)=>{
            if (event.key === "Enter") event.preventDefault();
        }),
        onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_6__/* .composeEventHandlers */ .mK)(onClick, (event)=>{
            setChecked((prevChecked)=>isIndeterminate(prevChecked) ? true : !prevChecked);
            if (bubbleInput && isFormControl) {
                hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
                if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
        })
    });
});
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeCheckbox, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...checkboxProps } = props;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CheckboxProvider, {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: (param)=>{
            let { isFormControl } = param;
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                children: [
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CheckboxTrigger, {
                        ...checkboxProps,
                        ref: forwardedRef,
                        __scopeCheckbox
                    }),
                    isFormControl && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CheckboxBubbleInput, {
                        __scopeCheckbox
                    })
                ]
            });
        }
    });
});
Checkbox.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_7__/* .Presence */ .C, {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.span, {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: {
                pointerEvents: "none",
                ...props.style
            }
        })
    });
});
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((param, forwardedRef)=>{
    let { __scopeCheckbox, ...props } = param;
    const { control, hasConsumerStoppedPropagationRef, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, setBubbleInput);
    const prevChecked = (0,_radix_ui_react_use_previous__WEBPACK_IMPORTED_MODULE_8__/* .usePrevious */ .Z)(checked);
    const controlSize = (0,_radix_ui_react_use_size__WEBPACK_IMPORTED_MODULE_9__/* .useSize */ .X)(control);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const input = bubbleInput;
        if (!input) return;
        const inputProto = window.HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
        const setChecked = descriptor.set;
        const bubbles = !hasConsumerStoppedPropagationRef.current;
        if (prevChecked !== checked && setChecked) {
            const event = new Event("click", {
                bubbles
            });
            input.indeterminate = isIndeterminate(checked);
            setChecked.call(input, isIndeterminate(checked) ? false : checked);
            input.dispatchEvent(event);
        }
    }, [
        bubbleInput,
        prevChecked,
        checked,
        hasConsumerStoppedPropagationRef
    ]);
    const defaultCheckedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.input, {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked !== null && defaultChecked !== void 0 ? defaultChecked : defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
            ...props.style,
            ...controlSize,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0,
            // We transform because the input is absolutely positioned but we have
            // rendered it **after** the button. This pulls it back to sit on top
            // of the button.
            transform: "translateX(-100%)"
        }
    });
});
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
    return typeof value === "function";
}
function isIndeterminate(checked) {
    return checked === "indeterminate";
}
function getState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 38676:
/***/ ((module) => {

"use strict";
module.exports = node:path;

/***/ }),

/***/ 42738:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 29561));


/***/ }),

/***/ 48854:
/***/ ((module) => {

"use strict";
module.exports = node:zlib;

/***/ }),

/***/ 50984:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleCheck)
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
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m9 12 2 2 4-4",
            key: "dzmm74"
        }
    ]
];
const CircleCheck = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("CircleCheck", __iconNode);
 //# sourceMappingURL=circle-check.js.map


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

/***/ 52154:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 59452:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 60183:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 62912:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ reverseGeocode)
/* harmony export */ });
/* harmony import */ var _ai_genkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(849);
/* harmony import */ var genkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95101);
/* harmony import */ var genkit__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(genkit__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @fileOverview An AI-powered flow to get city and country from geographic coordinates.
 *
 * - reverseGeocode - A function that returns the city and country.
 * - ReverseGeocodeInput - The input type for the reverseGeocode function.
 * - ReverseGeocodeOutput - The return type for the reverseGeocode function.
 */ 

const ReverseGeocodeInputSchema = genkit__WEBPACK_IMPORTED_MODULE_1__.z.object({
    latitude: genkit__WEBPACK_IMPORTED_MODULE_1__.z.number().describe('The latitude.'),
    longitude: genkit__WEBPACK_IMPORTED_MODULE_1__.z.number().describe('The longitude.')
});
const ReverseGeocodeOutputSchema = genkit__WEBPACK_IMPORTED_MODULE_1__.z.object({
    city: genkit__WEBPACK_IMPORTED_MODULE_1__.z.string().describe('The city name.'),
    country: genkit__WEBPACK_IMPORTED_MODULE_1__.z.string().describe('The country name.')
});
async function reverseGeocode(input) {
    try {
        return await reverseGeocodeFlow(input);
    } catch (e) {
        var _e_message;
        console.error("Genkit flow 'reverseGeocode' failed: ".concat(e.message));
        if ((_e_message = e.message) === null || _e_message === void 0 ? void 0 : _e_message.includes('Generative Language API has not been used')) {
            return {
                error: "L'API per l'IA generativa non è attiva. Abilitala nella console Google Cloud per questo progetto (705618426785)."
            };
        }
        return {
            error: "Si è verificato un errore durante la geocodifica."
        };
    }
}
const prompt = _ai_genkit__WEBPACK_IMPORTED_MODULE_0__.ai.definePrompt({
    name: 'reverseGeocodePrompt',
    input: {
        schema: ReverseGeocodeInputSchema
    },
    output: {
        schema: ReverseGeocodeOutputSchema
    },
    prompt: 'What is the city and country for the coordinates latitude: {{latitude}}, longitude: {{longitude}}?\n  Provide the response in Italian.\n  Respond ONLY with a JSON object with the keys "city" and "country".\n  Do not include any other text, explanation, or markdown formatting.\n  Example:\n  {\n    "city": "Roma",\n    "country": "Italia"\n  }\n  '
});
const reverseGeocodeFlow = _ai_genkit__WEBPACK_IMPORTED_MODULE_0__.ai.defineFlow({
    name: 'reverseGeocodeFlow',
    inputSchema: ReverseGeocodeInputSchema,
    outputSchema: ReverseGeocodeOutputSchema
}, async (input)=>{
    const { output } = await prompt(input);
    return output;
});


/***/ }),

/***/ 70575:
/***/ ((module) => {

"use strict";
module.exports = node:perf_hooks;

/***/ }),

/***/ 70812:
/***/ ((module) => {

"use strict";
module.exports = node:fs;

/***/ }),

/***/ 72351:
/***/ ((module) => {

"use strict";
module.exports = node:stream;

/***/ }),

/***/ 73457:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ Checkbox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38162);
/* harmony import */ var _barrel_optimize_names_Check_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72251);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64269);
/* __next_internal_client_entry_do_not_use__ Checkbox auto */ 




const Checkbox = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__/* .Indicator */ .C1, {
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex items-center justify-center text-current"),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                className: "h-4 w-4"
            })
        })
    });
});
Checkbox.displayName = _radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL.displayName;



/***/ }),

/***/ 77088:
/***/ ((module) => {

"use strict";
module.exports = node:https;

/***/ }),

/***/ 78604:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 80387:
/***/ ((module) => {

"use strict";
module.exports = node:util;

/***/ }),

/***/ 85763:
/***/ ((module) => {

"use strict";
module.exports = @opentelemetry/api;

/***/ }),

/***/ 86431:
/***/ ((module) => {

"use strict";
module.exports = node:http;

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

/***/ 87638:
/***/ ((module) => {

"use strict";
module.exports = node:events;

/***/ }),

/***/ 89112:
/***/ ((module) => {

"use strict";
module.exports = node:process;

/***/ }),

/***/ 94553:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 95101:
/***/ ((module) => {

"use strict";
module.exports = genkit;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [7811,2992,9268,5948,3135,5402,197,315,446,3409,2777,5883,8470,9427,8441,1255,7358], () => (__webpack_exec__(42738)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);