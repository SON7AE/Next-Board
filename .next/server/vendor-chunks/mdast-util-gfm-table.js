"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-gfm-table";
exports.ids = ["vendor-chunks/mdast-util-gfm-table"];
exports.modules = {

/***/ "(ssr)/./node_modules/mdast-util-gfm-table/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/mdast-util-gfm-table/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gfmTableFromMarkdown: () => (/* binding */ gfmTableFromMarkdown),\n/* harmony export */   gfmTableToMarkdown: () => (/* binding */ gfmTableToMarkdown)\n/* harmony export */ });\n/* harmony import */ var devlop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! devlop */ \"(ssr)/./node_modules/devlop/lib/development.js\");\n/* harmony import */ var markdown_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! markdown-table */ \"(ssr)/./node_modules/markdown-table/index.js\");\n/* harmony import */ var mdast_util_to_markdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mdast-util-to-markdown */ \"(ssr)/./node_modules/mdast-util-to-markdown/lib/handle/index.js\");\n/**\n * @typedef {import('mdast').InlineCode} InlineCode\n * @typedef {import('mdast').Table} Table\n * @typedef {import('mdast').TableCell} TableCell\n * @typedef {import('mdast').TableRow} TableRow\n *\n * @typedef {import('markdown-table').Options} MarkdownTableOptions\n *\n * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext\n * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension\n * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle\n *\n * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension\n * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle\n * @typedef {import('mdast-util-to-markdown').State} State\n * @typedef {import('mdast-util-to-markdown').Info} Info\n */\n\n/**\n * @typedef Options\n *   Configuration.\n * @property {boolean | null | undefined} [tableCellPadding=true]\n *   Whether to add a space of padding between delimiters and cells (default:\n *   `true`).\n * @property {boolean | null | undefined} [tablePipeAlign=true]\n *   Whether to align the delimiters (default: `true`).\n * @property {MarkdownTableOptions['stringLength'] | null | undefined} [stringLength]\n *   Function to detect the length of table cell content, used when aligning\n *   the delimiters between cells (optional).\n */\n\n\n\n\n\n/**\n * Create an extension for `mdast-util-from-markdown` to enable GFM tables in\n * markdown.\n *\n * @returns {FromMarkdownExtension}\n *   Extension for `mdast-util-from-markdown` to enable GFM tables.\n */\nfunction gfmTableFromMarkdown() {\n  return {\n    enter: {\n      table: enterTable,\n      tableData: enterCell,\n      tableHeader: enterCell,\n      tableRow: enterRow\n    },\n    exit: {\n      codeText: exitCodeText,\n      table: exitTable,\n      tableData: exit,\n      tableHeader: exit,\n      tableRow: exit\n    }\n  }\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterTable(token) {\n  const align = token._align\n  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(align, 'expected `_align` on table')\n  this.enter(\n    {\n      type: 'table',\n      align: align.map(function (d) {\n        return d === 'none' ? null : d\n      }),\n      children: []\n    },\n    token\n  )\n  this.data.inTable = true\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exitTable(token) {\n  this.exit(token)\n  this.data.inTable = undefined\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterRow(token) {\n  this.enter({type: 'tableRow', children: []}, token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exit(token) {\n  this.exit(token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterCell(token) {\n  this.enter({type: 'tableCell', children: []}, token)\n}\n\n// Overwrite the default code text data handler to unescape escaped pipes when\n// they are in tables.\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exitCodeText(token) {\n  let value = this.resume()\n\n  if (this.data.inTable) {\n    value = value.replace(/\\\\([\\\\|])/g, replace)\n  }\n\n  const node = this.stack[this.stack.length - 1]\n  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(node.type === 'inlineCode')\n  node.value = value\n  this.exit(token)\n}\n\n/**\n * @param {string} $0\n * @param {string} $1\n * @returns {string}\n */\nfunction replace($0, $1) {\n  // Pipes work, backslashes don’t (but can’t escape pipes).\n  return $1 === '|' ? $1 : $0\n}\n\n/**\n * Create an extension for `mdast-util-to-markdown` to enable GFM tables in\n * markdown.\n *\n * @param {Options | null | undefined} [options]\n *   Configuration.\n * @returns {ToMarkdownExtension}\n *   Extension for `mdast-util-to-markdown` to enable GFM tables.\n */\nfunction gfmTableToMarkdown(options) {\n  const settings = options || {}\n  const padding = settings.tableCellPadding\n  const alignDelimiters = settings.tablePipeAlign\n  const stringLength = settings.stringLength\n  const around = padding ? ' ' : '|'\n\n  return {\n    unsafe: [\n      {character: '\\r', inConstruct: 'tableCell'},\n      {character: '\\n', inConstruct: 'tableCell'},\n      // A pipe, when followed by a tab or space (padding), or a dash or colon\n      // (unpadded delimiter row), could result in a table.\n      {atBreak: true, character: '|', after: '[\\t :-]'},\n      // A pipe in a cell must be encoded.\n      {character: '|', inConstruct: 'tableCell'},\n      // A colon must be followed by a dash, in which case it could start a\n      // delimiter row.\n      {atBreak: true, character: ':', after: '-'},\n      // A delimiter row can also start with a dash, when followed by more\n      // dashes, a colon, or a pipe.\n      // This is a stricter version than the built in check for lists, thematic\n      // breaks, and setex heading underlines though:\n      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>\n      {atBreak: true, character: '-', after: '[:|-]'}\n    ],\n    handlers: {\n      inlineCode: inlineCodeWithTable,\n      table: handleTable,\n      tableCell: handleTableCell,\n      tableRow: handleTableRow\n    }\n  }\n\n  /**\n   * @type {ToMarkdownHandle}\n   * @param {Table} node\n   */\n  function handleTable(node, _, state, info) {\n    return serializeData(handleTableAsData(node, state, info), node.align)\n  }\n\n  /**\n   * This function isn’t really used normally, because we handle rows at the\n   * table level.\n   * But, if someone passes in a table row, this ensures we make somewhat sense.\n   *\n   * @type {ToMarkdownHandle}\n   * @param {TableRow} node\n   */\n  function handleTableRow(node, _, state, info) {\n    const row = handleTableRowAsData(node, state, info)\n    const value = serializeData([row])\n    // `markdown-table` will always add an align row\n    return value.slice(0, value.indexOf('\\n'))\n  }\n\n  /**\n   * @type {ToMarkdownHandle}\n   * @param {TableCell} node\n   */\n  function handleTableCell(node, _, state, info) {\n    const exit = state.enter('tableCell')\n    const subexit = state.enter('phrasing')\n    const value = state.containerPhrasing(node, {\n      ...info,\n      before: around,\n      after: around\n    })\n    subexit()\n    exit()\n    return value\n  }\n\n  /**\n   * @param {Array<Array<string>>} matrix\n   * @param {Array<string | null | undefined> | null | undefined} [align]\n   */\n  function serializeData(matrix, align) {\n    return (0,markdown_table__WEBPACK_IMPORTED_MODULE_1__.markdownTable)(matrix, {\n      align,\n      // @ts-expect-error: `markdown-table` types should support `null`.\n      alignDelimiters,\n      // @ts-expect-error: `markdown-table` types should support `null`.\n      padding,\n      // @ts-expect-error: `markdown-table` types should support `null`.\n      stringLength\n    })\n  }\n\n  /**\n   * @param {Table} node\n   * @param {State} state\n   * @param {Info} info\n   */\n  function handleTableAsData(node, state, info) {\n    const children = node.children\n    let index = -1\n    /** @type {Array<Array<string>>} */\n    const result = []\n    const subexit = state.enter('table')\n\n    while (++index < children.length) {\n      result[index] = handleTableRowAsData(children[index], state, info)\n    }\n\n    subexit()\n\n    return result\n  }\n\n  /**\n   * @param {TableRow} node\n   * @param {State} state\n   * @param {Info} info\n   */\n  function handleTableRowAsData(node, state, info) {\n    const children = node.children\n    let index = -1\n    /** @type {Array<string>} */\n    const result = []\n    const subexit = state.enter('tableRow')\n\n    while (++index < children.length) {\n      // Note: the positional info as used here is incorrect.\n      // Making it correct would be impossible due to aligning cells?\n      // And it would need copy/pasting `markdown-table` into this project.\n      result[index] = handleTableCell(children[index], node, state, info)\n    }\n\n    subexit()\n\n    return result\n  }\n\n  /**\n   * @type {ToMarkdownHandle}\n   * @param {InlineCode} node\n   */\n  function inlineCodeWithTable(node, parent, state) {\n    let value = mdast_util_to_markdown__WEBPACK_IMPORTED_MODULE_2__.handle.inlineCode(node, parent, state)\n\n    if (state.stack.includes('tableCell')) {\n      value = value.replace(/\\|/g, '\\\\$&')\n    }\n\n    return value\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1nZm0tdGFibGUvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxhQUFhLDRCQUE0QjtBQUN6QyxhQUFhLHVCQUF1QjtBQUNwQyxhQUFhLDJCQUEyQjtBQUN4QyxhQUFhLDBCQUEwQjtBQUN2QztBQUNBLGFBQWEsa0NBQWtDO0FBQy9DO0FBQ0EsYUFBYSxtREFBbUQ7QUFDaEUsYUFBYSw4Q0FBOEM7QUFDM0QsYUFBYSwyQ0FBMkM7QUFDeEQ7QUFDQSxhQUFhLDBDQUEwQztBQUN2RCxhQUFhLHlDQUF5QztBQUN0RCxhQUFhLHdDQUF3QztBQUNyRCxhQUFhLHVDQUF1QztBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0EsY0FBYyw0QkFBNEI7QUFDMUM7QUFDQSxjQUFjLHlEQUF5RDtBQUN2RTtBQUNBO0FBQ0E7O0FBRW1DO0FBQ1M7QUFDVTs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBTTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQSxjQUFjLCtCQUErQjtBQUM3Qzs7QUFFQTtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQSxjQUFjLGdDQUFnQztBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDJDQUFNO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNEJBQTRCO0FBQ3ZDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU8sMENBQTBDO0FBQ2pELE9BQU8sMENBQTBDO0FBQ2pEO0FBQ0E7QUFDQSxPQUFPLGdEQUFnRDtBQUN2RDtBQUNBLE9BQU8seUNBQXlDO0FBQ2hEO0FBQ0E7QUFDQSxPQUFPLDBDQUEwQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1osYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaLGFBQWEsV0FBVztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxzQkFBc0I7QUFDbkMsYUFBYSxxREFBcUQ7QUFDbEU7QUFDQTtBQUNBLFdBQVcsNkRBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0EsZ0JBQWdCLDBEQUFlOztBQUUvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hhZGNuLWJvYXJkLy4vbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtZ2ZtLXRhYmxlL2xpYi9pbmRleC5qcz9jNTFjIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5JbmxpbmVDb2RlfSBJbmxpbmVDb2RlXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlRhYmxlfSBUYWJsZVxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5UYWJsZUNlbGx9IFRhYmxlQ2VsbFxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5UYWJsZVJvd30gVGFibGVSb3dcbiAqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtYXJrZG93bi10YWJsZScpLk9wdGlvbnN9IE1hcmtkb3duVGFibGVPcHRpb25zXG4gKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duJykuQ29tcGlsZUNvbnRleHR9IENvbXBpbGVDb250ZXh0XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLWZyb20tbWFya2Rvd24nKS5FeHRlbnNpb259IEZyb21NYXJrZG93bkV4dGVuc2lvblxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duJykuSGFuZGxlfSBGcm9tTWFya2Rvd25IYW5kbGVcbiAqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLXRvLW1hcmtkb3duJykuT3B0aW9uc30gVG9NYXJrZG93bkV4dGVuc2lvblxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC10by1tYXJrZG93bicpLkhhbmRsZX0gVG9NYXJrZG93bkhhbmRsZVxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC10by1tYXJrZG93bicpLlN0YXRlfSBTdGF0ZVxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC10by1tYXJrZG93bicpLkluZm99IEluZm9cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIE9wdGlvbnNcbiAqICAgQ29uZmlndXJhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFt0YWJsZUNlbGxQYWRkaW5nPXRydWVdXG4gKiAgIFdoZXRoZXIgdG8gYWRkIGEgc3BhY2Ugb2YgcGFkZGluZyBiZXR3ZWVuIGRlbGltaXRlcnMgYW5kIGNlbGxzIChkZWZhdWx0OlxuICogICBgdHJ1ZWApLlxuICogQHByb3BlcnR5IHtib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3RhYmxlUGlwZUFsaWduPXRydWVdXG4gKiAgIFdoZXRoZXIgdG8gYWxpZ24gdGhlIGRlbGltaXRlcnMgKGRlZmF1bHQ6IGB0cnVlYCkuXG4gKiBAcHJvcGVydHkge01hcmtkb3duVGFibGVPcHRpb25zWydzdHJpbmdMZW5ndGgnXSB8IG51bGwgfCB1bmRlZmluZWR9IFtzdHJpbmdMZW5ndGhdXG4gKiAgIEZ1bmN0aW9uIHRvIGRldGVjdCB0aGUgbGVuZ3RoIG9mIHRhYmxlIGNlbGwgY29udGVudCwgdXNlZCB3aGVuIGFsaWduaW5nXG4gKiAgIHRoZSBkZWxpbWl0ZXJzIGJldHdlZW4gY2VsbHMgKG9wdGlvbmFsKS5cbiAqL1xuXG5pbXBvcnQge29rIGFzIGFzc2VydH0gZnJvbSAnZGV2bG9wJ1xuaW1wb3J0IHttYXJrZG93blRhYmxlfSBmcm9tICdtYXJrZG93bi10YWJsZSdcbmltcG9ydCB7ZGVmYXVsdEhhbmRsZXJzfSBmcm9tICdtZGFzdC11dGlsLXRvLW1hcmtkb3duJ1xuXG4vKipcbiAqIENyZWF0ZSBhbiBleHRlbnNpb24gZm9yIGBtZGFzdC11dGlsLWZyb20tbWFya2Rvd25gIHRvIGVuYWJsZSBHRk0gdGFibGVzIGluXG4gKiBtYXJrZG93bi5cbiAqXG4gKiBAcmV0dXJucyB7RnJvbU1hcmtkb3duRXh0ZW5zaW9ufVxuICogICBFeHRlbnNpb24gZm9yIGBtZGFzdC11dGlsLWZyb20tbWFya2Rvd25gIHRvIGVuYWJsZSBHRk0gdGFibGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2ZtVGFibGVGcm9tTWFya2Rvd24oKSB7XG4gIHJldHVybiB7XG4gICAgZW50ZXI6IHtcbiAgICAgIHRhYmxlOiBlbnRlclRhYmxlLFxuICAgICAgdGFibGVEYXRhOiBlbnRlckNlbGwsXG4gICAgICB0YWJsZUhlYWRlcjogZW50ZXJDZWxsLFxuICAgICAgdGFibGVSb3c6IGVudGVyUm93XG4gICAgfSxcbiAgICBleGl0OiB7XG4gICAgICBjb2RlVGV4dDogZXhpdENvZGVUZXh0LFxuICAgICAgdGFibGU6IGV4aXRUYWJsZSxcbiAgICAgIHRhYmxlRGF0YTogZXhpdCxcbiAgICAgIHRhYmxlSGVhZGVyOiBleGl0LFxuICAgICAgdGFibGVSb3c6IGV4aXRcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duSGFuZGxlfVxuICovXG5mdW5jdGlvbiBlbnRlclRhYmxlKHRva2VuKSB7XG4gIGNvbnN0IGFsaWduID0gdG9rZW4uX2FsaWduXG4gIGFzc2VydChhbGlnbiwgJ2V4cGVjdGVkIGBfYWxpZ25gIG9uIHRhYmxlJylcbiAgdGhpcy5lbnRlcihcbiAgICB7XG4gICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgYWxpZ246IGFsaWduLm1hcChmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZCA9PT0gJ25vbmUnID8gbnVsbCA6IGRcbiAgICAgIH0pLFxuICAgICAgY2hpbGRyZW46IFtdXG4gICAgfSxcbiAgICB0b2tlblxuICApXG4gIHRoaXMuZGF0YS5pblRhYmxlID0gdHJ1ZVxufVxuXG4vKipcbiAqIEB0aGlzIHtDb21waWxlQ29udGV4dH1cbiAqIEB0eXBlIHtGcm9tTWFya2Rvd25IYW5kbGV9XG4gKi9cbmZ1bmN0aW9uIGV4aXRUYWJsZSh0b2tlbikge1xuICB0aGlzLmV4aXQodG9rZW4pXG4gIHRoaXMuZGF0YS5pblRhYmxlID0gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZW50ZXJSb3codG9rZW4pIHtcbiAgdGhpcy5lbnRlcih7dHlwZTogJ3RhYmxlUm93JywgY2hpbGRyZW46IFtdfSwgdG9rZW4pXG59XG5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZXhpdCh0b2tlbikge1xuICB0aGlzLmV4aXQodG9rZW4pXG59XG5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZW50ZXJDZWxsKHRva2VuKSB7XG4gIHRoaXMuZW50ZXIoe3R5cGU6ICd0YWJsZUNlbGwnLCBjaGlsZHJlbjogW119LCB0b2tlbilcbn1cblxuLy8gT3ZlcndyaXRlIHRoZSBkZWZhdWx0IGNvZGUgdGV4dCBkYXRhIGhhbmRsZXIgdG8gdW5lc2NhcGUgZXNjYXBlZCBwaXBlcyB3aGVuXG4vLyB0aGV5IGFyZSBpbiB0YWJsZXMuXG4vKipcbiAqIEB0aGlzIHtDb21waWxlQ29udGV4dH1cbiAqIEB0eXBlIHtGcm9tTWFya2Rvd25IYW5kbGV9XG4gKi9cbmZ1bmN0aW9uIGV4aXRDb2RlVGV4dCh0b2tlbikge1xuICBsZXQgdmFsdWUgPSB0aGlzLnJlc3VtZSgpXG5cbiAgaWYgKHRoaXMuZGF0YS5pblRhYmxlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFxcKFtcXFxcfF0pL2csIHJlcGxhY2UpXG4gIH1cblxuICBjb25zdCBub2RlID0gdGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aCAtIDFdXG4gIGFzc2VydChub2RlLnR5cGUgPT09ICdpbmxpbmVDb2RlJylcbiAgbm9kZS52YWx1ZSA9IHZhbHVlXG4gIHRoaXMuZXhpdCh0b2tlbilcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gJDBcbiAqIEBwYXJhbSB7c3RyaW5nfSAkMVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcmVwbGFjZSgkMCwgJDEpIHtcbiAgLy8gUGlwZXMgd29yaywgYmFja3NsYXNoZXMgZG9u4oCZdCAoYnV0IGNhbuKAmXQgZXNjYXBlIHBpcGVzKS5cbiAgcmV0dXJuICQxID09PSAnfCcgPyAkMSA6ICQwXG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGV4dGVuc2lvbiBmb3IgYG1kYXN0LXV0aWwtdG8tbWFya2Rvd25gIHRvIGVuYWJsZSBHRk0gdGFibGVzIGluXG4gKiBtYXJrZG93bi5cbiAqXG4gKiBAcGFyYW0ge09wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkfSBbb3B0aW9uc11cbiAqICAgQ29uZmlndXJhdGlvbi5cbiAqIEByZXR1cm5zIHtUb01hcmtkb3duRXh0ZW5zaW9ufVxuICogICBFeHRlbnNpb24gZm9yIGBtZGFzdC11dGlsLXRvLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIHRhYmxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdmbVRhYmxlVG9NYXJrZG93bihvcHRpb25zKSB7XG4gIGNvbnN0IHNldHRpbmdzID0gb3B0aW9ucyB8fCB7fVxuICBjb25zdCBwYWRkaW5nID0gc2V0dGluZ3MudGFibGVDZWxsUGFkZGluZ1xuICBjb25zdCBhbGlnbkRlbGltaXRlcnMgPSBzZXR0aW5ncy50YWJsZVBpcGVBbGlnblxuICBjb25zdCBzdHJpbmdMZW5ndGggPSBzZXR0aW5ncy5zdHJpbmdMZW5ndGhcbiAgY29uc3QgYXJvdW5kID0gcGFkZGluZyA/ICcgJyA6ICd8J1xuXG4gIHJldHVybiB7XG4gICAgdW5zYWZlOiBbXG4gICAgICB7Y2hhcmFjdGVyOiAnXFxyJywgaW5Db25zdHJ1Y3Q6ICd0YWJsZUNlbGwnfSxcbiAgICAgIHtjaGFyYWN0ZXI6ICdcXG4nLCBpbkNvbnN0cnVjdDogJ3RhYmxlQ2VsbCd9LFxuICAgICAgLy8gQSBwaXBlLCB3aGVuIGZvbGxvd2VkIGJ5IGEgdGFiIG9yIHNwYWNlIChwYWRkaW5nKSwgb3IgYSBkYXNoIG9yIGNvbG9uXG4gICAgICAvLyAodW5wYWRkZWQgZGVsaW1pdGVyIHJvdyksIGNvdWxkIHJlc3VsdCBpbiBhIHRhYmxlLlxuICAgICAge2F0QnJlYWs6IHRydWUsIGNoYXJhY3RlcjogJ3wnLCBhZnRlcjogJ1tcXHQgOi1dJ30sXG4gICAgICAvLyBBIHBpcGUgaW4gYSBjZWxsIG11c3QgYmUgZW5jb2RlZC5cbiAgICAgIHtjaGFyYWN0ZXI6ICd8JywgaW5Db25zdHJ1Y3Q6ICd0YWJsZUNlbGwnfSxcbiAgICAgIC8vIEEgY29sb24gbXVzdCBiZSBmb2xsb3dlZCBieSBhIGRhc2gsIGluIHdoaWNoIGNhc2UgaXQgY291bGQgc3RhcnQgYVxuICAgICAgLy8gZGVsaW1pdGVyIHJvdy5cbiAgICAgIHthdEJyZWFrOiB0cnVlLCBjaGFyYWN0ZXI6ICc6JywgYWZ0ZXI6ICctJ30sXG4gICAgICAvLyBBIGRlbGltaXRlciByb3cgY2FuIGFsc28gc3RhcnQgd2l0aCBhIGRhc2gsIHdoZW4gZm9sbG93ZWQgYnkgbW9yZVxuICAgICAgLy8gZGFzaGVzLCBhIGNvbG9uLCBvciBhIHBpcGUuXG4gICAgICAvLyBUaGlzIGlzIGEgc3RyaWN0ZXIgdmVyc2lvbiB0aGFuIHRoZSBidWlsdCBpbiBjaGVjayBmb3IgbGlzdHMsIHRoZW1hdGljXG4gICAgICAvLyBicmVha3MsIGFuZCBzZXRleCBoZWFkaW5nIHVuZGVybGluZXMgdGhvdWdoOlxuICAgICAgLy8gPGh0dHBzOi8vZ2l0aHViLmNvbS9zeW50YXgtdHJlZS9tZGFzdC11dGlsLXRvLW1hcmtkb3duL2Jsb2IvNTFhMjAzOC9saWIvdW5zYWZlLmpzI0w1Nz5cbiAgICAgIHthdEJyZWFrOiB0cnVlLCBjaGFyYWN0ZXI6ICctJywgYWZ0ZXI6ICdbOnwtXSd9XG4gICAgXSxcbiAgICBoYW5kbGVyczoge1xuICAgICAgaW5saW5lQ29kZTogaW5saW5lQ29kZVdpdGhUYWJsZSxcbiAgICAgIHRhYmxlOiBoYW5kbGVUYWJsZSxcbiAgICAgIHRhYmxlQ2VsbDogaGFuZGxlVGFibGVDZWxsLFxuICAgICAgdGFibGVSb3c6IGhhbmRsZVRhYmxlUm93XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtUb01hcmtkb3duSGFuZGxlfVxuICAgKiBAcGFyYW0ge1RhYmxlfSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVUYWJsZShub2RlLCBfLCBzdGF0ZSwgaW5mbykge1xuICAgIHJldHVybiBzZXJpYWxpemVEYXRhKGhhbmRsZVRhYmxlQXNEYXRhKG5vZGUsIHN0YXRlLCBpbmZvKSwgbm9kZS5hbGlnbilcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzbuKAmXQgcmVhbGx5IHVzZWQgbm9ybWFsbHksIGJlY2F1c2Ugd2UgaGFuZGxlIHJvd3MgYXQgdGhlXG4gICAqIHRhYmxlIGxldmVsLlxuICAgKiBCdXQsIGlmIHNvbWVvbmUgcGFzc2VzIGluIGEgdGFibGUgcm93LCB0aGlzIGVuc3VyZXMgd2UgbWFrZSBzb21ld2hhdCBzZW5zZS5cbiAgICpcbiAgICogQHR5cGUge1RvTWFya2Rvd25IYW5kbGV9XG4gICAqIEBwYXJhbSB7VGFibGVSb3d9IG5vZGVcbiAgICovXG4gIGZ1bmN0aW9uIGhhbmRsZVRhYmxlUm93KG5vZGUsIF8sIHN0YXRlLCBpbmZvKSB7XG4gICAgY29uc3Qgcm93ID0gaGFuZGxlVGFibGVSb3dBc0RhdGEobm9kZSwgc3RhdGUsIGluZm8pXG4gICAgY29uc3QgdmFsdWUgPSBzZXJpYWxpemVEYXRhKFtyb3ddKVxuICAgIC8vIGBtYXJrZG93bi10YWJsZWAgd2lsbCBhbHdheXMgYWRkIGFuIGFsaWduIHJvd1xuICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCB2YWx1ZS5pbmRleE9mKCdcXG4nKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7VG9NYXJrZG93bkhhbmRsZX1cbiAgICogQHBhcmFtIHtUYWJsZUNlbGx9IG5vZGVcbiAgICovXG4gIGZ1bmN0aW9uIGhhbmRsZVRhYmxlQ2VsbChub2RlLCBfLCBzdGF0ZSwgaW5mbykge1xuICAgIGNvbnN0IGV4aXQgPSBzdGF0ZS5lbnRlcigndGFibGVDZWxsJylcbiAgICBjb25zdCBzdWJleGl0ID0gc3RhdGUuZW50ZXIoJ3BocmFzaW5nJylcbiAgICBjb25zdCB2YWx1ZSA9IHN0YXRlLmNvbnRhaW5lclBocmFzaW5nKG5vZGUsIHtcbiAgICAgIC4uLmluZm8sXG4gICAgICBiZWZvcmU6IGFyb3VuZCxcbiAgICAgIGFmdGVyOiBhcm91bmRcbiAgICB9KVxuICAgIHN1YmV4aXQoKVxuICAgIGV4aXQoKVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8c3RyaW5nPj59IG1hdHJpeFxuICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ+IHwgbnVsbCB8IHVuZGVmaW5lZH0gW2FsaWduXVxuICAgKi9cbiAgZnVuY3Rpb24gc2VyaWFsaXplRGF0YShtYXRyaXgsIGFsaWduKSB7XG4gICAgcmV0dXJuIG1hcmtkb3duVGFibGUobWF0cml4LCB7XG4gICAgICBhbGlnbixcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3I6IGBtYXJrZG93bi10YWJsZWAgdHlwZXMgc2hvdWxkIHN1cHBvcnQgYG51bGxgLlxuICAgICAgYWxpZ25EZWxpbWl0ZXJzLFxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogYG1hcmtkb3duLXRhYmxlYCB0eXBlcyBzaG91bGQgc3VwcG9ydCBgbnVsbGAuXG4gICAgICBwYWRkaW5nLFxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogYG1hcmtkb3duLXRhYmxlYCB0eXBlcyBzaG91bGQgc3VwcG9ydCBgbnVsbGAuXG4gICAgICBzdHJpbmdMZW5ndGhcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VGFibGV9IG5vZGVcbiAgICogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcbiAgICogQHBhcmFtIHtJbmZvfSBpbmZvXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVUYWJsZUFzRGF0YShub2RlLCBzdGF0ZSwgaW5mbykge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlblxuICAgIGxldCBpbmRleCA9IC0xXG4gICAgLyoqIEB0eXBlIHtBcnJheTxBcnJheTxzdHJpbmc+Pn0gKi9cbiAgICBjb25zdCByZXN1bHQgPSBbXVxuICAgIGNvbnN0IHN1YmV4aXQgPSBzdGF0ZS5lbnRlcigndGFibGUnKVxuXG4gICAgd2hpbGUgKCsraW5kZXggPCBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBoYW5kbGVUYWJsZVJvd0FzRGF0YShjaGlsZHJlbltpbmRleF0sIHN0YXRlLCBpbmZvKVxuICAgIH1cblxuICAgIHN1YmV4aXQoKVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VGFibGVSb3d9IG5vZGVcbiAgICogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcbiAgICogQHBhcmFtIHtJbmZvfSBpbmZvXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVUYWJsZVJvd0FzRGF0YShub2RlLCBzdGF0ZSwgaW5mbykge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlblxuICAgIGxldCBpbmRleCA9IC0xXG4gICAgLyoqIEB0eXBlIHtBcnJheTxzdHJpbmc+fSAqL1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdXG4gICAgY29uc3Qgc3ViZXhpdCA9IHN0YXRlLmVudGVyKCd0YWJsZVJvdycpXG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgLy8gTm90ZTogdGhlIHBvc2l0aW9uYWwgaW5mbyBhcyB1c2VkIGhlcmUgaXMgaW5jb3JyZWN0LlxuICAgICAgLy8gTWFraW5nIGl0IGNvcnJlY3Qgd291bGQgYmUgaW1wb3NzaWJsZSBkdWUgdG8gYWxpZ25pbmcgY2VsbHM/XG4gICAgICAvLyBBbmQgaXQgd291bGQgbmVlZCBjb3B5L3Bhc3RpbmcgYG1hcmtkb3duLXRhYmxlYCBpbnRvIHRoaXMgcHJvamVjdC5cbiAgICAgIHJlc3VsdFtpbmRleF0gPSBoYW5kbGVUYWJsZUNlbGwoY2hpbGRyZW5baW5kZXhdLCBub2RlLCBzdGF0ZSwgaW5mbylcbiAgICB9XG5cbiAgICBzdWJleGl0KClcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7VG9NYXJrZG93bkhhbmRsZX1cbiAgICogQHBhcmFtIHtJbmxpbmVDb2RlfSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiBpbmxpbmVDb2RlV2l0aFRhYmxlKG5vZGUsIHBhcmVudCwgc3RhdGUpIHtcbiAgICBsZXQgdmFsdWUgPSBkZWZhdWx0SGFuZGxlcnMuaW5saW5lQ29kZShub2RlLCBwYXJlbnQsIHN0YXRlKVxuXG4gICAgaWYgKHN0YXRlLnN0YWNrLmluY2x1ZGVzKCd0YWJsZUNlbGwnKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXHwvZywgJ1xcXFwkJicpXG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mdast-util-gfm-table/lib/index.js\n");

/***/ })

};
;