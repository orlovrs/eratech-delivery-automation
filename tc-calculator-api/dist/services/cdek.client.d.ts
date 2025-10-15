export declare class CdekClient {
    private baseUrl;
    private grantType;
    private clientId;
    private clientSecret;
    private byCityNameUrl;
    private zipCodesUrl;
    private tariffsUrl;
    private tokenUrl;
    private tariffsAndServices;
    getToken(): Promise<any>;
    findByCityAndZipCode(city: string, zipCode: number): Promise<any>;
    getDeliveryOptions(fromCity: any, toCity: any, hasInsurance: boolean, smsPhone: any, packages: any): Promise<any>;
    getDeliveryTariffs(): Promise<any>;
}
//# sourceMappingURL=cdek.client.d.ts.map