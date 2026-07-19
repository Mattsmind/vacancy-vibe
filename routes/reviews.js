const express = require('express');
const router = express.Router({ mergeParams: true });

const validateForm = require('../middleware/validateForm');
const requireAuth = require('../middleware/requireAuth');
const { reviewSchema } = require('../models/reviewsValidation');
const { objectIdSchema } = require('../models/idValidation');

const reviews = require('../controllers/reviews');

router.route('/')
    .post(validateForm(reviewSchema), requireAuth, reviews.createReview);

router.route('/:reviewId')
    .delete(validateForm(objectIdSchema, 'params'), requireAuth, reviews.deleteReview)

module.exports = router;