export declare enum Class365Resources {
    REPAIR = "repair",
    DEALS = "deals",
    ADDITIONAL_FIELDS = "additionfieldslists"
}
export declare enum Class365Constants {
    DOMAIN,
    APP_ID,
    API_KEY,
    deliveryDateFieldId = "3999483",
    goodStandardFieldId = "3999639",
    goodsAmountFieldId = "3999564",
    packageFieldId = "3999529",
    commentFieldId = "3999580",
    sendSampleFieldId = "3999571",
    phoneFieldId = "3999594",
    cityFieldId = "2752795",
    streetFieldId = "5978038",
    buildingFieldId = "3999600",
    zipCodeFieldId = "3999601"
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