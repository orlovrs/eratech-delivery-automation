"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldOptions = exports.generalFields = void 0;
const class365_client_1 = require("../services/class365.client");
const google_client_1 = require("../services/google.client");
const client = class365_client_1.Class365Client.getClient();
const generalFields = (req, res) => {
    const dealId = req.params.id;
    if (!dealId) {
        res.status(400).json({
            error: `Отсутствует ID сделки`
        });
        return;
    }
    (async () => {
        const json = await client.get(class365_client_1.Class365Resources.DEALS, {
            id: dealId,
            extended: 1,
            with_additional_fields: 1,
        });
        if (json.result.length == 0) {
            res.status(404).json({
                error: `Сделка с ID ${dealId} не найдена`
            });
            return;
        }
        const deal = json.result[0];
        const amount = deal[class365_client_1.Class365Constants.goodsAmountFieldId];
        const standard = class365_client_1.Options.standards.find(s => s.id == deal[class365_client_1.Class365Constants.goodStandardFieldId])?.value || null;
        const pack = class365_client_1.Options.packages.find(s => s.id == deal[class365_client_1.Class365Constants.packageFieldId])?.value || null;
        const sendSample = class365_client_1.Options.sendSample.find(s => s.id == deal[class365_client_1.Class365Constants.sendSampleFieldId])?.value || null;
        const sampleDeliveryRequired = !!sendSample && sendSample != "Нет" && sendSample != "Без образца";
        const hasPackage = !pack && pack != "Нет";
        const boxes = await getBoxesDetails(amount, standard, hasPackage, sampleDeliveryRequired);
        res
            .status(200)
            .json({
            deliveryDate: deal[class365_client_1.Class365Constants.deliveryDateFieldId] ?? null,
            sendSample,
            boxes,
            standard,
            amount,
            phone: deal[class365_client_1.Class365Constants.phoneFieldId] ?? null,
            package: pack,
            address: {
                zipCode: deal[class365_client_1.Class365Constants.zipCodeFieldId] || null,
                city: class365_client_1.Options.cities.find(c => c.id == deal[class365_client_1.Class365Constants.cityFieldId])?.value || null,
                street: deal[class365_client_1.Class365Constants.streetFieldId],
                building: deal[class365_client_1.Class365Constants.buildingFieldId],
            },
            comments: deal[class365_client_1.Class365Constants.commentFieldId],
        });
    })();
};
exports.generalFields = generalFields;
const getFieldOptions = async (req, res) => {
    res.status(200)
        .json({
        cities: class365_client_1.Options.cities,
        packages: class365_client_1.Options.packages,
        standards: class365_client_1.Options.standards,
        sendSample: class365_client_1.Options.sendSample
    });
};
exports.getFieldOptions = getFieldOptions;
const getBoxesDetails = async (amount, standard, hasPackage, isSample) => {
    const client = new google_client_1.GoogleClient();
    return {
        sample: isSample ? await client.getBoxesDetails(amount, standard, hasPackage, true) : null,
        package: await client.getBoxesDetails(amount, standard, hasPackage, false)
    };
};
//# sourceMappingURL=general-fields.controller.js.map