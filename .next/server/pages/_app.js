/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/config/wagmi.ts":
/*!*****************************!*\
  !*** ./src/config/wagmi.ts ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config)\n/* harmony export */ });\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\n/* harmony import */ var wagmi_providers_public__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wagmi/providers/public */ \"wagmi/providers/public\");\n/* harmony import */ var wagmi_connectors_metaMask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wagmi/connectors/metaMask */ \"wagmi/connectors/metaMask\");\n/* harmony import */ var wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi/connectors/injected */ \"wagmi/connectors/injected\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([wagmi__WEBPACK_IMPORTED_MODULE_0__, wagmi_chains__WEBPACK_IMPORTED_MODULE_1__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_2__, wagmi_connectors_metaMask__WEBPACK_IMPORTED_MODULE_3__, wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_4__]);\n([wagmi__WEBPACK_IMPORTED_MODULE_0__, wagmi_chains__WEBPACK_IMPORTED_MODULE_1__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_2__, wagmi_connectors_metaMask__WEBPACK_IMPORTED_MODULE_3__, wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nconst { chains, publicClient } = (0,wagmi__WEBPACK_IMPORTED_MODULE_0__.configureChains)([\n    wagmi_chains__WEBPACK_IMPORTED_MODULE_1__.sepolia\n], [\n    (0,wagmi_providers_public__WEBPACK_IMPORTED_MODULE_2__.publicProvider)()\n]);\nconst config = (0,wagmi__WEBPACK_IMPORTED_MODULE_0__.createConfig)({\n    autoConnect: true,\n    connectors: [\n        new wagmi_connectors_metaMask__WEBPACK_IMPORTED_MODULE_3__.MetaMaskConnector({\n            chains\n        }),\n        new wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_4__.InjectedConnector({\n            chains,\n            options: {\n                name: \"Injected\",\n                shimDisconnect: true\n            }\n        })\n    ],\n    publicClient\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29uZmlnL3dhZ21pLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFxRDtBQUNmO0FBQ2lCO0FBQ007QUFDQTtBQUU3RCxNQUFNLEVBQUVNLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUdOLHNEQUFlQSxDQUM5QztJQUFDQyxpREFBT0E7Q0FBQyxFQUNUO0lBQUNDLHNFQUFjQTtDQUFHO0FBR2IsTUFBTUssU0FBU1IsbURBQVlBLENBQUM7SUFDakNTLGFBQWE7SUFDYkMsWUFBWTtRQUNWLElBQUlOLHdFQUFpQkEsQ0FBQztZQUFFRTtRQUFPO1FBQy9CLElBQUlELHdFQUFpQkEsQ0FBQztZQUNwQkM7WUFDQUssU0FBUztnQkFDUEMsTUFBTTtnQkFDTkMsZ0JBQWdCO1lBQ2xCO1FBQ0Y7S0FDRDtJQUNETjtBQUNGLEdBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm90b2NvbC1pbnRlcmZhY2UvLi9zcmMvY29uZmlnL3dhZ21pLnRzPzhmNzIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29uZmlnLCBjb25maWd1cmVDaGFpbnMgfSBmcm9tICd3YWdtaSdcbmltcG9ydCB7IHNlcG9saWEgfSBmcm9tICd3YWdtaS9jaGFpbnMnXG5pbXBvcnQgeyBwdWJsaWNQcm92aWRlciB9IGZyb20gJ3dhZ21pL3Byb3ZpZGVycy9wdWJsaWMnXG5pbXBvcnQgeyBNZXRhTWFza0Nvbm5lY3RvciB9IGZyb20gJ3dhZ21pL2Nvbm5lY3RvcnMvbWV0YU1hc2snXG5pbXBvcnQgeyBJbmplY3RlZENvbm5lY3RvciB9IGZyb20gJ3dhZ21pL2Nvbm5lY3RvcnMvaW5qZWN0ZWQnXG5cbmNvbnN0IHsgY2hhaW5zLCBwdWJsaWNDbGllbnQgfSA9IGNvbmZpZ3VyZUNoYWlucyhcbiAgW3NlcG9saWFdLFxuICBbcHVibGljUHJvdmlkZXIoKV1cbilcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGNyZWF0ZUNvbmZpZyh7XG4gIGF1dG9Db25uZWN0OiB0cnVlLFxuICBjb25uZWN0b3JzOiBbXG4gICAgbmV3IE1ldGFNYXNrQ29ubmVjdG9yKHsgY2hhaW5zIH0pLFxuICAgIG5ldyBJbmplY3RlZENvbm5lY3Rvcih7XG4gICAgICBjaGFpbnMsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIG5hbWU6ICdJbmplY3RlZCcsXG4gICAgICAgIHNoaW1EaXNjb25uZWN0OiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgcHVibGljQ2xpZW50LFxufSkgIl0sIm5hbWVzIjpbImNyZWF0ZUNvbmZpZyIsImNvbmZpZ3VyZUNoYWlucyIsInNlcG9saWEiLCJwdWJsaWNQcm92aWRlciIsIk1ldGFNYXNrQ29ubmVjdG9yIiwiSW5qZWN0ZWRDb25uZWN0b3IiLCJjaGFpbnMiLCJwdWJsaWNDbGllbnQiLCJjb25maWciLCJhdXRvQ29ubmVjdCIsImNvbm5lY3RvcnMiLCJvcHRpb25zIiwibmFtZSIsInNoaW1EaXNjb25uZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/config/wagmi.ts\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var _config_wagmi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/config/wagmi */ \"./src/config/wagmi.ts\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/dynamic */ \"./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([wagmi__WEBPACK_IMPORTED_MODULE_2__, _config_wagmi__WEBPACK_IMPORTED_MODULE_3__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__]);\n([wagmi__WEBPACK_IMPORTED_MODULE_2__, _config_wagmi__WEBPACK_IMPORTED_MODULE_3__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\nconst Navbar = next_dynamic__WEBPACK_IMPORTED_MODULE_4___default()(()=>Promise.all(/*! import() */[__webpack_require__.e(\"vendor-chunks/next\"), __webpack_require__.e(\"vendor-chunks/@swc\"), __webpack_require__.e(\"src_components_Navbar_tsx\")]).then(__webpack_require__.bind(__webpack_require__, /*! @/components/Navbar */ \"./src/components/Navbar.tsx\")), {\n    loadableGenerated: {\n        modules: [\n            \"_app.tsx -> \" + \"@/components/Navbar\"\n        ]\n    },\n    ssr: false\n});\nconst queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.QueryClient();\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_2__.WagmiConfig, {\n        config: _config_wagmi__WEBPACK_IMPORTED_MODULE_3__.config,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.QueryClientProvider, {\n            client: queryClient,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"min-h-screen bg-background\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Navbar, {}, void 0, false, {\n                        fileName: \"/Users/kyngkai909/Documents/GitHub/Protocol-Interface/src/pages/_app.tsx\",\n                        lineNumber: 19,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"/Users/kyngkai909/Documents/GitHub/Protocol-Interface/src/pages/_app.tsx\",\n                        lineNumber: 20,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/kyngkai909/Documents/GitHub/Protocol-Interface/src/pages/_app.tsx\",\n                lineNumber: 18,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/kyngkai909/Documents/GitHub/Protocol-Interface/src/pages/_app.tsx\",\n            lineNumber: 17,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/kyngkai909/Documents/GitHub/Protocol-Interface/src/pages/_app.tsx\",\n        lineNumber: 16,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNkI7QUFFTTtBQUNJO0FBQ0w7QUFDc0M7QUFFeEUsTUFBTUssU0FBU0gsbURBQU9BLENBQUMsSUFBTSx3UkFBTzs7Ozs7O0lBQ2xDSSxLQUFLOztBQUdQLE1BQU1DLGNBQWMsSUFBSUosOERBQVdBO0FBRXBCLFNBQVNLLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDNUQscUJBQ0UsOERBQUNWLDhDQUFXQTtRQUFDQyxRQUFRQSxpREFBTUE7a0JBQ3pCLDRFQUFDRyxzRUFBbUJBO1lBQUNPLFFBQVFKO3NCQUMzQiw0RUFBQ0s7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDUjs7Ozs7a0NBQ0QsOERBQUNJO3dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLbEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm90b2NvbC1pbnRlcmZhY2UvLi9zcmMvcGFnZXMvX2FwcC50c3g/ZjlkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ0Avc3R5bGVzL2dsb2JhbHMuY3NzJ1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJ1xuaW1wb3J0IHsgV2FnbWlDb25maWcgfSBmcm9tICd3YWdtaSdcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ0AvY29uZmlnL3dhZ21pJ1xuaW1wb3J0IGR5bmFtaWMgZnJvbSAnbmV4dC9keW5hbWljJ1xuaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknXG5cbmNvbnN0IE5hdmJhciA9IGR5bmFtaWMoKCkgPT4gaW1wb3J0KCdAL2NvbXBvbmVudHMvTmF2YmFyJyksIHtcbiAgc3NyOiBmYWxzZSxcbn0pXG5cbmNvbnN0IHF1ZXJ5Q2xpZW50ID0gbmV3IFF1ZXJ5Q2xpZW50KClcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8V2FnbWlDb25maWcgY29uZmlnPXtjb25maWd9PlxuICAgICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWJhY2tncm91bmRcIj5cbiAgICAgICAgICA8TmF2YmFyIC8+XG4gICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvUXVlcnlDbGllbnRQcm92aWRlcj5cbiAgICA8L1dhZ21pQ29uZmlnPlxuICApXG59XG4iXSwibmFtZXMiOlsiV2FnbWlDb25maWciLCJjb25maWciLCJkeW5hbWljIiwiUXVlcnlDbGllbnQiLCJRdWVyeUNsaWVudFByb3ZpZGVyIiwiTmF2YmFyIiwic3NyIiwicXVlcnlDbGllbnQiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJjbGllbnQiLCJkaXYiLCJjbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@radix-ui/react-slot":
/*!***************************************!*\
  !*** external "@radix-ui/react-slot" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@radix-ui/react-slot");;

/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "class-variance-authority":
/*!*******************************************!*\
  !*** external "class-variance-authority" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("class-variance-authority");;

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = import("clsx");;

/***/ }),

/***/ "tailwind-merge":
/*!*********************************!*\
  !*** external "tailwind-merge" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("tailwind-merge");;

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/chains":
/*!*******************************!*\
  !*** external "wagmi/chains" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/chains");;

/***/ }),

/***/ "wagmi/connectors/injected":
/*!********************************************!*\
  !*** external "wagmi/connectors/injected" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/connectors/injected");;

/***/ }),

/***/ "wagmi/connectors/metaMask":
/*!********************************************!*\
  !*** external "wagmi/connectors/metaMask" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/connectors/metaMask");;

/***/ }),

/***/ "wagmi/providers/public":
/*!*****************************************!*\
  !*** external "wagmi/providers/public" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/providers/public");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();