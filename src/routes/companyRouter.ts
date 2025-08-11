import { Router } from "express";
import { CompanyController } from "../controllers/companyController";

const companyController = new CompanyController();

const companyRouter: Router = Router();

companyRouter.post("/create", companyController.createCompany);

export default companyRouter;
