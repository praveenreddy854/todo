"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredResponse = void 0;
var getFilteredResponse = function (response) {
    var _a;
    if (response.choices[0].finishReason !== "function_call") {
        console.error(JSON.stringify(response, null, 2));
        throw new Error("The response is not a function call.");
    }
    (_a = response.promptFilterResults) === null || _a === void 0 ? void 0 : _a.forEach(function (result) {
        if (result.contentFilterResults) {
            for (var _i = 0, _a = Object.entries(result.contentFilterResults); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                throwIfNotSafe(key, value);
            }
        }
    });
    return response.choices[0];
};
exports.getFilteredResponse = getFilteredResponse;
var throwIfNotSafe = function (key, contentFilterResult) {
    if (contentFilterResult.severity !== "safe") {
        throw new Error("It seems like the input has ".concat(key, " content. Please try again with a different input."));
    }
};
