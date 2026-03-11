(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[399],{

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

/***/ 65142:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64269);



const Input = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((param, ref)=>{
    let { className, type, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        type: type,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    });
});
Input.displayName = "Input";



/***/ }),

/***/ 67764:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 74426));


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

/***/ 74426:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProfilePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(22544);
/* harmony import */ var _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(66942);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(54879);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19708);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3998);
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86948);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65142);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(76444);
/* harmony import */ var _firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12298);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7227);
/* harmony import */ var _hooks_use_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15894);
/* harmony import */ var _components_ui_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(41052);
/* harmony import */ var _components_ui_checkbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(73457);
/* harmony import */ var _barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(92033);
/* __next_internal_client_entry_do_not_use__ default auto */ 















const profileSchema = zod__WEBPACK_IMPORTED_MODULE_12__/* .object */ .Ik({
    displayName: zod__WEBPACK_IMPORTED_MODULE_12__/* .string */ .Yj().min(2, "Il nome è obbligatorio.")
});
const notificationSchema = zod__WEBPACK_IMPORTED_MODULE_12__/* .object */ .Ik({
    notificationChannels: zod__WEBPACK_IMPORTED_MODULE_12__/* .array */ .YO(zod__WEBPACK_IMPORTED_MODULE_12__/* .string */ .Yj()).min(1, "Seleziona almeno un canale."),
    notificationReminderTime: zod__WEBPACK_IMPORTED_MODULE_12__/* .coerce */ .au.number().min(0, "L'anticipo non può essere negativo.")
});
const notificationChannels = [
    {
        id: 'app',
        label: 'Notifica in-app'
    },
    {
        id: 'email',
        label: 'Email'
    },
    {
        id: 'sms',
        label: 'SMS'
    },
    {
        id: 'whatsapp',
        label: 'WhatsApp'
    },
    {
        id: 'telegram',
        label: 'Telegram'
    },
    {
        id: 'facebook',
        label: 'Facebook'
    }
];
function ProfilePage() {
    const { user } = (0,_firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_7__/* .useUser */ .J)();
    const { firestore } = (0,_firebase__WEBPACK_IMPORTED_MODULE_8__/* .useFirebase */ .D3)();
    const { toast } = (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_9__/* .useToast */ .dj)();
    const [isProfileSubmitting, setProfileSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isNotificationSubmitting, setNotificationSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const profileForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__/* .useForm */ .mN)({
        resolver: (0,_hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_14__/* .zodResolver */ .u)(profileSchema),
        defaultValues: {
            displayName: ""
        }
    });
    const notificationForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__/* .useForm */ .mN)({
        resolver: (0,_hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_14__/* .zodResolver */ .u)(notificationSchema),
        defaultValues: {
            notificationChannels: [],
            notificationReminderTime: 0
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user) {
            profileForm.reset({
                displayName: user.displayName || ''
            });
            notificationForm.reset({
                notificationChannels: user.notificationChannels || [
                    'app',
                    'email'
                ],
                notificationReminderTime: user.notificationReminderTime || 3
            });
        }
    }, [
        user,
        profileForm.reset,
        notificationForm.reset
    ]);
    const onProfileSubmit = (data)=>{
        if (!user || !firestore) return;
        setProfileSubmitting(true);
        const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__/* .doc */ .H9)(firestore, 'users', user.uid);
        const dataToUpdate = {
            displayName: data.displayName
        };
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__/* .updateDoc */ .mZ)(userRef, dataToUpdate).then(()=>{
            toast({
                title: "Successo",
                description: "Il tuo nome è stato aggiornato."
            });
        }).catch((serverError)=>{
            const permissionError = new _firebase__WEBPACK_IMPORTED_MODULE_8__/* .FirestorePermissionError */ .$9({
                path: userRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate
            });
            _firebase__WEBPACK_IMPORTED_MODULE_8__/* .errorEmitter */ .de.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: "Errore di Permesso",
                description: "Impossibile salvare il profilo."
            });
        }).finally(()=>{
            setProfileSubmitting(false);
        });
    };
    const onNotificationSubmit = (data)=>{
        if (!user || !firestore) return;
        setNotificationSubmitting(true);
        const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__/* .doc */ .H9)(firestore, 'users', user.uid);
        const dataToUpdate = {
            notificationChannels: data.notificationChannels,
            notificationReminderTime: data.notificationReminderTime
        };
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__/* .updateDoc */ .mZ)(userRef, dataToUpdate).then(()=>{
            toast({
                title: "Successo",
                description: "Impostazioni di notifica aggiornate."
            });
        }).catch((serverError)=>{
            const permissionError = new _firebase__WEBPACK_IMPORTED_MODULE_8__/* .FirestorePermissionError */ .$9({
                path: userRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate
            });
            _firebase__WEBPACK_IMPORTED_MODULE_8__/* .errorEmitter */ .de.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: "Errore di Permesso",
                description: "Impossibile salvare le impostazioni."
            });
        }).finally(()=>{
            setNotificationSubmitting(false);
        });
    };
    if (!user) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                        className: "font-headline text-3xl font-bold",
                        children: "Profilo Utente"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-muted-foreground",
                        children: "Gestisci le informazioni del tuo account e le preferenze."
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .Form */ .lV, {
                    ...profileForm,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                        onSubmit: profileForm.handleSubmit(onProfileSubmit),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .aR, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ZB, {
                                        children: "I tuoi dati"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .BT, {
                                        children: "Aggiorna il tuo nome e la tua email."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .Wu, {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormField */ .zB, {
                                        control: profileForm.control,
                                        name: "displayName",
                                        render: (param)=>{
                                            let { field } = param;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormItem */ .eI, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormLabel */ .lR, {
                                                        children: "Nome completo"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormControl */ .MJ, {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__/* .Input */ .p, {
                                                            placeholder: "Il tuo nome...",
                                                            ...field
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormMessage */ .C5, {})
                                                ]
                                            });
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_6__/* .Label */ .J, {
                                                htmlFor: "email",
                                                children: "Email"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__/* .Input */ .p, {
                                                id: "email",
                                                type: "email",
                                                value: user.email || '',
                                                readOnly: true,
                                                disabled: true
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardFooter */ .wL, {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    type: "submit",
                                    disabled: isProfileSubmitting,
                                    children: [
                                        isProfileSubmitting && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            className: "mr-2 h-4 w-4 animate-spin"
                                        }),
                                        "Salva Modifiche"
                                    ]
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .aR, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ZB, {
                                children: "Impostazioni di Notifica"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .BT, {
                                children: "Scegli come e quando ricevere gli avvisi per la manutenzione."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .Form */ .lV, {
                        ...notificationForm,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            onSubmit: notificationForm.handleSubmit(onNotificationSubmit),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .Wu, {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormField */ .zB, {
                                            control: notificationForm.control,
                                            name: "notificationChannels",
                                            render: ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormItem */ .eI, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormLabel */ .lR, {
                                                                    className: "text-base",
                                                                    children: "Canali di Notifica"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormDescription */ .Rr, {
                                                                    children: "Scegli come preferisci essere avvisato. I canali come SMS e WhatsApp saranno attivati in futuro."
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "grid grid-cols-2 gap-4",
                                                            children: notificationChannels.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormField */ .zB, {
                                                                    control: notificationForm.control,
                                                                    name: "notificationChannels",
                                                                    render: (param)=>{
                                                                        let { field } = param;
                                                                        var _field_value;
                                                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormItem */ .eI, {
                                                                            className: "flex flex-row items-center space-x-3 space-y-0",
                                                                            children: [
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormControl */ .MJ, {
                                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_checkbox__WEBPACK_IMPORTED_MODULE_11__/* .Checkbox */ .S, {
                                                                                        checked: (_field_value = field.value) === null || _field_value === void 0 ? void 0 : _field_value.includes(item.id),
                                                                                        onCheckedChange: (checked)=>{
                                                                                            const updatedChannels = checked ? [
                                                                                                ...field.value || [],
                                                                                                item.id
                                                                                            ] : (field.value || []).filter((value)=>value !== item.id);
                                                                                            field.onChange(updatedChannels);
                                                                                        },
                                                                                        disabled: [
                                                                                            'sms',
                                                                                            'whatsapp',
                                                                                            'telegram',
                                                                                            'facebook'
                                                                                        ].includes(item.id)
                                                                                    })
                                                                                }),
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormLabel */ .lR, {
                                                                                    className: "font-normal flex items-center gap-2",
                                                                                    children: [
                                                                                        item.label,
                                                                                        [
                                                                                            'sms',
                                                                                            'whatsapp',
                                                                                            'telegram',
                                                                                            'facebook'
                                                                                        ].includes(item.id) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                            className: "text-xs text-muted-foreground",
                                                                                            children: "(Prossimamente)"
                                                                                        })
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        }, item.id);
                                                                    }
                                                                }, item.id))
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormMessage */ .C5, {})
                                                    ]
                                                })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormField */ .zB, {
                                            control: notificationForm.control,
                                            name: "notificationReminderTime",
                                            render: (param)=>{
                                                let { field } = param;
                                                var _field_value;
                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormItem */ .eI, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormLabel */ .lR, {
                                                            children: "Anticipo promemoria (giorni)"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormControl */ .MJ, {
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__/* .Input */ .p, {
                                                                type: "number",
                                                                placeholder: "Es. 3",
                                                                ...field,
                                                                value: (_field_value = field.value) !== null && _field_value !== void 0 ? _field_value : ''
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormDescription */ .Rr, {
                                                            children: "Indica quanti giorni prima della scadenza vuoi iniziare a ricevere i promemoria. La notifica ti verr\xe0 inviata ogni giorno fino alla data dell'intervento."
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_10__/* .FormMessage */ .C5, {})
                                                    ]
                                                });
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardFooter */ .wL, {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        type: "submit",
                                        disabled: isNotificationSubmitting,
                                        children: [
                                            isNotificationSubmitting && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }),
                                            "Salva Impostazioni"
                                        ]
                                    })
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .aR, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ZB, {
                                children: "Cambia Password"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .BT, {
                                children: "Imposta una nuova password per il tuo account."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .Wu, {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_6__/* .Label */ .J, {
                                        htmlFor: "current-password",
                                        children: "Password attuale"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__/* .Input */ .p, {
                                        id: "current-password",
                                        type: "password"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_6__/* .Label */ .J, {
                                        htmlFor: "new-password",
                                        children: "Nuova password"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__/* .Input */ .p, {
                                        id: "new-password",
                                        type: "password"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_6__/* .Label */ .J, {
                                        htmlFor: "confirm-password",
                                        children: "Conferma nuova password"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__/* .Input */ .p, {
                                        id: "confirm-password",
                                        type: "password"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardFooter */ .wL, {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                            children: "Cambia Password"
                        })
                    })
                ]
            })
        ]
    });
}


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
/******/ __webpack_require__.O(0, [7811,2992,3135,5402,197,9632,8470,8441,1255,7358], () => (__webpack_exec__(67764)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);