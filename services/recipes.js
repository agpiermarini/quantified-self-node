const Food = require('../models/food')
const fetch = require("node-fetch");


class Recipes {
  static fetchRecipes (searchUrl, food_name) {
      return fetch(`${searchUrl}&q=${food_name}`)
        .then(response => response.json())
        .then(recipes => recipes.matches)
        .catch(error => error)
  }
}

module.exports = Recipes
