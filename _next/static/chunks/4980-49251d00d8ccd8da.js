(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[4980],{

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

/***/ 13150:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 16193:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 24888:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 52154:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 59338:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Sparkles)
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
            d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
            key: "4pj2yx"
        }
    ],
    [
        "path",
        {
            d: "M20 3v4",
            key: "1olli1"
        }
    ],
    [
        "path",
        {
            d: "M22 5h-4",
            key: "1gvqau"
        }
    ],
    [
        "path",
        {
            d: "M4 17v2",
            key: "vumght"
        }
    ],
    [
        "path",
        {
            d: "M5 18H3",
            key: "zchphs"
        }
    ]
];
const Sparkles = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("Sparkles", __iconNode);
 //# sourceMappingURL=sparkles.js.map


/***/ }),

/***/ 59452:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 60183:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 74562:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  E: () => (/* binding */ MaintenanceAdvisorForm)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(95155);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(12115);
// EXTERNAL MODULE: ./node_modules/@hookform/resolvers/zod/dist/zod.mjs + 1 modules
var zod = __webpack_require__(66942);
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(22544);
// EXTERNAL MODULE: ./node_modules/zod/v3/types.js + 6 modules
var types = __webpack_require__(54879);
// EXTERNAL MODULE: ./src/ai/genkit.ts
var genkit = __webpack_require__(849);
// EXTERNAL MODULE: external "genkit"
var external_genkit_ = __webpack_require__(95101);
;// ./src/ai/flows/predictive-maintenance-advisor.ts
/**
 * @fileOverview An AI-powered predictive maintenance advisor for vehicles.
 *
 * - getMaintenanceAdvice - A function that generates maintenance advice for a vehicle.
 * - MaintenanceAdviceInput - The input type for the getMaintenanceAdvice function.
 * - MaintenanceAdviceOutput - The return type for the getMaintenanceAdvice function.
 */ 

const MaintenanceAdviceInputSchema = external_genkit_.z.object({
    vehicleType: external_genkit_.z.string().describe('The type of the vehicle (e.g., gasoline, diesel, electric).'),
    kilometersDriven: external_genkit_.z.number().describe('The total kilometers driven by the vehicle.'),
    lastMaintenanceDate: external_genkit_.z.string().describe('The date of the last maintenance service (YYYY-MM-DD).'),
    maintenanceHistory: external_genkit_.z.string().describe('A summary of the vehicle maintenance history.'),
    drivingStyle: external_genkit_.z.string().describe('The user driving style (e.g., aggressive, moderate, conservative).')
});
const MaintenanceAdviceOutputSchema = external_genkit_.z.object({
    advice: external_genkit_.z.string().describe('AI-generated advice on upcoming maintenance needs.'),
    urgency: external_genkit_.z.string().describe('The urgency level of the advice (e.g., high, medium, low).'),
    suggestedInterventions: external_genkit_.z.string().describe('Suggested maintenance interventions based on vehicle data.')
});
async function getMaintenanceAdvice(input) {
    try {
        return await maintenanceAdviceFlow(input);
    } catch (e) {
        var _e_message;
        console.error("Genkit flow 'maintenanceAdviceFlow' failed: ".concat(e.message));
        // Check if it's the specific "API not enabled" error
        if ((_e_message = e.message) === null || _e_message === void 0 ? void 0 : _e_message.includes('Generative Language API has not been used')) {
            return {
                error: "L'API per l'IA generativa non è attiva. Abilitala nella console Google Cloud per questo progetto (705618426785)."
            };
        }
        return {
            error: "Si è verificato un errore imprevisto durante l'analisi AI."
        };
    }
}
const predictive_maintenance_advisor_prompt = genkit.ai.definePrompt({
    name: 'maintenanceAdvicePrompt',
    input: {
        schema: MaintenanceAdviceInputSchema
    },
    output: {
        schema: MaintenanceAdviceOutputSchema
    },
    prompt: "You are an expert automotive maintenance advisor. Based on the following information about the vehicle, provide advice on upcoming maintenance needs, the urgency of the advice, and suggest specific maintenance interventions.\n\nVehicle Type: {{{vehicleType}}}\nKilometers Driven: {{{kilometersDriven}}}\nLast Maintenance Date: {{{lastMaintenanceDate}}}\nMaintenance History: {{{maintenanceHistory}}}\nDriving Style: {{{drivingStyle}}}\n\nRespond in a professional and helpful manner.\nConsider common issues for the vehicle type and driving style.\n\nMake sure to include suggestedInterventions based on vehicle data.\n"
});
const maintenanceAdviceFlow = genkit.ai.defineFlow({
    name: 'maintenanceAdviceFlow',
    inputSchema: MaintenanceAdviceInputSchema,
    outputSchema: MaintenanceAdviceOutputSchema
}, async (input)=>{
    const { output } = await predictive_maintenance_advisor_prompt(input);
    return output;
});

;// ./src/app/dashboard/vehicles/actions.ts


const MaintenanceAdviceSchema = types/* object */.Ik({
    vehicleType: types/* string */.Yj().min(1, 'Il tipo di veicolo è obbligatorio.'),
    kilometersDriven: types/* coerce */.au.number(),
    lastMaintenanceDate: types/* string */.Yj().min(1, 'La data di ultima manutenzione è obbligatoria.'),
    maintenanceHistory: types/* string */.Yj().min(1, 'La cronologia della manutenzione è obbligatoria.'),
    drivingStyle: types/* string */.Yj().min(1, 'Lo stile di guida è obbligatorio.')
});
async function generateMaintenanceAdvice(prevState, formData) {
    const validatedFields = MaintenanceAdviceSchema.safeParse({
        vehicleType: formData.get('vehicleType'),
        kilometersDriven: formData.get('kilometersDriven'),
        lastMaintenanceDate: formData.get('lastMaintenanceDate'),
        maintenanceHistory: formData.get('maintenanceHistory'),
        drivingStyle: formData.get('drivingStyle')
    });
    if (!validatedFields.success) {
        return {
            advice: null,
            error: 'Dati non validi. Controlla i campi e riprova.'
        };
    }
    try {
        const result = await getMaintenanceAdvice(validatedFields.data);
        if ('error' in result) {
            return {
                advice: null,
                error: result.error
            };
        }
        return {
            advice: result,
            error: null
        };
    } catch (error) {
        console.error(error);
        return {
            advice: null,
            error: "Impossibile contattare l'assistente AI al momento."
        };
    }
}

// EXTERNAL MODULE: ./src/components/ui/button.tsx
var ui_button = __webpack_require__(3998);
// EXTERNAL MODULE: ./src/components/ui/card.tsx
var card = __webpack_require__(86948);
// EXTERNAL MODULE: ./src/components/ui/textarea.tsx
var ui_textarea = __webpack_require__(31120);
// EXTERNAL MODULE: ./src/components/ui/select.tsx
var ui_select = __webpack_require__(11186);
// EXTERNAL MODULE: ./src/components/ui/form.tsx
var ui_form = __webpack_require__(41052);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/loader-circle.js
var loader_circle = __webpack_require__(92033);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/sparkles.js
var sparkles = __webpack_require__(59338);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/triangle-alert.js
var triangle_alert = __webpack_require__(60406);
;// ./src/components/dashboard/maintenance-advisor-form.tsx
/* __next_internal_client_entry_do_not_use__ MaintenanceAdvisorForm auto */ 











const maintenance_advisor_form_MaintenanceAdviceSchema = types/* object */.Ik({
    vehicleType: types/* string */.Yj(),
    kilometersDriven: types/* number */.ai(),
    lastMaintenanceDate: types/* string */.Yj(),
    maintenanceHistory: types/* string */.Yj().min(10, {
        message: "Descrivi brevemente la cronologia."
    }),
    drivingStyle: types/* string */.Yj({
        required_error: "Seleziona uno stile di guida."
    })
});
const initialState = {
    advice: null,
    error: null
};
function MaintenanceAdvisorForm(param) {
    let { vehicle } = param;
    const [state, formAction] = (0,react.useActionState)(generateMaintenanceAdvice, initialState);
    const [isPending, startTransition] = (0,react.useTransition)();
    const form = (0,index_esm/* useForm */.mN)({
        resolver: (0,zod/* zodResolver */.u)(maintenance_advisor_form_MaintenanceAdviceSchema),
        defaultValues: {
            vehicleType: vehicle.type,
            kilometersDriven: vehicle.currentMileage,
            lastMaintenanceDate: vehicle.lastMaintenanceDate,
            maintenanceHistory: 'Manutenzione regolare effettuata secondo il libretto.',
            drivingStyle: 'moderate'
        }
    });
    (0,react.useEffect)(()=>{
        form.reset({
            vehicleType: vehicle.type,
            kilometersDriven: vehicle.currentMileage,
            lastMaintenanceDate: vehicle.lastMaintenanceDate,
            maintenanceHistory: 'Manutenzione regolare effettuata secondo il libretto.',
            drivingStyle: 'moderate'
        });
    }, [
        vehicle,
        form.reset
    ]);
    const onFormSubmit = (data)=>{
        const formData = new FormData();
        formData.append('vehicleType', data.vehicleType);
        formData.append('kilometersDriven', String(data.kilometersDriven));
        formData.append('lastMaintenanceDate', data.lastMaintenanceDate);
        formData.append('maintenanceHistory', data.maintenanceHistory);
        formData.append('drivingStyle', data.drivingStyle);
        startTransition(()=>{
            formAction(formData);
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "grid gap-8 md:grid-cols-2",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardHeader */.aR, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardTitle */.ZB, {
                                className: "font-headline",
                                children: "Assistente Manutenzione AI"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardDescription */.BT, {
                                children: "Inserisci i dati del tuo veicolo per ricevere un consiglio personalizzato dal nostro assistente AI."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* Form */.lV, {
                        ...form,
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                            onSubmit: form.handleSubmit(onFormSubmit),
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardContent */.Wu, {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormField */.zB, {
                                            control: form.control,
                                            name: "maintenanceHistory",
                                            render: (param)=>{
                                                let { field } = param;
                                                return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_form/* FormItem */.eI, {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormLabel */.lR, {
                                                            children: "Cronologia Manutenzione"
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormControl */.MJ, {
                                                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_textarea/* Textarea */.T, {
                                                                placeholder: "Esempio: Sostituzione pastiglie freni a 40.000km...",
                                                                ...field
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormMessage */.C5, {})
                                                    ]
                                                });
                                            }
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormField */.zB, {
                                            control: form.control,
                                            name: "drivingStyle",
                                            render: (param)=>{
                                                let { field } = param;
                                                return /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_form/* FormItem */.eI, {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormLabel */.lR, {
                                                            children: "Stile di Guida"
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_select/* Select */.l6, {
                                                            onValueChange: field.onChange,
                                                            value: field.value,
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormControl */.MJ, {
                                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectTrigger */.bq, {
                                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectValue */.yv, {
                                                                            placeholder: "Seleziona il tuo stile di guida"
                                                                        })
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(ui_select/* SelectContent */.gC, {
                                                                    children: [
                                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectItem */.eb, {
                                                                            value: "aggressive",
                                                                            children: "Aggressivo"
                                                                        }),
                                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectItem */.eb, {
                                                                            value: "moderate",
                                                                            children: "Moderato"
                                                                        }),
                                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_select/* SelectItem */.eb, {
                                                                            value: "conservative",
                                                                            children: "Prudente"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_form/* FormMessage */.C5, {})
                                                    ]
                                                });
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardFooter */.wL, {
                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* Button */.$, {
                                        type: "submit",
                                        disabled: isPending,
                                        className: "w-full",
                                        children: isPending ? /*#__PURE__*/ (0,jsx_runtime.jsx)(loader_circle/* default */.A, {
                                            className: "animate-spin"
                                        }) : "Ottieni Consiglio dall'AI"
                                    })
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "space-y-4",
                children: [
                    state.advice && /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                        className: "bg-secondary",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardHeader */.aR, {
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardTitle */.ZB, {
                                    className: "flex items-center gap-2 font-headline",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(sparkles/* default */.A, {
                                            className: "text-accent"
                                        }),
                                        "Risultato dell'Analisi"
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardContent */.Wu, {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("h3", {
                                                className: "font-semibold flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)(triangle_alert/* default */.A, {
                                                        className: "\n                    ".concat(state.advice.urgency === 'high' ? 'text-destructive' : '', "\n                    ").concat(state.advice.urgency === 'medium' ? 'text-yellow-500' : '', "\n                    ").concat(state.advice.urgency === 'low' ? 'text-green-500' : '', "\n                  ")
                                                    }),
                                                    "Urgenza: ",
                                                    state.advice.urgency
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                className: "text-sm text-muted-foreground mt-1",
                                                children: state.advice.advice
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                                                className: "font-semibold",
                                                children: "Interventi Suggeriti"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                className: "text-sm text-muted-foreground mt-1",
                                                children: state.advice.suggestedInterventions
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    state.error && /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* Card */.Zp, {
                        className: "border-destructive",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardHeader */.aR, {
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(card/* CardTitle */.ZB, {
                                    className: "flex items-center gap-2 font-headline text-destructive",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(triangle_alert/* default */.A, {}),
                                        "Errore"
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(card/* CardContent */.Wu, {
                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                    children: state.error
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 78604:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 94553:
/***/ (() => {

/* (ignored) */

/***/ })

}]);