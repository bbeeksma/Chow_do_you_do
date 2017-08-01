const recipeApiId =  '';
const recipeApiKey = '';

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
