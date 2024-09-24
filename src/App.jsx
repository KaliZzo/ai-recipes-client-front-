import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import RecordPage from './components/RecordPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeFilter from './components/RecipeFilter';
import IngredientConfirm from './components/IngredientConfirm';
import FinalScreen from './components/FinalScreen';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />{' '}
                {/* 👈 Renders at /app/ */}
                <Route path="/record" element={<RecordPage />} />{' '}
                {/* 👈 Renders at /app/record */}
                <Route path="/confirm" element={<IngredientConfirm />} />
                <Route path="/advance" element={<RecipeFilter />} />
                <Route path="/recipes" element={<FinalScreen />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
