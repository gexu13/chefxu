const Recipe = require('../models/recipe')
const cloudinary = require('cloudinary').v2;

exports.index = async (req, res, next) => {
    try {
        const allRecipes = await Recipe.find({});
        res.render('recipes/index', {allRecipes});
    } catch(err) {
        next(err);
    } 
}

exports.getNewForm = (req, res) => {
    res.render('recipes/new');
}

exports.postNewRecipe = async (req, res, next) => {
    try {
        // if (!req.body.recipe) throw new ExpressError('Invalid Recipe Data', 400);
        const recipe = new Recipe(req.body.recipe);
        // set the current user as the author of the new recipe
        recipe.author = req.user._id;
        // add images info to the recipe
        const images = req.files.map(e => ({
            url : e.path, 
            filename: e.filename
        }));
        recipe.images = images
        await recipe.save();
        req.flash('success', 'Successfully made a new recipe!');
        res.redirect(`/recipes/${recipe._id}`);
    } catch(err) {
        next(err);
    }
}

exports.showRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id)
                                .populate({
                                    path: 'reviews',
                                    populate: {path: 'author'}
                                })
                                .populate('author'); 
        if (!recipe) {
            req.flash('error', 'Cannot find the recipe!');
            return res.redirect('/recipes');
        }
        res.render('recipes/show', {recipe});
    } catch(err) {
        next(err);
    }
    
}

exports.getEditForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            req.flash('error', 'Cannot find the recipe!');
            return res.redirect('/recipes');
        }  
        res.render('recipes/edit', {recipe});
    } catch(err) {
        next(err);
    }
}

exports.updateRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body.recipe;
        // add updated images info to the existing recipe
        const images = req.files.map(e => ({
            url : e.path, 
            filename: e.filename
        }));
        // find the recipe and update it
        const recipe = await Recipe.findByIdAndUpdate(id, updates, {runValidators: true});
        // add the new images to the recipe
        recipe.images.push(...images);
        await recipe.save();

        if (req.body.deleteImages) {
            // delete the images from cloudinary
            for (let filename of req.body.deleteImages) {
                await cloudinary.uploader.destroy(filename);
            }
            // delete the images from the recipe
            await recipe.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
        }

        req.flash('success', 'Successfully updated the recipe!');
        res.redirect(`/recipes/${recipe._id}`);
    } catch(err) {
        next(err);
    }
}

exports.deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findByIdAndDelete(id);

        if (recipe && recipe.images) {
            // 删除 Cloudinary 上的所有图片
            for (let image of recipe.images) {
                await cloudinary.uploader.destroy(image.filename);
            }
        }

        req.flash('success', 'Successfully deleted the recipe!');
        res.redirect('/recipes');
    } catch(err) {
        next(err);
    }
}
