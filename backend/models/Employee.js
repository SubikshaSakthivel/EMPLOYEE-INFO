const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email validation regex
      },
      message: "Invalid email format",
    },
  },
  mobileNo: {
    type: String,
    required: true,
    validate: {
      validator: function (number) {
        return /^\d{10}$/.test(number); // Validates 10-digit numeric input
      },
      message: "Mobile number must be 10 digits",
    },
  },
  designation: {
    type: String,
    required: true,
    enum: ["HR", "Manager", "Sales"], // Restricts to specified values
  },
  gender: {
    type: String,
    required: true,
    enum: ["M", "F"], // Male or Female
  },
  course: {
    type: [String], // Array of strings for multiple selections
  },
  // imgUpload: {
  //   type: String, // Filepath or URL for the uploaded image
  //   required: false,
  // },

});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
