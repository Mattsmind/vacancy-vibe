module.exports = (Model) => {
    return async (req, res, next) => {
        const { id } = req.params;

        const resource = await Model.findById(id);

        if (!resource) {
            req.flash('error', 'Resource not found.');
            return res.redirect('/motels');
        }

        if (!resource.author.equals(req.user._id)) {
            req.flash('error', 'You do not have permission to do that.');
            return res.redirect(`/motels/${id}`);
        }

        next();
    };
};