import { Router } from "express";
import { CompanyController } from "../controllers/companyController";

const companyController = new CompanyController();

const companyRouter: Router = Router();

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

export default companyRouter;
