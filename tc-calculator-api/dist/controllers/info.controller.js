"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceInfo = void 0;
const express_1 = require("express");
const google_client_1 = require("../services/google.client");
const getServiceInfo = async (req, res) => {
    res
        .status(200)
        .json(await new google_client_1.GoogleClient().getServiceInfo());
};
exports.getServiceInfo = getServiceInfo;
//# sourceMappingURL=info.controller.js.map