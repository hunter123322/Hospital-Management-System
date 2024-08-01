const mongoose = require("mongoose");
const { employeeInfoSchema } = require("./infoSchema");

const doctorSchema = new mongoose.Schema({
  employeeInfo: employeeInfoSchema,
});

const nurseSchema = new mongoose.Schema({
  employeeInfo: employeeInfoSchema,
});

const otherStuff = new mongoose.Schema({
  employeeInfo: employeeInfoSchema,
});

const Doctor = mongoose.model("DoctorInfo", doctorSchema);
const Nurse = mongoose.model("NurseInfo", nurseSchema);
const Stuff = mongoose.model("StuffInfo", otherStuff);

const employeeModel = {
  doctor: Doctor,
  nurse: Nurse,
  stuff: Stuff,
};

module.exports = employeeModel;
