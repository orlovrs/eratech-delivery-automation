import { Router } from 'express';
import {
    postPackageCalculation,
    postSamplesCalculation,
    postTest
} from '../controllers/calculation.controller';
import {generalFields, getBoxes, getFieldOptions} from "../controllers/general-fields.controller";
import {getServiceInfo} from "../controllers/info.controller";

const router = Router();

// healthcheck
router.get('/health', (_req, res) => res.json({ status: 'ok' }));

// get client data
router.get('/api/dictionaries', getFieldOptions);
router.post('/api/deals/:id', generalFields);

// get feature toggles and service info
router.get('/api/info', getServiceInfo);

// calculations
router.post('/api/calculations/package', postPackageCalculation);

router.post('/api/calculations/test', postTest);

export default router;
