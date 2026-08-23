const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    imageUrl: { type: String },
    studentsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);