const Motel = require('../models/motel');
const AppError = require('../utils/AppError');
const cloudinary = require('../utils/cloudinary');

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
        images: req.files.map(file => ({
            url: file.path,
            filename: file.filename             
        })),
        vibePic: req.files[0].filename,
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
    const updatedMotel = await Motel.findById(id);

    if (!updatedMotel) {
        return next(new AppError('The motel you want to update, could not be found.', 404, '/motels'));
    }

    res.render('motels/update', { pageTitle: 'Edit & Update', motel: updatedMotel });
};

module.exports.updateVibePic = async (req, res, next) => {
    const { id } = req.params;
    const { filename } = req.body;

    const motel = await Motel.findById(id);

    if (!motel) {
        return next(new AppError('The motel could not be found.', 404, '/motels'));
    }

    motel.vibePic = filename;
    await motel.save();

    res.json({ success: true, vibePic: motel.vibePic });
};

module.exports.updateMotel = async (req, res, next) => {
    const { id } = req.params;
    const motel = req.body.motel;
    const updatedMotel = await Motel.findByIdAndUpdate(id);

    if (!updatedMotel) {
        return next(new AppError('Could not find the motel to update!', 404, '/motels'));
    }

    Object.assign(updatedMotel, motel);

    if (req.files && req.files.length > 0) {
        updatedMotel.images.push(
            ...req.files.map(file => ({
                url: file.path,
                filename: file.filename
            }))
        );
    }

    await updatedMotel.save();

    req.flash('success', 'Successfully updated the motel!');
    res.redirect(`/motels/${id}`);
};

module.exports.deleteMotelImage = async (req, res, next) => {
    const { id } = req.params;
    const { filename } = req.body;

    const motel = await Motel.findById(id);

    if (!motel) {
        return next(new AppError('The motel could not be found.', 404, '/motels'));
    }

    const imageIndex = motel.images.findIndex(image => image.filename === filename);

    if (imageIndex === -1) {
        return next(new AppError('That image could not be found.', 404, `/motels/${id}`));
    }

    if (motel.images.length === 1) {
        return next(new AppError('Cannot delete the only image of the motel.', 400, `/motels/${id}`));
    }

    const image = motel.images[imageIndex];

    await cloudinary.uploader.destroy(image.filename);

    const wasVibePic = motel.vibePic === image.filename;

    motel.images.splice(imageIndex, 1);

    if (wasVibePic) {
        motel.vibePic = motel.images[0].filename;
    }

    await motel.save();

    res.json({
        success: true,
        deletedFilename: image.filename,
        vibePic: motel.vibePic,
        images: motel.images
    });

};

module.exports.deleteMotel = async (req, res, next) => {
    const { id } = req.params;
    const deletedMotel = await Motel.findByIdAndDelete(id)

    if (!deletedMotel) {
        return next(new AppError('The motel could not be found.', 404, '/motels'));
    }
    
    req.flash('success', 'Motel deleted successfully!');
    res.redirect('/motels');
};