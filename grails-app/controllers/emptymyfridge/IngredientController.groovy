package emptymyfridge

import grails.converters.JSON
import groovy.json.*
import javax.annotation.Resources
import java.io.IOException
import java.io.InputStream
import java.util.ArrayList
import java.util.List
import java.util.stream.Collectors
import grails.rest.RestfulController
import org.json.JSONArray
import org.json.JSONObject

import com.mashape.unirest.http.HttpResponse
import com.mashape.unirest.http.JsonNode
import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException

class IngredientController extends RestfulController {

    static responseFormats = ['json', 'xml']

    IngredientController() {
        super(Recipe)
    }

    def List<Recipe> spoonacularIngredient(String ingredient) {
        HttpResponse<JsonNode> response = Unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=" + ingredient + "&limitLicense=false&number=20&ranking=1")
                .header("X-Mashape-Key", "VCnnvDF92omsheBNZIrTA8hYESqip1DmRPOjsnxC3udwzTNzUn")
                .asJson()
        final JSONArray body = response.getBody().getArray()
        List<Recipe> resultList = new ArrayList<>()
        for (int i = 0; i < body.length(); i++) {
            JSONObject node = body.getJSONObject(i)
            resultList.add(new Recipe(name: node.getString("title")))
        }
        return resultList
    }

    def List<Recipe> spoonacularComplex(String ingredient, String cuisine, String diet, String foodtype) {
        String tempString
        System.out.print(ingredient + "\n")
        System.out.print(cuisine + "\n")
        System.out.print(foodtype + "\n")
        System.out.print(diet)
        HttpResponse<JsonNode> response = Unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&cuisine=" + cuisine + "&diet=" + diet + "&fillIngredients=false&includeIngredients=" + ingredient + "&instructionsRequired=false&number=20&offset=0&ranking=1&type=" + foodtype)
                .header("X-Mashape-Key", "VCnnvDF92omsheBNZIrTA8hYESqip1DmRPOjsnxC3udwzTNzUn")
                .asJson()
        final JSONObject myObj = response.getBody().getObject();
        final JSONArray body = myObj.getJSONArray("results")
        List<Recipe> resultList = new ArrayList<>()
        for (int i = 0; i < body.length(); i++) {
            JSONObject node = body.getJSONObject(i)
            tempString = Integer.toString(node.getInt("id"))
            resultList.add(new Recipe(name: node.getString("title"),identity: tempString,  image: node.getString("image")))
        }
        return resultList
    }

    def Recipe expandInfo(String recipeId) {
        String tempString
        HttpResponse<JsonNode> response = Unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeId + "/summary")
                .header("X-Mashape-Key", "VCnnvDF92omsheBNZIrTA8hYESqip1DmRPOjsnxC3udwzTNzUn")
                .header("Accept", "application/json")
                .asJson();
        JSONObject myObj = response.getBody().getObject()
        Recipe returnRecipe = new Recipe(summary: myObj.getString("summary"))

        HttpResponse<JsonNode> response2 = Unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeId + "/information?includeNutrition=false")
                .header("X-Mashape-Key", "VCnnvDF92omsheBNZIrTA8hYESqip1DmRPOjsnxC3udwzTNzUn")
                .header("Accept", "application/json")
                .asJson();
        JSONObject myObj2 = response2.getBody().getObject()
        returnRecipe.url = myObj2.getString("sourceUrl")
        returnRecipe.image = myObj2.getString("image")
        returnRecipe.name = myObj2.getString("title")
        tempString = Integer.toString(myObj2.getInt("id"))
        returnRecipe.identity = tempString
        return returnRecipe
    }

    def List<Recipe> spoonacularRandom() {
        String tempString
        HttpResponse<JsonNode> response = Unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=20")
                .header("X-Mashape-Key", "VCnnvDF92omsheBNZIrTA8hYESqip1DmRPOjsnxC3udwzTNzUn")
                .asJson()
        final JSONObject myObj = response.getBody().getObject();
        final JSONArray body = myObj.getJSONArray("recipes")
        List<Recipe> resultList = new ArrayList<>()
        for (int i = 0; i < body.length(); i++) {
            JSONObject node = body.getJSONObject(i)
            tempString = Integer.toString(node.getInt("id"))
            resultList.add(new Recipe(name: node.getString("title"),identity: tempString,  image: node.getString("image")))
        }
        return resultList
    }

    def getRecipesByIngredients() {
        def ingredients = params.ingredients as String
        List<Recipe> results = spoonacularIngredient(ingredients)
        respond results
    }

    def getRecipesByComplex(){
        def ingredients = params.ingredients as String
        def cuisine = params.cuisine as String
        def diet = params.diet as String
        def foodtype = params.foodtype as String
        List<Recipe> results = spoonacularComplex(ingredients, cuisine, diet, foodtype)
        respond results
    }

    def getRecipeInfo(){
        def recipeID = params.recipeID as String
        respond expandInfo(recipeID)
    }

    def getRecipesByRandom(){
        List<Recipe> results = spoonacularRandom()
        respond results
    }

}
