const passwordHasher = require("../controller/passwordController");
const { nurseAction } = require("../services/action");
const people = require("../model/schema/userSchema");

const getNurse = async (req, res) => {
  try {
    const key = req.query;
    const nurse = await nurseAction.get(key);

    res.status(200).json(nurse);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error Nurse request", error: error.message });
  }
};

const registerNurse = async (req, res) => {
  try {
    const data = req.body;
    await dataValidation(data);

    const { email, password, ...rest } = data;

    const existingNurse = await people.nurse.findOne({ email: email });
    if (existingNurse) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await passwordHasher(password);

    const nurseData = { ...rest, email, password: hashedPassword };
    await nurseAction.insert(nurseData);

    res.status(201).json({ message: "Successfully Created the Nurse data" });
  } catch (error) {
    res.status(400).json({
      message: "Error in submitting the Nurse item!",
      error: error.message,
    });
  }
};

const registerNurseInfo = async (req, res) => {
  try {
    const info = req.body;
    await nurseAction.insert(info);
    res.status(201).json({ message: "Successfully register the Nurse info" });
  } catch (error) {
    res.status(400).json({
      message: "Error in creating Nurse info!",
      error: error.message,
    });
  }
};

const updateNurse = async (req, res) => {
  try {
    const { filter, update } = req.body;

    await nurseAction.update(filter, update);

    res.status(200).json({ message: "Succesfully updated Nurse data!" });
  } catch (error) {
    res.status(400).json({
      message: "Error to update the Nurse data!",
      error: error.message,
    });
  }
};

const deleteNurse = async (req, res) => {
  try {
    const { userId } = req.params;
    await nurseAction.remove(userId);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting the Nurse item!",
      error: error.message,
    });
  }
};

const nurse = {
  get: getNurse,
  register: registerNurse,
  update: updateNurse,
  delete: deleteNurse,
};

module.exports = nurse;
