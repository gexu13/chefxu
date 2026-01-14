const Recipe = require('../models/recipe')
const Review = require('../models/review')

exports.createReview = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const recipe = await Recipe.findById(cid);
        const review = new Review(req.body.review);
        // set the current user as the author of the new review
        review.author = req.user._id;
        recipe.reviews.push(review);
        await recipe.save();
        await review.save();
        req.flash('success', 'Successfully made a new review!');
        res.redirect(`/recipes/${recipe._id}`);
    } catch (err) {
        next(err);
    }
}

exports.deleteReview = async (req, res, next) => {
    const { cid , rid } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(cid, {$pull : {reviews: rid}});
    const review = await Review.findByIdAndDelete(rid);
    req.flash('success', 'Successfully deleted the review!');
    res.redirect(`/recipes/${cid}`);

} 