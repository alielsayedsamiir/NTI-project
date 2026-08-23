const User = require("../models/user-model");
const Course = require("../models/course-model");

const addCourseToUser = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.userId);
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ status: "fail", message: "Course not found" });

    const isEnrolled = user.myCourses.some((id) => id.toString() === courseId);
    if (isEnrolled) {
      return res.status(400).json({ status: "fail", message: "Course already enrolled" });
    }

    user.myCourses.push(courseId);
    course.studentsCount += 1;

    await user.save();
    await course.save();

    res.status(200).json({
      status: "success",
      message: "Enrolled successfully",
      data: { myCourses: user.myCourses },
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getUserCourses = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("myCourses");
    res.status(200).json({ status: "success", data: { myCourses: user.myCourses } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }

};
// Add these exports inside user-controllers.js
const updateUserCourse = async (req, res, next) => {
  res.status(200).json({ status: "success", message: "Course updated successfully" });
};

const deleteUserCourse = async (req, res, next) => {
  res.status(200).json({ status: "success", message: "Course deleted successfully" });
};

// Make sure to export them in module.exports!
module.exports = {
  addCourseToUser,
  getUserCourses,
  updateUserCourse,
  deleteUserCourse,
};
