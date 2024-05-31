"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/rehype-stringify";
exports.ids = ["vendor-chunks/rehype-stringify"];
exports.modules = {

/***/ "(ssr)/./node_modules/rehype-stringify/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/rehype-stringify/lib/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rehypeStringify)\n/* harmony export */ });\n/* harmony import */ var hast_util_to_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hast-util-to-html */ \"(ssr)/./node_modules/hast-util-to-html/lib/index.js\");\n/**\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast-util-to-html').Options} Options\n * @typedef {import('unified').Compiler<Root, string>} Compiler\n */\n\n\n\n/**\n * Plugin to add support for serializing as HTML.\n *\n * @param {Options | null | undefined} [options]\n *   Configuration (optional).\n * @returns {undefined}\n *   Nothing.\n */\nfunction rehypeStringify(options) {\n  /** @type {import('unified').Processor<undefined, undefined, undefined, Root, string>} */\n  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.\n  const self = this\n  const settings = {...self.data('settings'), ...options}\n\n  self.compiler = compiler\n\n  /**\n   * @type {Compiler}\n   */\n  function compiler(tree) {\n    return (0,hast_util_to_html__WEBPACK_IMPORTED_MODULE_0__.toHtml)(tree, settings)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVoeXBlLXN0cmluZ2lmeS9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEscUNBQXFDO0FBQ2xELGFBQWEsMENBQTBDO0FBQ3ZEOztBQUV3Qzs7QUFFeEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNlO0FBQ2YsYUFBYSw0RUFBNEU7QUFDekY7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFdBQVcseURBQU07QUFDakI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYm9hcmQvLi9ub2RlX21vZHVsZXMvcmVoeXBlLXN0cmluZ2lmeS9saWIvaW5kZXguanM/MjYzOCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5Sb290fSBSb290XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0LXV0aWwtdG8taHRtbCcpLk9wdGlvbnN9IE9wdGlvbnNcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaWZpZWQnKS5Db21waWxlcjxSb290LCBzdHJpbmc+fSBDb21waWxlclxuICovXG5cbmltcG9ydCB7dG9IdG1sfSBmcm9tICdoYXN0LXV0aWwtdG8taHRtbCdcblxuLyoqXG4gKiBQbHVnaW4gdG8gYWRkIHN1cHBvcnQgZm9yIHNlcmlhbGl6aW5nIGFzIEhUTUwuXG4gKlxuICogQHBhcmFtIHtPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZH0gW29wdGlvbnNdXG4gKiAgIENvbmZpZ3VyYXRpb24gKG9wdGlvbmFsKS5cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiAgIE5vdGhpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlaHlwZVN0cmluZ2lmeShvcHRpb25zKSB7XG4gIC8qKiBAdHlwZSB7aW1wb3J0KCd1bmlmaWVkJykuUHJvY2Vzc29yPHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFJvb3QsIHN0cmluZz59ICovXG4gIC8vIEB0cy1leHBlY3QtZXJyb3I6IFRTIGluIEpTRG9jIGdlbmVyYXRlcyB3cm9uZyB0eXBlcyBpZiBgdGhpc2AgaXMgdHlwZWQgcmVndWxhcmx5LlxuICBjb25zdCBzZWxmID0gdGhpc1xuICBjb25zdCBzZXR0aW5ncyA9IHsuLi5zZWxmLmRhdGEoJ3NldHRpbmdzJyksIC4uLm9wdGlvbnN9XG5cbiAgc2VsZi5jb21waWxlciA9IGNvbXBpbGVyXG5cbiAgLyoqXG4gICAqIEB0eXBlIHtDb21waWxlcn1cbiAgICovXG4gIGZ1bmN0aW9uIGNvbXBpbGVyKHRyZWUpIHtcbiAgICByZXR1cm4gdG9IdG1sKHRyZWUsIHNldHRpbmdzKVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/rehype-stringify/lib/index.js\n");

/***/ })

};
;