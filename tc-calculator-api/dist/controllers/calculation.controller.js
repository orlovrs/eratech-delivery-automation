"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTest = exports.postPackageCalculation = void 0;
const class365_client_1 = require("../services/class365.client");
const cdek_client_1 = require("../services/cdek.client");
const cdek_service_1 = require("../services/cdek.service");
const enums_1 = require("../enums");
const config_1 = require("../config");
const client = class365_client_1.Class365Client.getClient();
const cdek = new cdek_client_1.CdekClient();
const cdekService = new cdek_service_1.CdekService();
let token;
const separators = ['мск+', 'utc+', 'gmt+'];
const postPackageCalculation = async (req, res) => {
    const packages = req.body?.packages;
    if (!packages) {
        res.status(400).json({
            error: "Нет информации о коробках"
        });
        return;
    }
    if (packages.length == 0) {
        res.status(200).json({
            error: "Не нужно считать доставку"
        });
        return;
    }
    const from = req.body?.from;
    if (!from.city) {
        res.status(400).json({
            error: "Не указан город отправления"
        });
        return;
    }
    if (!from.zipCode) {
        res.status(400).json({
            error: "Не указан индекс отправления"
        });
        return;
    }
    const toCity = req.body?.to;
    if (!toCity.city) {
        res.status(400).json({
            error: "Не указан город доставки"
        });
        return;
    }
    if (!toCity.zipCode) {
        res.status(400).json({
            error: "Не указан индекс доставки"
        });
        return;
    }
    for (const s of separators) {
        if (toCity.city.indexOf(s) != -1) {
            toCity.city = toCity.city.split(s)[0].trim();
        }
    }
    if (toCity.city.indexOf(' ') != -1) {
        toCity.city = toCity.city.split(' ')[0];
    }
    try {
        const fromCityObject = await cdek.findByCityAndZipCode(from.city, from.zipCode);
        const toCityObject = await cdek.findByCityAndZipCode(toCity.city, toCity.zipCode);
        const deliveryTariffs = await cdek.getDeliveryOptions(fromCityObject, toCityObject, true, req.body?.phone ? req.body.phone : null, packages);
        const tariffsList = await cdek.getDeliveryTariffs();
        res.status(200).json({
            door2door: [
                ...cdekService.findTariffs(enums_1.CdekDeliveryMode.DOOR, enums_1.CdekDeliveryMode.DOOR, deliveryTariffs, tariffsList)
            ],
            door2store: [
                ...cdekService.findTariffs(enums_1.CdekDeliveryMode.DOOR, enums_1.CdekDeliveryMode.WAREHOUSE, deliveryTariffs, tariffsList)
            ],
            store2door: [
                ...cdekService.findTariffs(enums_1.CdekDeliveryMode.WAREHOUSE, enums_1.CdekDeliveryMode.DOOR, deliveryTariffs, tariffsList)
            ],
            store2store: [
                ...cdekService.findTariffs(enums_1.CdekDeliveryMode.WAREHOUSE, enums_1.CdekDeliveryMode.WAREHOUSE, deliveryTariffs, tariffsList)
            ],
        });
    }
    catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
};
exports.postPackageCalculation = postPackageCalculation;
const postTest = async (req, res) => {
    // (async () => {
    //     token = await client.get(Class365Resources.DEALS, {
    //         id: 10299816,
    //         extended: 1,
    //         with_additional_fields: 1,
    //         // help: 0
    //     });
    //     res
    //         .status(200)
    //         .json(token);
    // })();
    res
        .status(200)
        .json(config_1.Config.CLASS_365_DOMAIN);
};
exports.postTest = postTest;
//# sourceMappingURL=calculation.controller.js.map