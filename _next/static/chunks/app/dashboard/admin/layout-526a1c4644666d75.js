(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[970],{

/***/ 17583:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdminLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12298);
/* harmony import */ var _barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92033);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52619);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20063);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12115);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(64269);
/* __next_internal_client_entry_do_not_use__ default auto */ 






function AdminLayout(param) {
    let { children } = param;
    const { user, loading } = (0,_firebase_auth_use_user__WEBPACK_IMPORTED_MODULE_1__/* .useUser */ .J)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname)();
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        if (!loading && (!user || user.role !== 'Amministratore')) {
            router.push('/dashboard');
        }
    }, [
        user,
        loading,
        router
    ]);
    if (loading || !user) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex h-full w-full items-center justify-center",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "h-8 w-8 animate-spin"
            })
        });
    }
    const adminNavItems = [
        {
            href: "/dashboard/admin/settings",
            label: "Impostazioni"
        },
        {
            href: "/dashboard/admin/users",
            label: "Utenti"
        },
        {
            href: "/dashboard/admin/vehicle-types",
            label: "Tipi Veicolo"
        },
        {
            href: "/dashboard/admin/maintenance-checks",
            label: "Controlli Periodici"
        },
        {
            href: "/dashboard/admin/roles",
            label: "Ruoli"
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("aside", {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
                    className: "flex flex-col gap-2",
                    children: adminNavItems.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                            href: item.href,
                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname.startsWith(item.href) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"),
                            children: item.label
                        }, item.href))
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("main", {
                children: children
            })
        ]
    });
}


/***/ }),

/***/ 68403:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 17583));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [7811,2992,3135,5402,176,8470,8441,1255,7358], () => (__webpack_exec__(68403)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);