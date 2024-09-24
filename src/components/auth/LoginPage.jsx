import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import from react-router-dom instead of lucide-react

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(import.meta.env.VITE_SERVER_URL);
        console.log(email);
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-[90%] sm:max-w-md bg-white shadow-lg rounded-2xl p-6">
                <div className="text-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        Sign in
                    </h2>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 text-base sm:text-sm"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <a href="#" className="text-blue-500 hover:underline">
                        Forgot password?
                    </a>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline"
                    >
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
