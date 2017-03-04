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

    def getRecipesByIngredients() {
        def ingredients = params.ingredients as String
        List<Recipe> results = spoonacularIngredient(ingredients)
        respond results
    }

}
