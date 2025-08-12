"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const companies_1 = require("../models/companies");
class CompanyController {
    //create Company
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
    // Get All Companies
    async getCompanies(req, res, next) {
        try {
            const { name, industry, status, founded_year, q, // full-text search query
            page = 1, limit = 10, sortBy = "created_at", sortOrder = "desc", } = req.query;
            const filter = {};
            if (name)
                filter.name = { $regex: new RegExp(name, "i") };
            if (industry)
                filter.industry = industry;
            if (status)
                filter.status = status;
            if (founded_year)
                filter.founded_year = Number(founded_year);
            // Full-text search using $text index
            if (q)
                filter.$text = { $search: q };
            const skip = (Number(page) - 1) * Number(limit);
            const companies = await companies_1.CompanyModel.find(filter)
                .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean();
            const total = await companies_1.CompanyModel.countDocuments(filter);
            return res.json({
                success: true,
                total,
                page: Number(page),
                limit: Number(limit),
                data: companies,
            });
        }
        catch (err) {
            next(err);
        }
    }
    // Get Single Company by ID
    async getCompanyById(req, res, next) {
        try {
            const { id } = req.params;
            const company = await companies_1.CompanyModel.findById(id);
            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found",
                });
            }
            return res.json({
                success: true,
                data: company,
            });
        }
        catch (err) {
            next(err);
        }
    }
    // Update Company
    async updateCompany(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;
            if (updates.name)
                updates.name = updates.name.toUpperCase();
            if (updates.code)
                updates.code = updates.code.toUpperCase();
            const company = await companies_1.CompanyModel.findByIdAndUpdate(id, updates, {
                new: true,
                runValidators: true,
            });
            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found",
                });
            }
            return res.json({
                success: true,
                message: "Company updated successfully",
                data: company,
            });
        }
        catch (err) {
            next(err);
        }
    }
    // Delete Company (Hard Delete)
    async deleteCompany(req, res, next) {
        try {
            const { id } = req.params;
            const company = await companies_1.CompanyModel.findByIdAndDelete(id);
            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found",
                });
            }
            return res.json({
                success: true,
                message: "Company deleted successfully",
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.CompanyController = CompanyController;
