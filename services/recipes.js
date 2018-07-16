const Food = require('../models/food')
const fetch = require("node-fetch");


class Recipes {
  static async fetchRecipes (req) {
    const searchUrl = "http://api.yummly.com/v1/api/recipes?_app_id=1cf459b5&_app_key=fcdc401b4e09697db2c9a0cf4297f53a"
    let food = await Food.find(req)
    let food_name = food.rows[0].name

    return fetch(`${searchUrl}&q=${food_name}`)
      .then(response => response.json())
      .then(recipes => recipes.matches)
      .catch(error => error)
    }
}

module.exports = Recipes
