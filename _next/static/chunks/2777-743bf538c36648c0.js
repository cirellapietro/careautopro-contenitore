"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[2777],{

/***/ 14744:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  UC: () => (/* binding */ Content2),
  YJ: () => (/* binding */ Group),
  In: () => (/* binding */ Icon),
  q7: () => (/* binding */ Item),
  VF: () => (/* binding */ ItemIndicator),
  p4: () => (/* binding */ ItemText),
  JU: () => (/* binding */ Label),
  ZL: () => (/* binding */ Portal),
  bL: () => (/* binding */ Root2),
  wn: () => (/* binding */ ScrollDownButton),
  PP: () => (/* binding */ ScrollUpButton),
  wv: () => (/* binding */ Separator),
  l9: () => (/* binding */ Trigger),
  WT: () => (/* binding */ Value),
  LM: () => (/* binding */ Viewport)
});

// UNUSED EXPORTS: Arrow, Select, SelectArrow, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, SelectViewport, createSelectScope

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react-dom/index.js
var react_dom = __webpack_require__(47650);
// EXTERNAL MODULE: ./node_modules/@radix-ui/number/dist/index.mjs
var dist = __webpack_require__(34212);
// EXTERNAL MODULE: ./node_modules/@radix-ui/primitive/dist/index.mjs
var primitive_dist = __webpack_require__(92556);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-collection/dist/index.mjs + 8 modules
var react_collection_dist = __webpack_require__(79118);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var react_compose_refs_dist = __webpack_require__(94446);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-context/dist/index.mjs
var react_context_dist = __webpack_require__(3468);
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
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-primitive/dist/index.mjs + 1 modules
var react_primitive_dist = __webpack_require__(88142);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
;// ./node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-slot/dist/index.mjs
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
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var react_use_controllable_state_dist = __webpack_require__(23558);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var react_use_layout_effect_dist = __webpack_require__(4129);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-previous/dist/index.mjs
var react_use_previous_dist = __webpack_require__(78108);
;// ./node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
// src/visually-hidden.tsx



var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var NAME = "VisuallyHidden";
var VisuallyHidden = react.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(
      react_primitive_dist/* Primitive */.sG.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }
);
VisuallyHidden.displayName = NAME;
var Root = (/* unused pure expression or super */ null && (VisuallyHidden));

//# sourceMappingURL=index.mjs.map

// EXTERNAL MODULE: ./node_modules/aria-hidden/dist/es2015/index.js
var es2015 = __webpack_require__(97745);
// EXTERNAL MODULE: ./node_modules/react-remove-scroll/dist/es2015/Combination.js + 20 modules
var Combination = __webpack_require__(14432);
;// ./node_modules/@radix-ui/react-select/dist/index.mjs
/* __next_internal_client_entry_do_not_use__ Arrow,Content,Group,Icon,Item,ItemIndicator,ItemText,Label,Portal,Root,ScrollDownButton,ScrollUpButton,Select,SelectArrow,SelectContent,SelectGroup,SelectIcon,SelectItem,SelectItemIndicator,SelectItemText,SelectLabel,SelectPortal,SelectScrollDownButton,SelectScrollUpButton,SelectSeparator,SelectTrigger,SelectValue,SelectViewport,Separator,Trigger,Value,Viewport,createSelectScope auto */ // src/select.tsx

























var OPEN_KEYS = [
    " ",
    "Enter",
    "ArrowUp",
    "ArrowDown"
];
var SELECTION_KEYS = [
    " ",
    "Enter"
];
var SELECT_NAME = "Select";
var [Collection, useCollection, createCollectionScope] = (0,react_collection_dist/* createCollection */.N)(SELECT_NAME);
var [createSelectContext, createSelectScope] = (0,react_context_dist/* createContextScope */.A)(SELECT_NAME, [
    createCollectionScope,
    react_popper_dist/* createPopperScope */.Bk
]);
var usePopperScope = (0,react_popper_dist/* createPopperScope */.Bk)();
var [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var Select = (props)=>{
    const { __scopeSelect, children, open: openProp, defaultOpen, onOpenChange, value: valueProp, defaultValue, onValueChange, dir, name, autoComplete, disabled, required, form } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const [trigger, setTrigger] = react.useState(null);
    const [valueNode, setValueNode] = react.useState(null);
    const [valueNodeHasChildren, setValueNodeHasChildren] = react.useState(false);
    const direction = (0,react_direction_dist/* useDirection */.jH)(dir);
    const [open, setOpen] = (0,react_use_controllable_state_dist/* useControllableState */.i)({
        prop: openProp,
        defaultProp: defaultOpen !== null && defaultOpen !== void 0 ? defaultOpen : false,
        onChange: onOpenChange,
        caller: SELECT_NAME
    });
    const [value, setValue] = (0,react_use_controllable_state_dist/* useControllableState */.i)({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange,
        caller: SELECT_NAME
    });
    const triggerPointerDownPosRef = react.useRef(null);
    const isFormControl = trigger ? form || !!trigger.closest("form") : true;
    const [nativeOptionsSet, setNativeOptionsSet] = react.useState(/* @__PURE__ */ new Set());
    const nativeSelectKey = Array.from(nativeOptionsSet).map((option)=>option.props.value).join(";");
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_popper_dist/* Root */.bL, {
        ...popperScope,
        children: /* @__PURE__ */ (0,jsx_runtime.jsxs)(SelectProvider, {
            required,
            scope: __scopeSelect,
            trigger,
            onTriggerChange: setTrigger,
            valueNode,
            onValueNodeChange: setValueNode,
            valueNodeHasChildren,
            onValueNodeHasChildrenChange: setValueNodeHasChildren,
            contentId: (0,react_id_dist/* useId */.B)(),
            value,
            onValueChange: setValue,
            open,
            onOpenChange: setOpen,
            dir: direction,
            triggerPointerDownPosRef,
            disabled,
            children: [
                /* @__PURE__ */ (0,jsx_runtime.jsx)(Collection.Provider, {
                    scope: __scopeSelect,
                    children: /* @__PURE__ */ (0,jsx_runtime.jsx)(SelectNativeOptionsProvider, {
                        scope: props.__scopeSelect,
                        onNativeOptionAdd: react.useCallback((option)=>{
                            setNativeOptionsSet((prev)=>new Set(prev).add(option));
                        }, []),
                        onNativeOptionRemove: react.useCallback((option)=>{
                            setNativeOptionsSet((prev)=>{
                                const optionsSet = new Set(prev);
                                optionsSet.delete(option);
                                return optionsSet;
                            });
                        }, []),
                        children
                    })
                }),
                isFormControl ? /* @__PURE__ */ (0,jsx_runtime.jsxs)(SelectBubbleInput, {
                    "aria-hidden": true,
                    required,
                    tabIndex: -1,
                    name,
                    autoComplete,
                    value,
                    onChange: (event)=>setValue(event.target.value),
                    disabled,
                    form,
                    children: [
                        value === void 0 ? /* @__PURE__ */ (0,jsx_runtime.jsx)("option", {
                            value: ""
                        }) : null,
                        Array.from(nativeOptionsSet)
                    ]
                }, nativeSelectKey) : null
            ]
        })
    });
};
Select.displayName = SELECT_NAME;
var TRIGGER_NAME = "SelectTrigger";
var SelectTrigger = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, disabled = false, ...triggerProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(TRIGGER_NAME, __scopeSelect);
    const isDisabled = context.disabled || disabled;
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, context.onTriggerChange);
    const getItems = useCollection(__scopeSelect);
    const pointerTypeRef = react.useRef("touch");
    const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search)=>{
        const enabledItems = getItems().filter((item)=>!item.disabled);
        const currentItem = enabledItems.find((item)=>item.value === context.value);
        const nextItem = findNextItem(enabledItems, search, currentItem);
        if (nextItem !== void 0) {
            context.onValueChange(nextItem.value);
        }
    });
    const handleOpen = (pointerEvent)=>{
        if (!isDisabled) {
            context.onOpenChange(true);
            resetTypeahead();
        }
        if (pointerEvent) {
            context.triggerPointerDownPosRef.current = {
                x: Math.round(pointerEvent.pageX),
                y: Math.round(pointerEvent.pageY)
            };
        }
    };
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_popper_dist/* Anchor */.Mz, {
        asChild: true,
        ...popperScope,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.button, {
            type: "button",
            role: "combobox",
            "aria-controls": context.contentId,
            "aria-expanded": context.open,
            "aria-required": context.required,
            "aria-autocomplete": "none",
            dir: context.dir,
            "data-state": context.open ? "open" : "closed",
            disabled: isDisabled,
            "data-disabled": isDisabled ? "" : void 0,
            "data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
            ...triggerProps,
            ref: composedRefs,
            onClick: (0,primitive_dist/* composeEventHandlers */.mK)(triggerProps.onClick, (event)=>{
                event.currentTarget.focus();
                if (pointerTypeRef.current !== "mouse") {
                    handleOpen(event);
                }
            }),
            onPointerDown: (0,primitive_dist/* composeEventHandlers */.mK)(triggerProps.onPointerDown, (event)=>{
                pointerTypeRef.current = event.pointerType;
                const target = event.target;
                if (target.hasPointerCapture(event.pointerId)) {
                    target.releasePointerCapture(event.pointerId);
                }
                if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
                    handleOpen(event);
                    event.preventDefault();
                }
            }),
            onKeyDown: (0,primitive_dist/* composeEventHandlers */.mK)(triggerProps.onKeyDown, (event)=>{
                const isTypingAhead = searchRef.current !== "";
                const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
                if (isTypingAhead && event.key === " ") return;
                if (OPEN_KEYS.includes(event.key)) {
                    handleOpen();
                    event.preventDefault();
                }
            })
        })
    });
});
SelectTrigger.displayName = TRIGGER_NAME;
var VALUE_NAME = "SelectValue";
var SelectValue = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
    const context = useSelectContext(VALUE_NAME, __scopeSelect);
    const { onValueNodeHasChildrenChange } = context;
    const hasChildren = children !== void 0;
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, context.onValueNodeChange);
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>{
        onValueNodeHasChildrenChange(hasChildren);
    }, [
        onValueNodeHasChildrenChange,
        hasChildren
    ]);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.span, {
        ...valueProps,
        ref: composedRefs,
        style: {
            pointerEvents: "none"
        },
        children: shouldShowPlaceholder(context.value) ? /* @__PURE__ */ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
            children: placeholder
        }) : children
    });
});
SelectValue.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, children, ...iconProps } = props;
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.span, {
        "aria-hidden": true,
        ...iconProps,
        ref: forwardedRef,
        children: children || "\u25BC"
    });
});
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME = "SelectPortal";
var SelectPortal = (props)=>{
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_portal_dist/* Portal */.Z, {
        asChild: true,
        ...props
    });
};
SelectPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "SelectContent";
var SelectContent = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const context = useSelectContext(CONTENT_NAME, props.__scopeSelect);
    const [fragment, setFragment] = react.useState();
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>{
        setFragment(new DocumentFragment());
    }, []);
    if (!context.open) {
        const frag = fragment;
        return frag ? /*#__PURE__*/ react_dom.createPortal(/* @__PURE__ */ (0,jsx_runtime.jsx)(SelectContentProvider, {
            scope: props.__scopeSelect,
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Collection.Slot, {
                scope: props.__scopeSelect,
                children: /* @__PURE__ */ (0,jsx_runtime.jsx)("div", {
                    children: props.children
                })
            })
        }), frag) : null;
    }
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(SelectContentImpl, {
        ...props,
        ref: forwardedRef
    });
});
SelectContent.displayName = CONTENT_NAME;
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var dist_Slot = createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, position = "item-aligned", onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, //
    // PopperContent props
    side, sideOffset, align, alignOffset, arrowPadding, collisionBoundary, collisionPadding, sticky, hideWhenDetached, avoidCollisions, //
    ...contentProps } = props;
    const context = useSelectContext(CONTENT_NAME, __scopeSelect);
    const [content, setContent] = react.useState(null);
    const [viewport, setViewport] = react.useState(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, (node)=>setContent(node));
    const [selectedItem, setSelectedItem] = react.useState(null);
    const [selectedItemText, setSelectedItemText] = react.useState(null);
    const getItems = useCollection(__scopeSelect);
    const [isPositioned, setIsPositioned] = react.useState(false);
    const firstValidItemFoundRef = react.useRef(false);
    react.useEffect(()=>{
        if (content) return (0,es2015/* hideOthers */.Eq)(content);
    }, [
        content
    ]);
    (0,react_focus_guards_dist/* useFocusGuards */.Oh)();
    const focusFirst = react.useCallback((candidates)=>{
        const [firstItem, ...restItems] = getItems().map((item)=>item.ref.current);
        const [lastItem] = restItems.slice(-1);
        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
        for (const candidate of candidates){
            if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
            candidate === null || candidate === void 0 ? void 0 : candidate.scrollIntoView({
                block: "nearest"
            });
            if (candidate === firstItem && viewport) viewport.scrollTop = 0;
            if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
            candidate === null || candidate === void 0 ? void 0 : candidate.focus();
            if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
        }
    }, [
        getItems,
        viewport
    ]);
    const focusSelectedItem = react.useCallback(()=>focusFirst([
            selectedItem,
            content
        ]), [
        focusFirst,
        selectedItem,
        content
    ]);
    react.useEffect(()=>{
        if (isPositioned) {
            focusSelectedItem();
        }
    }, [
        isPositioned,
        focusSelectedItem
    ]);
    const { onOpenChange, triggerPointerDownPosRef } = context;
    react.useEffect(()=>{
        if (content) {
            let pointerMoveDelta = {
                x: 0,
                y: 0
            };
            const handlePointerMove = (event)=>{
                var _triggerPointerDownPosRef_current, _triggerPointerDownPosRef_current1;
                var _triggerPointerDownPosRef_current_x, _triggerPointerDownPosRef_current_y;
                pointerMoveDelta = {
                    x: Math.abs(Math.round(event.pageX) - ((_triggerPointerDownPosRef_current_x = (_triggerPointerDownPosRef_current = triggerPointerDownPosRef.current) === null || _triggerPointerDownPosRef_current === void 0 ? void 0 : _triggerPointerDownPosRef_current.x) !== null && _triggerPointerDownPosRef_current_x !== void 0 ? _triggerPointerDownPosRef_current_x : 0)),
                    y: Math.abs(Math.round(event.pageY) - ((_triggerPointerDownPosRef_current_y = (_triggerPointerDownPosRef_current1 = triggerPointerDownPosRef.current) === null || _triggerPointerDownPosRef_current1 === void 0 ? void 0 : _triggerPointerDownPosRef_current1.y) !== null && _triggerPointerDownPosRef_current_y !== void 0 ? _triggerPointerDownPosRef_current_y : 0))
                };
            };
            const handlePointerUp = (event)=>{
                if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
                    event.preventDefault();
                } else {
                    if (!content.contains(event.target)) {
                        onOpenChange(false);
                    }
                }
                document.removeEventListener("pointermove", handlePointerMove);
                triggerPointerDownPosRef.current = null;
            };
            if (triggerPointerDownPosRef.current !== null) {
                document.addEventListener("pointermove", handlePointerMove);
                document.addEventListener("pointerup", handlePointerUp, {
                    capture: true,
                    once: true
                });
            }
            return ()=>{
                document.removeEventListener("pointermove", handlePointerMove);
                document.removeEventListener("pointerup", handlePointerUp, {
                    capture: true
                });
            };
        }
    }, [
        content,
        onOpenChange,
        triggerPointerDownPosRef
    ]);
    react.useEffect(()=>{
        const close = ()=>onOpenChange(false);
        window.addEventListener("blur", close);
        window.addEventListener("resize", close);
        return ()=>{
            window.removeEventListener("blur", close);
            window.removeEventListener("resize", close);
        };
    }, [
        onOpenChange
    ]);
    const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search)=>{
        const enabledItems = getItems().filter((item)=>!item.disabled);
        const currentItem = enabledItems.find((item)=>item.ref.current === document.activeElement);
        const nextItem = findNextItem(enabledItems, search, currentItem);
        if (nextItem) {
            setTimeout(()=>nextItem.ref.current.focus());
        }
    });
    const itemRefCallback = react.useCallback((node, value, disabled)=>{
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
            setSelectedItem(node);
            if (isFirstValidItem) firstValidItemFoundRef.current = true;
        }
    }, [
        context.value
    ]);
    const handleItemLeave = react.useCallback(()=>content === null || content === void 0 ? void 0 : content.focus(), [
        content
    ]);
    const itemTextRefCallback = react.useCallback((node, value, disabled)=>{
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
            setSelectedItemText(node);
        }
    }, [
        context.value
    ]);
    const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
    const popperContentProps = SelectPosition === SelectPopperPosition ? {
        side,
        sideOffset,
        align,
        alignOffset,
        arrowPadding,
        collisionBoundary,
        collisionPadding,
        sticky,
        hideWhenDetached,
        avoidCollisions
    } : {};
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(SelectContentProvider, {
        scope: __scopeSelect,
        content,
        viewport,
        onViewportChange: setViewport,
        itemRefCallback,
        selectedItem,
        onItemLeave: handleItemLeave,
        itemTextRefCallback,
        focusSelectedItem,
        selectedItemText,
        position,
        isPositioned,
        searchRef,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Combination/* default */.A, {
            as: dist_Slot,
            allowPinchZoom: true,
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_focus_scope_dist/* FocusScope */.n, {
                asChild: true,
                trapped: context.open,
                onMountAutoFocus: (event)=>{
                    event.preventDefault();
                },
                onUnmountAutoFocus: (0,primitive_dist/* composeEventHandlers */.mK)(onCloseAutoFocus, (event)=>{
                    var _context_trigger;
                    (_context_trigger = context.trigger) === null || _context_trigger === void 0 ? void 0 : _context_trigger.focus({
                        preventScroll: true
                    });
                    event.preventDefault();
                }),
                children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_dismissable_layer_dist/* DismissableLayer */.qW, {
                    asChild: true,
                    disableOutsidePointerEvents: true,
                    onEscapeKeyDown,
                    onPointerDownOutside,
                    onFocusOutside: (event)=>event.preventDefault(),
                    onDismiss: ()=>context.onOpenChange(false),
                    children: /* @__PURE__ */ (0,jsx_runtime.jsx)(SelectPosition, {
                        role: "listbox",
                        id: context.contentId,
                        "data-state": context.open ? "open" : "closed",
                        dir: context.dir,
                        onContextMenu: (event)=>event.preventDefault(),
                        ...contentProps,
                        ...popperContentProps,
                        onPlaced: ()=>setIsPositioned(true),
                        ref: composedRefs,
                        style: {
                            // flex layout so we can place the scroll buttons properly
                            display: "flex",
                            flexDirection: "column",
                            // reset the outline by default as the content MAY get focused
                            outline: "none",
                            ...contentProps.style
                        },
                        onKeyDown: (0,primitive_dist/* composeEventHandlers */.mK)(contentProps.onKeyDown, (event)=>{
                            const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                            if (event.key === "Tab") event.preventDefault();
                            if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
                            if ([
                                "ArrowUp",
                                "ArrowDown",
                                "Home",
                                "End"
                            ].includes(event.key)) {
                                const items = getItems().filter((item)=>!item.disabled);
                                let candidateNodes = items.map((item)=>item.ref.current);
                                if ([
                                    "ArrowUp",
                                    "End"
                                ].includes(event.key)) {
                                    candidateNodes = candidateNodes.slice().reverse();
                                }
                                if ([
                                    "ArrowUp",
                                    "ArrowDown"
                                ].includes(event.key)) {
                                    const currentElement = event.target;
                                    const currentIndex = candidateNodes.indexOf(currentElement);
                                    candidateNodes = candidateNodes.slice(currentIndex + 1);
                                }
                                setTimeout(()=>focusFirst(candidateNodes));
                                event.preventDefault();
                            }
                        })
                    })
                })
            })
        })
    });
});
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, onPlaced, ...popperProps } = props;
    const context = useSelectContext(CONTENT_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(CONTENT_NAME, __scopeSelect);
    const [contentWrapper, setContentWrapper] = react.useState(null);
    const [content, setContent] = react.useState(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, (node)=>setContent(node));
    const getItems = useCollection(__scopeSelect);
    const shouldExpandOnScrollRef = react.useRef(false);
    const shouldRepositionRef = react.useRef(true);
    const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
    const position = react.useCallback(()=>{
        if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
            const triggerRect = context.trigger.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();
            const valueNodeRect = context.valueNode.getBoundingClientRect();
            const itemTextRect = selectedItemText.getBoundingClientRect();
            if (context.dir !== "rtl") {
                const itemTextOffset = itemTextRect.left - contentRect.left;
                const left = valueNodeRect.left - itemTextOffset;
                const leftDelta = triggerRect.left - left;
                const minContentWidth = triggerRect.width + leftDelta;
                const contentWidth = Math.max(minContentWidth, contentRect.width);
                const rightEdge = window.innerWidth - CONTENT_MARGIN;
                const clampedLeft = (0,dist/* clamp */.q)(left, [
                    CONTENT_MARGIN,
                    // Prevents the content from going off the starting edge of the
                    // viewport. It may still go off the ending edge, but this can be
                    // controlled by the user since they may want to manage overflow in a
                    // specific way.
                    // https://github.com/radix-ui/primitives/issues/2049
                    Math.max(CONTENT_MARGIN, rightEdge - contentWidth)
                ]);
                contentWrapper.style.minWidth = minContentWidth + "px";
                contentWrapper.style.left = clampedLeft + "px";
            } else {
                const itemTextOffset = contentRect.right - itemTextRect.right;
                const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
                const rightDelta = window.innerWidth - triggerRect.right - right;
                const minContentWidth = triggerRect.width + rightDelta;
                const contentWidth = Math.max(minContentWidth, contentRect.width);
                const leftEdge = window.innerWidth - CONTENT_MARGIN;
                const clampedRight = (0,dist/* clamp */.q)(right, [
                    CONTENT_MARGIN,
                    Math.max(CONTENT_MARGIN, leftEdge - contentWidth)
                ]);
                contentWrapper.style.minWidth = minContentWidth + "px";
                contentWrapper.style.right = clampedRight + "px";
            }
            const items = getItems();
            const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
            const itemsHeight = viewport.scrollHeight;
            const contentStyles = window.getComputedStyle(content);
            const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
            const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
            const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
            const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
            const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
            const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
            const viewportStyles = window.getComputedStyle(viewport);
            const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
            const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
            const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
            const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
            const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
            const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
            const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
            const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
            const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
            if (willAlignWithoutTopOverflow) {
                const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
                contentWrapper.style.bottom = "0px";
                const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
                const clampedTriggerMiddleToBottomEdge = Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + // viewport might have padding bottom, include it to avoid a scrollable viewport
                (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
                const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
                contentWrapper.style.height = height + "px";
            } else {
                const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
                contentWrapper.style.top = "0px";
                const clampedTopEdgeToTriggerMiddle = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
                (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight);
                const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
                contentWrapper.style.height = height + "px";
                viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
            }
            contentWrapper.style.margin = "".concat(CONTENT_MARGIN, "px 0");
            contentWrapper.style.minHeight = minContentHeight + "px";
            contentWrapper.style.maxHeight = availableHeight + "px";
            onPlaced === null || onPlaced === void 0 ? void 0 : onPlaced();
            requestAnimationFrame(()=>shouldExpandOnScrollRef.current = true);
        }
    }, [
        getItems,
        context.trigger,
        context.valueNode,
        contentWrapper,
        content,
        viewport,
        selectedItem,
        selectedItemText,
        context.dir,
        onPlaced
    ]);
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>position(), [
        position
    ]);
    const [contentZIndex, setContentZIndex] = react.useState();
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>{
        if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [
        content
    ]);
    const handleScrollButtonChange = react.useCallback((node)=>{
        if (node && shouldRepositionRef.current === true) {
            position();
            focusSelectedItem === null || focusSelectedItem === void 0 ? void 0 : focusSelectedItem();
            shouldRepositionRef.current = false;
        }
    }, [
        position,
        focusSelectedItem
    ]);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(SelectViewportProvider, {
        scope: __scopeSelect,
        contentWrapper,
        shouldExpandOnScrollRef,
        onScrollButtonChange: handleScrollButtonChange,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)("div", {
            ref: setContentWrapper,
            style: {
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                zIndex: contentZIndex
            },
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
                ...popperProps,
                ref: composedRefs,
                style: {
                    // When we get the height of the content, it includes borders. If we were to set
                    // the height without having `boxSizing: 'border-box'` it would be too big.
                    boxSizing: "border-box",
                    // We need to ensure the content doesn't get taller than the wrapper
                    maxHeight: "100%",
                    ...popperProps.style
                }
            })
        })
    });
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, align = "start", collisionPadding = CONTENT_MARGIN, ...popperProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_popper_dist/* Content */.UC, {
        ...popperScope,
        ...popperProps,
        ref: forwardedRef,
        align,
        collisionPadding,
        style: {
            // Ensure border-box for floating-ui calculations
            boxSizing: "border-box",
            ...popperProps.style,
            // re-namespace exposed content custom properties
            ...{
                "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-select-content-available-width": "var(--radix-popper-available-width)",
                "--radix-select-content-available-height": "var(--radix-popper-available-height)",
                "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
            }
        }
    });
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, nonce, ...viewportProps } = props;
    const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
    const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, contentContext.onViewportChange);
    const prevScrollTopRef = react.useRef(0);
    return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)("style", {
                dangerouslySetInnerHTML: {
                    __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
                },
                nonce
            }),
            /* @__PURE__ */ (0,jsx_runtime.jsx)(Collection.Slot, {
                scope: __scopeSelect,
                children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
                    "data-radix-select-viewport": "",
                    role: "presentation",
                    ...viewportProps,
                    ref: composedRefs,
                    style: {
                        // we use position: 'relative' here on the `viewport` so that when we call
                        // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
                        // (independent of the scrollUpButton).
                        position: "relative",
                        flex: 1,
                        // Viewport should only be scrollable in the vertical direction.
                        // This won't work in vertical writing modes, so we'll need to
                        // revisit this if/when that is supported
                        // https://developer.chrome.com/blog/vertical-form-controls
                        overflow: "hidden auto",
                        ...viewportProps.style
                    },
                    onScroll: (0,primitive_dist/* composeEventHandlers */.mK)(viewportProps.onScroll, (event)=>{
                        const viewport = event.currentTarget;
                        const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
                        if ((shouldExpandOnScrollRef === null || shouldExpandOnScrollRef === void 0 ? void 0 : shouldExpandOnScrollRef.current) && contentWrapper) {
                            const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
                            if (scrolledBy > 0) {
                                const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
                                const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
                                const cssHeight = parseFloat(contentWrapper.style.height);
                                const prevHeight = Math.max(cssMinHeight, cssHeight);
                                if (prevHeight < availableHeight) {
                                    const nextHeight = prevHeight + scrolledBy;
                                    const clampedNextHeight = Math.min(availableHeight, nextHeight);
                                    const heightDiff = nextHeight - clampedNextHeight;
                                    contentWrapper.style.height = clampedNextHeight + "px";
                                    if (contentWrapper.style.bottom === "0px") {
                                        viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                                        contentWrapper.style.justifyContent = "flex-end";
                                    }
                                }
                            }
                        }
                        prevScrollTopRef.current = viewport.scrollTop;
                    })
                })
            })
        ]
    });
});
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME);
var SelectGroup = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, ...groupProps } = props;
    const groupId = (0,react_id_dist/* useId */.B)();
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(SelectGroupContextProvider, {
        scope: __scopeSelect,
        id: groupId,
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
            role: "group",
            "aria-labelledby": groupId,
            ...groupProps,
            ref: forwardedRef
        })
    });
});
SelectGroup.displayName = GROUP_NAME;
var LABEL_NAME = "SelectLabel";
var SelectLabel = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, ...labelProps } = props;
    const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
        id: groupContext.id,
        ...labelProps,
        ref: forwardedRef
    });
});
SelectLabel.displayName = LABEL_NAME;
var ITEM_NAME = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME);
var SelectItem = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, value, disabled = false, textValue: textValueProp, ...itemProps } = props;
    const context = useSelectContext(ITEM_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_NAME, __scopeSelect);
    const isSelected = context.value === value;
    const [textValue, setTextValue] = react.useState(textValueProp !== null && textValueProp !== void 0 ? textValueProp : "");
    const [isFocused, setIsFocused] = react.useState(false);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, (node)=>{
        var _contentContext_itemRefCallback;
        return (_contentContext_itemRefCallback = contentContext.itemRefCallback) === null || _contentContext_itemRefCallback === void 0 ? void 0 : _contentContext_itemRefCallback.call(contentContext, node, value, disabled);
    });
    const textId = (0,react_id_dist/* useId */.B)();
    const pointerTypeRef = react.useRef("touch");
    const handleSelect = ()=>{
        if (!disabled) {
            context.onValueChange(value);
            context.onOpenChange(false);
        }
    };
    if (value === "") {
        throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
    }
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(SelectItemContextProvider, {
        scope: __scopeSelect,
        value,
        disabled,
        textId,
        isSelected,
        onItemTextChange: react.useCallback((node)=>{
            setTextValue((prevTextValue)=>{
                var _node_textContent;
                return prevTextValue || ((_node_textContent = node === null || node === void 0 ? void 0 : node.textContent) !== null && _node_textContent !== void 0 ? _node_textContent : "").trim();
            });
        }, []),
        children: /* @__PURE__ */ (0,jsx_runtime.jsx)(Collection.ItemSlot, {
            scope: __scopeSelect,
            value,
            disabled,
            textValue,
            children: /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
                role: "option",
                "aria-labelledby": textId,
                "data-highlighted": isFocused ? "" : void 0,
                "aria-selected": isSelected && isFocused,
                "data-state": isSelected ? "checked" : "unchecked",
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                tabIndex: disabled ? void 0 : -1,
                ...itemProps,
                ref: composedRefs,
                onFocus: (0,primitive_dist/* composeEventHandlers */.mK)(itemProps.onFocus, ()=>setIsFocused(true)),
                onBlur: (0,primitive_dist/* composeEventHandlers */.mK)(itemProps.onBlur, ()=>setIsFocused(false)),
                onClick: (0,primitive_dist/* composeEventHandlers */.mK)(itemProps.onClick, ()=>{
                    if (pointerTypeRef.current !== "mouse") handleSelect();
                }),
                onPointerUp: (0,primitive_dist/* composeEventHandlers */.mK)(itemProps.onPointerUp, ()=>{
                    if (pointerTypeRef.current === "mouse") handleSelect();
                }),
                onPointerDown: (0,primitive_dist/* composeEventHandlers */.mK)(itemProps.onPointerDown, (event)=>{
                    pointerTypeRef.current = event.pointerType;
                }),
                onPointerMove: (0,primitive_dist/* composeEventHandlers */.mK)(itemProps.onPointerMove, (event)=>{
                    pointerTypeRef.current = event.pointerType;
                    if (disabled) {
                        var _contentContext_onItemLeave;
                        (_contentContext_onItemLeave = contentContext.onItemLeave) === null || _contentContext_onItemLeave === void 0 ? void 0 : _contentContext_onItemLeave.call(contentContext);
                    } else if (pointerTypeRef.current === "mouse") {
                        event.currentTarget.focus({
                            preventScroll: true
                        });
                    }
                }),
                onPointerLeave: (0,primitive_dist/* composeEventHandlers */.mK)(itemProps.onPointerLeave, (event)=>{
                    if (event.currentTarget === document.activeElement) {
                        var _contentContext_onItemLeave;
                        (_contentContext_onItemLeave = contentContext.onItemLeave) === null || _contentContext_onItemLeave === void 0 ? void 0 : _contentContext_onItemLeave.call(contentContext);
                    }
                }),
                onKeyDown: (0,primitive_dist/* composeEventHandlers */.mK)(itemProps.onKeyDown, (event)=>{
                    var _contentContext_searchRef;
                    const isTypingAhead = ((_contentContext_searchRef = contentContext.searchRef) === null || _contentContext_searchRef === void 0 ? void 0 : _contentContext_searchRef.current) !== "";
                    if (isTypingAhead && event.key === " ") return;
                    if (SELECTION_KEYS.includes(event.key)) handleSelect();
                    if (event.key === " ") event.preventDefault();
                })
            })
        })
    });
});
SelectItem.displayName = ITEM_NAME;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, className, style, ...itemTextProps } = props;
    const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
    const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
    const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
    const [itemTextNode, setItemTextNode] = react.useState(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, (node)=>setItemTextNode(node), itemContext.onItemTextChange, (node)=>{
        var _contentContext_itemTextRefCallback;
        return (_contentContext_itemTextRefCallback = contentContext.itemTextRefCallback) === null || _contentContext_itemTextRefCallback === void 0 ? void 0 : _contentContext_itemTextRefCallback.call(contentContext, node, itemContext.value, itemContext.disabled);
    });
    const textContent = itemTextNode === null || itemTextNode === void 0 ? void 0 : itemTextNode.textContent;
    const nativeOption = react.useMemo(()=>/* @__PURE__ */ (0,jsx_runtime.jsx)("option", {
            value: itemContext.value,
            disabled: itemContext.disabled,
            children: textContent
        }, itemContext.value), [
        itemContext.disabled,
        itemContext.value,
        textContent
    ]);
    const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>{
        onNativeOptionAdd(nativeOption);
        return ()=>onNativeOptionRemove(nativeOption);
    }, [
        onNativeOptionAdd,
        onNativeOptionRemove,
        nativeOption
    ]);
    return /* @__PURE__ */ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.span, {
                id: itemContext.textId,
                ...itemTextProps,
                ref: composedRefs
            }),
            itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren ? /*#__PURE__*/ react_dom.createPortal(itemTextProps.children, context.valueNode) : null
        ]
    });
});
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, ...itemIndicatorProps } = props;
    const itemContext = useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect);
    return itemContext.isSelected ? /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.span, {
        "aria-hidden": true,
        ...itemIndicatorProps,
        ref: forwardedRef
    }) : null;
});
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
    const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
    const [canScrollUp, setCanScrollUp] = react.useState(false);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, viewportContext.onScrollButtonChange);
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>{
        if (contentContext.viewport && contentContext.isPositioned) {
            let handleScroll2 = function() {
                const canScrollUp2 = viewport.scrollTop > 0;
                setCanScrollUp(canScrollUp2);
            };
            var handleScroll = handleScroll2;
            const viewport = contentContext.viewport;
            handleScroll2();
            viewport.addEventListener("scroll", handleScroll2);
            return ()=>viewport.removeEventListener("scroll", handleScroll2);
        }
    }, [
        contentContext.viewport,
        contentContext.isPositioned
    ]);
    return canScrollUp ? /* @__PURE__ */ (0,jsx_runtime.jsx)(SelectScrollButtonImpl, {
        ...props,
        ref: composedRefs,
        onAutoScroll: ()=>{
            const { viewport, selectedItem } = contentContext;
            if (viewport && selectedItem) {
                viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
            }
        }
    }) : null;
});
SelectScrollUpButton.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
    const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
    const [canScrollDown, setCanScrollDown] = react.useState(false);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, viewportContext.onScrollButtonChange);
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>{
        if (contentContext.viewport && contentContext.isPositioned) {
            let handleScroll2 = function() {
                const maxScroll = viewport.scrollHeight - viewport.clientHeight;
                const canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
                setCanScrollDown(canScrollDown2);
            };
            var handleScroll = handleScroll2;
            const viewport = contentContext.viewport;
            handleScroll2();
            viewport.addEventListener("scroll", handleScroll2);
            return ()=>viewport.removeEventListener("scroll", handleScroll2);
        }
    }, [
        contentContext.viewport,
        contentContext.isPositioned
    ]);
    return canScrollDown ? /* @__PURE__ */ (0,jsx_runtime.jsx)(SelectScrollButtonImpl, {
        ...props,
        ref: composedRefs,
        onAutoScroll: ()=>{
            const { viewport, selectedItem } = contentContext;
            if (viewport && selectedItem) {
                viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
            }
        }
    }) : null;
});
SelectScrollDownButton.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
    const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
    const autoScrollTimerRef = react.useRef(null);
    const getItems = useCollection(__scopeSelect);
    const clearAutoScrollTimer = react.useCallback(()=>{
        if (autoScrollTimerRef.current !== null) {
            window.clearInterval(autoScrollTimerRef.current);
            autoScrollTimerRef.current = null;
        }
    }, []);
    react.useEffect(()=>{
        return ()=>clearAutoScrollTimer();
    }, [
        clearAutoScrollTimer
    ]);
    (0,react_use_layout_effect_dist/* useLayoutEffect */.N)(()=>{
        var _activeItem_ref_current;
        const activeItem = getItems().find((item)=>item.ref.current === document.activeElement);
        activeItem === null || activeItem === void 0 ? void 0 : (_activeItem_ref_current = activeItem.ref.current) === null || _activeItem_ref_current === void 0 ? void 0 : _activeItem_ref_current.scrollIntoView({
            block: "nearest"
        });
    }, [
        getItems
    ]);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
        "aria-hidden": true,
        ...scrollIndicatorProps,
        ref: forwardedRef,
        style: {
            flexShrink: 0,
            ...scrollIndicatorProps.style
        },
        onPointerDown: (0,primitive_dist/* composeEventHandlers */.mK)(scrollIndicatorProps.onPointerDown, ()=>{
            if (autoScrollTimerRef.current === null) {
                autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
            }
        }),
        onPointerMove: (0,primitive_dist/* composeEventHandlers */.mK)(scrollIndicatorProps.onPointerMove, ()=>{
            var _contentContext_onItemLeave;
            (_contentContext_onItemLeave = contentContext.onItemLeave) === null || _contentContext_onItemLeave === void 0 ? void 0 : _contentContext_onItemLeave.call(contentContext);
            if (autoScrollTimerRef.current === null) {
                autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
            }
        }),
        onPointerLeave: (0,primitive_dist/* composeEventHandlers */.mK)(scrollIndicatorProps.onPointerLeave, ()=>{
            clearAutoScrollTimer();
        })
    });
});
var SEPARATOR_NAME = "SelectSeparator";
var SelectSeparator = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, ...separatorProps } = props;
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.div, {
        "aria-hidden": true,
        ...separatorProps,
        ref: forwardedRef
    });
});
SelectSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME = "SelectArrow";
var SelectArrow = /*#__PURE__*/ react.forwardRef((props, forwardedRef)=>{
    const { __scopeSelect, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(ARROW_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ARROW_NAME, __scopeSelect);
    return context.open && contentContext.position === "popper" ? /* @__PURE__ */ (0,jsx_runtime.jsx)(react_popper_dist/* Arrow */.i3, {
        ...popperScope,
        ...arrowProps,
        ref: forwardedRef
    }) : null;
});
SelectArrow.displayName = ARROW_NAME;
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = /*#__PURE__*/ react.forwardRef((param, forwardedRef)=>{
    let { __scopeSelect, value, ...props } = param;
    const ref = react.useRef(null);
    const composedRefs = (0,react_compose_refs_dist/* useComposedRefs */.s)(forwardedRef, ref);
    const prevValue = (0,react_use_previous_dist/* usePrevious */.Z)(value);
    react.useEffect(()=>{
        const select = ref.current;
        if (!select) return;
        const selectProto = window.HTMLSelectElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(selectProto, "value");
        const setValue = descriptor.set;
        if (prevValue !== value && setValue) {
            const event = new Event("change", {
                bubbles: true
            });
            setValue.call(select, value);
            select.dispatchEvent(event);
        }
    }, [
        prevValue,
        value
    ]);
    return /* @__PURE__ */ (0,jsx_runtime.jsx)(react_primitive_dist/* Primitive */.sG.select, {
        ...props,
        style: {
            ...VISUALLY_HIDDEN_STYLES,
            ...props.style
        },
        ref: composedRefs,
        defaultValue: value
    });
});
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function shouldShowPlaceholder(value) {
    return value === "" || value === void 0;
}
function useTypeaheadSearch(onSearchChange) {
    const handleSearchChange = (0,react_use_callback_ref_dist/* useCallbackRef */.c)(onSearchChange);
    const searchRef = react.useRef("");
    const timerRef = react.useRef(0);
    const handleTypeaheadSearch = react.useCallback((key)=>{
        const search = searchRef.current + key;
        handleSearchChange(search);
        (function updateSearch(value) {
            searchRef.current = value;
            window.clearTimeout(timerRef.current);
            if (value !== "") timerRef.current = window.setTimeout(()=>updateSearch(""), 1e3);
        })(search);
    }, [
        handleSearchChange
    ]);
    const resetTypeahead = react.useCallback(()=>{
        searchRef.current = "";
        window.clearTimeout(timerRef.current);
    }, []);
    react.useEffect(()=>{
        return ()=>window.clearTimeout(timerRef.current);
    }, []);
    return [
        searchRef,
        handleTypeaheadSearch,
        resetTypeahead
    ];
}
function findNextItem(items, search, currentItem) {
    const isRepeated = search.length > 1 && Array.from(search).every((char)=>char === search[0]);
    const normalizedSearch = isRepeated ? search[0] : search;
    const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
    let wrappedItems = wrapArray(items, Math.max(currentItemIndex, 0));
    const excludeCurrentItem = normalizedSearch.length === 1;
    if (excludeCurrentItem) wrappedItems = wrappedItems.filter((v)=>v !== currentItem);
    const nextItem = wrappedItems.find((item)=>item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
    return nextItem !== currentItem ? nextItem : void 0;
}
function wrapArray(array, startIndex) {
    return array.map((_, index)=>array[(startIndex + index) % array.length]);
}
var Root2 = Select;
var Trigger = SelectTrigger;
var Value = SelectValue;
var Icon = SelectIcon;
var Portal = SelectPortal;
var Content2 = SelectContent;
var Viewport = SelectViewport;
var Group = SelectGroup;
var Label = SelectLabel;
var Item = SelectItem;
var ItemText = SelectItemText;
var ItemIndicator = SelectItemIndicator;
var ScrollUpButton = SelectScrollUpButton;
var ScrollDownButton = SelectScrollDownButton;
var Separator = SelectSeparator;
var Arrow2 = (/* unused pure expression or super */ null && (SelectArrow));
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 42614:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronUp)
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
            d: "m18 15-6-6-6 6",
            key: "153udz"
        }
    ]
];
const ChevronUp = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("ChevronUp", __iconNode);
 //# sourceMappingURL=chevron-up.js.map


/***/ }),

/***/ 59007:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronDown)
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
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }
    ]
];
const ChevronDown = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("ChevronDown", __iconNode);
 //# sourceMappingURL=chevron-down.js.map


/***/ }),

/***/ 78108:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ usePrevious)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
// packages/react/use-previous/src/use-previous.tsx

function usePrevious(value) {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef({ value, previous: value });
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}

//# sourceMappingURL=index.mjs.map


/***/ })

}]);