const Motel = require('../models/motel');
const AppError = require('../utils/AppError');

module.exports.index = async (req, res, next) => {
    const motels = await Motel.find({});

    if (!motels) {
        return next(new AppError('Error Loading Motel Index.', 500))
    }

    res.render('motels/index', { pageTitle: 'All Motels', motels });
};

module.exports.renderNewForm = (req, res) => {
    res.render('motels/new', { pageTitle: 'Create New' })
};

module.exports.createMotel = async (req, res, next) => {
    const motel = req.body.motel;
    const newMotel = new Motel({
        title: motel.title,
        image: motel.image,
        price: motel.price,
        description: motel.description,
        location: motel.location,
        author: req.user._id
    })
    const createMotel = await newMotel.save();

    if (!createMotel) {
        return next(new AppError('Error cretating new motel.', 500, '/motels/new'));
    }

    req.flash('success', 'Successfully created new Vacancy Vibe!');
    res.redirect(`/motels/${newMotel._id}`);
};

module.exports.showMotel = async (req, res, next) => {
    const { id } = req.params;
    const motel = await Motel.findById(id).populate({ 
        path:'reviews',
        populate: {
            path: 'author'
        }
    });

    if (!motel) {
        return next(new AppError('That motel could not be found', 404, '/motels'));
    }

    res.render('motels/details', { pageTitle: motel.title, motel });
};

module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    const updateCamp = await Motel.findById(id);

    if (!updateCamp) {
        return next(new AppError('The motel you want to update, could not be found.', 404, '/motels'));
    }

    res.render('motels/update', { pageTitle: 'Edit & Update', motel: updateCamp });
};

module.exports.updateMotel = async (req, res, next) => {
    const { id } = req.params;
    const motel = req.body.motel;
    const updatedCamp = await Motel.findByIdAndUpdate(id, motel, { runValidators: true });

    if (!updatedCamp) {
        return next(new AppError('Could not find the camp to update!', 404, '/motels'));
    }

    req.flash('success', 'Successfully updated the motel!');
    res.redirect(`/motels/${id}`);
};

module.exports.deleteMotel = async (req, res, next) => {
    const { id } = req.params;
    const deleteCamp = await Motel.findByIdAndDelete(id)

    if (!deleteCamp) {
        return next(new AppError('The motel could not be found.', 404, '/motels'));
    }
    
    req.flash('success', 'Motel deleted successfully!');
    res.redirect('/motels');
};