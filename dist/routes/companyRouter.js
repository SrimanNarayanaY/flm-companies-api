"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyController_1 = require("../controllers/companyController");
const companyController = new companyController_1.CompanyController();
const companyRouter = (0, express_1.Router)();
// Create Company
companyRouter.post("/create", companyController.createCompany);
// Get all Companies (with filters & pagination)
companyRouter.get("/all", companyController.getCompanies);
// Get single Company by ID
companyRouter.get("/:id", companyController.getCompanyById);
// Update Company by ID
companyRouter.put("/:id", companyController.updateCompany);
// Delete Company by ID
companyRouter.delete("/:id", companyController.deleteCompany);
exports.default = companyRouter;
