(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[1766],{

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

/***/ 13150:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 13630:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Trash2)
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
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
            key: "4alrt4"
        }
    ],
    [
        "path",
        {
            d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
            key: "v07s0e"
        }
    ],
    [
        "line",
        {
            x1: "10",
            x2: "10",
            y1: "11",
            y2: "17",
            key: "1uufr5"
        }
    ],
    [
        "line",
        {
            x1: "14",
            x2: "14",
            y1: "11",
            y2: "17",
            key: "xtxkd"
        }
    ]
];
const Trash2 = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Trash2", __iconNode);
 //# sourceMappingURL=trash-2.js.map


/***/ }),

/***/ 15617:
/***/ ((module) => {

"use strict";
module.exports = node:buffer;

/***/ }),

/***/ 16193:
/***/ (() => {

/* (ignored) */

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

/***/ 29429:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 71509));


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

/***/ 36618:
/***/ ((module) => {

"use strict";
module.exports = @genkit-ai/core;

/***/ }),

/***/ 38676:
/***/ ((module) => {

"use strict";
module.exports = node:path;

/***/ }),

/***/ 48854:
/***/ ((module) => {

"use strict";
module.exports = node:zlib;

/***/ }),

/***/ 52154:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 52498:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  rc: () => (/* binding */ Action),
  ZD: () => (/* binding */ Cancel),
  UC: () => (/* binding */ Content2),
  VY: () => (/* binding */ Description2),
  hJ: () => (/* binding */ Overlay2),
  ZL: () => (/* binding */ Portal2),
  bL: () => (/* binding */ Root2),
  hE: () => (/* binding */ Title2),
  l9: () => (/* binding */ Trigger2)
});

// UNUSED EXPORTS: AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, createAlertDialogScope

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-context/dist/index.mjs
var dist = __webpack_require__(3468);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var react_compose_refs_dist = __webpack_require__(94446);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-dialog/dist/index.mjs + 1 modules
var react_dialog_dist = __webpack_require__(93409);
// EXTERNAL MODULE: ./node_modules/@radix-ui/primitive/dist/index.mjs
var primitive_dist = __webpack_require__(92556);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
;// ./node_modules/@radix-ui/react-alert-dialog/node_modules/@radix-ui/react-slot/dist/index.mjs
// src/slot.tsx



// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = React.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React.Children.count(newElement) > 1) return React.Children.only(null);
          return React.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: React.isValidElement(newElement) ? React.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ (/* unused pure expression or super */ null && (createSlot("Slot")));
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = React.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== React.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React.cloneElement(children, props2);
    }
    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
  const Slottable2 = ({ children }) => {
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, { children });
  };
  Slottable2.displayName = `${ownerName}.Slottable`;
  Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
  return Slottable2;
}
var Slottable = /* @__PURE__ */ (/* unused pure expression or super */ null && (createSlottable("Slottable")));
function isSlottable(child) {
  return React.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
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

;// ./node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
/* __next_internal_client_entry_do_not_use__ Action,AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogOverlay,AlertDialogPortal,AlertDialogTitle,AlertDialogTrigger,Cancel,Content,Description,Overlay,Portal,Root,Title,Trigger,createAlertDialogScope auto */ // src/alert-dialog.tsx








var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = (0,dist/* createContextScope */.A)(ROOT_NAME, [
    react_dialog_dist/* createDialogScope */.Hs
]);
var useDialogScope = (0,react_dialog_dist/* createDialogScope */.Hs)();
var AlertDialog = (props)=>{
    const { __scopeAlertDialog, ...alertDialogProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dialog_dist/* Root */.bL, {
        ...dialogScope,
        ...alertDialogProps,
        modal: true
    });
};
AlertDialog.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dialog_dist/* Trigger */.l9, {
        ...dialogScope,
        ...triggerProps,
        ref: forwardedRef
    });
});
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal = (props)=>{
    const { __scopeAlertDialog, ...portalProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dialog_dist/* Portal */.ZL, {
        ...dialogScope,
        ...portalProps
    });
};
AlertDialogPortal.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dialog_dist/* Overlay */.hJ, {
        ...dialogScope,
        ...overlayProps,
        ref: forwardedRef
    });
});
AlertDialogOverlay.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var dist_Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = react.useRef(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, contentRef);
    const cancelRef = react.useRef(null);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dialog_dist/* WarningProvider */.G$, {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(AlertDialogContentProvider, {
            scope: __scopeAlertDialog,
            cancelRef,
            children: /* @__PURE__ */ (0,jsx_runtime.jsxs)(react_dialog_dist/* Content */.UC, {
                role: "alertdialog",
                ...dialogScope,
                ...contentProps,
                ref: composedRefs,
                onOpenAutoFocus: (0,primitive_dist/* composeEventHandlers */.mK)(contentProps.onOpenAutoFocus, (event)=>{
                    var _cancelRef_current;
                    event.preventDefault();
                    (_cancelRef_current = cancelRef.current) === null || _cancelRef_current === void 0 ? void 0 : _cancelRef_current.focus({
                        preventScroll: true
                    });
                }),
                onPointerDownOutside: (event)=>event.preventDefault(),
                onInteractOutside: (event)=>event.preventDefault(),
                children: [
                    /* @__PURE__ */ (0,jsx_runtime.jsx)(dist_Slottable, {
                        children
                    }),
                    /* @__PURE__ */ (0,jsx_runtime.jsx)(DescriptionWarning, {
                        contentRef
                    })
                ]
            })
        })
    });
});
AlertDialogContent.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dialog_dist/* Title */.hE, {
        ...dialogScope,
        ...titleProps,
        ref: forwardedRef
    });
});
AlertDialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeAlertDialog, ...descriptionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dialog_dist/* Description */.VY, {
        ...dialogScope,
        ...descriptionProps,
        ref: forwardedRef
    });
});
AlertDialogDescription.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dialog_dist/* Close */.bm, {
        ...dialogScope,
        ...actionProps,
        ref: forwardedRef
    });
});
AlertDialogAction.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, cancelRef);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dialog_dist/* Close */.bm, {
        ...dialogScope,
        ...cancelProps,
        ref
    });
});
AlertDialogCancel.displayName = CANCEL_NAME;
var DescriptionWarning = (param)=>{
    let { contentRef } = param;
    const MESSAGE = "`".concat(CONTENT_NAME, "` requires a description for the component to be accessible for screen reader users.\n\nYou can add a description to the `").concat(CONTENT_NAME, "` by passing a `").concat(DESCRIPTION_NAME, "` component as a child, which also benefits sighted users by adding visible context to the dialog.\n\nAlternatively, you can use your own component as a description by assigning it an `id` and passing the same value to the `aria-describedby` prop in `").concat(CONTENT_NAME, "`. If the description is confusing or duplicative for sighted users, you can use the `@radix-ui/react-visually-hidden` primitive as a wrapper around your description component.\n\nFor more information, see https://radix-ui.com/primitives/docs/components/alert-dialog");
    react.useEffect(()=>{
        var _contentRef_current;
        const hasDescription = document.getElementById((_contentRef_current = contentRef.current) === null || _contentRef_current === void 0 ? void 0 : _contentRef_current.getAttribute("aria-describedby"));
        if (!hasDescription) console.warn(MESSAGE);
    }, [
        MESSAGE,
        contentRef
    ]);
    return null;
};
var Root2 = AlertDialog;
var Trigger2 = AlertDialogTrigger;
var Portal2 = AlertDialogPortal;
var Overlay2 = AlertDialogOverlay;
var Content2 = AlertDialogContent;
var Action = AlertDialogAction;
var Cancel = AlertDialogCancel;
var Title2 = AlertDialogTitle;
var Description2 = AlertDialogDescription;
 //# sourceMappingURL=index.mjs.map


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

/***/ 71509:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VehicleTypeDetailPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20063);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52619);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19708);
/* harmony import */ var _firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12298);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7227);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(54879);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(22544);
/* harmony import */ var _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(66942);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3998);
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(86948);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(92033);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(36204);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(74640);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(13630);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(22452);
/* harmony import */ var _components_ui_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(41052);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(65142);
/* harmony import */ var _hooks_use_toast__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(15894);
/* harmony import */ var _components_ui_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(87270);
/* harmony import */ var _components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(98053);
/* harmony import */ var _contexts_tracking_context__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(92920);
/* harmony import */ var _ai_flows_reverse_geocode__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(62912);
/* harmony import */ var _ai_flows_fetch_average_mileage__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(35428);
/* __next_internal_client_entry_do_not_use__ default auto */ 




















const vehicleTypeSchema = zod__WEBPACK_IMPORTED_MODULE_17__/* .object */ .Ik({
    name: zod__WEBPACK_IMPORTED_MODULE_17__/* .string */ .Yj().min(2, 'Il nome è obbligatorio.'),
    averageAnnualMileage: zod__WEBPACK_IMPORTED_MODULE_17__/* .coerce */ .au.number().min(1, 'Il chilometraggio deve essere positivo.')
});
function VehicleTypeDetailContent() {
    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();
    const vehicleTypeId = searchParams.get('id');
    const { user, loading: userLoading } = (0,_firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_5__/* .useUser */ .J)();
    const { firestore } = (0,_firebase__WEBPACK_IMPORTED_MODULE_6__/* .useFirebase */ .D3)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { toast } = (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_11__/* .useToast */ .dj)();
    const [isSubmitting, setIsSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [checkToDelete, setCheckToDelete] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const isNew = vehicleTypeId === 'new';
    const vtRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (isNew || !firestore || !vehicleTypeId) return null;
        return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .doc */ .H9)(firestore, 'vehicleTypes', vehicleTypeId);
    }, [
        firestore,
        vehicleTypeId,
        isNew
    ]);
    const { data: vehicleType, isLoading: vtLoading } = (0,_firebase__WEBPACK_IMPORTED_MODULE_6__/* .useDoc */ .uN)(vtRef);
    const checksQuery = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (isNew || !firestore || !vehicleTypeId) return null;
        return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .query */ .P)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .collection */ .rJ)(firestore, "vehicleTypes/".concat(vehicleTypeId, "/maintenanceChecks")), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .where */ ._M)('dataoraelimina', '==', null));
    }, [
        firestore,
        vehicleTypeId,
        isNew
    ]);
    const { data: maintenanceChecks, isLoading: checksLoading } = (0,_firebase__WEBPACK_IMPORTED_MODULE_6__/* .useCollection */ .Ge)(checksQuery);
    const { permissionStatus } = (0,_contexts_tracking_context__WEBPACK_IMPORTED_MODULE_14__/* .useTracking */ .z)();
    const [isFetchingSuggestion, setIsFetchingSuggestion] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_18__/* .useForm */ .mN)({
        resolver: (0,_hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_19__/* .zodResolver */ .u)(vehicleTypeSchema),
        defaultValues: {
            name: '',
            averageAnnualMileage: 10000
        }
    });
    const { reset } = form;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (vehicleType) {
            reset({
                name: vehicleType.name || '',
                averageAnnualMileage: vehicleType.averageAnnualMileage || 10000
            });
        }
    }, [
        vehicleType,
        reset
    ]);
    // Fetch location-based mileage suggestion
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isNew && navigator.geolocation && permissionStatus === 'granted') {
            const getSuggestion = async (position)=>{
                setIsFetchingSuggestion(true);
                const { latitude, longitude } = position.coords;
                const locationResult = await (0,_ai_flows_reverse_geocode__WEBPACK_IMPORTED_MODULE_15__/* .reverseGeocode */ .R)({
                    latitude,
                    longitude
                });
                if ('error' in locationResult) {
                    if (locationResult.error.includes('Generative Language API')) {
                        toast({
                            variant: 'destructive',
                            title: 'Azione richiesta: Abilita API',
                            description: 'L\'API per l\'IA generativa non è attiva. Abilitala nella tua Google Cloud console per usare questa funzione.',
                            duration: 10000
                        });
                    } else {
                        toast({
                            variant: 'destructive',
                            title: 'Errore Assistente AI',
                            description: "Impossibile recuperare la località.",
                            duration: 8000
                        });
                    }
                    setIsFetchingSuggestion(false);
                    return;
                }
                if (locationResult.city) {
                    const mileageResult = await (0,_ai_flows_fetch_average_mileage__WEBPACK_IMPORTED_MODULE_16__/* .fetchAverageMileage */ .s)({
                        city: locationResult.city,
                        country: locationResult.country
                    });
                    if ('error' in mileageResult) {
                        console.error("Error in fetchAverageMileage:", mileageResult.error);
                    } else if (mileageResult.averageMileage) {
                        form.setValue('averageAnnualMileage', mileageResult.averageMileage, {
                            shouldValidate: true
                        });
                        toast({
                            title: 'Suggerimento',
                            description: "Chilometraggio medio annuo per la tua zona impostato a ".concat(mileageResult.averageMileage.toLocaleString('it-IT'), " km.")
                        });
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
        isNew,
        permissionStatus,
        form,
        toast
    ]);
    const handleDeleteCheck = ()=>{
        if (!checkToDelete || !firestore || !vehicleTypeId) return;
        const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .doc */ .H9)(firestore, "vehicleTypes/".concat(vehicleTypeId, "/maintenanceChecks"), checkToDelete.id);
        const dataToUpdate = {
            dataoraelimina: new Date().toISOString()
        };
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .updateDoc */ .mZ)(docRef, dataToUpdate).then(()=>{
            toast({
                title: "Controllo eliminato"
            });
        }).catch((serverError)=>{
            const permissionError = new _firebase__WEBPACK_IMPORTED_MODULE_6__/* .FirestorePermissionError */ .$9({
                path: docRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate
            });
            _firebase__WEBPACK_IMPORTED_MODULE_6__/* .errorEmitter */ .de.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: 'Errore',
                description: 'Impossibile eliminare il controllo.'
            });
        }).finally(()=>{
            setCheckToDelete(null);
        });
    };
    const onSubmit = (values)=>{
        if (!firestore || !user) return;
        setIsSubmitting(true);
        if (isNew) {
            const vtCollection = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .collection */ .rJ)(firestore, 'vehicleTypes');
            const dataToCreate = {
                ...values,
                dataoraelimina: null
            };
            (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .addDoc */ .gS)(vtCollection, dataToCreate).then((newDocRef)=>{
                (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .updateDoc */ .mZ)(newDocRef, {
                    id: newDocRef.id
                });
                toast({
                    title: 'Successo',
                    description: 'Tipo veicolo creato.'
                });
                router.push('/dashboard/admin/vehicle-types');
            }).catch((serverError)=>{
                const permissionError = new _firebase__WEBPACK_IMPORTED_MODULE_6__/* .FirestorePermissionError */ .$9({
                    path: 'vehicleTypes',
                    operation: 'create',
                    requestResourceData: dataToCreate
                });
                _firebase__WEBPACK_IMPORTED_MODULE_6__/* .errorEmitter */ .de.emit('permission-error', permissionError);
                toast({
                    variant: 'destructive',
                    title: 'Errore',
                    description: 'Impossibile salvare il tipo veicolo.'
                });
            }).finally(()=>setIsSubmitting(false));
        } else if (vehicleType) {
            if (!vtRef) return;
            const dataToUpdate = {
                ...values
            };
            (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .updateDoc */ .mZ)(vtRef, dataToUpdate).then(()=>{
                toast({
                    title: 'Successo',
                    description: 'Tipo veicolo aggiornato.'
                });
            }).catch((serverError)=>{
                const permissionError = new _firebase__WEBPACK_IMPORTED_MODULE_6__/* .FirestorePermissionError */ .$9({
                    path: vtRef.path,
                    operation: 'update',
                    requestResourceData: dataToUpdate
                });
                _firebase__WEBPACK_IMPORTED_MODULE_6__/* .errorEmitter */ .de.emit('permission-error', permissionError);
                toast({
                    variant: 'destructive',
                    title: 'Errore',
                    description: 'Impossibile salvare il tipo veicolo.'
                });
            }).finally(()=>setIsSubmitting(false));
        }
    };
    if (userLoading || vtLoading && !isNew) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex h-full items-center justify-center p-8",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                className: "h-8 w-8 animate-spin"
            })
        });
    }
    if (!isNew && !vehicleType && !vtLoading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "p-6",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                children: "Tipo veicolo non trovato."
            })
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .$, {
                variant: "outline",
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                    href: "/dashboard/admin/vehicle-types",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                            className: "mr-2 h-4 w-4"
                        }),
                        " Torna ai tipi veicolo"
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .Card */ .Zp, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .Form */ .lV, {
                    ...form,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                        onSubmit: form.handleSubmit(onSubmit),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardHeader */ .aR, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardTitle */ .ZB, {
                                        children: isNew ? 'Nuovo Tipo Veicolo' : 'Modifica Tipo Veicolo'
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardDescription */ .BT, {
                                        children: isNew ? 'Crea un nuovo tipo di veicolo.' : "Modifica i dettagli per: ".concat(vehicleType === null || vehicleType === void 0 ? void 0 : vehicleType.name)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardContent */ .Wu, {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormField */ .zB, {
                                        control: form.control,
                                        name: "name",
                                        render: (param)=>{
                                            let { field } = param;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormItem */ .eI, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormLabel */ .lR, {
                                                        children: "Nome"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormControl */ .MJ, {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_10__/* .Input */ .p, {
                                                            placeholder: "Es. Benzina",
                                                            ...field
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormMessage */ .C5, {})
                                                ]
                                            });
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormField */ .zB, {
                                        control: form.control,
                                        name: "averageAnnualMileage",
                                        render: (param)=>{
                                            let { field } = param;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormItem */ .eI, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormLabel */ .lR, {
                                                        children: "Chilometraggio Medio Annuo"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormControl */ .MJ, {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_10__/* .Input */ .p, {
                                                            type: "number",
                                                            placeholder: isFetchingSuggestion ? "Sto cercando un suggerimento..." : "Es. 12000",
                                                            ...field
                                                        })
                                                    }),
                                                    isFetchingSuggestion && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormDescription */ .Rr, {
                                                        children: "Sto cercando il chilometraggio medio per la tua zona..."
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormMessage */ .C5, {})
                                                ]
                                            });
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardFooter */ .wL, {
                                className: "gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .$, {
                                        type: "submit",
                                        disabled: isSubmitting,
                                        children: [
                                            isSubmitting && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }),
                                            isNew ? 'Crea Tipo Veicolo' : 'Salva Modifiche'
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .$, {
                                        type: "button",
                                        variant: "outline",
                                        onClick: ()=>router.back(),
                                        children: "Annulla"
                                    })
                                ]
                            })
                        ]
                    })
                })
            }),
            !isNew && vehicleTypeId && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .Card */ .Zp, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardHeader */ .aR, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardTitle */ .ZB, {
                                children: "Piano di Manutenzione Standard"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardDescription */ .BT, {
                                children: "Elenco dei controlli standard associati a questo tipo di veicolo."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardContent */ .Wu, {
                        children: checksLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex justify-center p-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                className: "h-6 w-6 animate-spin"
                            })
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .Table */ .XI, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableHeader */ .A0, {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableRow */ .Hj, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableHead */ .nd, {
                                                        children: "Descrizione"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableHead */ .nd, {
                                                        children: "Intervallo Km"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableHead */ .nd, {
                                                        children: "Intervallo Mesi"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableHead */ .nd, {
                                                        className: "text-right",
                                                        children: "Azioni"
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableBody */ .BF, {
                                            children: maintenanceChecks === null || maintenanceChecks === void 0 ? void 0 : maintenanceChecks.map((check)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableRow */ .Hj, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableCell */ .nA, {
                                                            className: "font-medium",
                                                            children: check.description
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableCell */ .nA, {
                                                            children: check.intervalMileage ? "".concat(check.intervalMileage.toLocaleString('it-IT'), " km") : 'N/A'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableCell */ .nA, {
                                                            children: check.intervalTime ? "".concat(check.intervalTime, " mesi") : 'N/A'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_table__WEBPACK_IMPORTED_MODULE_12__/* .TableCell */ .nA, {
                                                            className: "text-right",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .$, {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    onClick: ()=>router.push("/dashboard/admin/vehicle-types/maintenance-checks/view?vehicleTypeId=".concat(vehicleTypeId, "&checkId=").concat(check.id)),
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                                        className: "h-4 w-4"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .$, {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    className: "text-destructive hover:text-destructive",
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        setCheckToDelete(check);
                                                                    },
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                                        className: "h-4 w-4"
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, check.id))
                                        })
                                    ]
                                }),
                                (maintenanceChecks === null || maintenanceChecks === void 0 ? void 0 : maintenanceChecks.length) === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-center text-muted-foreground py-4",
                                    children: "Nessun controllo di manutenzione trovato."
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__/* .CardFooter */ .wL, {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .$, {
                            onClick: ()=>router.push("/dashboard/admin/vehicle-types/maintenance-checks/view?vehicleTypeId=".concat(vehicleTypeId, "&checkId=new")),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                    className: "mr-2 h-4 w-4"
                                }),
                                " Aggiungi Controllo"
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialog */ .Lt, {
                open: !!checkToDelete,
                onOpenChange: ()=>setCheckToDelete(null),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogContent */ .EO, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogTitle */ .r7, {
                                    children: "Sei sicuro?"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogDescription */ .$v, {
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
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogCancel */ .Zr, {
                                    children: "Annulla"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDeleteCheck,
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
function VehicleTypeDetailPage() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
        fallback: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex h-full items-center justify-center p-8",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_Pencil_PlusCircle_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                className: "h-8 w-8 animate-spin"
            })
        }),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(VehicleTypeDetailContent, {})
    });
}


/***/ }),

/***/ 72351:
/***/ ((module) => {

"use strict";
module.exports = node:stream;

/***/ }),

/***/ 74640:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Pencil)
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
            d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
            key: "1a8usu"
        }
    ],
    [
        "path",
        {
            d: "m15 5 4 4",
            key: "1mk7zo"
        }
    ]
];
const Pencil = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Pencil", __iconNode);
 //# sourceMappingURL=pencil.js.map


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
/******/ __webpack_require__.O(0, [7811,2992,9268,5948,3135,5402,176,197,315,3409,5883,8470,9427,8441,1255,7358], () => (__webpack_exec__(29429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);