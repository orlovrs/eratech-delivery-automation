"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleClient = void 0;
const config_1 = require("../config");
class GoogleClient {
    appScriptUrl = config_1.Config.GOOGLE_API_URL;
    packagesEndpoint = "?route=packages";
    serviceInfoEndpoint = "?route=info";
    getFullUrl(ep) {
        return `${this.appScriptUrl}${ep}`;
    }
    constructor() {
    }
    async getBoxesDetails(amount, standard, hasPackage, isSample) {
        const response = await fetch(this.getFullUrl(this.packagesEndpoint), {
            method: 'POST',
            body: JSON.stringify({
                amount,
                standard,
                hasPackage,
                isSample
            })
        });
        if (!response.ok) {
            throw new Error('Could not get boxes details');
        }
        return await response.json();
    }
    async getServiceInfo() {
        const response = await fetch(this.getFullUrl(this.serviceInfoEndpoint), {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Could not get service info details');
        }
        return await response.json();
    }
}
exports.GoogleClient = GoogleClient;
//# sourceMappingURL=google.client.js.map