"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[5367],{

/***/ 11064:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Shield)
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
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y"
        }
    ]
];
const Shield = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Shield", __iconNode);
 //# sourceMappingURL=shield.js.map


/***/ }),

/***/ 12784:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Moon)
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
            d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
            key: "a7tn18"
        }
    ]
];
const Moon = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Moon", __iconNode);
 //# sourceMappingURL=moon.js.map


/***/ }),

/***/ 14806:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(30125);
} else {}


/***/ }),

/***/ 15957:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ 26615:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ 30125:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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

/***/ 37738:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  H_: () => (/* binding */ CheckboxItem2),
  UC: () => (/* binding */ dist_Content2),
  YJ: () => (/* binding */ Group2),
  q7: () => (/* binding */ dist_Item2),
  VF: () => (/* binding */ ItemIndicator2),
  JU: () => (/* binding */ Label2),
  ZL: () => (/* binding */ Portal2),
  z6: () => (/* binding */ RadioGroup2),
  hN: () => (/* binding */ RadioItem2),
  bL: () => (/* binding */ Root2),
  wv: () => (/* binding */ Separator2),
  Pb: () => (/* binding */ Sub2),
  G5: () => (/* binding */ SubContent2),
  ZP: () => (/* binding */ SubTrigger2),
  l9: () => (/* binding */ Trigger)
});

// UNUSED EXPORTS: Arrow, DropdownMenu, DropdownMenuArrow, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, createDropdownMenuScope

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
// EXTERNAL MODULE: ./node_modules/@radix-ui/primitive/dist/index.mjs
var dist = __webpack_require__(92556);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var react_compose_refs_dist = __webpack_require__(94446);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-context/dist/index.mjs
var react_context_dist = __webpack_require__(3468);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var react_use_controllable_state_dist = __webpack_require__(23558);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-primitive/dist/index.mjs + 1 modules
var react_primitive_dist = __webpack_require__(88142);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-collection/dist/index.mjs + 8 modules
var react_collection_dist = __webpack_require__(79118);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-direction/dist/index.mjs
var react_direction_dist = __webpack_require__(66218);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs + 1 modules
var react_dismissable_layer_dist = __webpack_require__(44831);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var react_focus_guards_dist = __webpack_require__(19526);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var react_focus_scope_dist = __webpack_require__(69666);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-id/dist/index.mjs
var react_id_dist = __webpack_require__(68946);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-popper/dist/index.mjs + 6 modules
var react_popper_dist = __webpack_require__(66093);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-portal/dist/index.mjs
var react_portal_dist = __webpack_require__(75433);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-presence/dist/index.mjs
var react_presence_dist = __webpack_require__(76842);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var react_roving_focus_dist = __webpack_require__(72431);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
;// ./node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-slot/dist/index.mjs
// src/slot.tsx



// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = react.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = react.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (react.Children.count(newElement) > 1) return react.Children.only(null);
          return react.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ (0,jsx_runtime.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: react.isValidElement(newElement) ? react.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ (/* unused pure expression or super */ null && (createSlot("Slot")));
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = react.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (react.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== react.Fragment) {
        props2.ref = forwardedRef ? (0,react_compose_refs_dist/* composeRefs */.t)(forwardedRef, childrenRef) : childrenRef;
      }
      return react.cloneElement(children, props2);
    }
    return react.Children.count(children) > 1 ? react.Children.only(null) : null;
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
  return react.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
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

// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var react_use_callback_ref_dist = __webpack_require__(70222);
// EXTERNAL MODULE: ./node_modules/aria-hidden/dist/es2015/index.js
var es2015 = __webpack_require__(97745);
// EXTERNAL MODULE: ./node_modules/react-remove-scroll/dist/es2015/Combination.js + 20 modules
var Combination = __webpack_require__(14432);
;// ./node_modules/@radix-ui/react-menu/dist/index.mjs
/* __next_internal_client_entry_do_not_use__ Anchor,Arrow,CheckboxItem,Content,Group,Item,ItemIndicator,Label,Menu,MenuAnchor,MenuArrow,MenuCheckboxItem,MenuContent,MenuGroup,MenuItem,MenuItemIndicator,MenuLabel,MenuPortal,MenuRadioGroup,MenuRadioItem,MenuSeparator,MenuSub,MenuSubContent,MenuSubTrigger,Portal,RadioGroup,RadioItem,Root,Separator,Sub,SubContent,SubTrigger,createMenuScope auto */ // src/menu.tsx






















var SELECTION_KEYS = [
    "Enter",
    " "
];
var FIRST_KEYS = [
    "ArrowDown",
    "PageUp",
    "Home"
];
var LAST_KEYS = [
    "ArrowUp",
    "PageDown",
    "End"
];
var FIRST_LAST_KEYS = [
    ...FIRST_KEYS,
    ...LAST_KEYS
];
var SUB_OPEN_KEYS = {
    ltr: [
        ...SELECTION_KEYS,
        "ArrowRight"
    ],
    rtl: [
        ...SELECTION_KEYS,
        "ArrowLeft"
    ]
};
var SUB_CLOSE_KEYS = {
    ltr: [
        "ArrowLeft"
    ],
    rtl: [
        "ArrowRight"
    ]
};
var MENU_NAME = "Menu";
var [Collection, useCollection, createCollectionScope] = (0,react_collection_dist/* createCollection */.N)(MENU_NAME);
var [createMenuContext, createMenuScope] = (0,react_context_dist/* createContextScope */.A)(MENU_NAME, [
    createCollectionScope,
    react_popper_dist/* createPopperScope */.Bk,
    react_roving_focus_dist/* createRovingFocusGroupScope */.RG
]);
var usePopperScope = (0,react_popper_dist/* createPopperScope */.Bk)();
var useRovingFocusGroupScope = (0,react_roving_focus_dist/* createRovingFocusGroupScope */.RG)();
var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
var Menu = (props)=>{
    const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
    const popperScope = usePopperScope(__scopeMenu);
    const [content, setContent] = react.useState(null);
    const isUsingKeyboardRef = react.useRef(false);
    const handleOpenChange = (0,react_use_callback_ref_dist/* useCallbackRef */.c)(onOpenChange);
    const direction = (0,react_direction_dist/* useDirection */.jH)(dir);
    react.useEffect(()=>{
        const handleKeyDown = ()=>{
            isUsingKeyboardRef.current = true;
            document.addEventListener("pointerdown", handlePointer, {
                capture: true,
                once: true
            });
            document.addEventListener("pointermove", handlePointer, {
                capture: true,
                once: true
            });
        };
        const handlePointer = ()=>isUsingKeyboardRef.current = false;
        document.addEventListener("keydown", handleKeyDown, {
            capture: true
        });
        return ()=>{
            document.removeEventListener("keydown", handleKeyDown, {
                capture: true
            });
            document.removeEventListener("pointerdown", handlePointer, {
                capture: true
            });
            document.removeEventListener("pointermove", handlePointer, {
                capture: true
            });
        };
    }, []);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_popper_dist/* Root */.bL, {
        ...popperScope,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuProvider, {
            scope: __scopeMenu,
            open,
            onOpenChange: handleOpenChange,
            content,
            onContentChange: setContent,
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuRootProvider, {
                scope: __scopeMenu,
                onClose: react.useCallback(()=>handleOpenChange(false), [
                    handleOpenChange
                ]),
                isUsingKeyboardRef,
                dir: direction,
                modal,
                children
            })
        })
    });
};
Menu.displayName = MENU_NAME;
var ANCHOR_NAME = "MenuAnchor";
var MenuAnchor = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenu, ...anchorProps } = props;
    const popperScope = usePopperScope(__scopeMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_popper_dist/* Anchor */.Mz, {
        ...popperScope,
        ...anchorProps,
        ref: forwardedRef
    });
});
MenuAnchor.displayName = ANCHOR_NAME;
var PORTAL_NAME = "MenuPortal";
var [PortalProvider, usePortalContext] = createMenuContext(PORTAL_NAME, {
    forceMount: void 0
});
var MenuPortal = (props)=>{
    const { __scopeMenu, forceMount, children, container } = props;
    const context = useMenuContext(PORTAL_NAME, __scopeMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(PortalProvider, {
        scope: __scopeMenu,
        forceMount,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_presence_dist/* Presence */.C, {
            present: forceMount || context.open,
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_portal_dist/* Portal */.Z, {
                asChild: true,
                container,
                children
            })
        })
    });
};
MenuPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "MenuContent";
var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME);
var MenuContent = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeMenu);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useMenuContext(CONTENT_NAME, props.__scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME, props.__scopeMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Collection.Provider, {
        scope: props.__scopeMenu,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_presence_dist/* Presence */.C, {
            present: forceMount || context.open,
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Collection.Slot, {
                scope: props.__scopeMenu,
                children: rootContext.modal ? /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuRootContentModal, {
                    ...contentProps,
                    ref: forwardedRef
                }) : /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuRootContentNonModal, {
                    ...contentProps,
                    ref: forwardedRef
                })
            })
        })
    });
});
var MenuRootContentModal = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const context = useMenuContext(CONTENT_NAME, props.__scopeMenu);
    const ref = react.useRef(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, ref);
    react.useEffect(()=>{
        const content = ref.current;
        if (content) return (0,es2015/* hideOthers */.Eq)(content);
    }, []);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuContentImpl, {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: context.open,
        disableOutsideScroll: true,
        onFocusOutside: (0,dist/* composeEventHandlers */.mK)(props.onFocusOutside, (event)=>event.preventDefault(), {
            checkForDefaultPrevented: false
        }),
        onDismiss: ()=>context.onOpenChange(false)
    });
});
var MenuRootContentNonModal = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const context = useMenuContext(CONTENT_NAME, props.__scopeMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuContentImpl, {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        disableOutsideScroll: false,
        onDismiss: ()=>context.onOpenChange(false)
    });
});
var dist_Slot = createSlot("MenuContent.ScrollLock");
var MenuContentImpl = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenu, loop = false, trapFocus, onOpenAutoFocus, onCloseAutoFocus, disableOutsidePointerEvents, onEntryFocus, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, disableOutsideScroll, ...contentProps } = props;
    const context = useMenuContext(CONTENT_NAME, __scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME, __scopeMenu);
    const popperScope = usePopperScope(__scopeMenu);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
    const getItems = useCollection(__scopeMenu);
    const [currentItemId, setCurrentItemId] = react.useState(null);
    const contentRef = react.useRef(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, contentRef, context.onContentChange);
    const timerRef = react.useRef(0);
    const searchRef = react.useRef("");
    const pointerGraceTimerRef = react.useRef(0);
    const pointerGraceIntentRef = react.useRef(null);
    const pointerDirRef = react.useRef("right");
    const lastPointerXRef = react.useRef(0);
    const ScrollLockWrapper = disableOutsideScroll ? Combination/* default */.A : react.Fragment;
    const scrollLockWrapperProps = disableOutsideScroll ? {
        as: dist_Slot,
        allowPinchZoom: true
    } : void 0;
    const handleTypeaheadSearch = (key)=>{
        var _items_find, _items_find1;
        const search = searchRef.current + key;
        const items = getItems().filter((item)=>!item.disabled);
        const currentItem = document.activeElement;
        const currentMatch = (_items_find = items.find((item)=>item.ref.current === currentItem)) === null || _items_find === void 0 ? void 0 : _items_find.textValue;
        const values = items.map((item)=>item.textValue);
        const nextMatch = getNextMatch(values, search, currentMatch);
        const newItem = (_items_find1 = items.find((item)=>item.textValue === nextMatch)) === null || _items_find1 === void 0 ? void 0 : _items_find1.ref.current;
        (function updateSearch(value) {
            searchRef.current = value;
            window.clearTimeout(timerRef.current);
            if (value !== "") timerRef.current = window.setTimeout(()=>updateSearch(""), 1e3);
        })(search);
        if (newItem) {
            setTimeout(()=>newItem.focus());
        }
    };
    react.useEffect(()=>{
        return ()=>window.clearTimeout(timerRef.current);
    }, []);
    (0,react_focus_guards_dist/* useFocusGuards */.Oh)();
    const isPointerMovingToSubmenu = react.useCallback((event)=>{
        var _pointerGraceIntentRef_current, _pointerGraceIntentRef_current1;
        const isMovingTowards = pointerDirRef.current === ((_pointerGraceIntentRef_current = pointerGraceIntentRef.current) === null || _pointerGraceIntentRef_current === void 0 ? void 0 : _pointerGraceIntentRef_current.side);
        return isMovingTowards && isPointerInGraceArea(event, (_pointerGraceIntentRef_current1 = pointerGraceIntentRef.current) === null || _pointerGraceIntentRef_current1 === void 0 ? void 0 : _pointerGraceIntentRef_current1.area);
    }, []);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuContentProvider, {
        scope: __scopeMenu,
        searchRef,
        onItemEnter: react.useCallback((event)=>{
            if (isPointerMovingToSubmenu(event)) event.preventDefault();
        }, [
            isPointerMovingToSubmenu
        ]),
        onItemLeave: react.useCallback((event)=>{
            var _contentRef_current;
            if (isPointerMovingToSubmenu(event)) return;
            (_contentRef_current = contentRef.current) === null || _contentRef_current === void 0 ? void 0 : _contentRef_current.focus();
            setCurrentItemId(null);
        }, [
            isPointerMovingToSubmenu
        ]),
        onTriggerLeave: react.useCallback((event)=>{
            if (isPointerMovingToSubmenu(event)) event.preventDefault();
        }, [
            isPointerMovingToSubmenu
        ]),
        pointerGraceTimerRef,
        onPointerGraceIntentChange: react.useCallback((intent)=>{
            pointerGraceIntentRef.current = intent;
        }, []),
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(ScrollLockWrapper, {
            ...scrollLockWrapperProps,
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_focus_scope_dist/* FocusScope */.n, {
                asChild: true,
                trapped: trapFocus,
                onMountAutoFocus: (0,dist/* composeEventHandlers */.mK)(onOpenAutoFocus, (event)=>{
                    var _contentRef_current;
                    event.preventDefault();
                    (_contentRef_current = contentRef.current) === null || _contentRef_current === void 0 ? void 0 : _contentRef_current.focus({
                        preventScroll: true
                    });
                }),
                onUnmountAutoFocus: onCloseAutoFocus,
                children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dismissable_layer_dist/* DismissableLayer */.qW, {
                    asChild: true,
                    disableOutsidePointerEvents,
                    onEscapeKeyDown,
                    onPointerDownOutside,
                    onFocusOutside,
                    onInteractOutside,
                    onDismiss,
                    children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_roving_focus_dist/* Root */.bL, {
                        asChild: true,
                        ...rovingFocusGroupScope,
                        dir: rootContext.dir,
                        orientation: "vertical",
                        loop,
                        currentTabStopId: currentItemId,
                        onCurrentTabStopIdChange: setCurrentItemId,
                        onEntryFocus: (0,dist/* composeEventHandlers */.mK)(onEntryFocus, (event)=>{
                            if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
                        }),
                        preventScrollOnEntryFocus: true,
                        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_popper_dist/* Content */.UC, {
                            role: "menu",
                            "aria-orientation": "vertical",
                            "data-state": getOpenState(context.open),
                            "data-radix-menu-content": "",
                            dir: rootContext.dir,
                            ...popperScope,
                            ...contentProps,
                            ref: composedRefs,
                            style: {
                                outline: "none",
                                ...contentProps.style
                            },
                            onKeyDown: (0,dist/* composeEventHandlers */.mK)(contentProps.onKeyDown, (event)=>{
                                const target = event.target;
                                const isKeyDownInside = target.closest("[data-radix-menu-content]") === event.currentTarget;
                                const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                                const isCharacterKey = event.key.length === 1;
                                if (isKeyDownInside) {
                                    if (event.key === "Tab") event.preventDefault();
                                    if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
                                }
                                const content = contentRef.current;
                                if (event.target !== content) return;
                                if (!FIRST_LAST_KEYS.includes(event.key)) return;
                                event.preventDefault();
                                const items = getItems().filter((item)=>!item.disabled);
                                const candidateNodes = items.map((item)=>item.ref.current);
                                if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
                                focusFirst(candidateNodes);
                            }),
                            onBlur: (0,dist/* composeEventHandlers */.mK)(props.onBlur, (event)=>{
                                if (!event.currentTarget.contains(event.target)) {
                                    window.clearTimeout(timerRef.current);
                                    searchRef.current = "";
                                }
                            }),
                            onPointerMove: (0,dist/* composeEventHandlers */.mK)(props.onPointerMove, whenMouse((event)=>{
                                const target = event.target;
                                const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
                                if (event.currentTarget.contains(target) && pointerXHasChanged) {
                                    const newDir = event.clientX > lastPointerXRef.current ? "right" : "left";
                                    pointerDirRef.current = newDir;
                                    lastPointerXRef.current = event.clientX;
                                }
                            }))
                        })
                    })
                })
            })
        })
    });
});
MenuContent.displayName = CONTENT_NAME;
var GROUP_NAME = "MenuGroup";
var MenuGroup = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenu, ...groupProps } = props;
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
        role: "group",
        ...groupProps,
        ref: forwardedRef
    });
});
MenuGroup.displayName = GROUP_NAME;
var LABEL_NAME = "MenuLabel";
var MenuLabel = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenu, ...labelProps } = props;
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
        ...labelProps,
        ref: forwardedRef
    });
});
MenuLabel.displayName = LABEL_NAME;
var ITEM_NAME = "MenuItem";
var ITEM_SELECT = "menu.itemSelect";
var MenuItem = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { disabled = false, onSelect, ...itemProps } = props;
    const ref = react.useRef(null);
    const rootContext = useMenuRootContext(ITEM_NAME, props.__scopeMenu);
    const contentContext = useMenuContentContext(ITEM_NAME, props.__scopeMenu);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, ref);
    const isPointerDownRef = react.useRef(false);
    const handleSelect = ()=>{
        const menuItem = ref.current;
        if (!disabled && menuItem) {
            const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
                bubbles: true,
                cancelable: true
            });
            menuItem.addEventListener(ITEM_SELECT, (event)=>onSelect === null || onSelect === void 0 ? void 0 : onSelect(event), {
                once: true
            });
            (0,react_primitive_dist/* dispatchDiscreteCustomEvent */.hO)(menuItem, itemSelectEvent);
            if (itemSelectEvent.defaultPrevented) {
                isPointerDownRef.current = false;
            } else {
                rootContext.onClose();
            }
        }
    };
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuItemImpl, {
        ...itemProps,
        ref: composedRefs,
        disabled,
        onClick: (0,dist/* composeEventHandlers */.mK)(props.onClick, handleSelect),
        onPointerDown: (event)=>{
            var _props_onPointerDown;
            (_props_onPointerDown = props.onPointerDown) === null || _props_onPointerDown === void 0 ? void 0 : _props_onPointerDown.call(props, event);
            isPointerDownRef.current = true;
        },
        onPointerUp: (0,dist/* composeEventHandlers */.mK)(props.onPointerUp, (event)=>{
            var _event_currentTarget;
            if (!isPointerDownRef.current) (_event_currentTarget = event.currentTarget) === null || _event_currentTarget === void 0 ? void 0 : _event_currentTarget.click();
        }),
        onKeyDown: (0,dist/* composeEventHandlers */.mK)(props.onKeyDown, (event)=>{
            const isTypingAhead = contentContext.searchRef.current !== "";
            if (disabled || isTypingAhead && event.key === " ") return;
            if (SELECTION_KEYS.includes(event.key)) {
                event.currentTarget.click();
                event.preventDefault();
            }
        })
    });
});
MenuItem.displayName = ITEM_NAME;
var MenuItemImpl = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
    const contentContext = useMenuContentContext(ITEM_NAME, __scopeMenu);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
    const ref = react.useRef(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, ref);
    const [isFocused, setIsFocused] = react.useState(false);
    const [textContent, setTextContent] = react.useState("");
    react.useEffect(()=>{
        const menuItem = ref.current;
        if (menuItem) {
            var _menuItem_textContent;
            setTextContent(((_menuItem_textContent = menuItem.textContent) !== null && _menuItem_textContent !== void 0 ? _menuItem_textContent : "").trim());
        }
    }, [
        itemProps.children
    ]);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Collection.ItemSlot, {
        scope: __scopeMenu,
        disabled,
        textValue: textValue !== null && textValue !== void 0 ? textValue : textContent,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_roving_focus_dist/* Item */.q7, {
            asChild: true,
            ...rovingFocusGroupScope,
            focusable: !disabled,
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
                role: "menuitem",
                "data-highlighted": isFocused ? "" : void 0,
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                ...itemProps,
                ref: composedRefs,
                onPointerMove: (0,dist/* composeEventHandlers */.mK)(props.onPointerMove, whenMouse((event)=>{
                    if (disabled) {
                        contentContext.onItemLeave(event);
                    } else {
                        contentContext.onItemEnter(event);
                        if (!event.defaultPrevented) {
                            const item = event.currentTarget;
                            item.focus({
                                preventScroll: true
                            });
                        }
                    }
                })),
                onPointerLeave: (0,dist/* composeEventHandlers */.mK)(props.onPointerLeave, whenMouse((event)=>contentContext.onItemLeave(event))),
                onFocus: (0,dist/* composeEventHandlers */.mK)(props.onFocus, ()=>setIsFocused(true)),
                onBlur: (0,dist/* composeEventHandlers */.mK)(props.onBlur, ()=>setIsFocused(false))
            })
        })
    });
});
var CHECKBOX_ITEM_NAME = "MenuCheckboxItem";
var MenuCheckboxItem = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(ItemIndicatorProvider, {
        scope: props.__scopeMenu,
        checked,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuItem, {
            role: "menuitemcheckbox",
            "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
            ...checkboxItemProps,
            ref: forwardedRef,
            "data-state": getCheckedState(checked),
            onSelect: (0,dist/* composeEventHandlers */.mK)(checkboxItemProps.onSelect, ()=>onCheckedChange === null || onCheckedChange === void 0 ? void 0 : onCheckedChange(isIndeterminate(checked) ? true : !checked), {
                checkForDefaultPrevented: false
            })
        })
    });
});
MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME;
var RADIO_GROUP_NAME = "MenuRadioGroup";
var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(RADIO_GROUP_NAME, {
    value: void 0,
    onValueChange: ()=>{}
});
var MenuRadioGroup = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { value, onValueChange, ...groupProps } = props;
    const handleValueChange = (0,react_use_callback_ref_dist/* useCallbackRef */.c)(onValueChange);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(RadioGroupProvider, {
        scope: props.__scopeMenu,
        value,
        onValueChange: handleValueChange,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuGroup, {
            ...groupProps,
            ref: forwardedRef
        })
    });
});
MenuRadioGroup.displayName = RADIO_GROUP_NAME;
var RADIO_ITEM_NAME = "MenuRadioItem";
var MenuRadioItem = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { value, ...radioItemProps } = props;
    const context = useRadioGroupContext(RADIO_ITEM_NAME, props.__scopeMenu);
    const checked = value === context.value;
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(ItemIndicatorProvider, {
        scope: props.__scopeMenu,
        checked,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuItem, {
            role: "menuitemradio",
            "aria-checked": checked,
            ...radioItemProps,
            ref: forwardedRef,
            "data-state": getCheckedState(checked),
            onSelect: (0,dist/* composeEventHandlers */.mK)(radioItemProps.onSelect, ()=>{
                var _context_onValueChange;
                return (_context_onValueChange = context.onValueChange) === null || _context_onValueChange === void 0 ? void 0 : _context_onValueChange.call(context, value);
            }, {
                checkForDefaultPrevented: false
            })
        })
    });
});
MenuRadioItem.displayName = RADIO_ITEM_NAME;
var ITEM_INDICATOR_NAME = "MenuItemIndicator";
var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(ITEM_INDICATOR_NAME, {
    checked: false
});
var MenuItemIndicator = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
    const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_presence_dist/* Presence */.C, {
        present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.span, {
            ...itemIndicatorProps,
            ref: forwardedRef,
            "data-state": getCheckedState(indicatorContext.checked)
        })
    });
});
MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SEPARATOR_NAME = "MenuSeparator";
var MenuSeparator = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenu, ...separatorProps } = props;
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
        role: "separator",
        "aria-orientation": "horizontal",
        ...separatorProps,
        ref: forwardedRef
    });
});
MenuSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME = "MenuArrow";
var MenuArrow = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenu, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_popper_dist/* Arrow */.i3, {
        ...popperScope,
        ...arrowProps,
        ref: forwardedRef
    });
});
MenuArrow.displayName = ARROW_NAME;
var SUB_NAME = "MenuSub";
var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
var MenuSub = (props)=>{
    const { __scopeMenu, children, open = false, onOpenChange } = props;
    const parentMenuContext = useMenuContext(SUB_NAME, __scopeMenu);
    const popperScope = usePopperScope(__scopeMenu);
    const [trigger, setTrigger] = react.useState(null);
    const [content, setContent] = react.useState(null);
    const handleOpenChange = (0,react_use_callback_ref_dist/* useCallbackRef */.c)(onOpenChange);
    react.useEffect(()=>{
        if (parentMenuContext.open === false) handleOpenChange(false);
        return ()=>handleOpenChange(false);
    }, [
        parentMenuContext.open,
        handleOpenChange
    ]);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_popper_dist/* Root */.bL, {
        ...popperScope,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuProvider, {
            scope: __scopeMenu,
            open,
            onOpenChange: handleOpenChange,
            content,
            onContentChange: setContent,
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuSubProvider, {
                scope: __scopeMenu,
                contentId: (0,react_id_dist/* useId */.B)(),
                triggerId: (0,react_id_dist/* useId */.B)(),
                trigger,
                onTriggerChange: setTrigger,
                children
            })
        })
    });
};
MenuSub.displayName = SUB_NAME;
var SUB_TRIGGER_NAME = "MenuSubTrigger";
var MenuSubTrigger = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const context = useMenuContext(SUB_TRIGGER_NAME, props.__scopeMenu);
    const rootContext = useMenuRootContext(SUB_TRIGGER_NAME, props.__scopeMenu);
    const subContext = useMenuSubContext(SUB_TRIGGER_NAME, props.__scopeMenu);
    const contentContext = useMenuContentContext(SUB_TRIGGER_NAME, props.__scopeMenu);
    const openTimerRef = react.useRef(null);
    const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
    const scope = {
        __scopeMenu: props.__scopeMenu
    };
    const clearOpenTimer = react.useCallback(()=>{
        if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
    }, []);
    react.useEffect(()=>clearOpenTimer, [
        clearOpenTimer
    ]);
    react.useEffect(()=>{
        const pointerGraceTimer = pointerGraceTimerRef.current;
        return ()=>{
            window.clearTimeout(pointerGraceTimer);
            onPointerGraceIntentChange(null);
        };
    }, [
        pointerGraceTimerRef,
        onPointerGraceIntentChange
    ]);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuAnchor, {
        asChild: true,
        ...scope,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuItemImpl, {
            id: subContext.triggerId,
            "aria-haspopup": "menu",
            "aria-expanded": context.open,
            "aria-controls": subContext.contentId,
            "data-state": getOpenState(context.open),
            ...props,
            ref: (0,react_compose_refs_dist/* composeRefs */.t)(forwardedRef, subContext.onTriggerChange),
            onClick: (event)=>{
                var _props_onClick;
                (_props_onClick = props.onClick) === null || _props_onClick === void 0 ? void 0 : _props_onClick.call(props, event);
                if (props.disabled || event.defaultPrevented) return;
                event.currentTarget.focus();
                if (!context.open) context.onOpenChange(true);
            },
            onPointerMove: (0,dist/* composeEventHandlers */.mK)(props.onPointerMove, whenMouse((event)=>{
                contentContext.onItemEnter(event);
                if (event.defaultPrevented) return;
                if (!props.disabled && !context.open && !openTimerRef.current) {
                    contentContext.onPointerGraceIntentChange(null);
                    openTimerRef.current = window.setTimeout(()=>{
                        context.onOpenChange(true);
                        clearOpenTimer();
                    }, 100);
                }
            })),
            onPointerLeave: (0,dist/* composeEventHandlers */.mK)(props.onPointerLeave, whenMouse((event)=>{
                var _context_content;
                clearOpenTimer();
                const contentRect = (_context_content = context.content) === null || _context_content === void 0 ? void 0 : _context_content.getBoundingClientRect();
                if (contentRect) {
                    var _context_content1;
                    const side = (_context_content1 = context.content) === null || _context_content1 === void 0 ? void 0 : _context_content1.dataset.side;
                    const rightSide = side === "right";
                    const bleed = rightSide ? -5 : 5;
                    const contentNearEdge = contentRect[rightSide ? "left" : "right"];
                    const contentFarEdge = contentRect[rightSide ? "right" : "left"];
                    contentContext.onPointerGraceIntentChange({
                        area: [
                            // Apply a bleed on clientX to ensure that our exit point is
                            // consistently within polygon bounds
                            {
                                x: event.clientX + bleed,
                                y: event.clientY
                            },
                            {
                                x: contentNearEdge,
                                y: contentRect.top
                            },
                            {
                                x: contentFarEdge,
                                y: contentRect.top
                            },
                            {
                                x: contentFarEdge,
                                y: contentRect.bottom
                            },
                            {
                                x: contentNearEdge,
                                y: contentRect.bottom
                            }
                        ],
                        side
                    });
                    window.clearTimeout(pointerGraceTimerRef.current);
                    pointerGraceTimerRef.current = window.setTimeout(()=>contentContext.onPointerGraceIntentChange(null), 300);
                } else {
                    contentContext.onTriggerLeave(event);
                    if (event.defaultPrevented) return;
                    contentContext.onPointerGraceIntentChange(null);
                }
            })),
            onKeyDown: (0,dist/* composeEventHandlers */.mK)(props.onKeyDown, (event)=>{
                const isTypingAhead = contentContext.searchRef.current !== "";
                if (props.disabled || isTypingAhead && event.key === " ") return;
                if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
                    var _context_content;
                    context.onOpenChange(true);
                    (_context_content = context.content) === null || _context_content === void 0 ? void 0 : _context_content.focus();
                    event.preventDefault();
                }
            })
        })
    });
});
MenuSubTrigger.displayName = SUB_TRIGGER_NAME;
var SUB_CONTENT_NAME = "MenuSubContent";
var MenuSubContent = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeMenu);
    const { forceMount = portalContext.forceMount, ...subContentProps } = props;
    const context = useMenuContext(CONTENT_NAME, props.__scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME, props.__scopeMenu);
    const subContext = useMenuSubContext(SUB_CONTENT_NAME, props.__scopeMenu);
    const ref = react.useRef(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, ref);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Collection.Provider, {
        scope: props.__scopeMenu,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_presence_dist/* Presence */.C, {
            present: forceMount || context.open,
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Collection.Slot, {
                scope: props.__scopeMenu,
                children: /* @__PURE__ */ (0,jsx_runtime.jsx)(MenuContentImpl, {
                    id: subContext.contentId,
                    "aria-labelledby": subContext.triggerId,
                    ...subContentProps,
                    ref: composedRefs,
                    align: "start",
                    side: rootContext.dir === "rtl" ? "left" : "right",
                    disableOutsidePointerEvents: false,
                    disableOutsideScroll: false,
                    trapFocus: false,
                    onOpenAutoFocus: (event)=>{
                        var _ref_current;
                        if (rootContext.isUsingKeyboardRef.current) (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.focus();
                        event.preventDefault();
                    },
                    onCloseAutoFocus: (event)=>event.preventDefault(),
                    onFocusOutside: (0,dist/* composeEventHandlers */.mK)(props.onFocusOutside, (event)=>{
                        if (event.target !== subContext.trigger) context.onOpenChange(false);
                    }),
                    onEscapeKeyDown: (0,dist/* composeEventHandlers */.mK)(props.onEscapeKeyDown, (event)=>{
                        rootContext.onClose();
                        event.preventDefault();
                    }),
                    onKeyDown: (0,dist/* composeEventHandlers */.mK)(props.onKeyDown, (event)=>{
                        const isKeyDownInside = event.currentTarget.contains(event.target);
                        const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
                        if (isKeyDownInside && isCloseKey) {
                            var _subContext_trigger;
                            context.onOpenChange(false);
                            (_subContext_trigger = subContext.trigger) === null || _subContext_trigger === void 0 ? void 0 : _subContext_trigger.focus();
                            event.preventDefault();
                        }
                    })
                })
            })
        })
    });
});
MenuSubContent.displayName = SUB_CONTENT_NAME;
function getOpenState(open) {
    return open ? "open" : "closed";
}
function isIndeterminate(checked) {
    return checked === "indeterminate";
}
function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst(candidates) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates){
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate.focus();
        if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
}
function wrapArray(array, startIndex) {
    return array.map((_, index)=>array[(startIndex + index) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
    const isRepeated = search.length > 1 && Array.from(search).every((char)=>char === search[0]);
    const normalizedSearch = isRepeated ? search[0] : search;
    const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
    let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
    const excludeCurrentMatch = normalizedSearch.length === 1;
    if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v)=>v !== currentMatch);
    const nextMatch = wrappedValues.find((value)=>value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
    return nextMatch !== currentMatch ? nextMatch : void 0;
}
function isPointInPolygon(point, polygon) {
    const { x, y } = point;
    let inside = false;
    for(let i = 0, j = polygon.length - 1; i < polygon.length; j = i++){
        const ii = polygon[i];
        const jj = polygon[j];
        const xi = ii.x;
        const yi = ii.y;
        const xj = jj.x;
        const yj = jj.y;
        const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
}
function isPointerInGraceArea(event, area) {
    if (!area) return false;
    const cursorPos = {
        x: event.clientX,
        y: event.clientY
    };
    return isPointInPolygon(cursorPos, area);
}
function whenMouse(handler) {
    return (event)=>event.pointerType === "mouse" ? handler(event) : void 0;
}
var Root3 = Menu;
var Anchor2 = MenuAnchor;
var Portal = MenuPortal;
var Content2 = MenuContent;
var Group = MenuGroup;
var Label = MenuLabel;
var Item2 = MenuItem;
var CheckboxItem = MenuCheckboxItem;
var RadioGroup = MenuRadioGroup;
var RadioItem = MenuRadioItem;
var ItemIndicator = MenuItemIndicator;
var Separator = MenuSeparator;
var Arrow2 = MenuArrow;
var Sub = MenuSub;
var SubTrigger = MenuSubTrigger;
var SubContent = MenuSubContent;
 //# sourceMappingURL=index.mjs.map

;// ./node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
/* __next_internal_client_entry_do_not_use__ Arrow,CheckboxItem,Content,DropdownMenu,DropdownMenuArrow,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuItemIndicator,DropdownMenuLabel,DropdownMenuPortal,DropdownMenuRadioGroup,DropdownMenuRadioItem,DropdownMenuSeparator,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuSubTrigger,DropdownMenuTrigger,Group,Item,ItemIndicator,Label,Portal,RadioGroup,RadioItem,Root,Separator,Sub,SubContent,SubTrigger,Trigger,createDropdownMenuScope auto */ // src/dropdown-menu.tsx










var DROPDOWN_MENU_NAME = "DropdownMenu";
var [createDropdownMenuContext, createDropdownMenuScope] = (0,react_context_dist/* createContextScope */.A)(DROPDOWN_MENU_NAME, [
    createMenuScope
]);
var useMenuScope = createMenuScope();
var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
var DropdownMenu = (props)=>{
    const { __scopeDropdownMenu, children, dir, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    const triggerRef = react.useRef(null);
    const [open, setOpen] = (0,react_use_controllable_state_dist/* useControllableState */.i)({
        prop: openProp,
        defaultProp: defaultOpen !== null && defaultOpen !== void 0 ? defaultOpen : false,
        onChange: onOpenChange,
        caller: DROPDOWN_MENU_NAME
    });
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(DropdownMenuProvider, {
        scope: __scopeDropdownMenu,
        triggerId: (0,react_id_dist/* useId */.B)(),
        triggerRef,
        contentId: (0,react_id_dist/* useId */.B)(),
        open,
        onOpenChange: setOpen,
        onOpenToggle: react.useCallback(()=>setOpen((prevOpen)=>!prevOpen), [
            setOpen
        ]),
        modal,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Root3, {
            ...menuScope,
            open,
            onOpenChange: setOpen,
            dir,
            modal,
            children
        })
    });
};
DropdownMenu.displayName = DROPDOWN_MENU_NAME;
var TRIGGER_NAME = "DropdownMenuTrigger";
var DropdownMenuTrigger = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
    const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Anchor2, {
        asChild: true,
        ...menuScope,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.button, {
            type: "button",
            id: context.triggerId,
            "aria-haspopup": "menu",
            "aria-expanded": context.open,
            "aria-controls": context.open ? context.contentId : void 0,
            "data-state": context.open ? "open" : "closed",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            ...triggerProps,
            ref: (0,react_compose_refs_dist/* composeRefs */.t)(forwardedRef, context.triggerRef),
            onPointerDown: (0,dist/* composeEventHandlers */.mK)(props.onPointerDown, (event)=>{
                if (!disabled && event.button === 0 && event.ctrlKey === false) {
                    context.onOpenToggle();
                    if (!context.open) event.preventDefault();
                }
            }),
            onKeyDown: (0,dist/* composeEventHandlers */.mK)(props.onKeyDown, (event)=>{
                if (disabled) return;
                if ([
                    "Enter",
                    " "
                ].includes(event.key)) context.onOpenToggle();
                if (event.key === "ArrowDown") context.onOpenChange(true);
                if ([
                    "Enter",
                    " ",
                    "ArrowDown"
                ].includes(event.key)) event.preventDefault();
            })
        })
    });
});
DropdownMenuTrigger.displayName = TRIGGER_NAME;
var dist_PORTAL_NAME = "DropdownMenuPortal";
var DropdownMenuPortal = (props)=>{
    const { __scopeDropdownMenu, ...portalProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Portal, {
        ...menuScope,
        ...portalProps
    });
};
DropdownMenuPortal.displayName = dist_PORTAL_NAME;
var dist_CONTENT_NAME = "DropdownMenuContent";
var DropdownMenuContent = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...contentProps } = props;
    const context = useDropdownMenuContext(dist_CONTENT_NAME, __scopeDropdownMenu);
    const menuScope = useMenuScope(__scopeDropdownMenu);
    const hasInteractedOutsideRef = react.useRef(false);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Content2, {
        id: context.contentId,
        "aria-labelledby": context.triggerId,
        ...menuScope,
        ...contentProps,
        ref: forwardedRef,
        onCloseAutoFocus: (0,dist/* composeEventHandlers */.mK)(props.onCloseAutoFocus, (event)=>{
            var _context_triggerRef_current;
            if (!hasInteractedOutsideRef.current) (_context_triggerRef_current = context.triggerRef.current) === null || _context_triggerRef_current === void 0 ? void 0 : _context_triggerRef_current.focus();
            hasInteractedOutsideRef.current = false;
            event.preventDefault();
        }),
        onInteractOutside: (0,dist/* composeEventHandlers */.mK)(props.onInteractOutside, (event)=>{
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
        }),
        style: {
            ...props.style,
            // re-namespace exposed content custom properties
            ...{
                "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
                "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
                "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
            }
        }
    });
});
DropdownMenuContent.displayName = dist_CONTENT_NAME;
var dist_GROUP_NAME = "DropdownMenuGroup";
var DropdownMenuGroup = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...groupProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Group, {
        ...menuScope,
        ...groupProps,
        ref: forwardedRef
    });
});
DropdownMenuGroup.displayName = dist_GROUP_NAME;
var dist_LABEL_NAME = "DropdownMenuLabel";
var DropdownMenuLabel = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...labelProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Label, {
        ...menuScope,
        ...labelProps,
        ref: forwardedRef
    });
});
DropdownMenuLabel.displayName = dist_LABEL_NAME;
var dist_ITEM_NAME = "DropdownMenuItem";
var DropdownMenuItem = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...itemProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Item2, {
        ...menuScope,
        ...itemProps,
        ref: forwardedRef
    });
});
DropdownMenuItem.displayName = dist_ITEM_NAME;
var dist_CHECKBOX_ITEM_NAME = "DropdownMenuCheckboxItem";
var DropdownMenuCheckboxItem = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...checkboxItemProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(CheckboxItem, {
        ...menuScope,
        ...checkboxItemProps,
        ref: forwardedRef
    });
});
DropdownMenuCheckboxItem.displayName = dist_CHECKBOX_ITEM_NAME;
var dist_RADIO_GROUP_NAME = "DropdownMenuRadioGroup";
var DropdownMenuRadioGroup = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...radioGroupProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(RadioGroup, {
        ...menuScope,
        ...radioGroupProps,
        ref: forwardedRef
    });
});
DropdownMenuRadioGroup.displayName = dist_RADIO_GROUP_NAME;
var dist_RADIO_ITEM_NAME = "DropdownMenuRadioItem";
var DropdownMenuRadioItem = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...radioItemProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(RadioItem, {
        ...menuScope,
        ...radioItemProps,
        ref: forwardedRef
    });
});
DropdownMenuRadioItem.displayName = dist_RADIO_ITEM_NAME;
var INDICATOR_NAME = "DropdownMenuItemIndicator";
var DropdownMenuItemIndicator = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(ItemIndicator, {
        ...menuScope,
        ...itemIndicatorProps,
        ref: forwardedRef
    });
});
DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
var dist_SEPARATOR_NAME = "DropdownMenuSeparator";
var DropdownMenuSeparator = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...separatorProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Separator, {
        ...menuScope,
        ...separatorProps,
        ref: forwardedRef
    });
});
DropdownMenuSeparator.displayName = dist_SEPARATOR_NAME;
var dist_ARROW_NAME = "DropdownMenuArrow";
var DropdownMenuArrow = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...arrowProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Arrow2, {
        ...menuScope,
        ...arrowProps,
        ref: forwardedRef
    });
});
DropdownMenuArrow.displayName = dist_ARROW_NAME;
var DropdownMenuSub = (props)=>{
    const { __scopeDropdownMenu, children, open: openProp, onOpenChange, defaultOpen } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    const [open, setOpen] = (0,react_use_controllable_state_dist/* useControllableState */.i)({
        prop: openProp,
        defaultProp: defaultOpen !== null && defaultOpen !== void 0 ? defaultOpen : false,
        onChange: onOpenChange,
        caller: "DropdownMenuSub"
    });
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(Sub, {
        ...menuScope,
        open,
        onOpenChange: setOpen,
        children
    });
};
var dist_SUB_TRIGGER_NAME = "DropdownMenuSubTrigger";
var DropdownMenuSubTrigger = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...subTriggerProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(SubTrigger, {
        ...menuScope,
        ...subTriggerProps,
        ref: forwardedRef
    });
});
DropdownMenuSubTrigger.displayName = dist_SUB_TRIGGER_NAME;
var dist_SUB_CONTENT_NAME = "DropdownMenuSubContent";
var DropdownMenuSubContent = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeDropdownMenu, ...subContentProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(SubContent, {
        ...menuScope,
        ...subContentProps,
        ref: forwardedRef,
        style: {
            ...props.style,
            // re-namespace exposed content custom properties
            ...{
                "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
                "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
                "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
            }
        }
    });
});
DropdownMenuSubContent.displayName = dist_SUB_CONTENT_NAME;
var Root2 = DropdownMenu;
var Trigger = DropdownMenuTrigger;
var Portal2 = DropdownMenuPortal;
var dist_Content2 = DropdownMenuContent;
var Group2 = DropdownMenuGroup;
var Label2 = DropdownMenuLabel;
var dist_Item2 = DropdownMenuItem;
var CheckboxItem2 = DropdownMenuCheckboxItem;
var RadioGroup2 = DropdownMenuRadioGroup;
var RadioItem2 = DropdownMenuRadioItem;
var ItemIndicator2 = DropdownMenuItemIndicator;
var Separator2 = DropdownMenuSeparator;
var dist_Arrow2 = (/* unused pure expression or super */ null && (DropdownMenuArrow));
var Sub2 = DropdownMenuSub;
var SubTrigger2 = DropdownMenuSubTrigger;
var SubContent2 = DropdownMenuSubContent;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 59034:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LM: () => (/* binding */ Viewport),
/* harmony export */   OK: () => (/* binding */ Corner),
/* harmony export */   VM: () => (/* binding */ ScrollAreaScrollbar),
/* harmony export */   bL: () => (/* binding */ Root),
/* harmony export */   lr: () => (/* binding */ ScrollAreaThumb)
/* harmony export */ });
/* unused harmony exports ScrollArea, ScrollAreaCorner, ScrollAreaViewport, Scrollbar, Thumb, createScrollAreaScope */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88142);
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(76842);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3468);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(94446);
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(70222);
/* harmony import */ var _radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66218);
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4129);
/* harmony import */ var _radix_ui_number__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(34212);
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(92556);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Corner,Root,ScrollArea,ScrollAreaCorner,ScrollAreaScrollbar,ScrollAreaThumb,ScrollAreaViewport,Scrollbar,Thumb,Viewport,createScrollAreaScope auto */ // src/scroll-area.tsx










// src/use-state-machine.ts

function useStateMachine(initialState, machine) {
    return react__WEBPACK_IMPORTED_MODULE_0__.useReducer((state, event)=>{
        const nextState = machine[state][event];
        return nextState !== null && nextState !== void 0 ? nextState : state;
    }, initialState);
}
// src/scroll-area.tsx

var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext, createScrollAreaScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__/* .createContextScope */ .A)(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea, type = "hover", dir, scrollHideDelay = 600, ...scrollAreaProps } = props;
    const [scrollArea, setScrollArea] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [viewport, setViewport] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [content, setContent] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [scrollbarX, setScrollbarX] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [scrollbarY, setScrollbarY] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [cornerWidth, setCornerWidth] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    const [cornerHeight, setCornerHeight] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__/* .useComposedRefs */ .s)(forwardedRef, (node)=>setScrollArea(node));
    const direction = (0,_radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_4__/* .useDirection */ .jH)(dir);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaProvider, {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.div, {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
                position: "relative",
                // Pass corner sizes as CSS vars to reduce re-renders of context consumers
                ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
                ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
                ...props.style
            }
        })
    });
});
ScrollArea.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__/* .useComposedRefs */ .s)(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("style", {
                dangerouslySetInnerHTML: {
                    __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
                },
                nonce
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.div, {
                "data-radix-scroll-area-viewport": "",
                ...viewportProps,
                ref: composedRefs,
                style: {
                    /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */ overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
                    overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
                    ...props.style
                },
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
                    ref: context.onContentChange,
                    style: {
                        minWidth: "100%",
                        display: "table"
                    },
                    children
                })
            })
        ]
    });
});
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
        return ()=>{
            isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
        };
    }, [
        isHorizontal,
        onScrollbarXEnabledChange,
        onScrollbarYEnabledChange
    ]);
    return context.type === "hover" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarHover, {
        ...scrollbarProps,
        ref: forwardedRef,
        forceMount
    }) : context.type === "scroll" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarScroll, {
        ...scrollbarProps,
        ref: forwardedRef,
        forceMount
    }) : context.type === "auto" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarAuto, {
        ...scrollbarProps,
        ref: forwardedRef,
        forceMount
    }) : context.type === "always" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarVisible, {
        ...scrollbarProps,
        ref: forwardedRef
    }) : null;
});
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const [visible, setVisible] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const scrollArea = context.scrollArea;
        let hideTimer = 0;
        if (scrollArea) {
            const handlePointerEnter = ()=>{
                window.clearTimeout(hideTimer);
                setVisible(true);
            };
            const handlePointerLeave = ()=>{
                hideTimer = window.setTimeout(()=>setVisible(false), context.scrollHideDelay);
            };
            scrollArea.addEventListener("pointerenter", handlePointerEnter);
            scrollArea.addEventListener("pointerleave", handlePointerLeave);
            return ()=>{
                window.clearTimeout(hideTimer);
                scrollArea.removeEventListener("pointerenter", handlePointerEnter);
                scrollArea.removeEventListener("pointerleave", handlePointerLeave);
            };
        }
    }, [
        context.scrollArea,
        context.scrollHideDelay
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__/* .Presence */ .C, {
        present: forceMount || visible,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarAuto, {
            "data-state": visible ? "visible" : "hidden",
            ...scrollbarProps,
            ref: forwardedRef
        })
    });
});
var ScrollAreaScrollbarScroll = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const isHorizontal = props.orientation === "horizontal";
    const debounceScrollEnd = useDebounceCallback(()=>send("SCROLL_END"), 100);
    const [state, send] = useStateMachine("hidden", {
        hidden: {
            SCROLL: "scrolling"
        },
        scrolling: {
            SCROLL_END: "idle",
            POINTER_ENTER: "interacting"
        },
        interacting: {
            SCROLL: "interacting",
            POINTER_LEAVE: "idle"
        },
        idle: {
            HIDE: "hidden",
            SCROLL: "scrolling",
            POINTER_ENTER: "interacting"
        }
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (state === "idle") {
            const hideTimer = window.setTimeout(()=>send("HIDE"), context.scrollHideDelay);
            return ()=>window.clearTimeout(hideTimer);
        }
    }, [
        state,
        context.scrollHideDelay,
        send
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const viewport = context.viewport;
        const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
        if (viewport) {
            let prevScrollPos = viewport[scrollDirection];
            const handleScroll = ()=>{
                const scrollPos = viewport[scrollDirection];
                const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
                if (hasScrollInDirectionChanged) {
                    send("SCROLL");
                    debounceScrollEnd();
                }
                prevScrollPos = scrollPos;
            };
            viewport.addEventListener("scroll", handleScroll);
            return ()=>viewport.removeEventListener("scroll", handleScroll);
        }
    }, [
        context.viewport,
        isHorizontal,
        send,
        debounceScrollEnd
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__/* .Presence */ .C, {
        present: forceMount || state !== "hidden",
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarVisible, {
            "data-state": state === "hidden" ? "hidden" : "visible",
            ...scrollbarProps,
            ref: forwardedRef,
            onPointerEnter: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__/* .composeEventHandlers */ .mK)(props.onPointerEnter, ()=>send("POINTER_ENTER")),
            onPointerLeave: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__/* .composeEventHandlers */ .mK)(props.onPointerLeave, ()=>send("POINTER_LEAVE"))
        })
    });
});
var ScrollAreaScrollbarAuto = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { forceMount, ...scrollbarProps } = props;
    const [visible, setVisible] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const isHorizontal = props.orientation === "horizontal";
    const handleResize = useDebounceCallback(()=>{
        if (context.viewport) {
            const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
            const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
            setVisible(isHorizontal ? isOverflowX : isOverflowY);
        }
    }, 10);
    useResizeObserver(context.viewport, handleResize);
    useResizeObserver(context.content, handleResize);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__/* .Presence */ .C, {
        present: forceMount || visible,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarVisible, {
            "data-state": visible ? "visible" : "hidden",
            ...scrollbarProps,
            ref: forwardedRef
        })
    });
});
var ScrollAreaScrollbarVisible = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { orientation = "vertical", ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const thumbRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const pointerOffsetRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    const [sizes, setSizes] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
        content: 0,
        viewport: 0,
        scrollbar: {
            size: 0,
            paddingStart: 0,
            paddingEnd: 0
        }
    });
    const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
    const commonProps = {
        ...scrollbarProps,
        sizes,
        onSizesChange: setSizes,
        hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
        onThumbChange: (thumb)=>thumbRef.current = thumb,
        onThumbPointerUp: ()=>pointerOffsetRef.current = 0,
        onThumbPointerDown: (pointerPos)=>pointerOffsetRef.current = pointerPos
    };
    function getScrollPosition(pointerPos, dir) {
        return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
    }
    if (orientation === "horizontal") {
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarX, {
            ...commonProps,
            ref: forwardedRef,
            onThumbPositionChange: ()=>{
                if (context.viewport && thumbRef.current) {
                    const scrollPos = context.viewport.scrollLeft;
                    const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
                    thumbRef.current.style.transform = "translate3d(".concat(offset, "px, 0, 0)");
                }
            },
            onWheelScroll: (scrollPos)=>{
                if (context.viewport) context.viewport.scrollLeft = scrollPos;
            },
            onDragScroll: (pointerPos)=>{
                if (context.viewport) {
                    context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
                }
            }
        });
    }
    if (orientation === "vertical") {
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarY, {
            ...commonProps,
            ref: forwardedRef,
            onThumbPositionChange: ()=>{
                if (context.viewport && thumbRef.current) {
                    const scrollPos = context.viewport.scrollTop;
                    const offset = getThumbOffsetFromScroll(scrollPos, sizes);
                    thumbRef.current.style.transform = "translate3d(0, ".concat(offset, "px, 0)");
                }
            },
            onWheelScroll: (scrollPos)=>{
                if (context.viewport) context.viewport.scrollTop = scrollPos;
            },
            onDragScroll: (pointerPos)=>{
                if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
            }
        });
    }
    return null;
});
var ScrollAreaScrollbarX = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { sizes, onSizesChange, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const [computedStyle, setComputedStyle] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composeRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__/* .useComposedRefs */ .s)(forwardedRef, ref, context.onScrollbarXChange);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (ref.current) setComputedStyle(getComputedStyle(ref.current));
    }, [
        ref
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarImpl, {
        "data-orientation": "horizontal",
        ...scrollbarProps,
        ref: composeRefs,
        sizes,
        style: {
            bottom: 0,
            left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
            right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
            ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
            ...props.style
        },
        onThumbPointerDown: (pointerPos)=>props.onThumbPointerDown(pointerPos.x),
        onDragScroll: (pointerPos)=>props.onDragScroll(pointerPos.x),
        onWheelScroll: (event, maxScrollPos)=>{
            if (context.viewport) {
                const scrollPos = context.viewport.scrollLeft + event.deltaX;
                props.onWheelScroll(scrollPos);
                if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
                    event.preventDefault();
                }
            }
        },
        onResize: ()=>{
            if (ref.current && context.viewport && computedStyle) {
                onSizesChange({
                    content: context.viewport.scrollWidth,
                    viewport: context.viewport.offsetWidth,
                    scrollbar: {
                        size: ref.current.clientWidth,
                        paddingStart: toInt(computedStyle.paddingLeft),
                        paddingEnd: toInt(computedStyle.paddingRight)
                    }
                });
            }
        }
    });
});
var ScrollAreaScrollbarY = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { sizes, onSizesChange, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const [computedStyle, setComputedStyle] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composeRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__/* .useComposedRefs */ .s)(forwardedRef, ref, context.onScrollbarYChange);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (ref.current) setComputedStyle(getComputedStyle(ref.current));
    }, [
        ref
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaScrollbarImpl, {
        "data-orientation": "vertical",
        ...scrollbarProps,
        ref: composeRefs,
        sizes,
        style: {
            top: 0,
            right: context.dir === "ltr" ? 0 : void 0,
            left: context.dir === "rtl" ? 0 : void 0,
            bottom: "var(--radix-scroll-area-corner-height)",
            ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
            ...props.style
        },
        onThumbPointerDown: (pointerPos)=>props.onThumbPointerDown(pointerPos.y),
        onDragScroll: (pointerPos)=>props.onDragScroll(pointerPos.y),
        onWheelScroll: (event, maxScrollPos)=>{
            if (context.viewport) {
                const scrollPos = context.viewport.scrollTop + event.deltaY;
                props.onWheelScroll(scrollPos);
                if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
                    event.preventDefault();
                }
            }
        },
        onResize: ()=>{
            if (ref.current && context.viewport && computedStyle) {
                onSizesChange({
                    content: context.viewport.scrollHeight,
                    viewport: context.viewport.offsetHeight,
                    scrollbar: {
                        size: ref.current.clientHeight,
                        paddingStart: toInt(computedStyle.paddingTop),
                        paddingEnd: toInt(computedStyle.paddingBottom)
                    }
                });
            }
        }
    });
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea, sizes, hasThumb, onThumbChange, onThumbPointerUp, onThumbPointerDown, onThumbPositionChange, onDragScroll, onWheelScroll, onResize, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
    const [scrollbar, setScrollbar] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const composeRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__/* .useComposedRefs */ .s)(forwardedRef, (node)=>setScrollbar(node));
    const rectRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const prevWebkitUserSelectRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef("");
    const viewport = context.viewport;
    const maxScrollPos = sizes.content - sizes.viewport;
    const handleWheelScroll = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__/* .useCallbackRef */ .c)(onWheelScroll);
    const handleThumbPositionChange = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__/* .useCallbackRef */ .c)(onThumbPositionChange);
    const handleResize = useDebounceCallback(onResize, 10);
    function handleDragScroll(event) {
        if (rectRef.current) {
            const x = event.clientX - rectRef.current.left;
            const y = event.clientY - rectRef.current.top;
            onDragScroll({
                x,
                y
            });
        }
    }
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const handleWheel = (event)=>{
            const element = event.target;
            const isScrollbarWheel = scrollbar === null || scrollbar === void 0 ? void 0 : scrollbar.contains(element);
            if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
        };
        document.addEventListener("wheel", handleWheel, {
            passive: false
        });
        return ()=>document.removeEventListener("wheel", handleWheel, {
                passive: false
            });
    }, [
        viewport,
        scrollbar,
        maxScrollPos,
        handleWheelScroll
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(handleThumbPositionChange, [
        sizes,
        handleThumbPositionChange
    ]);
    useResizeObserver(scrollbar, handleResize);
    useResizeObserver(context.content, handleResize);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollbarProvider, {
        scope: __scopeScrollArea,
        scrollbar,
        hasThumb,
        onThumbChange: (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__/* .useCallbackRef */ .c)(onThumbChange),
        onThumbPointerUp: (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__/* .useCallbackRef */ .c)(onThumbPointerUp),
        onThumbPositionChange: handleThumbPositionChange,
        onThumbPointerDown: (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__/* .useCallbackRef */ .c)(onThumbPointerDown),
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.div, {
            ...scrollbarProps,
            ref: composeRefs,
            style: {
                position: "absolute",
                ...scrollbarProps.style
            },
            onPointerDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__/* .composeEventHandlers */ .mK)(props.onPointerDown, (event)=>{
                const mainPointer = 0;
                if (event.button === mainPointer) {
                    const element = event.target;
                    element.setPointerCapture(event.pointerId);
                    rectRef.current = scrollbar.getBoundingClientRect();
                    prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
                    document.body.style.webkitUserSelect = "none";
                    if (context.viewport) context.viewport.style.scrollBehavior = "auto";
                    handleDragScroll(event);
                }
            }),
            onPointerMove: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__/* .composeEventHandlers */ .mK)(props.onPointerMove, handleDragScroll),
            onPointerUp: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__/* .composeEventHandlers */ .mK)(props.onPointerUp, (event)=>{
                const element = event.target;
                if (element.hasPointerCapture(event.pointerId)) {
                    element.releasePointerCapture(event.pointerId);
                }
                document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
                if (context.viewport) context.viewport.style.scrollBehavior = "";
                rectRef.current = null;
            })
        })
    });
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_6__/* .Presence */ .C, {
        present: forceMount || scrollbarContext.hasThumb,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaThumbImpl, {
            ref: forwardedRef,
            ...thumbProps
        })
    });
});
var ScrollAreaThumbImpl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__/* .useComposedRefs */ .s)(forwardedRef, (node)=>scrollbarContext.onThumbChange(node));
    const removeUnlinkedScrollListenerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(()=>{
        if (removeUnlinkedScrollListenerRef.current) {
            removeUnlinkedScrollListenerRef.current();
            removeUnlinkedScrollListenerRef.current = void 0;
        }
    }, 100);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const viewport = scrollAreaContext.viewport;
        if (viewport) {
            const handleScroll = ()=>{
                debounceScrollEnd();
                if (!removeUnlinkedScrollListenerRef.current) {
                    const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
                    removeUnlinkedScrollListenerRef.current = listener;
                    onThumbPositionChange();
                }
            };
            onThumbPositionChange();
            viewport.addEventListener("scroll", handleScroll);
            return ()=>viewport.removeEventListener("scroll", handleScroll);
        }
    }, [
        scrollAreaContext.viewport,
        debounceScrollEnd,
        onThumbPositionChange
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.div, {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
            width: "var(--radix-scroll-area-thumb-width)",
            height: "var(--radix-scroll-area-thumb-height)",
            ...style
        },
        onPointerDownCapture: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__/* .composeEventHandlers */ .mK)(props.onPointerDownCapture, (event)=>{
            const thumb = event.target;
            const thumbRect = thumb.getBoundingClientRect();
            const x = event.clientX - thumbRect.left;
            const y = event.clientY - thumbRect.top;
            scrollbarContext.onThumbPointerDown({
                x,
                y
            });
        }),
        onPointerUp: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__/* .composeEventHandlers */ .mK)(props.onPointerUp, scrollbarContext.onThumbPointerUp)
    });
});
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ScrollAreaCornerImpl, {
        ...props,
        ref: forwardedRef
    }) : null;
});
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea, ...cornerProps } = props;
    const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
    const [width, setWidth] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    const [height, setHeight] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    const hasSize = Boolean(width && height);
    useResizeObserver(context.scrollbarX, ()=>{
        var _context_scrollbarX;
        const height2 = ((_context_scrollbarX = context.scrollbarX) === null || _context_scrollbarX === void 0 ? void 0 : _context_scrollbarX.offsetHeight) || 0;
        context.onCornerHeightChange(height2);
        setHeight(height2);
    });
    useResizeObserver(context.scrollbarY, ()=>{
        var _context_scrollbarY;
        const width2 = ((_context_scrollbarY = context.scrollbarY) === null || _context_scrollbarY === void 0 ? void 0 : _context_scrollbarY.offsetWidth) || 0;
        context.onCornerWidthChange(width2);
        setWidth(width2);
    });
    return hasSize ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_5__/* .Primitive */ .sG.div, {
        ...cornerProps,
        ref: forwardedRef,
        style: {
            width,
            height,
            position: "absolute",
            right: context.dir === "ltr" ? 0 : void 0,
            left: context.dir === "rtl" ? 0 : void 0,
            bottom: 0,
            ...props.style
        }
    }) : null;
});
function toInt(value) {
    return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
    const ratio = viewportSize / contentSize;
    return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
    const ratio = getThumbRatio(sizes.viewport, sizes.content);
    const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
    const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
    return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes) {
    let dir = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "ltr";
    const thumbSizePx = getThumbSize(sizes);
    const thumbCenter = thumbSizePx / 2;
    const offset = pointerOffset || thumbCenter;
    const thumbOffsetFromEnd = thumbSizePx - offset;
    const minPointerPos = sizes.scrollbar.paddingStart + offset;
    const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
    const maxScrollPos = sizes.content - sizes.viewport;
    const scrollRange = dir === "ltr" ? [
        0,
        maxScrollPos
    ] : [
        maxScrollPos * -1,
        0
    ];
    const interpolate = linearScale([
        minPointerPos,
        maxPointerPos
    ], scrollRange);
    return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes) {
    let dir = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "ltr";
    const thumbSizePx = getThumbSize(sizes);
    const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
    const scrollbar = sizes.scrollbar.size - scrollbarPadding;
    const maxScrollPos = sizes.content - sizes.viewport;
    const maxThumbPos = scrollbar - thumbSizePx;
    const scrollClampRange = dir === "ltr" ? [
        0,
        maxScrollPos
    ] : [
        maxScrollPos * -1,
        0
    ];
    const scrollWithoutMomentum = (0,_radix_ui_number__WEBPACK_IMPORTED_MODULE_9__/* .clamp */ .q)(scrollPos, scrollClampRange);
    const interpolate = linearScale([
        0,
        maxScrollPos
    ], [
        0,
        maxThumbPos
    ]);
    return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
    return (value)=>{
        if (input[0] === input[1] || output[0] === output[1]) return output[0];
        const ratio = (output[1] - output[0]) / (input[1] - input[0]);
        return output[0] + ratio * (value - input[0]);
    };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
    return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = function(node) {
    let handler = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ()=>{};
    let prevPosition = {
        left: node.scrollLeft,
        top: node.scrollTop
    };
    let rAF = 0;
    (function loop() {
        const position = {
            left: node.scrollLeft,
            top: node.scrollTop
        };
        const isHorizontalScroll = prevPosition.left !== position.left;
        const isVerticalScroll = prevPosition.top !== position.top;
        if (isHorizontalScroll || isVerticalScroll) handler();
        prevPosition = position;
        rAF = window.requestAnimationFrame(loop);
    })();
    return ()=>window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
    const handleCallback = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__/* .useCallbackRef */ .c)(callback);
    const debounceTimerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>()=>window.clearTimeout(debounceTimerRef.current), []);
    return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
        window.clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = window.setTimeout(handleCallback, delay);
    }, [
        handleCallback,
        delay
    ]);
}
function useResizeObserver(element, onResize) {
    const handleResize = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_8__/* .useCallbackRef */ .c)(onResize);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_10__/* .useLayoutEffect */ .N)(()=>{
        let rAF = 0;
        if (element) {
            const resizeObserver = new ResizeObserver(()=>{
                cancelAnimationFrame(rAF);
                rAF = window.requestAnimationFrame(handleResize);
            });
            resizeObserver.observe(element);
            return ()=>{
                window.cancelAnimationFrame(rAF);
                resizeObserver.unobserve(element);
            };
        }
    }, [
        element,
        handleResize
    ]);
}
var Root = ScrollArea;
var Viewport = ScrollAreaViewport;
var Scrollbar = (/* unused pure expression or super */ null && (ScrollAreaScrollbar));
var Thumb = (/* unused pure expression or super */ null && (ScrollAreaThumb));
var Corner = ScrollAreaCorner;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 63263:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronRight)
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
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("ChevronRight", __iconNode);
 //# sourceMappingURL=chevron-right.js.map


/***/ }),

/***/ 63366:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


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

/***/ 66065:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Info)
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
            d: "M12 16v-4",
            key: "1dtifu"
        }
    ],
    [
        "path",
        {
            d: "M12 8h.01",
            key: "e9boi3"
        }
    ]
];
const Info = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Info", __iconNode);
 //# sourceMappingURL=info.js.map


/***/ }),

/***/ 72431:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RG: () => (/* binding */ createRovingFocusGroupScope),
/* harmony export */   bL: () => (/* binding */ Root),
/* harmony export */   q7: () => (/* binding */ Item)
/* harmony export */ });
/* unused harmony exports RovingFocusGroup, RovingFocusGroupItem */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(92556);
/* harmony import */ var _radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79118);
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(94446);
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3468);
/* harmony import */ var _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(68946);
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(88142);
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(70222);
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23558);
/* harmony import */ var _radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(66218);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ Item,Root,RovingFocusGroup,RovingFocusGroupItem,createRovingFocusGroupScope auto */ // src/roving-focus-group.tsx











var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
};
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = (0,_radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_2__/* .createCollection */ .N)(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_3__/* .createContextScope */ .A)(GROUP_NAME, [
    createCollectionScope
]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Collection.Provider, {
        scope: props.__scopeRovingFocusGroup,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Collection.Slot, {
            scope: props.__scopeRovingFocusGroup,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RovingFocusGroupImpl, {
                ...props,
                ref: forwardedRef
            })
        })
    });
});
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(forwardedRef, ref);
    const direction = (0,_radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_5__/* .useDirection */ .jH)(dir);
    const [currentTabStopId, setCurrentTabStopId] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_6__/* .useControllableState */ .i)({
        prop: currentTabStopIdProp,
        defaultProp: defaultCurrentTabStopId !== null && defaultCurrentTabStopId !== void 0 ? defaultCurrentTabStopId : null,
        onChange: onCurrentTabStopIdChange,
        caller: GROUP_NAME
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const handleEntryFocus = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_7__/* .useCallbackRef */ .c)(onEntryFocus);
    const getItems = useCollection(__scopeRovingFocusGroup);
    const isClickFocusRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const [focusableItemsCount, setFocusableItemsCount] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const node = ref.current;
        if (node) {
            node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
            return ()=>node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
        }
    }, [
        handleEntryFocus
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RovingFocusProvider, {
        scope: __scopeRovingFocusGroup,
        orientation,
        dir: direction,
        loop,
        currentTabStopId,
        onItemFocus: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((tabStopId)=>setCurrentTabStopId(tabStopId), [
            setCurrentTabStopId
        ]),
        onItemShiftTab: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setIsTabbingBackOut(true), []),
        onFocusableItemAdd: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setFocusableItemsCount((prevCount)=>prevCount + 1), []),
        onFocusableItemRemove: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setFocusableItemsCount((prevCount)=>prevCount - 1), []),
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__/* .Primitive */ .sG.div, {
            tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
            "data-orientation": orientation,
            ...groupProps,
            ref: composedRefs,
            style: {
                outline: "none",
                ...props.style
            },
            onMouseDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onMouseDown, ()=>{
                isClickFocusRef.current = true;
            }),
            onFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onFocus, (event)=>{
                const isKeyboardFocus = !isClickFocusRef.current;
                if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                    const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
                    event.currentTarget.dispatchEvent(entryFocusEvent);
                    if (!entryFocusEvent.defaultPrevented) {
                        const items = getItems().filter((item)=>item.focusable);
                        const activeItem = items.find((item)=>item.active);
                        const currentItem = items.find((item)=>item.id === currentTabStopId);
                        const candidateItems = [
                            activeItem,
                            currentItem,
                            ...items
                        ].filter(Boolean);
                        const candidateNodes = candidateItems.map((item)=>item.ref.current);
                        focusFirst(candidateNodes, preventScrollOnEntryFocus);
                    }
                }
                isClickFocusRef.current = false;
            }),
            onBlur: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onBlur, ()=>setIsTabbingBackOut(false))
        })
    });
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
    const autoId = (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_10__/* .useId */ .B)();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (focusable) {
            onFocusableItemAdd();
            return ()=>onFocusableItemRemove();
        }
    }, [
        focusable,
        onFocusableItemAdd,
        onFocusableItemRemove
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Collection.ItemSlot, {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__/* .Primitive */ .sG.span, {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onMouseDown, (event)=>{
                if (!focusable) event.preventDefault();
                else context.onItemFocus(id);
            }),
            onFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onFocus, ()=>context.onItemFocus(id)),
            onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_9__/* .composeEventHandlers */ .mK)(props.onKeyDown, (event)=>{
                if (event.key === "Tab" && event.shiftKey) {
                    context.onItemShiftTab();
                    return;
                }
                if (event.target !== event.currentTarget) return;
                const focusIntent = getFocusIntent(event, context.orientation, context.dir);
                if (focusIntent !== void 0) {
                    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                    event.preventDefault();
                    const items = getItems().filter((item)=>item.focusable);
                    let candidateNodes = items.map((item)=>item.ref.current);
                    if (focusIntent === "last") candidateNodes.reverse();
                    else if (focusIntent === "prev" || focusIntent === "next") {
                        if (focusIntent === "prev") candidateNodes.reverse();
                        const currentIndex = candidateNodes.indexOf(event.currentTarget);
                        candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                    }
                    setTimeout(()=>focusFirst(candidateNodes));
                }
            }),
            children: typeof children === "function" ? children({
                isCurrentTabStop,
                hasTabStop: currentTabStopId != null
            }) : children
        })
    });
});
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
};
function getDirectionAwareKey(key, dir) {
    if (dir !== "rtl") return key;
    return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
    const key = getDirectionAwareKey(event.key, dir);
    if (orientation === "vertical" && [
        "ArrowLeft",
        "ArrowRight"
    ].includes(key)) return void 0;
    if (orientation === "horizontal" && [
        "ArrowUp",
        "ArrowDown"
    ].includes(key)) return void 0;
    return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates) {
    let preventScroll = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates){
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate.focus({
            preventScroll
        });
        if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
}
function wrapArray(array, startIndex) {
    return array.map((_, index)=>array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 75797:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Circle)
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
    ]
];
const Circle = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Circle", __iconNode);
 //# sourceMappingURL=circle.js.map


/***/ }),

/***/ 78770:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleAlert)
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
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "8",
            y2: "12",
            key: "1pkeuh"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12.01",
            y1: "16",
            y2: "16",
            key: "4dfq90"
        }
    ]
];
const CircleAlert = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("CircleAlert", __iconNode);
 //# sourceMappingURL=circle-alert.js.map


/***/ }),

/***/ 85989:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Sun)
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
            r: "4",
            key: "4exip2"
        }
    ],
    [
        "path",
        {
            d: "M12 2v2",
            key: "tus03m"
        }
    ],
    [
        "path",
        {
            d: "M12 20v2",
            key: "1lh1kg"
        }
    ],
    [
        "path",
        {
            d: "m4.93 4.93 1.41 1.41",
            key: "149t6j"
        }
    ],
    [
        "path",
        {
            d: "m17.66 17.66 1.41 1.41",
            key: "ptbguv"
        }
    ],
    [
        "path",
        {
            d: "M2 12h2",
            key: "1t8f8n"
        }
    ],
    [
        "path",
        {
            d: "M20 12h2",
            key: "1q8mjw"
        }
    ],
    [
        "path",
        {
            d: "m6.34 17.66-1.41 1.41",
            key: "1m8zz5"
        }
    ],
    [
        "path",
        {
            d: "m19.07 4.93-1.41 1.41",
            key: "1shlcs"
        }
    ]
];
const Sun = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Sun", __iconNode);
 //# sourceMappingURL=sun.js.map


/***/ }),

/***/ 90576:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Bell)
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
            d: "M10.268 21a2 2 0 0 0 3.464 0",
            key: "vwvbt9"
        }
    ],
    [
        "path",
        {
            d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
            key: "11g9vi"
        }
    ]
];
const Bell = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Bell", __iconNode);
 //# sourceMappingURL=bell.js.map


/***/ }),

/***/ 98428:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LogOut)
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
            d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
            key: "1uf3rs"
        }
    ],
    [
        "polyline",
        {
            points: "16 17 21 12 16 7",
            key: "1gabdz"
        }
    ],
    [
        "line",
        {
            x1: "21",
            x2: "9",
            y1: "12",
            y2: "12",
            key: "1uyos4"
        }
    ]
];
const LogOut = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("LogOut", __iconNode);
 //# sourceMappingURL=log-out.js.map


/***/ })

}]);