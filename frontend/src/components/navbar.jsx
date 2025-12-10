import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

const NavBar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    const isAuthenticated = Boolean(currentUser && Object.keys(currentUser).length > 0);

    // Remove the localStorage override - it's not needed anymore
    // since cartEvents handles the updates

    const signout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const buttonStyle = `py-2 px-6 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-primary-500 hover:bg-primary-600'} text-sm text-white font-bold rounded-xl transition duration-200`;
    const mobileButtonStyle = `py-2 px-4 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-primary-500 hover:bg-primary-600'} text-sm text-white font-bold rounded-xl transition duration-200`;
    const iconButtonStyle = `p-2 rounded-full ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`;

    const renderAuthButtons = (isMobile = false) => {
        const style = isMobile ? mobileButtonStyle : buttonStyle;

        if (!isAuthenticated) {
            return (
                <>
                    <a className={style} href="/login">Sign In</a>
                    <a className={style} href="/register">Register</a>
                </>
            );
        }

        return (
            <>
                <a className={style} href="/profile">Profile</a>
                {currentUser?.role === 'admin' && (
                    <a className={style} href="/delivery">Delivery</a>
                )}
                <button onClick={signout} className={style}>Sign Out</button>
            </>
        );
    };

    return (
        <div>
            <nav className={`relative px-4 py-4 flex justify-between items-center ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-200`}>
                <a className="text-3xl font-bold leading-none" href="/">
                    <img src="/logo.jpeg" alt="Logo" className="ml-4 h-10 w-auto" />
                </a>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className={iconButtonStyle}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="hidden lg:flex items-center space-x-4">
                    {renderAuthButtons(false)}
                </div>

                <div className="lg:hidden flex space-x-2">
                    {renderAuthButtons(true)}
                </div>
            </nav>

        </div>
    );
};

export default NavBar;