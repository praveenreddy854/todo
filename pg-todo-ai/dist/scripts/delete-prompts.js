"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrompts = void 0;
var intro_1 = require("../samples/intro");
var function_shema_1 = require("../function-shema");
var fs_1 = __importDefault(require("fs"));
var delete_todo_1 = require("../samples/delete-todo");
var types_1 = require("../types/types");
var deletePrompts = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        function_shema_1.samples.forEach(function (sample) {
            var parameters = {
                type: "object",
                properties: {},
                required: [],
            };
            var introPrompt = "assistant:" + intro_1.intro;
            if (sample.functions[0].functionName === types_1.Functions.createTodo) {
                introPrompt += "\n" + JSON.stringify(delete_todo_1.deleteTodoSamples);
            }
            var messages = [
                {
                    role: "assistant",
                    content: sample.prompt,
                },
                {
                    role: "assistant",
                    content: introPrompt,
                },
            ];
            var rawInput = {
                messages: messages,
                functions: sample.functions.map(function (fn) { return ({
                    name: fn.functionName,
                    description: "",
                    // open ai parameters
                    parameters: {
                        type: "object",
                        properties: (function () {
                            var properties = {};
                            Object.entries(fn.arguments).forEach(function (_a) {
                                var key = _a[0], value = _a[1];
                                properties[key] = {
                                    type: value.type,
                                    description: value.description,
                                };
                            });
                            return properties;
                        })(),
                        required: __spreadArray([], (fn.arguments.required
                            ? __spreadArray(__spreadArray([], parameters.required, true), [fn.functionName], false) : parameters.required), true),
                    },
                }); }),
            };
            var fileName = sample.functions[0].functionName;
            var dir = "./dist/samples/prompts";
            // create dir if not exists
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir);
            }
            // write to file
            fs_1.default.writeFile("./dist/samples/prompts/".concat(fileName, ".json"), JSON.stringify(rawInput), function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
        return [2 /*return*/];
    });
}); };
exports.deletePrompts = deletePrompts;
createPrompts();
