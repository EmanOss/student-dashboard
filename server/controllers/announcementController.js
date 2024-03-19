const Announcement = require('../models/AnnouncementModel');
const mongoose = require('mongoose');

// Get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const allAnnouncements = await Announcement.find({}).sort({ createdAt: -1 });
    return res.status(201).json(allAnnouncements);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get announcement by id
const getAnnouncementById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: 'No announcement with that id' });
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement)
    return res.status(404).json({ error: 'No announcement with that id' });
  return res.status(201).json(announcement);
};

// Post new announcement
const createAnnouncement = async (req, res) => {
  const { author, course, text } = req.body;

  try {
    const newAnnouncement = await Announcement.create({ author, course, text });
    return res.status(201).json(newAnnouncement);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete announcement by id
const deleteAnnouncement = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: 'No announcement with that id' });

  const deletedAnnouncement = await Announcement.findOneAndDelete({ _id: req.params.id });
  if (!deletedAnnouncement)
    return res.status(404).json({ error: 'No announcement with that id' });

  return res.status(201).json(deletedAnnouncement);

};
// Update announcement by id
const updateAnnouncement = async (req, res) => {
  const { author, course, text } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ error: 'No announcement with that id' });
  const updatedAnnouncement = await Announcement.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );
  if (!updatedAnnouncement)
    return res.status(404).json({ error: 'No announcement with that id' });
  return res.status(201).json(updatedAnnouncement);
};

module.exports = {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement
};