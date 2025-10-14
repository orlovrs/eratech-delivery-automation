import {Request, Response} from 'express';
import {GoogleClient} from "../services/google.client";

export const getServiceInfo = async (req: Request, res: Response): Promise<any> => {
    res
        .status(200)
        .json(await new GoogleClient().getServiceInfo());
}