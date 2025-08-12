import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { CompanyModel } from "../models/companies";

dotenv.config();

function createCompanies(noOfCompanies = 10) {
  const companies = [];
  for (let i = 0; i < noOfCompanies; i++) {
    companies.push(generateACompany());
  }
  return companies;
}

function generateACompany() {
  const name = faker.company.name();
  const code =
    faker.string.alpha({ length: 5, casing: "upper" }) +
    faker.number.int({ min: 100, max: 999 });

  return {
    name,
    code,
    industry: faker.commerce.department(),
    founded_year: faker.number.int({
      min: 1950,
      max: new Date().getFullYear(),
    }),
    size: `${faker.number.int({ min: 10, max: 500 })}-${faker.number.int({
      min: 501,
      max: 1000,
    })} employees`,
    status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
    contact_details: {
      phone: faker.phone.number(),
      email: faker.internet.email({ firstName: name }).toLowerCase(),
      website: faker.internet.url(),
    },
    address: {
      address_line_1: faker.location.streetAddress(),
      address_line_2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      country: faker.location.country(),
    },
    settings: {
      is_verified: faker.datatype.boolean(),
      allow_remote_work: faker.datatype.boolean(),
      allow_internships: faker.datatype.boolean(),
    },
  };
}

(async function () {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);
    console.info("✅ Connected to MongoDB");

    console.time("⏳ Data Insertion Time");

    const BATCH_SIZE = 10000;
    const TOTAL = 500000;

    for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
      const batch = createCompanies(BATCH_SIZE);
      await CompanyModel.insertMany(batch, { ordered: false });
      console.log(`Inserted batch ${i / BATCH_SIZE + 1}`);
    }

    console.timeEnd("⏳ Data Insertion Time");
    console.log(`✅ Finished inserting ${TOTAL} companies`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
