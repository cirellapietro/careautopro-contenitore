"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[9427],{

/***/ 3998:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 76444:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 92920:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ TrackingProvider),
/* harmony export */   z: () => (/* binding */ useTracking)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12298);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7227);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19708);
/* harmony import */ var _hooks_use_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15894);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(64269);
/* __next_internal_client_entry_do_not_use__ TrackingProvider,useTracking auto */ 







const TrackingContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function TrackingProvider(param) {
    let { children } = param;
    const { user } = (0,_firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_2__/* .useUser */ .J)();
    const { firestore } = (0,_firebase__WEBPACK_IMPORTED_MODULE_3__/* .useFirebase */ .D3)();
    const { toast } = (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_5__/* .useToast */ .dj)();
    const [permissionStatus, setPermissionStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('prompt');
    const [isTracking, setIsTracking] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isStopping, setIsStopping] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [trackedVehicleId, _setTrackedVehicleId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [sessionDistance, setSessionDistance] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [sessionDuration, setSessionDuration] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [syncedDistance, setSyncedDistance] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const watchIdRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const durationIntervalRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const lastPositionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const distanceRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const syncedDistanceRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const startTimeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Fetch vehicles from Firestore
    const vehiclesQuery = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!user || !firestore) return null;
        return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .query */ .P)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .collection */ .rJ)(firestore, "users/".concat(user.uid, "/vehicles")), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .where */ ._M)('dataoraelimina', '==', null));
    }, [
        user,
        firestore
    ]);
    const { data: vehicles } = (0,_firebase__WEBPACK_IMPORTED_MODULE_3__/* .useCollection */ .Ge)(vehiclesQuery);
    // 1. CARICAMENTO INIZIALE: Ripristina lo stato dal localStorage e inizializza i riferimenti (Ref)
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user === null || user === void 0 ? void 0 : user.uid) {
            const userId = user.uid;
            // Ripristina ID veicolo
            const savedId = localStorage.getItem("trackedVehicleId_".concat(userId));
            if (savedId) {
                try {
                    _setTrackedVehicleId(JSON.parse(savedId));
                } catch (e) {
                    _setTrackedVehicleId(savedId);
                }
            }
            // Ripristina flag tracciamento
            const isTrackingSaved = localStorage.getItem("isTracking_".concat(userId)) === 'true';
            // Ripristina distanza e ora inizio
            const distanceSaved = localStorage.getItem("sessionDistance_".concat(userId));
            const syncedSaved = localStorage.getItem("syncedDistance_".concat(userId));
            const startSaved = localStorage.getItem("startTime_".concat(userId));
            if (distanceSaved) {
                const d = parseFloat(distanceSaved);
                distanceRef.current = d;
                setSessionDistance(d);
            }
            if (syncedSaved) {
                const sd = parseFloat(syncedSaved);
                syncedDistanceRef.current = sd;
                setSyncedDistance(sd);
            }
            if (startSaved) {
                startTimeRef.current = new Date(startSaved);
            }
            if (isTrackingSaved) {
                setIsTracking(true);
            }
        }
    }, [
        user === null || user === void 0 ? void 0 : user.uid
    ]);
    // 2. PERSISTENZA CLOUD: Se il DB dice che il tracciamento è attivo ma l'app è spenta, riavvia
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if ((user === null || user === void 0 ? void 0 : user.uid) && vehicles && permissionStatus === 'granted' && !isTracking) {
            const vehicleToTrack = vehicles.find((v)=>v.trackingGPS === true);
            if (vehicleToTrack) {
                _setTrackedVehicleId(vehicleToTrack.id);
                localStorage.setItem("trackedVehicleId_".concat(user.uid), JSON.stringify(vehicleToTrack.id));
                setIsTracking(true);
            }
        }
    }, [
        vehicles,
        permissionStatus,
        isTracking,
        user === null || user === void 0 ? void 0 : user.uid
    ]);
    // Sincronizza i chilometri nel DB periodicamente (ogni 500 metri)
    const syncMileageToDb = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((vehicleId, delta)=>{
        if (!user || !firestore || delta <= 0) return;
        const vehicleRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .doc */ .H9)(firestore, "users/".concat(user.uid, "/vehicles"), vehicleId);
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .updateDoc */ .mZ)(vehicleRef, {
            currentMileage: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .increment */ .GV)(delta)
        }).then(()=>{
            if (user === null || user === void 0 ? void 0 : user.uid) {
                localStorage.setItem("syncedDistance_".concat(user.uid), distanceRef.current.toString());
            }
        }).catch((err)=>{
            console.error("Errore durante la sincronizzazione dei chilometri:", err);
        });
    }, [
        user,
        firestore
    ]);
    // 3. MOTORE DI CALCOLO: Gestisce Geolocation e Cronometro quando isTracking è TRUE
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isTracking || !trackedVehicleId || permissionStatus !== 'granted') {
            // Pulizia se il tracciamento si ferma
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
            if (durationIntervalRef.current) {
                clearInterval(durationIntervalRef.current);
                durationIntervalRef.current = null;
            }
            return;
        }
        // Inizializza ora inizio se siamo in un nuovo tracciamento (non ripristinato)
        if (!startTimeRef.current) {
            startTimeRef.current = new Date();
            distanceRef.current = 0;
            syncedDistanceRef.current = 0;
            setSessionDistance(0);
            setSessionDuration(0);
            setSyncedDistance(0);
            if (user === null || user === void 0 ? void 0 : user.uid) {
                localStorage.setItem("startTime_".concat(user.uid), startTimeRef.current.toISOString());
                localStorage.setItem("isTracking_".concat(user.uid), 'true');
            }
        }
        // AVVIA CRONOMETRO
        durationIntervalRef.current = setInterval(()=>{
            if (startTimeRef.current) {
                const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
                setSessionDuration(elapsedSeconds);
            }
        }, 1000);
        // AVVIA GPS WATCHER
        watchIdRef.current = navigator.geolocation.watchPosition((position)=>{
            if (lastPositionRef.current) {
                const newDistance = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__/* .calculateDistance */ .g)(lastPositionRef.current.latitude, lastPositionRef.current.longitude, position.coords.latitude, position.coords.longitude);
                // Filtro per rumore GPS (salto > 2km in pochi secondi è impossibile)
                if (newDistance < 2) {
                    distanceRef.current += newDistance;
                    setSessionDistance(distanceRef.current);
                    if (user === null || user === void 0 ? void 0 : user.uid) {
                        localStorage.setItem("sessionDistance_".concat(user.uid), distanceRef.current.toString());
                    }
                    // Sincronizzazione automatica nel DB ogni 0.5 km
                    const unsyncedDistance = distanceRef.current - syncedDistanceRef.current;
                    if (unsyncedDistance >= 0.5) {
                        syncMileageToDb(trackedVehicleId, unsyncedDistance);
                        syncedDistanceRef.current = distanceRef.current;
                        setSyncedDistance(syncedDistanceRef.current);
                    }
                }
            }
            lastPositionRef.current = position.coords;
        }, (error)=>{
            console.error("GPS Watch Error:", error);
            if (error.code === 1) {
                setPermissionStatus('denied');
            }
            toast({
                variant: 'destructive',
                title: 'Errore GPS',
                description: 'Segnale GPS perso o permessi negati.'
            });
        }, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        });
        return ()=>{
            if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
            if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
        };
    }, [
        isTracking,
        trackedVehicleId,
        permissionStatus,
        user === null || user === void 0 ? void 0 : user.uid,
        syncMileageToDb,
        toast
    ]);
    const setTrackedVehicleId = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        _setTrackedVehicleId(id);
        if (user === null || user === void 0 ? void 0 : user.uid) {
            localStorage.setItem("trackedVehicleId_".concat(user.uid), JSON.stringify(id));
        }
    }, [
        user === null || user === void 0 ? void 0 : user.uid
    ]);
    const trackedVehicle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return (vehicles === null || vehicles === void 0 ? void 0 : vehicles.find((v)=>v.id === trackedVehicleId)) || null;
    }, [
        vehicles,
        trackedVehicleId
    ]);
    const resetTrackingState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        distanceRef.current = 0;
        syncedDistanceRef.current = 0;
        lastPositionRef.current = null;
        startTimeRef.current = null;
        setSessionDistance(0);
        setSessionDuration(0);
        setSyncedDistance(0);
        if (user === null || user === void 0 ? void 0 : user.uid) {
            localStorage.removeItem("isTracking_".concat(user.uid));
            localStorage.removeItem("sessionDistance_".concat(user.uid));
            localStorage.removeItem("syncedDistance_".concat(user.uid));
            localStorage.removeItem("startTime_".concat(user.uid));
        }
    }, [
        user === null || user === void 0 ? void 0 : user.uid
    ]);
    const startTracking = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((vehicleIdOverride)=>{
        const idToTrack = vehicleIdOverride || trackedVehicleId;
        if (!idToTrack || !user || !firestore) {
            toast({
                variant: 'destructive',
                title: 'Attenzione',
                description: 'Seleziona un veicolo per iniziare.'
            });
            return;
        }
        if (permissionStatus !== 'granted') {
            toast({
                variant: 'destructive',
                title: 'Permessi GPS',
                description: 'Abilita i permessi di geolocalizzazione nel browser.'
            });
            return;
        }
        // Imposta flag nel DB
        const vehicleRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .doc */ .H9)(firestore, "users/".concat(user.uid, "/vehicles"), idToTrack);
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .updateDoc */ .mZ)(vehicleRef, {
            trackingGPS: true
        });
        if (vehicleIdOverride) {
            setTrackedVehicleId(vehicleIdOverride);
        }
        setIsTracking(true);
    }, [
        permissionStatus,
        trackedVehicleId,
        user,
        firestore,
        setTrackedVehicleId,
        toast
    ]);
    const stopTracking = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setIsStopping(true);
        const trackedDistance = distanceRef.current;
        const trackedDuration = startTimeRef.current ? (Date.now() - startTimeRef.current.getTime()) / 60000 : 0;
        const finalUnsyncedDistance = trackedDistance - syncedDistanceRef.current;
        if (!user || !firestore || !trackedVehicleId) {
            setIsTracking(false);
            resetTrackingState();
            setIsStopping(false);
            return;
        }
        try {
            const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .writeBatch */ .wP)(firestore);
            const vehicleRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .doc */ .H9)(firestore, "users/".concat(user.uid, "/vehicles"), trackedVehicleId);
            batch.update(vehicleRef, {
                trackingGPS: false
            });
            if (trackedDistance > 0.01) {
                var _startTimeRef_current;
                const sessionRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .doc */ .H9)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .collection */ .rJ)(vehicleRef, 'trackingSessions'));
                batch.set(sessionRef, {
                    id: sessionRef.id,
                    vehicleId: trackedVehicleId,
                    startTime: (_startTimeRef_current = startTimeRef.current) === null || _startTimeRef_current === void 0 ? void 0 : _startTimeRef_current.toISOString(),
                    endTime: new Date().toISOString(),
                    distanceTraveled: trackedDistance,
                    duration: trackedDuration,
                    dataoraelimina: null
                });
                if (finalUnsyncedDistance > 0) {
                    batch.update(vehicleRef, {
                        currentMileage: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .increment */ .GV)(finalUnsyncedDistance)
                    });
                }
                const todayStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
                const dailyStatRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .doc */ .H9)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .collection */ .rJ)(vehicleRef, 'dailyStatistics'), todayStr);
                const dailyStatSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .getDoc */ .x7)(dailyStatRef);
                if (dailyStatSnap.exists()) {
                    batch.update(dailyStatRef, {
                        totalDistance: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .increment */ .GV)(trackedDistance),
                        totalTime: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .increment */ .GV)(trackedDuration)
                    });
                } else {
                    batch.set(dailyStatRef, {
                        id: todayStr,
                        vehicleId: trackedVehicleId,
                        date: new Date().toISOString(),
                        totalDistance: trackedDistance,
                        totalTime: trackedDuration,
                        dataoraelimina: null
                    });
                }
                await batch.commit();
                toast({
                    title: 'Viaggio completato!',
                    description: 'Chilometri e statistiche salvati correttamente.'
                });
            } else {
                await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .updateDoc */ .mZ)(vehicleRef, {
                    trackingGPS: false
                });
            }
        } catch (e) {
            console.error("Save Error:", e);
            toast({
                variant: 'destructive',
                title: 'Errore',
                description: 'Impossibile salvare i dati della sessione.'
            });
        } finally{
            setIsTracking(false);
            resetTrackingState();
            setIsStopping(false);
        }
    }, [
        user,
        firestore,
        trackedVehicleId,
        toast,
        resetTrackingState
    ]);
    const switchTrackingTo = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (newVehicleId)=>{
        if (isTracking) {
            await stopTracking();
        }
        startTracking(newVehicleId);
    }, [
        isTracking,
        stopTracking,
        startTracking
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (true) {
            if ('permissions' in navigator) {
                navigator.permissions.query({
                    name: 'geolocation'
                }).then((result)=>{
                    setPermissionStatus(result.state);
                    result.onchange = ()=>setPermissionStatus(result.state);
                });
            } else {
                navigator.geolocation.getCurrentPosition(()=>setPermissionStatus('granted'), ()=>setPermissionStatus('denied'));
            }
        }
    }, []);
    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            permissionStatus,
            isTracking,
            isStopping,
            trackedVehicleId,
            setTrackedVehicleId,
            startTracking,
            stopTracking,
            switchTrackingTo,
            trackedVehicle,
            vehicles: vehicles || [],
            sessionDistance,
            sessionDuration,
            liveSessionDistance: sessionDistance - syncedDistance
        }), [
        permissionStatus,
        isTracking,
        isStopping,
        trackedVehicleId,
        setTrackedVehicleId,
        startTracking,
        stopTracking,
        switchTrackingTo,
        trackedVehicle,
        vehicles,
        sessionDistance,
        sessionDuration,
        syncedDistance
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TrackingContext.Provider, {
        value: value,
        children: children
    });
}
function useTracking() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(TrackingContext);
    if (context === undefined) {
        throw new Error('useTracking must be used within a TrackingProvider');
    }
    return context;
}


/***/ })

}]);