import {Request, Response} from 'express';
import {Class365Client, Class365Resources} from "../services/class365.client";
import {CdekClient} from "../services/cdek.client";
import {CdekService} from "../services/cdek.service";
import {CdekDeliveryMode} from "../enums";
import {Config} from "../config";
import path from "path";

const client = Class365Client.getClient();
const cdek = new CdekClient();
const cdekService = new CdekService();

let token;
const separators = ['мск+', 'utc+', 'gmt+'];

export const postPackageCalculation = async (req: Request, res: Response) => {
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
        const deliveryTariffs = await cdek.getDeliveryOptions(
            fromCityObject,
            toCityObject,
            true,
            req.body?.phone ? req.body.phone : null,
            packages
        );
        const tariffsList = await cdek.getDeliveryTariffs();
        res.status(200).json({
            door2door: [
                ...cdekService.findTariffs(CdekDeliveryMode.DOOR, CdekDeliveryMode.DOOR, deliveryTariffs, tariffsList)
            ],
            door2store: [
                ...cdekService.findTariffs(CdekDeliveryMode.DOOR, CdekDeliveryMode.WAREHOUSE, deliveryTariffs, tariffsList)
            ],
            store2door: [
                ...cdekService.findTariffs(CdekDeliveryMode.WAREHOUSE, CdekDeliveryMode.DOOR, deliveryTariffs, tariffsList)
            ],
            store2store: [
                ...cdekService.findTariffs(CdekDeliveryMode.WAREHOUSE, CdekDeliveryMode.WAREHOUSE, deliveryTariffs, tariffsList)
            ],
        });
    } catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
};

export const postTest = async (req: Request, res: Response): Promise<void> => {
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
            .json(Config.CLASS_365_DOMAIN);
}