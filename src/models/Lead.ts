import dotenv from "dotenv";
dotenv.config();
import { ObjectId } from "mongodb";
import { getDB } from "../config/database";

export interface Lead {
  _id?: ObjectId;
  name: string;
  phoneNumber: string;
  email: string;
  loanType: string;
  createdAt: Date;
}

const collectionName = process.env.COLLECTION_NAME!;

export const LeadModel = {
  create: async (leadData: Omit<Lead, "_id" | "createdAt">) => {
    const lead = { ...leadData, createdAt: new Date() };
    const result = await getDB().collection(collectionName).insertOne(lead);
    return { id: result.insertedId, ...lead };
  },

  findAll: async () => {
    return getDB().collection(collectionName).find().toArray();
  },
};
