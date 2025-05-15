import { Request, Response } from "express";
import { LeadModel } from "../models/Lead";

export const leadController = {
  createLead: async (req: Request, res: Response) => {
    try {
      const { name, phoneNumber, email, loanType } = req.body;
      const lead = await LeadModel.create({
        name,
        phoneNumber,
        email,
        loanType,
      });

      res.status(201).json({
        status: "success",
        data: lead,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to create lead",
      });
    }
  },

  getLeads: async (req: Request, res: Response) => {
    try {
      const leads = await LeadModel.findAll();

      res.status(200).json({
        status: "success",
        data: leads,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve leads",
      });
    }
  },
};
