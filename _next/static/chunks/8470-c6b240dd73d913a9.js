"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[8470],{

/***/ 1554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ZJ: () => (/* binding */ FirebaseContext),
  D3: () => (/* binding */ useFirebase)
});

// UNUSED EXPORTS: FirebaseProvider

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
// EXTERNAL MODULE: ./src/firebase/error-emitter.ts
var error_emitter = __webpack_require__(9891);
;// ./src/components/FirebaseErrorListener.tsx
/* __next_internal_client_entry_do_not_use__ FirebaseErrorListener auto */ 

/**
 * An invisible component that listens for globally emitted 'permission-error' events.
 * It throws any received error to be caught by Next.js's global-error.tsx.
 */ function FirebaseErrorListener_FirebaseErrorListener() {
    // Use the specific error type for the state for type safety.
    const [error, setError] = useState(null);
    useEffect(()=>{
        // The callback now expects a strongly-typed error, matching the event payload.
        const handleError = (error)=>{
            // Set error in state to trigger a re-render.
            setError(error);
        };
        // The typed emitter will enforce that the callback for 'permission-error'
        // matches the expected payload type (FirestorePermissionError).
        errorEmitter.on('permission-error', handleError);
        // Unsubscribe on unmount to prevent memory leaks.
        return ()=>{
            errorEmitter.off('permission-error', handleError);
        };
    }, []);
    // On re-render, if an error exists in state, throw it.
    if (error) {
        throw error;
    }
    // This component renders nothing.
    return null;
}

;// ./src/firebase/provider.tsx
/* __next_internal_client_entry_do_not_use__ FirebaseContext,FirebaseProvider,useFirebase auto */ 


const FirebaseContext = /*#__PURE__*/ (0,react.createContext)(undefined);
const FirebaseProvider = (param)=>{
    let { children, firebaseApp, firestore, auth } = param;
    const contextValue = useMemo(()=>({
            firebaseApp,
            firestore,
            auth
        }), [
        firebaseApp,
        firestore,
        auth
    ]);
    return /*#__PURE__*/ _jsxs(FirebaseContext.Provider, {
        value: contextValue,
        children: [
            /*#__PURE__*/ _jsx(FirebaseErrorListener, {}),
            children
        ]
    });
};
const useFirebase = ()=>{
    const context = (0,react.useContext)(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebase must be used within a FirebaseProvider.');
    }
    return context;
};


/***/ }),

/***/ 7227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $9: () => (/* reexport */ errors/* FirestorePermissionError */.$),
  de: () => (/* reexport */ error_emitter/* errorEmitter */.d),
  Ge: () => (/* reexport */ useCollection),
  uN: () => (/* reexport */ useDoc),
  D3: () => (/* reexport */ provider/* useFirebase */.D3)
});

// UNUSED EXPORTS: FirebaseClientProvider, FirebaseContext, FirebaseProvider, initializeFirebase

// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(45300);
// EXTERNAL MODULE: ./node_modules/firebase/auth/dist/esm/index.esm.js + 1 modules
var index_esm = __webpack_require__(33885);
// EXTERNAL MODULE: ./node_modules/firebase/firestore/dist/esm/index.esm.js
var esm_index_esm = __webpack_require__(19708);
// EXTERNAL MODULE: ./src/firebase/provider.tsx + 1 modules
var provider = __webpack_require__(1554);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
;// ./src/firebase/client-provider.tsx
/* __next_internal_client_entry_do_not_use__ FirebaseClientProvider auto */ 



function FirebaseClientProvider(param) {
    let { children } = param;
    const firebaseServices = useMemo(()=>{
        try {
            return initializeFirebase();
        } catch (e) {
            console.error("Failed to initialize Firebase", e);
            return {
                firebaseApp: null,
                auth: null,
                firestore: null
            };
        }
    }, []);
    if (!firebaseServices.firebaseApp || !firebaseServices.auth || !firebaseServices.firestore) {
        // This could be a loading state or a fallback UI
        return /*#__PURE__*/ _jsx(_Fragment, {
            children: children
        });
    }
    return /*#__PURE__*/ _jsx(FirebaseProvider, {
        firebaseApp: firebaseServices.firebaseApp,
        auth: firebaseServices.auth,
        firestore: firebaseServices.firestore,
        children: children
    });
}

// EXTERNAL MODULE: ./src/firebase/error-emitter.ts
var error_emitter = __webpack_require__(9891);
// EXTERNAL MODULE: ./src/firebase/errors.ts
var errors = __webpack_require__(86501);
;// ./src/firebase/firestore/use-collection.tsx
/* __next_internal_client_entry_do_not_use__ useCollection auto */ 



// Helper to create a stable string representation of an object for comparison.
const stableStringify = (obj)=>{
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    if (typeof obj !== 'object') {
        return JSON.stringify(obj);
    }
    if (Array.isArray(obj)) {
        return "[".concat(obj.map(stableStringify).join(','), "]");
    }
    const keys = Object.keys(obj).sort();
    const kvPairs = keys.map((key)=>{
        const value = obj[key];
        if (value === undefined) return ''; // Omit undefined values
        return "".concat(JSON.stringify(key), ":").concat(stableStringify(value));
    }).filter(Boolean);
    return "{".concat(kvPairs.join(','), "}");
};
/**
 * React hook to subscribe to a Firestore collection or query in real-time.
 * It remains in a loading state until the query is provided and the data is fetched.
 *
 * IMPORTANT! The inputted query MUST be memoized (e.g., with useMemo) to prevent infinite loops.
 * 
 * @template T Optional type for document data. Defaults to any.
 * @param {CollectionReference<DocumentData> | Query<DocumentData> | null | undefined} query -
 * The memoized Firestore CollectionReference or Query. The hook will wait if this is null/undefined.
 * @returns {UseCollectionResult<T>} Object with data, isLoading, and error.
 */ function useCollection(query) {
    const [state, setState] = (0,react.useState)({
        data: null,
        isLoading: true,
        error: null
    });
    const queryKeyRef = (0,react.useRef)(null);
    (0,react.useEffect)(()=>{
        // This is a safe way to get a stable key from a Firestore query object.
        const newQueryKey = query ? query._query.path.canonicalString() : null;
        if (!query || !newQueryKey) {
            if (queryKeyRef.current !== null) {
                setState({
                    data: null,
                    isLoading: true,
                    error: null
                });
                queryKeyRef.current = null;
            }
            return;
        }
        if (newQueryKey === queryKeyRef.current && !state.isLoading) {
            return;
        }
        queryKeyRef.current = newQueryKey;
        // Set loading state but preserve old data to prevent UI flickering
        setState((prevState)=>({
                ...prevState,
                isLoading: true
            }));
        const unsubscribe = (0,esm_index_esm/* onSnapshot */.aQ)(query, (querySnapshot)=>{
            if (queryKeyRef.current === newQueryKey) {
                const results = querySnapshot.docs.map((doc)=>({
                        ...doc.data(),
                        id: doc.id
                    }));
                setState((prevState)=>{
                    if (stableStringify(prevState.data) === stableStringify(results) && !prevState.isLoading) {
                        return prevState;
                    }
                    return {
                        data: results,
                        isLoading: false,
                        error: null
                    };
                });
            }
        }, (err)=>{
            const path = query._query.path.canonicalString();
            const contextualError = new errors/* FirestorePermissionError */.$({
                operation: 'list',
                path
            });
            if (queryKeyRef.current === newQueryKey) {
                setState({
                    data: null,
                    isLoading: false,
                    error: contextualError
                });
                error_emitter/* errorEmitter */.d.emit('permission-error', contextualError);
            }
        });
        return ()=>unsubscribe();
    }, [
        query
    ]);
    return state;
}

;// ./src/firebase/firestore/use-doc.tsx
/* __next_internal_client_entry_do_not_use__ useDoc auto */ 



// Helper to create a stable string representation of an object for comparison.
const use_doc_stableStringify = (obj)=>{
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    if (typeof obj !== 'object') {
        return JSON.stringify(obj);
    }
    if (Array.isArray(obj)) {
        return "[".concat(obj.map(use_doc_stableStringify).join(','), "]");
    }
    const keys = Object.keys(obj).sort();
    const kvPairs = keys.map((key)=>{
        const value = obj[key];
        if (value === undefined) return ''; // Omit undefined values
        return "".concat(JSON.stringify(key), ":").concat(use_doc_stableStringify(value));
    }).filter(Boolean);
    return "{".concat(kvPairs.join(','), "}");
};
/**
 * React hook to subscribe to a single Firestore document in real-time.
 * It remains in a loading state until the document reference is provided and the data is fetched.
 *
 * IMPORTANT! The inputted docRef MUST be memoized (e.g., with useMemo) to prevent infinite loops.
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {DocumentReference<DocumentData> | null | undefined} docRef -
 * The memoized Firestore DocumentReference. The hook will wait if this is null/undefined.
 * @returns {UseDocResult<T>} Object with data, isLoading, and error.
 */ function useDoc(docRef) {
    const [state, setState] = (0,react.useState)({
        data: null,
        isLoading: true,
        error: null
    });
    const pathRef = (0,react.useRef)(null);
    (0,react.useEffect)(()=>{
        const newPath = (docRef === null || docRef === void 0 ? void 0 : docRef.path) || null;
        if (!docRef || !newPath) {
            if (pathRef.current !== null) {
                setState({
                    data: null,
                    isLoading: true,
                    error: null
                });
                pathRef.current = null;
            }
            return;
        }
        if (newPath === pathRef.current && !state.isLoading) {
            return;
        }
        pathRef.current = newPath;
        // Set loading state but preserve old data to prevent UI flickering
        setState((prevState)=>({
                ...prevState,
                isLoading: true
            }));
        const unsubscribe = (0,esm_index_esm/* onSnapshot */.aQ)(docRef, (docSnapshot)=>{
            if (pathRef.current === newPath) {
                const docData = docSnapshot.exists() ? {
                    ...docSnapshot.data(),
                    id: docSnapshot.id
                } : null;
                setState((prevState)=>{
                    // Only update state if data has actually changed to prevent infinite loops
                    if (use_doc_stableStringify(prevState.data) === use_doc_stableStringify(docData) && !prevState.isLoading) {
                        return prevState;
                    }
                    return {
                        data: docData,
                        isLoading: false,
                        error: null
                    };
                });
            }
        }, (err)=>{
            const contextualError = new errors/* FirestorePermissionError */.$({
                operation: 'get',
                path: docRef.path
            });
            if (pathRef.current === newPath) {
                setState({
                    data: null,
                    isLoading: false,
                    error: contextualError
                });
                error_emitter/* errorEmitter */.d.emit('permission-error', contextualError);
            }
        });
        return ()=>unsubscribe();
    }, [
        docRef
    ]); // Dependency on the memoized reference is correct.
    return state;
}

;// ./src/firebase/index.ts
/* __next_internal_client_entry_do_not_use__ initializeFirebase,*,*,*,*,*,* auto */ 


function firebase_initializeFirebase() {
    const app = getFirebaseApp();
    return {
        firebaseApp: app,
        auth: getAuth(app),
        firestore: getFirestore(app)
    };
}








/***/ }),

/***/ 9891:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 12298:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ useUser)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33885);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19708);
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1554);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7227);
/* __next_internal_client_entry_do_not_use__ useUser auto */ 




function useUser() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_provider__WEBPACK_IMPORTED_MODULE_3__/* .FirebaseContext */ .ZJ);
    const firebaseApp = context === null || context === void 0 ? void 0 : context.firebaseApp;
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!firebaseApp) {
            setLoading(false);
            return;
        }
        const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__/* .getAuth */ .xI)(firebaseApp);
        const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__/* .getFirestore */ .aU)(firebaseApp);
        let unsubscribeDoc;
        const unsubscribeAuth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__/* .onAuthStateChanged */ .hg)(auth, (firebaseUser)=>{
            // Clean up previous doc listener if user changes
            if (unsubscribeDoc) {
                unsubscribeDoc();
            }
            if (firebaseUser) {
                const userDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__/* .doc */ .H9)(db, 'users', firebaseUser.uid);
                unsubscribeDoc = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__/* .onSnapshot */ .aQ)(userDocRef, (userDocSnap)=>{
                    let newUser;
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        // Combine auth data and firestore data
                        newUser = {
                            // From Auth
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            photoURL: firebaseUser.photoURL,
                            // From Firestore
                            role: userData.role || 'Utente',
                            notificationChannels: userData.notificationChannels || [
                                'app',
                                'email'
                            ],
                            notificationReminderTime: userData.notificationReminderTime || 3
                        };
                    } else {
                        // This can happen if the user document creation is delayed or failed.
                        // Create a user object from auth details with default app-specific values.
                        newUser = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            photoURL: firebaseUser.photoURL,
                            role: 'Utente',
                            notificationChannels: [
                                'app',
                                'email'
                            ],
                            notificationReminderTime: 3
                        };
                    }
                    setUser(newUser);
                    setLoading(false);
                }, (error)=>{
                    const permissionError = new _firebase__WEBPACK_IMPORTED_MODULE_4__/* .FirestorePermissionError */ .$9({
                        path: userDocRef.path,
                        operation: 'get',
                        requestResourceData: {
                            context: "Listening to user document for auth state changes."
                        }
                    });
                    _firebase__WEBPACK_IMPORTED_MODULE_4__/* .errorEmitter */ .de.emit('permission-error', permissionError);
                    setUser(null);
                    setLoading(false);
                });
            } else {
                setUser(null);
                setLoading(false);
            }
        });
        return ()=>{
            unsubscribeAuth();
            if (unsubscribeDoc) {
                unsubscribeDoc();
            }
        };
    }, [
        firebaseApp
    ]);
    return {
        user,
        loading
    };
}


/***/ }),

/***/ 45300:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 64269:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 86501:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ })

}]);