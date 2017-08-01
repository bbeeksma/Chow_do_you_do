var caloriesMin = 'gte%20200'; //format as gte%20<number>
var caloriesMax = 'lte%20900'; //format as lte%20<number>
var health = 'peanut-free';
var diet = 'low-carb';
var ingredient = 'beef';
/*
DIET:
balanced,
high-protein,
low-fat,
low-carb,

HEALTH
vegan,
vegetarian,
sugar-conscious,
peanut-free,
tree-nut-free,
alcohol-free
*/

/*
  name: object.label
  image: object.image
  serving count: object.yield
  calorie count: object.calories
  ingredients: object.ingredietLines(array)
  recipe link: object.url
  carb count: object.totalNutrients.CHOCDF.quantity
    carb unit:object.object.totalNutrients.CHOCDF.unit
  protein: object.totalNutrients.PROCNT.quantity
    protein unit: object.totalNutrients.PROCNT.unit
  fat: object.totalNutrients.FAT.quantity
    fat: object.totalNutrients.FAT.unit
*/
var recipeResults;
getRecipe = () => {
  $.ajax({
    url: '/edamam/'
    ,method: 'GET'
    ,data: {
      q: 'beef'
      ,from: 0
      ,to: 20
      ,calories:'gte 200, lte 722'
      ,health:'peanut-free'
      ,diet:'low-carb'
    }
  }).then(data => {
    recipeResults = data.hits.map(function(item){
      return item.recipe;
    });

    console.log(recipeResults);
  });
};
