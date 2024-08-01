const express = require("express");

const { isAuthenticated } = require("../controller/authentication");
const patient = require("./patientRouter");
const doctor = require("./doctorRouter");
const nurse = require("./nurseRouter");
const staff = require("./staffRouter");
const router = express.Router();

router.get("/doctor", isAuthenticated, doctor.get);
router.post("/doctor/register", isAuthenticated, doctor.register);
router.post("/doctor/register/info", isAuthenticated, doctor.register);
router.put("/doctor/update", isAuthenticated, doctor.update);
router.delete("/doctor/delete/:userId", isAuthenticated, doctor.delete);

router.get("/nurse", isAuthenticated, nurse.get);
router.post("/nurse/register", isAuthenticated, nurse.register);
router.post("/nurse/register/info", isAuthenticated, nurse.register);
router.put("/nurse/update", isAuthenticated, nurse.update);
router.delete("/nurse/delete/:userId", isAuthenticated, nurse.delete);

router.get("/staff", isAuthenticated, staff.get);
router.post("/staff/register", isAuthenticated, staff.register);
router.put("/staff/update", isAuthenticated, staff.update);
router.delete("/staff/delete/:userId", isAuthenticated, staff.delete);

router.get("/patient", isAuthenticated, patient.get);
router.post("/patient/register", isAuthenticated, patient.register);
router.put("/patient/update", isAuthenticated, patient.update);
router.delete("/patient/delete/:userId", isAuthenticated, patient.delete);

module.exports = router;
