import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';

const cuisineOptions = [
  "Italian", "Mexican", "Chinese", "Indian", "Japanese",
  "French", "Thai", "Greek", "American", "Spanish", "Middle Eastern",
];

const courseOptions = [
  "Appetizer", "Main Course", "Dessert", "Soup", "Salad", "Breakfast", "Snack",
];

const RecipeFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [finalQuery, setFinalQuery] = useState({});
  const { chosen = [] } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      kosher: false,
    },
    cuisine: [],
    course: [],
    prepTime: [0, 120],
    calories: [0, 1000],
    ingredients: chosen,
  });

  const generateFinalQuery = () => {
    const newFinalQuery = {
      dietary: Object.entries(filters.dietary)
        .filter(([_, value]) => value)
        .map(([key]) => key),
      cuisine: [...filters.cuisine],
      course: [...filters.course],
      prepTime: {
        min: filters.prepTime[0],
        max: filters.prepTime[1]
      },
      calories: {
        min: filters.calories[0],
        max: filters.calories[1]
      },
      ingredients: [...filters.ingredients]
    };
    setFinalQuery(newFinalQuery);
  };

  useEffect(() => {
    generateFinalQuery();
  }, [filters]);

  const handleDietaryChange = (key) => {
    setFilters((prev) => ({
      ...prev,
      dietary: { ...prev.dietary, [key]: !prev.dietary[key] },
    }));
  };

  const handleArrayFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const handleSliderChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const addIngredient = (ingredient) => {
    if (ingredient && !filters.ingredients.includes(ingredient)) {
      setFilters((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredient],
      }));
    }
  };

  const removeIngredient = (ingredient) => {
    setFilters((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((item) => item !== ingredient),
    }));
  };

  const handleFinalScreen = async () => {
    if (finalQuery) {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:3000/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalQuery),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const recipes = await response.json();
        navigate('/recipes', { state: { recipes, finalQuery } });
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Recipe Filters
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Dietary Restrictions</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(filters.dietary).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleDietaryChange(key)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Cuisine</h2>
          <div className="flex flex-wrap gap-2">
            {cuisineOptions.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => handleArrayFilter("cuisine", cuisine)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.cuisine.includes(cuisine)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Course</h2>
          <div className="flex flex-wrap gap-2">
            {courseOptions.map((course) => (
              <button
                key={course}
                onClick={() => handleArrayFilter("course", course)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.course.includes(course)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Preparation Time</h2>
          <input
            type="range"
            min={0}
            max={120}
            step={5}
            value={filters.prepTime[1]}
            onChange={(e) =>
              handleSliderChange("prepTime", [0, parseInt(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span>0 min</span>
            <span>{filters.prepTime[1]} min</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Calories</h2>
          <input
            type="range"
            min={0}
            max={1000}
            step={50}
            value={filters.calories[1]}
            onChange={(e) =>
              handleSliderChange("calories", [0, parseInt(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span>0 cal</span>
            <span>{filters.calories[1]} cal</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Add ingredient"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addIngredient(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector(
                  'input[placeholder="Add ingredient"]'
                );
                addIngredient(input.value);
                input.value = "";
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3 mt-6">
        <button 
          onClick={handleFinalScreen} 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            'Apply Filters'
          )}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default RecipeFilter;