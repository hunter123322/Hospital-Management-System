const { staffAction } = require("../services/action");

const getStaff = async (req, res) => {
  try {
    const key = req.query;
    const stuff = await staffAction.get(key);

    res.status(200).json(stuff);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Stuff request", error: error.message });
  }
};

const registerStaff = async (req, res) => {
  try {
    const data = req.body;
    await dataValidation(data);

    const { email, password, ...rest } = data;
    await staffAction.insert(stuffData);

    res.status(201).json({ message: "Successfully register the Stuff data" });
  } catch (error) {
    res.status(500).json({
      message: "Error in creating the Stuff item!",
      error: error.message,
    });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { filter, update } = req.body;

    await staffAction.update(filter, update);

    res.status(200).json({ message: "Succesfully updated Stuff data!" });
  } catch (error) {
    res.status(400).json({
      message: `Error to update the Staff data: ${error}`,
      error: error.message,
    });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { userId } = req.params;
    await staffAction.remove(userId);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting the Stuff item!",
      error: error.message,
    });
  }
};

const staff = {
  get: getStaff,
  register: registerStaff,
  update: updateStaff,
  delete: deleteStaff,
};

module.exports = staff;
