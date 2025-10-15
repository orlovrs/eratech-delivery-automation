export declare enum Class365Resources {
    REPAIR = "repair",
    DEALS = "deals",
    ADDITIONAL_FIELDS = "additionfieldslists"
}
export declare class Class365Constants {
    static DOMAIN: string;
    static APP_ID: number;
    static API_KEY: string;
    static deliveryDateFieldId: string;
    static goodStandardFieldId: string;
    static goodsAmountFieldId: string;
    static packageFieldId: string;
    static commentFieldId: string;
    static sendSampleFieldId: string;
    static phoneFieldId: string;
    static cityFieldId: string;
    static streetFieldId: string;
    static buildingFieldId: string;
    static zipCodeFieldId: string;
}
export declare class Options {
    static standards: {
        id: string;
        value: string;
    }[];
    static packages: {
        id: string;
        value: string;
    }[];
    static sendSample: {
        id: string;
        value: string;
    }[];
    static cities: {
        id: string;
        value: string;
    }[];
}
export declare class Class365Client {
    private appId;
    private apiKey;
    private domain;
    private baseUrl;
    constructor(domain: string, appId: number, apiKey: string);
    static getClient(): Class365Client;
    getToken(): Promise<string>;
    get(resource: string, params: any): Promise<any>;
}
//# sourceMappingURL=class365.client.d.ts.map