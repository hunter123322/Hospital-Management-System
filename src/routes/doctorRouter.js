const passwordHasher = require("../controller/passwordController");
const people = require("../model/schema/userSchema");
const { doctorAction } = require("../services/action");
const { dataValidation } = require("../validation/userValidation");

const getDoctor = async (req, res) => {
  try {
    const key = req.query;
    const doctor = await doctorAction.get(key);

    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error Doctor request", error: error.message });
  }
};

const registerDoctor = async (req, res) => {
  try {
    const data = req.body;
    await dataValidation(data);

    const { email, password, ...rest } = data;

    const existingDoctor = await people.doctor.findOne({ email: email });
    if (existingDoctor) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await passwordHasher(password);

    const doctorData = { ...rest, email, password: hashedPassword };
    await doctorAction.insert(doctorData);

    res.status(201).json({ message: "Successfully Created the Doctor data" });
  } catch (error) {
    res.status(400).json({
      message: "Error in submitting the item into the database!",
      error: error.message,
    });
  }
};

const registerDoctorInfo = async (req, res) => {
  try {
    const info = req.body;
    await doctorAction.insert(info);

    res.status(201).json({ message: "Successfully register the Doctor info" });
  } catch (error) {
    res.status(400).json({
      message: "Error in creating Doctor info!",
      error: error.message,
    });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { filter, update } = req.body;

    await doctorAction.update(filter, update);

    res.status(200).json({ message: "Successfully updated Doctor data" });
  } catch (error) {
    res.status(400).json({
      message: "Error to update the Doctor data!",
      error: error.message,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { userId } = req.params;
    await doctorAction.remove(userId);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting the Doctor item!",
      error: error.message,
    });
  }
};

const doctor = {
  get: getDoctor,
  register: registerDoctor,
  update: updateDoctor,
  delete: deleteDoctor,
};

module.exports = doctor;
