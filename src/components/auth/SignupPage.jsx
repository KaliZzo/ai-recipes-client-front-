import { Link } from 'react-router-dom';
import React from 'react';

const SignupPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-[90%] sm:max-w-md bg-white shadow-lg rounded-2xl p-6">
                <div className="text-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        Create an Account
                    </h2>
                </div>
                <form className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 text-base sm:text-sm"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    By signing up, you agree to our{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Terms
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Privacy Policy
                    </a>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
