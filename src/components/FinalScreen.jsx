import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, Users, ChefHat, X } from 'lucide-react';

const RecipeCard = ({ recipe, onClick }) => (
  <div 
    className="bg-white rounded-xl shadow-sm overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
    onClick={() => onClick(recipe)}
  >
    <img
      src={recipe.imageUrl || '/api/placeholder/400/300'}
      alt={recipe.recipeName}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {recipe.recipeName}
      </h3>
      <p className="text-gray-600 mb-4 h-12 overflow-hidden">
        {recipe.description}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          <span>{recipe.preparationTime + recipe.cookingTime} min</span>
        </div>
        <div className="flex items-center">
          <Users size={16} className="mr-1" />
          <span>{recipe.servings} servings</span>
        </div>
        <div className="flex items-center">
          <ChefHat size={16} className="mr-1" />
          <span>{recipe.difficultyLevel}</span>
        </div>
      </div>
    </div>
  </div>
);

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{recipe.recipeName}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <img
            src={recipe.imageUrl || '/api/placeholder/400/300'}
            alt={recipe.recipeName}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-600">
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-600 mb-2">
                  {instruction.description}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinalScreen = () => {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [finalQuery, setFinalQuery] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (location.state) {
      const { recipes: locationRecipes, finalQuery: locationFinalQuery } = location.state;
      
      if (Array.isArray(locationRecipes)) {
        setRecipes(locationRecipes);
      } else if (locationRecipes && Array.isArray(locationRecipes.recipes)) {
        setRecipes(locationRecipes.recipes);
      } else {
        setError('No valid recipes data found');
      }

      setFinalQuery(locationFinalQuery);
    } else {
      setError('No data received from previous page');
    }
  }, [location]);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto bg-gray-50">
        <h1 className="text-3xl font-semibold mb-6 text-red-600">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Recipe Results
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search results..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {finalQuery && (
        <div className="mb-6 p-4 bg-blue-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Applied Filters:</h2>
          <ul className="list-disc list-inside">
            {finalQuery.dietary?.length > 0 && (
              <li>Dietary: {finalQuery.dietary.join(', ')}</li>
            )}
            {finalQuery.cuisine?.length > 0 && (
              <li>Cuisine: {finalQuery.cuisine.join(', ')}</li>
            )}
            {finalQuery.course?.length > 0 && (
              <li>Course: {finalQuery.course.join(', ')}</li>
            )}
            {finalQuery.prepTime && (
              <li>Prep Time: {finalQuery.prepTime.min} - {finalQuery.prepTime.max} minutes</li>
            )}
            {finalQuery.calories && (
              <li>Calories: {finalQuery.calories.min} - {finalQuery.calories.max} calories</li>
            )}
            {finalQuery.ingredients?.length > 0 && (
              <li>Ingredients: {finalQuery.ingredients.join(', ')}</li>
            )}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard 
            key={recipe.recipeName} 
            recipe={recipe} 
            onClick={handleRecipeClick}
          />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          No recipes found. Try adjusting your filters or search term.
        </div>
      )}

      {filteredRecipes.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
            Load More Recipes
          </button>
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default FinalScreen;