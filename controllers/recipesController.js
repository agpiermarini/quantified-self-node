const express = require('express')
const router = express.Router()
const Food = require('../models/food')
const Recipes = require('../services/recipes')


class recipesController {


  static async index (req, res, next) {
    const searchUrl = "http://api.yummly.com/v1/api/recipes?_app_id=1cf459b5&_app_key=fcdc401b4e09697db2c9a0cf4297f53a"
    let food = await Food.find(req)
    let food_name = food.rows[0].name

    let recipes = await Recipes.fetchRecipes(searchUrl, food_name)

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
