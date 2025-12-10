import React from 'react';

const LoadingProfile = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-700 to-primary-500 dark:from-slate-900 dark:to-green-900 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <div className="h-10 w-64 bg-white bg-opacity-20 rounded mx-auto animate-pulse"></div>
                    <div className="h-6 w-96 bg-white bg-opacity-10 rounded mx-auto mt-2 animate-pulse"></div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="relative bg-gradient-to-r from-green-500 to-green-700 h-48 animate-pulse">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-full bg-white bg-opacity-30 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="mt-20 px-8 pb-8">
                        <div className="border-b border-gray-200 dark:border-slate-700">
                            <div className="flex space-x-8 py-4">
                                <div className="h-6 w-32 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                <div className="h-6 w-32 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                <div className="h-6 w-32 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="h-8 w-48 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                                <div className="h-10 w-32 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                            </div>

                            <div className="space-y-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i}>
                                        <div className="h-6 w-40 bg-gray-200 dark:bg-slate-700 rounded mb-4 animate-pulse"></div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="h-16 bg-gray-100 dark:bg-slate-700 rounded animate-pulse"></div>
                                            <div className="h-16 bg-gray-100 dark:bg-slate-700 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingProfile;