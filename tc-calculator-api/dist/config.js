"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envName = process.env.NODE_ENV || 'local';
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, `../${envName}.env`) });
class Config {
    // CDEK
    static CDEK_BASE_API = process.env.CDEK_BASE_API || '';
    static CDEK_CLIENT_ID = process.env.CDEK_CLIENT_ID || '';
    static CDEK_CLIENT_SECRET = process.env.CDEK_CLIENT_SECRET || '';
    // Class365
    static CLASS_365_DOMAIN = process.env.CLASS_365_DOMAIN || '';
    static APP_ID = process.env.APP_ID || '';
    static API_KEY = process.env.API_KEY || '';
    // Google table
    static GOOGLE_API_URL = process.env.GOOGLE_API_URL || '';
    static SMS_ENABLED = process.env.SMS_ENABLED == 'true';
}
exports.Config = Config;
//# sourceMappingURL=config.js.map