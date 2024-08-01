const mongoose = require("mongoose");

const registrantSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  middleName: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  civil: { type: String, required: true, trim: true },
  dateOfBirth: {
    year: { type: Number, required: true },
    month: { type: String, required: true, trim: true },
    day: { type: Number, required: true },
  },
});

const locationSchema = new mongoose.Schema({
  country: { type: String, required: true, trim: true },
  region: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true },
  municipality: { type: String, required: true, trim: true },
  barangay: { type: String, required: true, trim: true },
  zone: { type: Number, required: true },
  zip: { type: Number, required: false },
});

const schoolSchema = new mongoose.Schema({
  schoolYear: { type: String, required: true, trim: true },
  location: locationSchema,
  strand: { type: String, trim: true },
  course: { type: String, trim: true },
});

const parentSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  middleName: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  dateOfBirth: {
    year: { type: Number, required: true },
    month: { type: String, required: true, trim: true },
    day: { type: Number, required: true },
  },
});

const employeeInfoSchema = new mongoose.Schema(
  {
    registrant: registrantSchema,
    role: { type: String, required: true, trim: true },
    parents: {
      mother: parentSchema,
      father: parentSchema,
    },
    contact: {
      phoneNumber: { type: String, required: true, trim: true },
      email: {
        type: String,
        required: true,
        trim: true,
        match: /.+\@.+\..+/,
        index: true,
      },
      socialMedia: [{ type: String, trim: true }],
    },
    location: locationSchema,
    school: {
      elementary: [schoolSchema],
      highSchool: [schoolSchema],
      seniorHigh: [schoolSchema],
      college: [schoolSchema],
      boardExampassed: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = { employeeInfoSchema };
