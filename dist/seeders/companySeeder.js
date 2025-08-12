"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const companies_1 = require("../models/companies");
dotenv_1.default.config();
function createCompanies(noOfCompanies = 10) {
    const companies = [];
    for (let i = 0; i < noOfCompanies; i++) {
        companies.push(generateACompany());
    }
    return companies;
}
function generateACompany() {
    const name = faker_1.faker.company.name();
    const code = faker_1.faker.string.alpha({ length: 5, casing: "upper" }) +
        faker_1.faker.number.int({ min: 100, max: 999 });
    return {
        name,
        code,
        industry: faker_1.faker.commerce.department(),
        founded_year: faker_1.faker.number.int({
            min: 1950,
            max: new Date().getFullYear(),
        }),
        size: `${faker_1.faker.number.int({ min: 10, max: 500 })}-${faker_1.faker.number.int({
            min: 501,
            max: 1000,
        })} employees`,
        status: faker_1.faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
        contact_details: {
            phone: faker_1.faker.phone.number(),
            email: faker_1.faker.internet.email({ firstName: name }).toLowerCase(),
            website: faker_1.faker.internet.url(),
        },
        address: {
            address_line_1: faker_1.faker.location.streetAddress(),
            address_line_2: faker_1.faker.location.secondaryAddress(),
            city: faker_1.faker.location.city(),
            state: faker_1.faker.location.state(),
            zip: faker_1.faker.location.zipCode(),
            country: faker_1.faker.location.country(),
        },
        settings: {
            is_verified: faker_1.faker.datatype.boolean(),
            allow_remote_work: faker_1.faker.datatype.boolean(),
            allow_internships: faker_1.faker.datatype.boolean(),
        },
    };
}
(async function () {
    try {
        await mongoose_1.default.connect(process.env.MONGO_CONNECTION_STRING);
        console.info("✅ Connected to MongoDB");
        console.time("⏳ Data Insertion Time");
        const BATCH_SIZE = 10000;
        const TOTAL = 500000;
        for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
            const batch = createCompanies(BATCH_SIZE);
            await companies_1.CompanyModel.insertMany(batch, { ordered: false });
            console.log(`Inserted batch ${i / BATCH_SIZE + 1}`);
        }
        console.timeEnd("⏳ Data Insertion Time");
        console.log(`✅ Finished inserting ${TOTAL} companies`);
        process.exit(0);
    }
    catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
})();
