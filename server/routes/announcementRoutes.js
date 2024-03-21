const express = require('express');
const {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement
} = require('../controllers/announcementController');

const router = express.Router();

// get all
router.get('/', getAllAnnouncements);

// get by id
router.get('/:id', getAnnouncementById);

// post new
router.post('/', createAnnouncement);

// delete by id
router.delete('/:id', deleteAnnouncement);

// update by id
router.patch('/:id', updateAnnouncement);

module.exports.router = router;