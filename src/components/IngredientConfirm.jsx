import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const IngredientConfirm = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { ingredients } = location.state || [];
    const [ingredientsList, setIngredientsList] = useState(ingredients);
    const [searchTerm, setSearchTerm] = useState('');
    const [newIngredient, setNewIngredient] = useState('');
    const [chosen, setChosen] = useState([])
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    const filteredIngredients = ingredientsList.filter((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addIngredient = () => {
        if (newIngredient.trim() !== '') {
            setIngredientsList([...ingredientsList, newIngredient.trim()]);
            setNewIngredient('');
        }
    };

    const startEditing = (index, value) => {
        setEditingIndex(index);
        setEditingValue(value);
    };

    const saveEdit = (index) => {
        const updatedIngredients = [...ingredientsList];
        updatedIngredients[index] = editingValue.trim();
        setIngredientsList(updatedIngredients);
        setEditingIndex(null);
        setEditingValue('');
    };

    const handelCheckbox = (e)=>{
        const { value, checked } = e.target;

    if (checked) {
      // Add the ingredient to the array
      setChosen((prevChosen) => [...prevChosen, value]);
    } else {
      // Remove the ingredient from the array
      setChosen((prevChosen) =>
        prevChosen.filter((chosen) => chosen !== value)
      );
    }
    
  };
    

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-50">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">
                My Ingredients
            </h1>

            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="Search ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                />
                <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                {filteredIngredients.map((ingredient, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center space-x-3">
                                <input
                                onChange={(e)=>handelCheckbox(e)}
                                    type="checkbox"
                                    value={ingredient}
                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-700 font-medium">
                                    {ingredient}
                                </span>
                            </label>
                        </div>
                        {editingIndex === index ? (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    value={editingValue}
                                    onChange={(e) =>
                                        setEditingValue(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                                />
                                <button
                                    onClick={() => saveEdit(index)}
                                    className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => startEditing(index, ingredient)}
                                className="text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out text-sm self-end"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex space-x-2 mb-6">
                <input
                    type="text"
                    placeholder="New ingredient"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                />
                <button
                    onClick={addIngredient}
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out flex items-center"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
                    Add
                </button>
            </div>
            <div className='flex flex-col space-y-3'>
            <button onClick={() => navigate('/advance', { state: { chosen } })} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Confirm Ingredients
            </button>
            <button onClick={()=>navigate(-1)} className='w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                record again
            </button>
            </div>
        </div>
    );
};

export default IngredientConfirm;
