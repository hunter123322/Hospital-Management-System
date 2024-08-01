const { patientAction } = require("../services/action");
const { patientValidation } = require("../validation/userValidation");

const getPatient = async (req, res) => {
  try {
    const key = req.query;
    const patient = await patientAction.get(key);

    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ message: "Error patient request" });
  }
};

const registerPatient = async (req, res) => {
  try {
    const data = req.body;
    await patientValidation(data);

    await patientAction.insert(data);

    res.status(201).json({ message: "Successfully register the patient data" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in creating the item!", error: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { filter, update } = req.body;

    await patientAction.update(filter, update);

    res.status(200).json({ message: "Succesfully updated patient data!" });
  } catch (error) {
    res.status(400).json({
      message: "Error to update the Patient data!",
      error: error.message,
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { userId } = req.params;
    await patientAction.remove(userId);
    res.status(200).json({ message: "Successfully deleted!" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting the item!", error: error.message });
  }
};

const patient = {
  get: getPatient,
  register: registerPatient,
  update: updatePatient,
  delete: deletePatient,
};

module.exports = patient;
