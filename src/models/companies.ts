import { Schema, model } from "mongoose";

const contactDetails = new Schema(
  {
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const addressDetails = new Schema(
  {
    address_line_1: {
      type: String,
      trim: true,
    },
    address_line_2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zip: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const companySettings = new Schema(
  {
    is_verified: {
      type: Boolean,
      default: false,
    },
    allow_remote_work: {
      type: Boolean,
      default: false,
    },
    allow_internships: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const companyDataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    industry: {
      type: String,
      trim: true,
    },

    founded_year: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear(),
    },

    size: {
      type: String,
      trim: true,
    }, // e.g., "51-200 employees"

    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },

    contact_details: contactDetails,

    address: addressDetails,

    settings: companySettings,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

// Compound indexes for filters
companyDataSchema.index(
  { name: 1, industry: 1, status: 1 },
  { background: true }
);
companyDataSchema.index({ code: 1, status: 1 }, { background: true });
companyDataSchema.index(
  { industry: 1, founded_year: 1, status: 1 },
  { background: true }
);

// Text index for full-text search (optional)
companyDataSchema.index({ name: "text", industry: "text" });

export const CompanyModel = model("Company", companyDataSchema, "companies");
