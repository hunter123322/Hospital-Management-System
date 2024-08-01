const mongoose = require("mongoose");

const registrantSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  userId: { type: String, required: true, trim: true, index: true },
  gender: {
    type: String,
    required: true,
    trim: true,
    enum: ["Male", "Female"],
  },
  civil: { type: String, required: true, trim: true },
  age: { type: Number, required: true, trim: true },
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

// EmployeeUserSchema
const employeeUserSchema = new mongoose.Schema(
  {
    registrant: registrantSchema,
    workingHour: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    location: locationSchema,
    email: {
      type: String,
      required: true,
      trim: true,
      match: /.+\@.+\..+/,
      index: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// PatientSchema
const patientUserSchema = new mongoose.Schema(
  {
    registrant: registrantSchema,
    location: locationSchema,
    guardian: { type: String, required: true, trim: true },
    roomNumber: { type: Number, required: true, trim: true },
    bedNumber: { type: Number, required: true, trim: true },
    disease: { type: String, required: true, trim: true },
    dateArrive: { type: Date, required: true },
    dateDischarged: { type: Date, required: false },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("doctor", employeeUserSchema);
const Nurse = mongoose.model("nurse", employeeUserSchema);
const Staff = mongoose.model("staff", employeeUserSchema);
const Patient = mongoose.model("patients", patientUserSchema);

const people = {
  doctor: Doctor,
  nurse: Nurse,
  staff: Staff,
  patient: Patient,
};

module.exports = people;
