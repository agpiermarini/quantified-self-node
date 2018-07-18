const Food = require('../models/food')
const fetch = require("node-fetch");


class Recipes {
  static async fetchRecipes (req) {
    const searchUrl = `http://api.yummly.com/v1/api/recipes?_app_id=${process.env.APP_ID}&_app_key=${process.env.APP_KEY}`
    let food = await Food.find(req)
    let food_name = food.rows[0].name

    return fetch(`${searchUrl}&q=${food_name}`)
      .then(response => response.json())
      .then(recipes => recipes.matches)
      .catch(error => error)
    }
}

module.exports = Recipes
