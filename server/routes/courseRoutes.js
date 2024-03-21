const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse
} = require('../controllers/courseController');

const router = express.Router();

// get all
router.get('/', getAllCourses);

// get by id
router.get('/:id', getCourseById);

// post new
router.post('/', createCourse);

// delete by id
router.delete('/:id', deleteCourse);

// update by id
router.patch('/:id', updateCourse);

module.exports.router = router;