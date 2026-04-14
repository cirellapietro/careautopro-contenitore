(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[5074],{

/***/ 609:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StoricoPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5567);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10708);
/* harmony import */ var _components_BottomNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61361);
/* __next_internal_client_entry_do_not_use__ default auto */ 




function StoricoPage() {
    const [interventi, setInterventi] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!_lib_firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .j2.currentUser) return;
        const q = (0,firebase_database__WEBPACK_IMPORTED_MODULE_3__/* .query */ .P)((0,firebase_database__WEBPACK_IMPORTED_MODULE_3__/* .ref */ .KR)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__.db, "interventi"), (0,firebase_database__WEBPACK_IMPORTED_MODULE_3__/* .orderByChild */ .kT)("utente_id"), (0,firebase_database__WEBPACK_IMPORTED_MODULE_3__/* .equalTo */ .iz)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .j2.currentUser.uid));
        return (0,firebase_database__WEBPACK_IMPORTED_MODULE_3__/* .onValue */ .Zy)(q, (snapshot)=>{
            const data = snapshot.val();
            setInterventi(data ? Object.values(data) : []);
        });
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-h-screen bg-slate-50 pb-24 p-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                className: "text-3xl font-black mb-8",
                children: "Storico"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "space-y-4",
                children: interventi.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-slate-400 text-center py-10",
                    children: "Nessun intervento registrato."
                }) : interventi.map((int, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-4 bg-white rounded-2xl shadow-sm border-l-4 border-green-500",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "font-bold",
                                children: int.tipo_servizio
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-sm text-slate-500",
                                children: int.data
                            })
                        ]
                    }, i))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_BottomNav__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {})
        ]
    });
}


/***/ }),

/***/ 5567:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   db: () => (/* binding */ db),
/* harmony export */   j2: () => (/* binding */ auth)
/* harmony export */ });
/* unused harmony export googleProvider */
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52078);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33885);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10708);



const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "careautopro.firebaseapp.com",
    databaseURL: "https://studio-99874364-880bd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "careautopro",
    storageBucket: "careautopro.appspot.com",
    messagingSenderId: "3383936801",
    appId: "1:3383936801:web:..."
};
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .getApps */ .Dk)().length > 0 ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .getApp */ .Sx)() : (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .initializeApp */ .Wp)(firebaseConfig);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__/* .getAuth */ .xI)(app);
const db = (0,firebase_database__WEBPACK_IMPORTED_MODULE_2__/* .getDatabase */ .C3)(app);
const googleProvider = new firebase_auth__WEBPACK_IMPORTED_MODULE_1__/* .GoogleAuthProvider */ .HF();



/***/ }),

/***/ 10708:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C3: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.C3),
/* harmony export */   Jt: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.Jt),
/* harmony export */   KR: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.KR),
/* harmony export */   P: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.P),
/* harmony export */   Zy: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.Zy),
/* harmony export */   hZ: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.hZ),
/* harmony export */   iz: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.iz),
/* harmony export */   kT: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.kT)
/* harmony export */ });
/* harmony import */ var _firebase_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72812);

//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ 61361:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ BottomNav)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20063);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52619);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* __next_internal_client_entry_do_not_use__ default auto */ 



function BottomNav(param) {
    let { utenteId } = param;
    const [hasUrgent, setHasUrgent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!utenteId) return;
        const checkUrgent = async ()=>{
            const { data } = await supabase.from('avviso_notifiche').select('stato').eq('utente_id', utenteId).eq('stato', 'URGENTE');
            setHasUrgent(data && data.length > 0);
        };
        checkUrgent();
    }, [
        utenteId
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
        className: "fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around items-center z-50 shadow-lg",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: ()=>router.back(),
                className: "flex flex-col items-center text-gray-500",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xl",
                        children: "⬅️"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px]",
                        children: "Indietro"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                href: "/",
                className: "flex flex-col items-center text-gray-400",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xl",
                        children: "\uD83C\uDFE0"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px]",
                        children: "Home"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                href: "/notifiche",
                className: "relative flex flex-col items-center text-gray-400",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xl",
                        children: "\uD83D\uDD14"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px]",
                        children: "Avvisi"
                    }),
                    hasUrgent && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "absolute top-0 right-3 h-2 w-2 bg-red-600 rounded-full animate-ping"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: async ()=>{
                    await supabase.auth.signOut();
                    router.push('/login');
                },
                className: "flex flex-col items-center text-red-500",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xl",
                        children: "\uD83D\uDEAA"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px]",
                        children: "Esci"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 67927:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 609));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [7811,9507,3135,176,8441,1255,7358], () => (__webpack_exec__(67927)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);