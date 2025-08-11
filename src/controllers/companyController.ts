import { Response, NextFunction } from "express";
import { Request } from "express";
import { CompanyModel } from "../models/companies";

export class CompanyController {
  public async createCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const companyData = req.body;

      if (companyData.name) companyData.name = companyData.name.toUpperCase();
      if (companyData.code) companyData.code = companyData.code.toUpperCase();

      const [nameExists, codeExists] = await Promise.all([
        CompanyModel.findOne({ name: companyData.name }),
        CompanyModel.findOne({ code: companyData.code }),
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

      const company = await CompanyModel.create(companyData);

      return res.status(201).json({
        success: true,
        message: "Company created successfully",
        data: company,
      });
    } catch (err) {
      next(err);
    }
  }
}
