import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [loginError, setLoginError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { success, error } = await login({
                email: formData.email,
                password: formData.password
            });

            if (success) {

                const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
                if (redirectUrl) {
                    sessionStorage.removeItem('redirectAfterLogin');
                    navigate(redirectUrl);
                } else {
                    navigate('/profile');
                }

            } else {
                setLoginError(error || 'Login failed. Please try again.');
            }
        } catch (err) {
            setLoginError('An unexpected error occurred. Please try again.');
            console.error('Login error:', err);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-700 to-primary-500 dark:from-slate-900 dark:to-green-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <img src="/logo.jpeg" alt="Foodie Logo" className="h-16 w-30 mx-auto" />
                    <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Hungry? Sign in to browse restaurants and get food delivered fast!</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl backdrop-blur-sm backdrop-filter bg-opacity-80 dark:bg-opacity-80 p-8 border border-gray-200 dark:border-slate-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 dark:bg-slate-700 dark:text-white"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 dark:bg-slate-700 dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#208C27] to-[#36BF3F] hover:from-[#16601d] hover:to-[#2eaa36] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#36BF3F] transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        Not a member?{' '}
                        <Link to="/register" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;