import dotenv from "dotenv";
import path from "path";

const envName = process.env.NODE_ENV || 'local';
dotenv.config({ path: path.resolve(__dirname, `../${envName}.env`) });

export class Config {
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