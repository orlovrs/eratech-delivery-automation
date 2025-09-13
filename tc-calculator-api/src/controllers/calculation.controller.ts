import {Request, Response} from 'express';
import {Class365Client, Class365Resources} from "../services/class365.client";

const client = Class365Client.getClient();
let token;

export const postSamplesCalculation = (req: Request, res: Response): void => {
    res
        .status(200)
        .json({
            "door2door": [
                {
                    company: "СДЭК",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Экспресс",
                    base: 400,
                    pickup: 50,
                    sms: 20,
                    insurance: 0,
                    total: 470,
                    margin: "10%",
                    clientPrice: 517
                },
                {
                    company: "СДЭК",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Премиум",
                    base: 480,
                    pickup: 40,
                    sms: 0,
                    insurance: 30,
                    total: 550,
                    margin: "15%",
                    clientPrice: 633
                },
                {
                    company: "Catapulto",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Курьер",
                    base: 460,
                    pickup: 50,
                    sms: 10,
                    insurance: 0,
                    total: 520,
                    margin: "12%",
                    clientPrice: 582
                }
            ],
            "door2store": [
                {
                    company: "Catapulto",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Эконом",
                    base: 350,
                    pickup: 0,
                    sms: 20,
                    insurance: 0,
                    total: 370,
                    margin: "10%",
                    clientPrice: 407
                },
            ],
            "store2door": [
                {
                    company: "Catapulto",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Эконом",
                    base: 350,
                    pickup: 0,
                    sms: 20,
                    insurance: 0,
                    total: 370,
                    margin: "10%",
                    clientPrice: 407
                },
            ],
            "store2store": [
                {
                    company: "Catapulto",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Эконом",
                    base: 350,
                    pickup: 0,
                    sms: 20,
                    insurance: 0,
                    total: 370,
                    margin: "10%",
                    clientPrice: 407
                },
            ]
        });
};

export const postPackageCalculation = (req: Request, res: Response): void => {
    res
        .status(200)
        .json({
            "door2door": [
                {
                    company: "СДЭК",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Экспресс",
                    base: 400,
                    pickup: 50,
                    sms: 20,
                    insurance: 0,
                    total: 470,
                    margin: "10%",
                    clientPrice: 517
                },
                {
                    company: "СДЭК",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Премиум",
                    base: 480,
                    pickup: 40,
                    sms: 0,
                    insurance: 30,
                    total: 550,
                    margin: "15%",
                    clientPrice: 633
                },
                {
                    company: "Catapulto",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Курьер",
                    base: 460,
                    pickup: 50,
                    sms: 10,
                    insurance: 0,
                    total: 520,
                    margin: "12%",
                    clientPrice: 582
                }
            ],
            "door2store": [
                {
                    company: "Catapulto",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Эконом",
                    base: 350,
                    pickup: 0,
                    sms: 20,
                    insurance: 0,
                    total: 370,
                    margin: "10%",
                    clientPrice: 407
                },
            ],
            "store2door": [
                {
                    company: "Catapulto",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Эконом",
                    base: 350,
                    pickup: 0,
                    sms: 20,
                    insurance: 0,
                    total: 370,
                    margin: "10%",
                    clientPrice: 407
                },
            ],
            "store2store": [
                {
                    company: "Catapulto",
                    deliveryTime: "1 д",
                    extras: 360,
                    tariff: "Эконом",
                    base: 350,
                    pickup: 0,
                    sms: 20,
                    insurance: 0,
                    total: 370,
                    margin: "10%",
                    clientPrice: 407
                },
            ]
        });
};

export const postTest = async (req: Request, res: Response): Promise<void> => {
    (async () => {
        token = await client.get(Class365Resources.DEALS, {
            id: 10139235,
            extended: 1,
            with_additional_fields: 1,
            help: 1
        });
        res
            .status(200)
            .json(token);
    })();
}