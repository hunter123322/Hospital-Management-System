const dbConnection = require("../config/databaseConnection");
const people = require("../model/schema/userSchema");

class Action {
  constructor(title, Model) {
    this.title = title;
    this.Model = Model;
  }

  async get(key) {
    try {
      await dbConnection();

      const item = await this.Model.find(key);

      return item;
    } catch (error) {
      throw new Error(`Error Getting the ${this.title}!`);
    }
  }

  async insert(person) {
    try {
      await dbConnection();

      const newIndividual = new this.Model(person);

      const foundItem = await this.Model.findOne(person);
      if (foundItem) throw new Error(`The ${this.title} already exists!`);

      await newIndividual.save();
    } catch (error) {
      throw new Error(
        `Error inserting the ${this.title} info!: ${error.message}`
      );
    }
  }

  async update(filter, update) {
    try {
      await dbConnection();

      const checkItem = await this.Model.findOne({
        "registrant.userId": filter,
      });

      if (!checkItem) throw new Error(`The ${this.title} doesn't Exist`);

      update.$set = update.$set || {};
      update.$set.updatedAt = new Date();

      await this.Model.updateOne(
        { "registrant.userId": filter },
        { $set: update }
      );
    } catch (error) {
      throw new Error(`Can't update the ${this.title}: ${error.message}`);
    }
  }

  async remove(userId) {
    try {
      await dbConnection();

      const foundItem = await this.Model.findOne({ userId: userId });
      if (!foundItem)
        throw new Error({ message: `The ${this.title} not found` });

      await this.Model.findByIdAndDelete(foundItem._id);
      const checkItem = await this.Model.findOne({ userId: userId });

      if (checkItem)
        throw new Error({ message: `Failed to remove the ${this.title}` });

      return { message: `${this.title} removed successfully` };
    } catch (error) {
      throw new Error({
        message: `Error removing the ${this.title}: ${error.message}`,
      });
    }
  }
}

const doctorAction = new Action("Doctor", people.doctor);
const nurseAction = new Action("Nurse", people.nurse);
const staffAction = new Action("Staff", people.staff);
const patientAction = new Action("Patient", people.patient);

// doctorAction
//   .get()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

module.exports = { doctorAction, nurseAction, staffAction, patientAction };
