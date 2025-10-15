import {Request, Response} from 'express';
import {Class365Client, Class365Constants, Class365Resources, Options} from "../services/class365.client";
import {GoogleClient} from "../services/google.client";

const client = Class365Client.getClient();

export const generalFields = (req: Request, res: Response): void => {
    const dealId = req.params.id;
    if (!dealId) {
        res.status(400).json({
            error: `Отсутствует ID сделки`
        });
        return;
    }

    (async () => {
        const json = await client.get(Class365Resources.DEALS, {
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
        const amount = deal[Class365Constants.goodsAmountFieldId];
        const standard = Options.standards.find(s =>
                s.id == deal[Class365Constants.goodStandardFieldId]
            )?.value || null;
        const pack = Options.packages.find(s =>
                s.id == deal[Class365Constants.packageFieldId]
            )?.value || null;
        const sendSample = Options.sendSample.find(s =>
            s.id == deal[Class365Constants.sendSampleFieldId]
        )?.value || null;

        const sampleDeliveryRequired = !!sendSample && sendSample != "Нет" && sendSample != "Без образца";
        const hasPackage = !pack && pack != "Нет";

        const boxes = await getBoxesDetails(amount, standard!, hasPackage, sampleDeliveryRequired);

        res
            .status(200)
            .json({
                deliveryDate: deal[Class365Constants.deliveryDateFieldId] ?? null,
                sendSample,
                boxes,
                standard,
                amount,
                phone: deal[Class365Constants.phoneFieldId] ?? null,
                package: pack,
                address: {
                    zipCode: deal[Class365Constants.zipCodeFieldId] || null,
                    city: Options.cities.find(c =>
                        c.id == deal[Class365Constants.cityFieldId]
                    )?.value || null,
                    street: deal[Class365Constants.streetFieldId],
                    building: deal[Class365Constants.buildingFieldId],
                },
                comments: deal[Class365Constants.commentFieldId],
        });
    })();
}

export const getFieldOptions = async (req: Request, res: Response): Promise<void> => {
    res.status(200)
        .json({
            cities: Options.cities,
            packages: Options.packages,
            standards: Options.standards,
            sendSample: Options.sendSample
        });
}

const getBoxesDetails = async (amount: number, standard: string, hasPackage: boolean, isSample: boolean) => {
    const client = new GoogleClient();
    return {
        sample: isSample ? await client.getBoxesDetails(amount, standard, hasPackage, true) : null,
        package: await client.getBoxesDetails(amount, standard, hasPackage, false)
    }
}
