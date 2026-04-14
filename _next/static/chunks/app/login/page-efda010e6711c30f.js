(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[4520],{

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

/***/ 9891:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ errorEmitter)
/* harmony export */ });
/* __next_internal_client_entry_do_not_use__ errorEmitter auto */ /**
 * A strongly-typed pub/sub event emitter.
 * It uses a generic type T that extends a record of event names to payload types.
 */ function createEventEmitter() {
    // The events object stores arrays of callbacks, keyed by event name.
    // The types ensure that a callback for a specific event matches its payload type.
    const events = {};
    return {
        /**
     * Subscribe to an event.
     * @param eventName The name of the event to subscribe to.
     * @param callback The function to call when the event is emitted.
     */ on (eventName, callback) {
            var _events_eventName;
            if (!events[eventName]) {
                events[eventName] = [];
            }
            (_events_eventName = events[eventName]) === null || _events_eventName === void 0 ? void 0 : _events_eventName.push(callback);
        },
        /**
     * Unsubscribe from an event.
     * @param eventName The name of the event to unsubscribe from.
     * @param callback The specific callback to remove.
     */ off (eventName, callback) {
            var _events_eventName;
            if (!events[eventName]) {
                return;
            }
            events[eventName] = (_events_eventName = events[eventName]) === null || _events_eventName === void 0 ? void 0 : _events_eventName.filter((cb)=>cb !== callback);
        },
        /**
     * Publish an event to all subscribers.
     * @param eventName The name of the event to emit.
     * @param data The data payload that corresponds to the event's type.
     */ emit (eventName, data) {
            var _events_eventName;
            if (!events[eventName]) {
                return;
            }
            (_events_eventName = events[eventName]) === null || _events_eventName === void 0 ? void 0 : _events_eventName.forEach((callback)=>callback(data));
        }
    };
}
// Create and export a singleton instance of the emitter, typed with our AppEvents interface.
const errorEmitter = createEventEmitter();


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

/***/ 45300:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ getFirebaseApp)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52078);

const firebaseConfig = {
    "projectId": "studio-99874364-880bd",
    "appId": "1:705618426785:web:ceb3019bef1327ec8f29e0",
    "apiKey": "AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA",
    "authDomain": "studio-99874364-880bd.firebaseapp.com",
    "measurementId": "",
    "messagingSenderId": "705618426785"
};
let firebaseApp;
function getFirebaseApp() {
    if (firebaseApp) return firebaseApp;
    if (!(0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .getApps */ .Dk)().length) {
        try {
            firebaseApp = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .initializeApp */ .Wp)();
        } catch (e) {
            if (false) {}
            firebaseApp = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .initializeApp */ .Wp)(firebaseConfig);
        }
    } else {
        firebaseApp = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .getApp */ .Sx)();
    }
    return firebaseApp;
}


/***/ }),

/***/ 53919:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 70017));


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

/***/ 64269:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn),
/* harmony export */   g: () => (/* binding */ calculateDistance)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2821);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75889);


function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .$)(inputs));
}
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}


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

/***/ 70017:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52619);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20063);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(22544);
/* harmony import */ var _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(66942);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(54879);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12115);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3998);
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(86948);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(65142);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(76444);
/* harmony import */ var _components_logo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(76604);
/* harmony import */ var _components_ui_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(41052);
/* harmony import */ var _firebase_auth_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(63279);
/* harmony import */ var _barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(92033);
/* harmony import */ var _components_ui_alert__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(18332);
/* __next_internal_client_entry_do_not_use__ default auto */ 















function GoogleIcon(props) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        ...props,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 48 48",
        width: "48px",
        height: "48px",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                fill: "#FFC107",
                d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                fill: "#FF3D00",
                d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                fill: "#4CAF50",
                d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                fill: "#1976D2",
                d: "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,36.128,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            })
        ]
    });
}
function FacebookIcon(props) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        ...props,
        xmlns: "http://www.w3.org/2000/svg",
        x: "0px",
        y: "0px",
        width: "48",
        height: "48",
        viewBox: "0 0 48 48",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                fill: "#039be5",
                d: "M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                fill: "#fff",
                d: "M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.582-0.078-1.801-0.24-3.325-0.24c-3.518,0-5.784,2.105-5.784,6.283v3.393H16.117v4.995h4.944v11.72h5.511V29.036z"
            })
        ]
    });
}
const formSchema = zod__WEBPACK_IMPORTED_MODULE_12__/* .object */ .Ik({
    email: zod__WEBPACK_IMPORTED_MODULE_12__/* .string */ .Yj().email({
        message: "Inserisci un'email valida."
    }),
    password: zod__WEBPACK_IMPORTED_MODULE_12__/* .string */ .Yj().min(6, {
        message: "La password deve essere di almeno 6 caratteri."
    })
});
function LoginForm() {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [isGoogleLoading, setIsGoogleLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__/* .useForm */ .mN)({
        resolver: (0,_hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_14__/* .zodResolver */ .u)(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const onSubmit = async (values)=>{
        setError(null);
        try {
            await (0,_firebase_auth_auth__WEBPACK_IMPORTED_MODULE_10__/* .signInWithEmail */ .Ru)(values.email, values.password);
            router.push("/dashboard");
        } catch (e) {
            setError("Credenziali non valide. Riprova.");
            console.error(e);
        }
    };
    const handleGoogleSignIn = async ()=>{
        setError(null);
        setIsGoogleLoading(true);
        try {
            await (0,_firebase_auth_auth__WEBPACK_IMPORTED_MODULE_10__/* .signInWithGoogle */ .G6)();
            router.push("/dashboard");
        } catch (e) {
            setError("Impossibile accedere con Google. Riprova.");
            console.error(e);
        } finally{
            setIsGoogleLoading(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "flex min-h-screen items-center justify-center bg-secondary p-4",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_5__/* .Card */ .Zp, {
            className: "mx-auto w-full max-w-sm",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_5__/* .CardHeader */ .aR, {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                            href: "/",
                            className: "mb-4 inline-block",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_logo__WEBPACK_IMPORTED_MODULE_8__/* .Logo */ .g, {})
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_5__/* .CardTitle */ .ZB, {
                            className: "text-2xl font-headline",
                            children: "Accedi al tuo account"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_5__/* .CardDescription */ .BT, {
                            children: "Inserisci la tua email per continuare"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_5__/* .CardContent */ .Wu, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .Form */ .lV, {
                            ...form,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                onSubmit: form.handleSubmit(onSubmit),
                                className: "grid gap-4",
                                children: [
                                    error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert__WEBPACK_IMPORTED_MODULE_11__/* .Alert */ .Fc, {
                                        variant: "destructive",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert__WEBPACK_IMPORTED_MODULE_11__/* .AlertTitle */ .XL, {
                                                children: "Errore di accesso"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert__WEBPACK_IMPORTED_MODULE_11__/* .AlertDescription */ .TN, {
                                                children: error
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormField */ .zB, {
                                        control: form.control,
                                        name: "email",
                                        render: (param)=>{
                                            let { field } = param;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormItem */ .eI, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_7__/* .Label */ .J, {
                                                        htmlFor: "email",
                                                        children: "Email"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormControl */ .MJ, {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .p, {
                                                            id: "email",
                                                            type: "email",
                                                            placeholder: "mario.rossi@esempio.com",
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
                                        name: "password",
                                        render: (param)=>{
                                            let { field } = param;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormItem */ .eI, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_7__/* .Label */ .J, {
                                                                htmlFor: "password",
                                                                children: "Password"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                                href: "#",
                                                                className: "ml-auto inline-block text-sm underline",
                                                                children: "Password dimenticata?"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormControl */ .MJ, {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .p, {
                                                            id: "password",
                                                            type: "password",
                                                            ...field
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_form__WEBPACK_IMPORTED_MODULE_9__/* .FormMessage */ .C5, {})
                                                ]
                                            });
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                        type: "submit",
                                        className: "w-full",
                                        disabled: form.formState.isSubmitting,
                                        children: [
                                            form.formState.isSubmitting && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }),
                                            "Accedi"
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative my-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "absolute inset-0 flex items-center",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "w-full border-t"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "relative flex justify-center text-xs uppercase",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "bg-background px-2 text-muted-foreground",
                                        children: "Oppure continua con"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "grid grid-cols-2 gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                    variant: "outline",
                                    className: "w-full gap-2",
                                    onClick: handleGoogleSignIn,
                                    disabled: isGoogleLoading,
                                    children: [
                                        isGoogleLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            className: "h-5 w-5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(GoogleIcon, {
                                            className: "h-5 w-5"
                                        }),
                                        "Google"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                    variant: "outline",
                                    className: "w-full gap-2",
                                    disabled: true,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FacebookIcon, {
                                            className: "h-5 w-5"
                                        }),
                                        " Facebook"
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mt-4 text-center text-sm",
                            children: [
                                "Non hai un account?",
                                " ",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: "/signup",
                                    className: "underline",
                                    children: "Registrati"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
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

/***/ 86501:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ FirestorePermissionError)
/* harmony export */ });
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33885);
/* __next_internal_client_entry_do_not_use__ FirestorePermissionError auto */ 
/**
 * Builds a security-rule-compliant auth object from the Firebase User.
 * @param currentUser The currently authenticated Firebase user.
 * @returns An object that mirrors request.auth in security rules, or null.
 */ function buildAuthObject(currentUser) {
    var _currentUser_providerData_;
    if (!currentUser) {
        return null;
    }
    const token = {
        name: currentUser.displayName,
        email: currentUser.email,
        email_verified: currentUser.emailVerified,
        phone_number: currentUser.phoneNumber,
        sub: currentUser.uid,
        firebase: {
            identities: currentUser.providerData.reduce((acc, p)=>{
                if (p.providerId) {
                    acc[p.providerId] = [
                        p.uid
                    ];
                }
                return acc;
            }, {}),
            sign_in_provider: ((_currentUser_providerData_ = currentUser.providerData[0]) === null || _currentUser_providerData_ === void 0 ? void 0 : _currentUser_providerData_.providerId) || 'custom',
            tenant: currentUser.tenantId
        }
    };
    return {
        uid: currentUser.uid,
        token: token
    };
}
/**
 * Builds the complete, simulated request object for the error message.
 * It safely tries to get the current authenticated user.
 * @param context The context of the failed Firestore operation.
 * @returns A structured request object.
 */ function buildRequestObject(context) {
    let authObject = null;
    try {
        // Safely attempt to get the current user.
        const firebaseAuth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__/* .getAuth */ .xI)();
        const currentUser = firebaseAuth.currentUser;
        if (currentUser) {
            authObject = buildAuthObject(currentUser);
        }
    } catch (e) {
    // This will catch errors if the Firebase app is not yet initialized.
    // In this case, we'll proceed without auth information.
    }
    return {
        auth: authObject,
        method: context.operation,
        path: "/databases/(default)/documents/".concat(context.path),
        resource: context.requestResourceData ? {
            data: context.requestResourceData
        } : undefined
    };
}
/**
 * Builds the final, formatted error message for the LLM.
 * @param requestObject The simulated request object.
 * @returns A string containing the error message and the JSON payload.
 */ function buildErrorMessage(requestObject) {
    return "Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n".concat(JSON.stringify(requestObject, null, 2));
}
/**
 * A custom error class designed to be consumed by an LLM for debugging.
 * It structures the error information to mimic the request object
 * available in Firestore Security Rules.
 */ class FirestorePermissionError extends Error {
    constructor(context){
        const requestObject = buildRequestObject(context);
        super(buildErrorMessage(requestObject));
        this.name = 'FirebaseError';
        this.request = requestObject;
    }
}


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
/******/ __webpack_require__.O(0, [7811,2992,3135,5402,176,197,8441,1255,7358], () => (__webpack_exec__(53919)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);