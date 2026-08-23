const express = require("express");
const { 
  addCourseToUser, 
  getUserCourses, 
  updateUserCourse,   
  deleteUserCourse    
} = require("../controllers/user-controllers"); 
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize-middleware");

const router = express.Router();

router
  .route("/courses")
  .get(authenticateMiddleware, authorizeMiddleware("student"), getUserCourses)
  .post(authenticateMiddleware, authorizeMiddleware("student"), addCourseToUser)
  .patch(authenticateMiddleware, authorizeMiddleware("student"), updateUserCourse)  
  .delete(authenticateMiddleware, authorizeMiddleware("student"), deleteUserCourse); 

module.exports = router;