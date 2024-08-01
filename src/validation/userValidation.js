const validator = require("validator");

async function dataValidation(data) {
  try {
    const {
      registrant: { firstName, lastName, userId, gender, civil, age },
      workingHour,
      phoneNumber,
      role,
      location: {
        country,
        region,
        district,
        municipality,
        barangay,
        zone,
        zip,
      },
      email,
      password,
    } = data;

    // Perform validation
    let errors = [];

    // Validate registrant
    if (!firstName || typeof firstName !== "string") {
      errors.push("First name is required and must be a string.");
    }
    if (!lastName || typeof lastName !== "string") {
      errors.push("Last name is required and must be a string.");
    }
    if (!userId || typeof userId !== "string") {
      errors.push("User ID is required and must be a string.");
    }
    if (!gender || typeof gender !== "string") {
      errors.push("Gender is required and must be a string.");
    }
    if (!civil || typeof civil !== "string") {
      errors.push("Civil status is required and must be a string.");
    }
    if (!age || typeof age !== "number" || age <= 0) {
      errors.push("Age is required and must be a positive number.");
    }

    // Validate workingHour
    if (!workingHour || typeof workingHour !== "string") {
      errors.push(
        "Working hour is required and must be a non-negative number."
      );
    }

    // Validate phoneNumber
    if (!phoneNumber || !validator.isMobilePhone(phoneNumber.toString())) {
      errors.push("Valid phone number is required.");
    }

    // Validate role
    if (!role || typeof role !== "string") {
      errors.push("Role is required and must be a string.");
    }

    // Validate location
    if (!country || typeof country !== "string") {
      errors.push("Country is required and must be a string.");
    }
    if (!region || typeof region !== "string") {
      errors.push("Region is required and must be a string.");
    }
    if (!district || typeof district !== "string") {
      errors.push("District is required and must be a string.");
    }
    if (!municipality || typeof municipality !== "string") {
      errors.push("Municipality is required and must be a string.");
    }
    if (!barangay || typeof barangay !== "string") {
      errors.push("Barangay is required and must be a string.");
    }
    if (!zone || typeof zone !== "number") {
      errors.push("Zone is required and must be a number.");
    }
    if (!zip || !validator.isPostalCode(zip.toString(), "any")) {
      errors.push("Valid ZIP code is required.");
    }

    // Validate email
    if (!email || !validator.isEmail(email)) {
      errors.push("Valid email is required.");
    }

    // Validate password
    if (!password || typeof password !== "string" || password.length < 6) {
      errors.push(
        "Password is required and must be at least 6 characters long."
      );
    }

    if (errors.length > 0) {
      throw new Error(errors.join(" "));
    }
  } catch (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }
}

async function patientValidation(data) {
  try {
    let errors = [];
    const {
      registrant: { firstName, lastName, userId, gender, civil, age },
      location: {
        country,
        region,
        district,
        municipality,
        barangay,
        zone,
        zip,
      },
      guardian,
      roomNumber,
      bedNumber,
      disease,
      dateArrive,
      dateDischarged,
    } = data;

    if (!firstName || typeof country !== "string") {
      errors.push("First name is required");
    }

    if (!lastName || typeof country !== "string") {
      errors.push("Last name is required");
    }

    if (
      !gender ||
      typeof gender !== "string" ||
      !["Male", "Female", "Other"].includes(gender)
    ) {
      errors.push(
        'Gender is required and must be either "Male", "Female", or "Other"'
      );
    }

    if (!civil) {
      errors.push("Civil status is required");
    }

    if (typeof age !== "number" || age < 0 || age > 120) {
      errors.push("Age is required");
    }

    // Location validation
    if (!country || typeof country !== "string") {
      errors.push("Country is required");
    }

    if (!region || typeof region !== "string") {
      errors.push("Region is required");
    }

    if (!district || typeof district !== "string") {
      errors.push("District is required");
    }

    if (!municipality || typeof municipality !== "string") {
      errors.push("Municipality is required");
    }

    if (!barangay || typeof barangay !== "string") {
      errors.push("Barangay is required");
    }

    if (typeof zone !== "number" || zone <= 0) {
      errors.push("Zone is required and must be a positive number");
    }

    if (zip && (typeof zip !== "number" || zip < 1000 || zip > 9999)) {
      errors.push("Zip, if provided, must be accurate");
    }

    // Other fields validation
    if (!guardian || typeof guardian !== "string") {
      errors.push("Guardian is required");
    }

    if (typeof roomNumber !== "number" || roomNumber <= 0) {
      errors.push("Room number is required");
    }

    if (typeof bedNumber !== "number" || bedNumber <= 0) {
      errors.push("Bed number is required");
    }

    if (!disease || typeof disease !== "string") {
      errors.push("Disease is required");
    }

    if (!dateArrive || !(dateArrive instanceof Date)) {
      errors.push("Date of arrival is required");
    }

    if (dateDischarged && !(dateDischarged instanceof Date)) {
      errors.push("Date of discharge, if provided, must be a valid date");
    }

    if (dateDischarged && dateArrive && dateDischarged < dateArrive) {
      errors.push("Date of discharge cannot be before the date of arrival");
    }

    // Check if there are any errors
    if (errors.length > 0) {
      throw new Error(errors.join(" "));
    }
  } catch (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }
}
module.exports = { dataValidation, patientValidation };
