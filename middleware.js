const ExpressError = require('./utilities/ExpressError')
const recipeSchema = require('./validation/recipeSchema')
const Recipe = require('./models/recipe')
const Review = require('./models/review')
const reviewSchema = require('./validation/reviewSchema')

exports.requireLogin = (req, res, next) => {
    // console.log("isAuthenticate ? " + req.isAuthenticated());
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must sign in first!');
        res.redirect('/login');
    } else {
        next();
    }
}

exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        // Since Passport.js will clear the session after sucessful authentication
        // Save the returnTo somewhere else other than session
        req.returnTo = req.session.returnTo;
    }
    next();
}

// recipes middleware
exports.validateRecipe = (req, res, next) => {
    const { error } = recipeSchema.validate(req.body);
    
    if (error) {
        const msg = error.details.map(e => e.message).join(',');
        throw new ExpressError(msg, 400);
    }
    next();
}

exports.checkAuthor = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    // check if the author of the recipe is the current user
    if (!recipe.author.equals(req.user._id)) {
        req.flash('error', "You do not have permission!");
        return res.redirect(`/recipes/${id}`);
    }
    next();
}

// reviews middleware
exports.validateReview = (req, res, next) => {

    const { error } = reviewSchema.validate(req.body);

    if ( error ) {
        const msg = error.details.map(e => e.message).join(',');
        throw new ExpressError(msg, 400);
    }
    next();
    
}

exports.checkReviewAuthor = async (req, res, next) => {
    const { cid, rid } = req.params;
    const review = await Review.findById(rid);
    // check if the author of the review is the current user
    if (!review.author.equals(req.user._id)) {
        req.flash('error', "You do not have permission!");
        return res.redirect(`/recipes/${cid}`);
    }
    next();
}