import React, { useState } from "react";
import { PlusCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const recipesArr = [
  {
    id: 1,
    name: "Pasta",
    calories: 1200,
    ingredients: ["pasta", "tomato sauce", "cheese"],
  },
  {
    id: 2,
    name: "Salad",
    calories: 300,
    ingredients: ["lettuce", "tomato", "cucumber"],
  },
  {
    id: 3,
    name: "Pizza",
    calories: 1500,
    ingredients: ["dough", "tomato sauce", "cheese"],
  },
  {
    id: 4,
    name: "Burger",
    calories: 800,
    ingredients: ["bun", "beef patty", "cheese", "lettuce", "tomato", "onion"],
  },
  {
    id: 5,
    name: "Chicken Curry",
    calories: 900,
    ingredients: ["chicken", "curry powder", "coconut milk", "onion", "garlic"],
  },
  {
    id: 6,
    name: "Sushi",
    calories: 600,
    ingredients: ["rice", "nori", "fish", "avocado", "soy sauce"],
  },
  {
    id: 7,
    name: "Chocolate Cake",
    calories: 1500,
    ingredients: ["flour", "sugar", "cocoa powder", "butter", "eggs"],
  },
];

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-2xl shadow-md p-4 text-center">
    <h2 className="text-gray-500 text-sm mb-1">{title}</h2>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const RecipeCard = ({ name, calories }) => (
  <div className="bg-white rounded-2xl shadow-md p-4 w-40 flex-shrink-0">
    <h3 className="font-semibold mb-1">{name}</h3>
    <p className="text-sm text-gray-500">{calories} calories</p>
  </div>
);

const CollectionButton = ({ name }) => (
  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
    {name}
  </button>
);

function Dashboard() {
  const [recipes] = useState(recipesArr);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-8">Hey, Eden! 👋</h1>

        {/* Stats Dashboard */}
        <section className="mb-10">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatCard title="Recipes" value="120" />
            <StatCard title="Collections" value="20" />
          </div>
          <StatCard title="Total Calories" value="120,000" />
        </section>

        {/* All Recipes */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">All Recipes</h2>
            <button className="text-blue-500 flex items-center">
              See All <ChevronRight size={20} />
            </button>
          </div>

          {/* Collections */}
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            {["Breakfast", "Lunch", "Dinner", "Snacks", "Favorites ♥️"].map(
              (name) => (
                <CollectionButton key={name} name={name} />
              )
            )}
          </div>

          {/* Recipe Cards */}
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                name={recipe.name}
                calories={recipe.calories}
              />
            ))}
          </div>
        </section>

        {/* New Recipe Button */}
        <section className="fixed bottom-8 right-8">
          <Link to="/record">
            <button className="bg-blue-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center">
              <PlusCircle size={24} />
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
