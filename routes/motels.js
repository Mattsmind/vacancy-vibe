const express = require('express');
const router = express.Router();
const motels = require('../controllers/motels');

const validateForm = require('../middleware/validateForm');
const requireAuth = require('../middleware/requireAuth');
const isAuthor = require('../middleware/isAuthor');

const Motel = require('../models/motel');
const { motelSchema } = require('../models/motelValidation');
const { objectIdSchema } = require('../models/idValidation');

router.route('/')
    .get(motels.index)
    .post(validateForm(motelSchema), requireAuth, motels.createMotel);

router.get('/new', requireAuth, motels.renderNewForm);

router.route('/:id')
    .get(validateForm(objectIdSchema, 'params'), motels.showMotel)
    .put(validateForm(objectIdSchema, 'params'), validateForm(motelSchema), requireAuth, isAuthor(Motel), motels.updateMotel)
    .delete(validateForm(objectIdSchema, 'params'), requireAuth, isAuthor(Motel), motels.deleteMotel);

router.get('/:id/edit', validateForm(objectIdSchema, 'params'), requireAuth, isAuthor(Motel), motels.renderEditForm);

module.exports = router;