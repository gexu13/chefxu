const mongoose = require('mongoose');
const Review = require('./review');

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String
});

// https://res.cloudinary.com/daigovpbf/image/upload/w_200/v1734685159/YelpCamp/wlagcf0dpueh3hicgpsd.jpg

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
})

const opts = { toJSON: { virtuals: true } };

const RecipeSchema = new mongoose.Schema({
    title: String,
    images: [ImageSchema],
    description: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, opts);


RecipeSchema.post('findOneAndDelete', async(recipe) => {
    if (recipe) {
        recipe.reviews.forEach(async review => {
            await Review.findByIdAndDelete(review);
        });
    }
})

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
