import type { CdekDeliveryMode } from "../enums";
export declare class CdekService {
    private companyName;
    findTariffs(take: CdekDeliveryMode, give: CdekDeliveryMode, deliveryOptions: any, tariffsList: any): {
        company: string;
        tariff: string;
        deliveryTime: string;
        base: any;
        sms: any;
        insurance: any;
        total: any;
    }[];
    private convertToDate;
}
//# sourceMappingURL=cdek.service.d.ts.map