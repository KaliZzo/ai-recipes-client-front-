import React from 'react';
import { Clock, Users, Star } from 'lucide-react';

const RecipeCard = ({ recipe }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
        <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {recipe.title}
            </h3>
            <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                {recipe.description}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{recipe.prepTime} min</span>
                </div>
                <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center">
                    <Star size={16} className="mr-1 text-yellow-400" />
                    <span>{recipe.rating}</span>
                </div>
            </div>
        </div>
    </div>
);

export default RecipeCard;
