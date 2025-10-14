export class GoogleClient {
    private appScriptUrl = "https://script.google.com/macros/s/AKfycbzeV3F6XV55f6qiVvVXx4klpUpkTRciXPdbxryCtC5JYTFqR_knC9-CUhhch6Js0HE/exec";
    private packagesEndpoint = "?route=packages";
    private serviceInfoEndpoint = "?route=info";

    private getFullUrl(ep: string) {
        return `${this.appScriptUrl}${ep}`;
    }

    constructor() {
    }

    public async getBoxesDetails(amount, standard, hasPackage, isSample): Promise<any> {
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

    public async getServiceInfo() {
        const response = await fetch(this.getFullUrl(this.serviceInfoEndpoint), {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Could not get service info details');
        }

        return await response.json();
    }
}
