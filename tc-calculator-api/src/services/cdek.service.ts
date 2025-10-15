import type {CdekDeliveryMode} from "../enums";

export class CdekService {
    private companyName = "СДЭК";

    findTariffs(take: CdekDeliveryMode, give: CdekDeliveryMode, deliveryOptions: any, tariffsList: any) {
        const fullOptionName = `${take.toLowerCase()}-${give.toLowerCase()}`;
        const result = [];

        return deliveryOptions.tariff_codes;
        // for (const option of deliveryOptions.tariff_codes.filter((o: any) => o.status == 'true')) {
        //     const code = option.tariff_code;
        //     const tariff = tariffsList.tariff_codes.find(
        //         (t: any) => t.delivery_modes.some((dm: any) => dm.tariff_code == code && dm.delivery_mode_name == fullOptionName)
        //     );
        //     if (!tariff)
        //         continue;
        //
        //     const obj = option.result;
        //     const smsPrice = obj.services.find((s: any) => s.code == 'SMS')?.total_sum;
        //     const insPrice = obj.services.find((s: any) => s.code == 'INSURANCE')?.total_sum;
        //
        //     result.push({
        //         company: this.companyName,
        //         tariff: `${tariff.tariff_name} / ${code}`,
        //         deliveryTime: `${this.convertToDate(obj.delivery_date_range.min)} - ${this.convertToDate(obj.delivery_date_range.max)}`,
        //         base: obj.delivery_sum,
        //         sms: smsPrice ?? 0,
        //         insurance: insPrice ?? 0,
        //         total: obj.total_sum
        //     });
        // }
        // return result;
    }

    private convertToDate(date: string) {
        const p = date.split('-');
        return `${p[2]}.${p[1]}.${p[0]}`;
    }
}