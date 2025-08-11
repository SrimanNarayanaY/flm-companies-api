"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyController_1 = require("../controllers/companyController");
const companyController = new companyController_1.CompanyController();
const companyRouter = (0, express_1.Router)();
companyRouter.post("/create", companyController.createCompany);
exports.default = companyRouter;
