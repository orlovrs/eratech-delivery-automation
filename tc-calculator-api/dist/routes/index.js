"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calculation_controller_1 = require("../controllers/calculation.controller");
const general_fields_controller_1 = require("../controllers/general-fields.controller");
const info_controller_1 = require("../controllers/info.controller");
const router = (0, express_1.Router)();
// healthcheck
router.get('/health', (_req, res) => res.json({ status: 'ok' }));
// get client data
router.get('/api/dictionaries', general_fields_controller_1.getFieldOptions);
router.post('/api/deals/:id', general_fields_controller_1.generalFields);
// get feature toggles and service info
router.get('/api/info', info_controller_1.getServiceInfo);
// calculations
router.post('/api/calculations/package', calculation_controller_1.postPackageCalculation);
router.post('/api/calculations/test', calculation_controller_1.postTest);
exports.default = router;
//# sourceMappingURL=index.js.map