// test/nurseController.test.js
const nurseController = require("../routes/nurseRouter");
const passwordHasher = require("../controller/passwordController");
const { nurseAction } = require("../model/Action");
const people = require("../model/schema/userSchema");

const { jest, describe } = require("@jest/globals");
// Mock dependencies
jest.mock("../controller/passwordController");
jest.mock("../model/Action");
jest.mock("../model/schema/userSchema");

describe("Nurse Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getNurse", () => {
    it("should return nurse data", async () => {
      const req = { query: { key: "value" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const nurseData = { name: "John Doe" };

      nurseAction.get.mockResolvedValue(nurseData);

      await nurseController.get(req, res);

      expect(nurseAction.get).toHaveBeenCalledWith({ key: "value" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(nurseData);
    });

    it("should handle errors", async () => {
      const req = { query: { key: "value" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      nurseAction.get.mockRejectedValue(new Error("Error"));

      await nurseController.get(req, res);

      expect(nurseAction.get).toHaveBeenCalledWith({ key: "value" });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error Nurse request" });
    });
  });

  describe("registerNurse", () => {
    it("should register a nurse", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password",
          name: "John Doe",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      people.nurse.findOne.mockResolvedValue(null);
      passwordHasher.mockResolvedValue("hashedpassword");
      nurseAction.insert.mockResolvedValue();

      await nurseController.register(req, res);

      expect(people.nurse.findOne).toHaveBeenCalledWith({
        email: "test@example.com",
      });
      expect(passwordHasher).toHaveBeenCalledWith("password");
      expect(nurseAction.insert).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "hashedpassword",
        name: "John Doe",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Successfully inserted the Nurse data",
      });
    });

    it("should return error if email already exists", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password",
          name: "John Doe",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      people.nurse.findOne.mockResolvedValue({ email: "test@example.com" });

      await nurseController.register(req, res);

      expect(people.nurse.findOne).toHaveBeenCalledWith({
        email: "test@example.com",
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email already exists",
      });
    });

    it("should handle errors", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password",
          name: "John Doe",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      people.nurse.findOne.mockRejectedValue(new Error("Error"));

      await nurseController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error in submitting the Nurse item!",
      });
    });
  });

  describe("updateNurse", () => {
    it("should update nurse data", async () => {
      const req = { body: { filter: { id: 1 }, update: { name: "Jane Doe" } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      nurseAction.update.mockResolvedValue();

      await nurseController.update(req, res);

      expect(nurseAction.update).toHaveBeenCalledWith(
        { id: 1 },
        { name: "Jane Doe" }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Succesfully updated Nurse data!",
      });
    });

    it("should handle errors", async () => {
      const req = { body: { filter: { id: 1 }, update: { name: "Jane Doe" } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      nurseAction.update.mockRejectedValue(new Error("Error"));

      await nurseController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error to update the Nurse data!",
      });
    });
  });

  describe("deleteNurse", () => {
    it("should delete nurse data", async () => {
      const req = { params: { userId: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const result = { message: "Deleted successfully" };
      nurseAction.remove.mockResolvedValue(result);

      await nurseController.delete(req, res);

      expect(nurseAction.remove).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(result);
    });

    it("should handle errors", async () => {
      const req = { params: { userId: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      nurseAction.remove.mockRejectedValue(new Error("Error"));

      await nurseController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error deleting the Nurse item!",
      });
    });
  });
});
