export declare class GoogleClient {
    private appScriptUrl;
    private packagesEndpoint;
    private serviceInfoEndpoint;
    private getFullUrl;
    constructor();
    getBoxesDetails(amount: number, standard: string, hasPackage: boolean, isSample: boolean): Promise<any>;
    getServiceInfo(): Promise<any>;
}
//# sourceMappingURL=google.client.d.ts.map