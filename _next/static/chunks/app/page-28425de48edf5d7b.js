(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[8974],{

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

/***/ 56601:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20063);
/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5567);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33885);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10708);
/* __next_internal_client_entry_do_not_use__ default auto */ 





function HomePage() {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_4__/* .onAuthStateChanged */ .hg)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__/* .auth */ .j2, async (user)=>{
            if (!user) {
                router.push("/login");
                return;
            }
            try {
                const userRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_5__/* .ref */ .KR)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.db, 'users/' + user.uid);
                const userSnap = await (0,firebase_database__WEBPACK_IMPORTED_MODULE_5__/* .get */ .Jt)(userRef);
                if (!userSnap.exists()) {
                    // Registrazione automatica ruolo utilizzatore
                    await (0,firebase_database__WEBPACK_IMPORTED_MODULE_5__/* .set */ .hZ)(userRef, {
                        email: user.email,
                        displayName: user.displayName || "Nuovo Utente",
                        roleId: "utilizzatore",
                        createdAt: new Date().toISOString()
                    });
                    router.push("/dashboard/vehicles");
                } else {
                    const userData = userSnap.val();
                    // Smistamento in base al ruolo presente nel database
                    router.push(userData.roleId === 'admin' ? "/dashboard/admin/users" : "/dashboard/vehicles");
                }
            } catch (error) {
                console.error("Errore di sincronizzazione:", error);
            }
        });
        return ()=>unsubscribe();
    }, [
        router
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            children: "Sincronizzazione CareAuto Pro..."
        })
    });
}


/***/ }),

/***/ 98605:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 56601));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [7811,9507,3135,8441,1255,7358], () => (__webpack_exec__(98605)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);