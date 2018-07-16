const express = require('express')
const router = express.Router()
const Food = require('../models/food')
const Recipes = require('../services/recipes')


class recipesController {


  static async index (req, res, next) {
    let recipes = await Recipes.fetchRecipes(req)

    const formatRecipes = (recipes) => {
      let recipeList = recipes.map(recipe => {
        return {"name": recipe.recipeName, "url": `http://www.yummly.co/recipe/${recipe.id}`}
      })
      return { "recipes": recipeList }
    }
    return res.status(200).json(formatRecipes(recipes))
  }
}

module.exports = recipesController;
