const express = require('express');
const router = express.Router();
const { requireLogin, validateRecipe, checkAuthor } = require('../middleware');
const recipes = require('../controllers/recipes')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

/***** RECIPE ROUTES *****/
// index route
router.get('/', recipes.index)

// new recipe form route
router.get('/new', requireLogin, recipes.getNewForm)

// post route
router.post('/', requireLogin, 
                 upload.array('image'), 
                 validateRecipe, 
                 recipes.postNewRecipe)

// show route
router.get('/:id', recipes.showRecipe)

// get recipe edit form route
router.get('/:id/edit', requireLogin, checkAuthor, recipes.getEditForm)

// patch (update and edit) route
router.patch('/:id', requireLogin, 
                     checkAuthor, 
                     upload.array('image'), 
                     validateRecipe, 
                     recipes.updateRecipe) 

// delete route
router.delete('/:id', requireLogin, checkAuthor, recipes.deleteRecipe)
/*****************************/

module.exports = router;
