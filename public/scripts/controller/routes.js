const recipeApiId =  '';
const recipeApiKey = '';

var app = app || {};

page('/', app.homeController.show);
page('/about', app.aboutController.show);
page('/nutrition', app.nutritionController.show);
page('/recipe', app.recipeController.show);

page();

getRecipe = () => {
  $.ajax({
    url: `https://api.edamam.com/search?q=chicken&app_id=${recipeApiId}&app_key=${recipeApiKey}&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free`
    ,method: 'GET'
  })
  .then(data => {
    console.log(data);
  }
  );
};
