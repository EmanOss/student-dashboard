const Course = require('../models/CourseModel');
const mongoose = require('mongoose');

// Get all course
const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({}).sort({ createdAt: -1 });
    return res.status(201).json(allCourses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get course by id
const getCourseById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: 'No course with that id' });
  const course = await Course.findById(req.params.id);
  if (!course)
    return res.status(404).json({ error: 'No course with that id' });
  return res.status(201).json(course);
};

// Post new course
const createCourse = async (req, res) => {
  const { title } = req.body;

  try {
    const newCourse = await Course.create({ title });
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete course by id
const deleteCourse = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: 'No course with that id' });

  const deletedCourse = await Course.findOneAndDelete({ _id: req.params.id });
  if (!deletedCourse)
    return res.status(404).json({ error: 'No course with that id' });

  return res.status(201).json(deletedCourse);

};
// Update course by id
const updateCourse = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: 'No course with that id' });
  const updatedCourse = await Course.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );
  if (!updatedCourse)
    return res.status(404).json({ error: 'No course with that id' });
  return res.status(201).json(updatedCourse);
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse
};