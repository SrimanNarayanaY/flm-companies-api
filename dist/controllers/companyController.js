"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const companies_1 = require("../models/companies");
class CompanyController {
    async createCompany(req, res, next) {
        try {
            const companyData = req.body;
            if (companyData.name)
                companyData.name = companyData.name.toUpperCase();
            if (companyData.code)
                companyData.code = companyData.code.toUpperCase();
            const [nameExists, codeExists] = await Promise.all([
                companies_1.CompanyModel.findOne({ name: companyData.name }),
                companies_1.CompanyModel.findOne({ code: companyData.code }),
            ]);
            if (nameExists) {
                return res.status(409).json({
                    success: false,
                    message: "Company with this name already exists",
                });
            }
            if (codeExists) {
                return res.status(409).json({
                    success: false,
                    message: "Company with this code already exists",
                });
            }
            const company = await companies_1.CompanyModel.create(companyData);
            return res.status(201).json({
                success: true,
                message: "Company created successfully",
                data: company,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.CompanyController = CompanyController;
