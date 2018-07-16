const express = require('express')
const router = express.Router()
const Food = require('../models/food')
var fetch = require("node-fetch");


class recipesController {


  static async index (req, res, next) {
    const app_id = "1cf459b5"
    const app_key = "fcdc401b4e09697db2c9a0cf4297f53a"
    const searchUrl = "http://api.yummly.com/v1/api/recipes?_app_id=1cf459b5&_app_key=fcdc401b4e09697db2c9a0cf4297f53a"
    const recipeUrl = "http://api.yummly.com/v1/api/recipe/"
    let food = await Food.find(req)
    let food_name = food.rows[0].name

    const recipeResults = () => {
      return fetch(`${searchUrl}&${food_name}`)
      .then(response => response.json())
      .then(recipes => recipeMatches(recipes.matches))
      .catch(error => error)
    }

    const recipeResult = (recipeName) => {
      return fetch(`${recipeUrl}&${recipeName}?_app_id=${app_id}&_app_key=${app_key}`)
      .then(response => response.json())
      .then(recipe => getRecipeUrl(recipe))
      .catch(error => error)
    }

    const getRecipeUrl = (recipe) => {
      return recipe.attribution.url
    }

    const recipeMatches = (recipes) => {
      let allResults = {}
      let recipeList = recipes.map(recipe => {
        let result = {}
        result["name"] = recipe.recipeName
        result["url"] = recipeResult(recipe.recipeName)
        return result
      })
      allResults["recipes"] = recipeList
      return allResults
    }

    return res.status(200).json(recipeResults())
  }
}

module.exports = recipesController;
