const express = require('express')
const router = express.Router()
const Food = require('../models/food')
var fetch = require("node-fetch");


class recipesController {


  static async index (req, res, next) {
    const baseUrl = "http://api.yummly.com/v1/api/recipes?_app_id=1cf459b5&_app_key=fcdc401b4e09697db2c9a0cf4297f53a"
    let food = await Food.find(req)
    let food_name = food.rows[0].name

    const recipeResults = () => {
      return fetch(`${baseUrl}&${food_name}`)
      .then(response => response.json())
      .then(recipes => recipeMatches(recipes.matches))
      .catch(error => error)
    }

    const recipeMatches = (recipes) => {
      let allResults = {}
      let recipeList = recipes.map(recipe => {
        let result = {}
        result["name"] = recipe.recipeName
        result["url"] = "some_url"
        return result
      })
      allResults["recipes"] = recipeList
      console.log(allResults)
      return allResults
    }

    return res.status(200).json(recipeResults())
  }

  // formatRecipes (recipes) {
  //   console.log(recipes)
  // }
}

module.exports = recipesController;
