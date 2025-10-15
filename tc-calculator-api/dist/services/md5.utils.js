"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Md5Utils = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Md5Utils {
    static computeMd5(s) {
        return crypto_1.default
            .createHash('md5')
            .update(s.trim(), 'utf-8')
            .digest('hex');
    }
}
exports.Md5Utils = Md5Utils;
//# sourceMappingURL=md5.utils.js.map